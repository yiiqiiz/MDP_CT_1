let DOMsection = document.getElementById("DOMoptions")
let newParagraph = document.createElement("p")
let buttonColor = document.getElementById("btnColorChange")
let toggleImage = document.getElementById("btnImageToggle")
let galleryIMG = document.getElementById("imageGallery").children[0]

console.log(document.getElementById("imageGallery").children[0])

newParagraph.innerText = "Hello World"

DOMsection.appendChild(newParagraph)

let imageToggle = function () {
    console.log("fire!")
    //galleryIMG.src = "images/Photo2.jpg"
    console.log(galleryIMG.src)
    if(galleryIMG.src.includes("Photo1")){
        console.log("Photo1")
        galleryIMG.src = "images/Photo2.jpg"
    }
    else{
        console.log("Photo2")
        galleryIMG.src = "images/Photo1.jpg"
    }
}       

toggleImage.addEventListener("click", imageToggle)

buttonColor.addEventListener("click", function () {
    let redPortion = Math.random() * 255
    let greenPortion = Math.random() * 255
    let bluePortion = Math.random() * 255

    let randomColor = "rgb(" + redPortion + ", " + greenPortion + ", " + bluePortion + ")"
    console.log(randomColor)
    DOMsection.style.backgroundColor = randomColor
})