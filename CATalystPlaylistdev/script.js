let sheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT1SvlgwjDPvbz9tVZ1MTRq_AkVonfs-YWAoCUpgYFV8t5sSL7SN58lyAfWM9LURf6HAsurzU52f1kw/pub?gid=145287685&single=true&output=csv"
let refreshSeconds = 30
// reload this page every 5 minutes

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
  let iframe
  let video
  let holder = document.querySelector("#holder")
  let text = (await fetch(sheetLink).then(res => res.text()))
  let data = d3.csvParse(text, d3.autoType)
  setTimeout(() => {
    window.location.reload()
  }, data.length * 30 * 1000)
  let linkNumber = 0
  //data = shuffle(data)
  //slice skips the column header
  let indices = Array(data.length).fill(0).map((e, i) => i)
  indices = shuffle(indices)
  for (let i of indices) {
    let row = data[i]
    let link = row.link
    if (row.tag == "creativecode") {
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
        holder.append(playobject)

        playobject.src = link
      }, 30 * 1000 * linkNumber)

      linkNumber += 1
    }

  }
  setInterval(() => {
    let video = document.querySelector("video")
    if (video != undefined) {
      console.log(video)
      console.log(video.paused, "paused ")
      if (video.paused) {
        video.play()
      }
    }

  }, 3000)
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