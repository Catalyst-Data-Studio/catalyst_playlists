// let url = <iframe src="https://editor.p5js.org/baylyd/full/h_ygl9vqE"></iframe>

async function grabSketches() {

  //poojakumar2899
  let users = `
  baylyd
  mjwatzmedia
  karen.here
  esanch50
  MorganErdman
  samik18
  ggibbs
  Heidi.G
  jbrandonr
  `.trim().split(/\n/).map(e => e.trim())
  let total = 100
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
    }).then(res => res.json());
    console.log(result)
    let container = document.querySelector("#container")
    for (let sketch of result) {
      total -=1
      if (total < 0) {
        break
      }
      if (sketch.name.search(/(head|torso|legs)/i) > 0 ) {
        continue
      }
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
          let idiv = document.createElement("div")
          idiv.append(iframe)
          // get width and height 
          // setup listener for the size of the page
          let htmlContent = `
          <!DOCTYPE html>
  <html>
  <head>
    <title>Iframe Content</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.min.js"></script>
    <style>
//     main canvas {
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
// }
  body {
  margin: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

canvas {
  display: block; /* Removes extra space below canvas */
  max-width: 100%;
  max-height: 100%;
}
  </style>
  </head>
  <body>
  
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
          container.appendChild(idiv)
          // iframe.setAttribute("width",400)
          // iframe.setAttribute("height",300)
          iframe.setAttribute("frameBorder",0)
          let retries = 3
          let resizer = ()=> {
          let canvas = iframe.contentWindow.document.querySelector("canvas")
          console.log(canvas)
            if (canvas ==null) {
              retries-=1
              if (retries <0) {
                idiv.remove()
                return
              }
              setTimeout(resizer,2000)
              return
            }
          let width = canvas.width +200
          let height =canvas.height+200

          // figure out how many row and column spans this element is based on width and height
          iframe.setAttribute("width",width)
          iframe.setAttribute("height",height)

          let rowspan = Math.floor(height/20)
          let colspan = Math.floor(width/20)
          idiv.classList.add(
					"grid__item"
				);
          idiv.style["grid-row"] = `span ${rowspan}`
          idiv.style["grid-column"] = `span ${colspan}`
          }
          resizer()
          
          
          
          // Select the node that will be observed for mutations
          
        }
      }
      
    }
  }
}
function test() {
  console.log("loaded")
}
window.onload = grabSketches
