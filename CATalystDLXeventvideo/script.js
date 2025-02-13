let sheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1SvlgwjDPvbz9tVZ1MTRq_AkVonfs-YWAoCUpgYFV8t5sSL7SN58lyAfWM9LURf6HAsurzU52f1kw/pub?gid=145287685&single=true&output=csv"
let refreshSeconds = 30
// reload this page every 5 minutes
console.log(window.location.search)
let params = new URLSearchParams(window.location.search)
let group = 0
if (params.get("group") != undefined) {
  group = parseInt(params.get("group"))
}
console.log(params)
// get the number of the window group, and this will make sure we don't re-use any links
// this might also mean that we need to set a reset on the window to sync it (both windows opened at different times will start their refresh timers separately)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

async function triggerPlaylist() {

  console.log("starting")

  let holder = document.querySelector("#holder")
  // make 4 smaller divs for the videos
  let subholders = Array(2).fill(0).map((e, i) => {
    let d = document.createElement("div")

    let p = document.createElement("p")
    // p.class = "groupid"
    // p.innerHTML = `${group * 2 + i + 1}`
    d.id = `holder${i}`
    d.class = "subholder"
    holder.append(d)
    // d.append(p)
    return d
  })
  let text = (await fetch(sheetLink).then(res => res.text()))
  let data = d3.csvParse(text, d3.autoType)
  setTimeout(() => {
    window.location.reload()
  }, data.length * 30 * 1000)

  //data = shuffle(data)
  //slice skips the column header
  let subdata = data.filter(e => /vizzies/.test(e.tag))
  let indices = Array(subdata.length).fill(0).map((e, i) => i)
  let groupIndices
  if (group == 0) {
    groupIndices = indices.slice(0, subdata.length / 2)
  } else {
    groupIndices = indices.slice(subdata.length / 2)
  }
  groupIndices = shuffle(groupIndices)
  function addToSubHolder(subholder, indices) {
    let iframe
    let video
    let linkNumber = 0
    for (let i of indices) {
      let row = subdata[i]
      let link = row.link
      console.log("link is", link)
      console.log("setting timeout", link, 10 * 1000 * linkNumber)
      // this will ensure that the pages get to play for a certain amount of time

      setTimeout(() => {
        let playobject
        if ((/twimg/).test(link)) {
          if (video) { video.remove() }
          if (iframe) { iframe.remove() }
          video = document.createElement("video")
          video.setAttribute("autoplay", "true")
          video.setAttribute("loop", "true")
          video.setAttribute("muted", "true")
          playobject = video
        } else {
          if (video) { video.remove() }
          if (iframe) { iframe.remove() }
          iframe = document.createElement("iframe")

          playobject = iframe
        }
        subholder.append(playobject)

        playobject.src = `${link}&loop=1`
      }, 300 * 1000 * linkNumber)

      linkNumber += 1


    }

  }
  let indicesPerD = Math.floor(groupIndices.length / 2)
  subholders.map((d, i) => {
    let subindices = groupIndices.slice(i * indicesPerD, (i + 1) * indicesPerD)

    addToSubHolder(d, subindices)
  })

}
function slowroll() {
  let start = 0
  setInterval(() => {
    start += 10
    window.scroll({ top: start, behavior: "smooth" })
  }
    , 100)
}
window.onload = triggerPlaylist