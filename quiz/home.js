let textLength = 0;
let text = "\"You take the blue pill, the story ends, you wake up in your bed and believe whatever you want to believe. You take the red pill, you stay in wonderland,and I show you how deep the rabbit hole goes.\"";

function type() {
    let textChar = text.charAt(textLength++);
    let paragraph = document.getElementById("typed");
    let charElement = document.createTextNode(textChar);
    paragraph.appendChild(charElement);
    if(textLength < text.length+1) {
        setTimeout('type()', 30);
    } else {
        text = '';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    type();
});