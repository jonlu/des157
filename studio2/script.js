// JavaScript Document

document.addEventListener('DOMContentLoaded', function (event) {
    document.lib.onsubmit = writeLib;

    function writeLib() {
      var inputs = document.lib.getElementsByTagName("input");
      var firstName = inputs[0].value;
      var possession = inputs[1].value;
      var adj1 = inputs[2].value;
      var adj2 = inputs[3].value;
      var noun = inputs[4].value;
      var bodyPart = inputs[5].value;

      var response = document.getElementById('response')
      response.innerHTML = "Trillions of years ago, "+ firstName +" originated from the second dimension. "+firstName+", however, despised living there, and burned it down along with everything it had ever known, including its own "+possession+". It eventually took over a "+adj1+", shifting intergalactic rift between dimensions—a "+adj2+" space known as the "+noun+" Realm. Without a physical form, "+firstName+" could only access the "+bodyPart+" of the dimension's beings. Those who were touched by the nightmarish "+noun+"s in the "+bodyPart+"world were fated to insanity.";
      var hider = document.getElementById('hider');
      var inps = document.getElementById('inputs');
      var body = document.getElementsByTagName('body');
      var billImg = document.getElementById('bill');
      hider.classList.remove('madlib-hid');
      hider.classList.add('madlib-vis');
      inps.classList.add('madlib-hid');
      body[0].classList.add('black');
      billImg.classList.remove('img-hid')
      billImg.classList.add('img-vis');

      return false;
    }

});
