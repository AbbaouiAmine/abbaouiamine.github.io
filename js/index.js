const video = document.querySelector('#introVideo');

const backGround = document.querySelector('#backLoader');
const backGroundImg = document.querySelector('#backLoaderImg');

const bg1 = document.querySelector('#bg1');
const bg2 = document.querySelector('#bg2');
const bg3 = document.querySelector('#bg3');
setTimeout(function () {
  backGround.style.display='none';
}, 5000);

video.addEventListener('play', (event) => {
 
  
  setTimeout(function () {
    backGroundImg.style.display='none';
    backGround.style.opacity='0';
    bg1.style.opacity='0';
    bg2.style.opacity='0';
    bg3.style.opacity='0';
  
}, 1500);
setTimeout(function () {
  backGround.style.display='none';
  bg1.style.display='none';
    bg2.style.display='none';
    bg3.style.display='none';
}, 3000);
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var imgs = document.getElementsByClassName("myImg");
var modalImg = document.getElementById("iframe01");
// var captionText = document.getElementById("caption");
for (var i = 0; i < imgs.length; i++) {

  imgs[i].onclick = function () {
    modal.style.display = "block";
    console.log("my src"+this.src);
    modalImg.src = this.getAttribute("src");;
  }

}


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  modalImg.src = "";
}

// Get the modal for certificates
var modal_cert = document.getElementById("myModal-cert");

// Get the image and insert it inside the modal - use its "alt" text as a caption
var img_cert = document.getElementsByClassName("myImg-cert");
var modalImg_cert = document.getElementById("img01-cert");
var captionText_cert = document.getElementById("caption-cert");

for (var i = 0; i < img_cert.length; i++) {

img_cert[i].onclick = function () {
modal_cert.style.display = "block";
var path=this.getAttribute("path");
console.log(path);
modalImg_cert.src = path;
captionText_cert.innerHTML = this.alt;

}
}
// Get the <span> element that closes the modal
var span_cert = document.getElementsByClassName("close-cert")[0];

// When the user clicks on <span> (x), close the modal
span_cert.onclick = function() {
modal_cert.style.display = "none";
}