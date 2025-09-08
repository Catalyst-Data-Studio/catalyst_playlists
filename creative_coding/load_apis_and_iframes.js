// let url = <iframe src="https://editor.p5js.org/baylyd/full/h_ygl9vqE"></iframe>

async function grabSketches() {
  //poojakumar2899
  let users = `
  karen.here
  mjwatzmedia
  esanch50
  MorganErdman
  samik18
  ggibbs
  Heidi.G
  jbrandonr
  baylyd
  `.trim().split(/\n/).map(e => e.trim())
  let total = 40
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
          // get width and height 
          // setup listener for the size of the page
          let htmlContent = `
          <!DOCTYPE html>
  <html>
  <head>
    <title>Iframe Content</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.11.10/lib/p5.min.js"></script>
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
          container.appendChild(iframe)
          setTimeout(()=> {
          let canvas = iframe.contentWindow.document.querySelector("canvas")
          console.log(canvas)
          let width = canvas.width
          let height =canvas.height
          iframe.setAttribute("width",width)
          iframe.setAttribute("height",height)
          },2000)
          
          // Select the node that will be observed for mutations
          
        }
      }
      // if (differenceInHours > 2) {
      //   continue
      // } 
      // let iframe = document.createElement("iframe")
      // let id = sketch.id
      // iframe.src = `https://editor.p5js.org/${user}/full/${id}`
      // iframe.setAttribute("frameBorder", "0")
      // iframe.setAttribute("width", iwidth)
      // iframe.setAttribute("height", iheight)
      // container.append(iframe)
      // console.log(iframe.contentWindow.document.querySelector("canvas"))
    }
  }
}
function test() {
  console.log("loaded")
}

window.onload = grabSketches
