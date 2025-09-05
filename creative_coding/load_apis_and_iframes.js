// let url = <iframe src="https://editor.p5js.org/baylyd/full/h_ygl9vqE"></iframe>

let iwidth = 500
let iheight = 500
async function grabSketches() {
  let users = `
  poojakumar2899
  baylyd
  `.trim().split(/\n/).map(e => e.trim())
  for (let user of users) {
    

    let result = await fetch(`https://creative-code.tra220030.projects.jetstream-cloud.org/https://editor.p5js.org/editor/${user}/projects`, {
    "headers": {
		"X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Alt-Used": "editor.p5js.org",
        "Sec-Fetch-Dest": "empty",
    }
}).then(res=> res.json());
    console.log(result)
    let container = document.querySelector("#container")
    for (let sketch of result.slice(0, 3)) {
      // check that the sketch is recent enough
      let now = new Date()
      let sketchTime = new Date(sketch.updatedAt)
      let dif = now- sketchTime
      const differenceInHours = dif / (1000 * 60 * 60);
      // if (differenceInHours > 2) {
      //   continue
      // } 
      let iframe = document.createElement("iframe")
      let id = sketch.id
      iframe.src = `https://editor.p5js.org/${user}/full/${id}`
      iframe.setAttribute("frameBorder", "0")
      iframe.setAttribute("width", iwidth)
      iframe.setAttribute("height", iheight)
      container.append(iframe)
      console.log(iframe.contentWindow.document.querySelector("canvas"))
    }

  }
  return result

}
function test() {
  console.log("loaded")
}

window.onload = grabSketches
