var colorClass = ["lightblue", "green", "yellow","orange", "reddish"];
var colors = ["#50E2ED", "#0CFF96", "#ECFF42", "#F29E4C", "#FF2156"];

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");

  document.getElementById('bod').classList.add("lightblue");

  var screens;
  var paths = document.getElementsByTagName('path');
  addClick();
  for (var i = 0; i < paths.length; i++) {
    setFill(i);
  }
  function setFill(i) {
    paths[i].style.fill=colors[i];
  }

  function addClick() {
    screens = document.getElementsByClassName('scrn')
    for (var i = 0; i < screens.length; i++) {
      if (screens[i].classList.length == 1) {
        click(i);
      }
       if (screens[i].classList.contains("right1")){
        click(i);
        break;
      }
    }
  }

  function click(i) {
    screens[i].addEventListener("click", function() {

      document.getElementById('bod').className="";
      document.getElementById('bod').classList.add(colorClass[i]);
      screens[i].setAttribute("class", "scrn");
      for (var j = 0; j < screens.length; j++) {
        shiftRight(i, j);
      }
      addClick();
    });
  }

  function shiftRight(i, j) {
    if (j > i) { //if right of right1
      screens[j].setAttribute("class", "scrn");
      screens[j].classList.add('scrn', 'right' + (j - i), 'inactive');
      // screens[j].classList.remove('right' + (j));
    } else if (j < i) { //if left of center
      screens[j].setAttribute("class", "scrn");
      screens[j].classList.add('scrn', 'left' + (i-j), 'inactive');
    }
  }

});
