// let url = <iframe src="https://editor.p5js.org/baylyd/full/h_ygl9vqE"></iframe>

let iwidth = 500
let iheight = 500
async function grabSketches() {
    
    let result =await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent('https://editor.p5js.org/editor/baylyd/projects')}`)
                    .then(response => {
                      if (response.ok) return response.json()
                      throw new Error('Network response was not ok.')
                    })
                    
    console.log(result)
    let container = document.querySelector("#container")
    for (let sketch of result.slice(0,20)) {
      let iframe = document.createElement("iframe")
      let id = sketch.id
      iframe.src = `https://editor.p5js.org/poojakumar2899/full/${id}`
      iframe.setAttribute("frameBorder","0")
      iframe.setAttribute("width",iwidth)
      iframe.setAttribute("height",iheight)
      container.append(iframe)
    }
    
    return result

}
function test() {
    console.log("loaded")
}

window.onload = grabSketches
