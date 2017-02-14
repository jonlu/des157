// JavaScript Document

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    var timer;
    var heart = document.getElementById('heart');
    var clickTip = document.getElementById('clickTip');
    var dateVars = ["month", "day", "hours", "minutes", "seconds", "milliseconds"];
    var conversion = [1000*60*60*24 * 31, 1000*60*60*24, 1000*60*60, 1000*60, 1000, 100 ];
    var mods = [12, 365 / 12, 24, 60, 60, 10];
    var nextVal = new Date("Feb 14, 2018 0:0:0");
    var updater = setInterval(function () {
      var timeDiff = Math.abs(new Date() - nextVal.getTime());
      for (var i = 0; i < dateVars.length; i++) {
        var time = lead(Math.floor((timeDiff/conversion[i]) % mods[i]));
        document.getElementById(dateVars[i]).innerHTML = time;
      }
    }, 100);

    function lead(n) {
      return (n < 10) ? ("0" + n) : n;
    }

    heart.addEventListener('mouseover', function () {
      timer = setTimeout(function () {
        clickTip.classList.add('show');
      }, 1000);
    });

    heart.addEventListener('mouseout', function () {
      clickTip.classList.remove('show');
      clearTimeout(timer);
    });

    heart.addEventListener('click', function () {
      clearTimeout(timer);
      document.getElementById('womp').play();
      document.getElementById('countdown').classList.add('show');
      clickTip.classList.remove('show');

      heart.classList.add('expand');
      heart.style.cursor = "inherit";
      var redBack = setTimeout(function () {
        document.getElementsByTagName('body')[0].style.backgroundColor = "red";
        heart.style.display = "none";
      }, 700);
    });

});
