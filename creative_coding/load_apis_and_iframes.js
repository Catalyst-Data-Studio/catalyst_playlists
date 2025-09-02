// let url = <iframe src="https://editor.p5js.org/baylyd/full/h_ygl9vqE"></iframe>

                  
async function grabSketches() {
    
    let result = fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://editor.p5js.org/editor/baylyd/projects')}`)
                    .then(response => {
                      if (response.ok) return response.json()
                      throw new Error('Network response was not ok.')
                    })
                    .then(data => console.log(data.contents));
    console.log(result)
    return result

}
function test() {
    console.log("loaded")
}

window.onload = grabSketches

document.addEventListener('DOMContentLoaded', function() {
  // Your JavaScript code here will execute after the DOM is fully loaded,
  // but before external resources like images and stylesheets are necessarily loaded.
  console.log('The DOM is fully loaded and parsed!');
  // Example: Manipulate elements within the body
  const myElement = document.getElementById('container');
  if (myElement) {
    myElement.textContent = 'Content loaded!';
  }
});