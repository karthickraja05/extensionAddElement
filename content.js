(() => {
  
  let ele2 = document.getElementById('get_break_time');

  // Calc Break Time into Seconds from window break time
  let breakTime = 0;
  $('.break-table table > tbody  > tr').each(function(index, tr) { 
     if(this.cells.length == 4){
      if(this.cells[3].tagName.toLowerCase() === 'td'){
        let brTime = this.cells[3].innerText;
        let brTimeArr = brTime.split(':');
        let totalSec = (Number(brTimeArr[0]) * 60) + Number(brTimeArr[1]);
        breakTime += totalSec;
      }
    }
  });


  let totalSeconds = breakTime;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  
  let breakTimeShowString = '<div style="text-align: center"><b>Break Time : '+hours + ":" + minutes + ":" + seconds+' </b></div>';
  
  $( ".break-table" ).first().prepend(breakTimeShowString);

  
})();