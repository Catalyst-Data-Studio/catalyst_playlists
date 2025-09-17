// let url = <iframe src="https://editor.p5js.org/baylyd/full/h_ygl9vqE"></iframe>
function randomizer(lst) {
  let randomInd = Math.floor(Math.random() * lst.length)
  return lst[randomInd]
}
async function grabSketches() {
  //
  let users = `
  baylyd
  poojakumar2899
  `.trim().split(/\n/).map(e => e.trim())
  let total = 500
  let allSketches = []
  let parts = { head: [], torso: [], legs: [] }
  for (let user of users) {

    // token change

    let result = await fetch(`https://creative-code.tra220030.projects.jetstream-cloud.org/https://editor.p5js.org/editor/${user}/projects`, {
      "headers": {
        "X-Requested-With": "XMLHttpRequest",
        "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:142.0) Gecko/20100101 Firefox/142.0",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.5",
        "Alt-Used": "editor.p5js.org",
        "Sec-Fetch-Dest": "empty",
      }
    }).then(res => res.json());
    console.log(result)
    let container = document.querySelector("#container")
    let order = {
      head: 0,
      torso: 1,
      legs: 2
    }
    let just_bodies = result.filter(e => e.name.search(/head|legs|torso/i) > -1)
    just_bodies.map(e => {
      let part = e.name.match(/(head|torso|legs)/i)[1].toLowerCase()
      console.log(part)
      parts[part].push(e)
    })
  }

  let randHead = randomizer(parts.head)
  let randTorso = randomizer(parts.torso)
  let randLegs = randomizer(parts.legs)
  let sketches = [randHead, randTorso, randLegs]
  for (let sketch of sketches) {
    // check that the sketch is recent enough
    let now = new Date()
    let sketchTime = new Date(sketch.updatedAt)
    let dif = now - sketchTime
    const differenceInHours = dif / (1000 * 60 * 60);
    // go through the files and pick the child whos name is sketch

    for (let childFile of sketch.files) {
      if (childFile.name == "sketch.js") {
        // use the iframe srcdoc method
        let iframe = document.createElement("iframe")
        iframe.setAttribute("frameBorder", 0)
        iframe.setAttribute("scrolling","no")
        // get width and height 
        // setup listener for the size of the page
        let htmlContent = `
          <!DOCTYPE html>
  <html>
  <head>
    <title>Iframe Content</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.min.js"></script>
  </head>
  <body style="margin:0px;">
    <script>
          ${childFile.content}
    </script>
    <script>
    const targetNode = document.body
          console.log("target",targetNode)

          // Options for the observer (which mutations to observe)
          const config = { attributes: true, childList: true, subtree: true };

          // Callback function to execute when mutations are observed
          const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
              if (mutation.type === "childList") {
                console.log("A child node has been added or removed.");
              } else if (mutation.type === "attributes") {
                console.log("The mutation.attributeName attribute was modified.");
              }
              console.log(document.querySelector("canvas"))
            }
          };

          // Create an observer instance linked to the callback function
          const observer = new MutationObserver(callback);

          // Start observing the target node for configured mutations
          observer.observe(targetNode, config);
    </script>
  </body>
  </html>

          `

        iframe.srcdoc = htmlContent
        container.appendChild(iframe)
        // iframe.setAttribute("width",400)
        // iframe.setAttribute("height",300)
        let resizer = () => {
          let canvas = iframe.contentWindow.document.querySelector("canvas")
          console.log(canvas)
          if (canvas == null) {
            setTimeout(resizer, 1000)
            return
          }
          let width = canvas.width
          let height = canvas.height
          iframe.setAttribute("width", width)
          iframe.setAttribute("height", height)
        }
        resizer()



        // Select the node that will be observed for mutations

      }
    }
  }

 setInterval(()=> {
  window.location.reload()
 },5000)
}
function test() {
  console.log("loaded")
}

window.onload = grabSketches
