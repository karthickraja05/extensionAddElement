(() => {
  function getTime(breakTime){
    let totalSeconds = breakTime;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    // If you want strings with leading zeroes:
    minutes = String(minutes).padStart(2, "0");
    hours = String(hours).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");


    return {
      minutes, hours, seconds 
    };
  }

  function addBreakElement(){
    let allowed_hours = 1;

    // Calc Break Time into Seconds from window break time
    let breakTime = 0;
    $('.break_timing_inner table > tbody  > tr').each(function(index, tr) {
      if(this.cells.length == 3){
        if(this.cells[2].tagName.toLowerCase() === 'td'){
          let brTime = this.cells[2].innerText;
          let brTimeArr = brTime.split(':');
          let totalSec = (Number(brTimeArr[0]) * 60) + Number(brTimeArr[1]);
          breakTime += totalSec;
        }
      }
    });

    let remainingTime = (allowed_hours * 60 * 60) - breakTime;
    
    let breakObj = getTime(breakTime);
    let stringTime = breakObj['hours'] + ":" + breakObj['minutes'] + ":" + breakObj['seconds'];

    let stringTime2;
    if(remainingTime >= 0){
      let remainObj = getTime(remainingTime);
      stringTime2 = remainObj['hours'] + ":" + remainObj['minutes'] + ":" + remainObj['seconds'];
    }else{
      remainingTime = -1 * remainingTime;
      let remainObj = getTime(remainingTime);
      stringTime2 = 'More than 1 hour: ' + remainObj['hours'] + ":" + remainObj['minutes'] + ":" + remainObj['seconds'];
      
    }
    
    let breakTimeShowString = `<div class="break_table_bottom" id="break_time_cal_1">
                                  <p class=" cur_breaktime_heading">Break Time</p>
                                  <span class="classcur_breaktime_heading" id="break_time_cal_2">${stringTime}</span>
                              </div>`;

    let breakTimeShowString2 = `<div class="break_table_bottom" id="break_time_cal_4">
                                  <p class=" cur_breaktime_heading">Remaining Time</p>
                                  <span class="classcur_breaktime_heading" id="break_time_cal_4">${stringTime2}</span>
                              </div>`;

    // $( ".break_timing_inner" ).first().append(breakTimeShowString);
    $( ".break_timing_inner" ).first().append(breakTimeShowString2);
  }

  function calcWorkedHours(){
    // Define an array of image URLs
    const imageUrls = [
      'https://5.imimg.com/data5/XQ/KP/MY-40305254/kids-toy.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJv5HWb0rtgTnE5VBRT-WamBM524dBZMKhs4i89i4&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvQ7PgdZBtJras37f7kWVZBZNsxwS0N_nBUeBsLVuraKLSTrRi0Uv4J5lXi6gAxO69NYQ&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ27bdM7ESocltV9glVlGqDW_F_aTwwL2TAXZJW1oiYOoNS47H38Gl5NkmgteB8dxSrY4&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPRSHGAnF4rEKpNvcd7J9N_aMF3luAQEJoxWXtOb6zaY48JBN4HcIoxNoIftJegUm8irQ&usqp=CAU',
      'https://www.pngarts.com/files/3/Single-Minion-PNG-High-Quality-Image.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnfwhLz0HurcSswxWzZc02nKDR2OhOflY1cteolZulCXVDbdgZycBdwss5dAk9v8MTfI0&usqp=CAU',
      'https://w7.pngwing.com/pngs/262/801/png-transparent-minions-kevin-the-minion-bob-the-minion-minions-despicable-me-sticker-desktop-wallpaper-despicable-me-thumbnail.png',
    ];

    
    let currentImageIndex = 0; // Initialize the current image index

    // Function to change the image URL and restart the animation
    function changeImage() {
        currentImageIndex = currentImageIndex > imageUrls.length ? 0 : currentImageIndex;
        $('#toy_image').attr('src',imageUrls[currentImageIndex]);
        currentImageIndex++;
        setTimeout(()=>{
          changeImage();
        },9000);
    }

    var hoursInput = $('input[placeholder="Hours"]');
    let totalHours = 0;
    hoursInput.each(function() {
      var inputValue = $(this).val(); // Get the value of the current input element
      totalHours += parseFloat(inputValue);
    });
    
    let html = `<div class="calendar-section col-md-12 mg-t-15 mg-sm-t-20 row">
                <div class="image-container" style="width: 200px; overflow: hidden; white-space: nowrap; animation: marquee 10s linear infinite;">
                    <img id="toy_image" src="https://5.imimg.com/data5/XQ/KP/MY-40305254/kids-toy.jpg" width="100" height="100"/>
                </div>
                <style>
                    @keyframes marquee {
                        0% {
                            transform: translateX(100%);
                        }
                        100% {
                            transform: translateX(-100%);
                        }
                    }
                </style>
                <div class="col-sm-12 col-md-4 card card-hover card-chart-one">
                    <div class="row card-header bg-transparent pd-b-0 bd-b-0">
                        <div class="col-sm-2 col-xs-2 col-md-3">
                            <i class="far fa-keyboard"></i>
                        </div>
                        <div class="col-sm-10 col-xs-10 col-md-9">
                            <h1>Total Worked Hours:</h1>
                            <h2>${totalHours}</h2>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-4 card card-hover card-chart-one">
                    <div class="row card-header bg-transparent pd-b-0 bd-b-0">
                        <div class="col-sm-2 col-xs-2 col-md-3">
                            <i class="far fa-keyboard"></i>
                        </div>
                        <div class="col-sm-10 col-xs-10 col-md-9">
                            <h1>Expected Worked Hours:</h1>
                            <h2>${getElementForExpectedHours()}</h2>
                        </div>
                    </div>
                </div>
            </div>`;

    $('.card.card-body.overflow-auto').first().prepend(html); 
    
    setTimeout(()=>{
      changeImage();
    },100)
  }

  function getElementForExpectedHours(){
    function getSaturdaysInMonth(year, month) {
      const saturdays = [];
      const date = new Date(year, month, 1);
      var i = 0;
      while (i < 6) {
        if (date.getDay() === 6) { // 6 corresponds to Saturday
          saturdays.push(date.getDate());
          i++;
        }
        date.setDate(date.getDate() + 1);
      }
    
      return saturdays;
    }
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const saturdaysInCurrentMonth = getSaturdaysInMonth(currentYear, currentMonth);
    
    console.log("Saturdays in the current month:", saturdaysInCurrentMonth);
    
    // Get the current date
    const currentDate1 = new Date();
    
    // Calculate the days until the next Sunday (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const daysUntilSunday = 6 - currentDate1.getDay();
    
    // Calculate the date of the upcoming Sunday
    const upcomingSunday = new Date(currentDate1);
    upcomingSunday.setDate(currentDate1.getDate() + daysUntilSunday);
    
    // Print the upcoming Sunday's date
    console.log(upcomingSunday.getDate());
    
    var comingSaturday = upcomingSunday.getDate();
    
    const index = saturdaysInCurrentMonth.indexOf(comingSaturday);
    
    if((index + 1) % 2 === 0){
      return `For 5 Days: 35 - 40`;
    }else{
      return `For 6 Days: 42 - 48`;
    }
    
  }


  var host = window.location.host; 
  // only works in particular host
  if(host !== 'mytimesheet.in') return false;

  // Get the current URL
  var currentURL = window.location.href;
  // Remove query parameters
  var urlWithoutQueryParams = currentURL.split('?')[0];

  if(urlWithoutQueryParams === 'https://mytimesheet.in/timesheet'){
    calcWorkedHours();
    return '';
  }
  if(urlWithoutQueryParams === 'https://mytimesheet.in/dashboard'){
    addBreakElement();  
    return '';
  }
  
  // $('.working_time_wrpr').hide();
  //$('.working_time_sc p:first').text('00:00');
  
})();

