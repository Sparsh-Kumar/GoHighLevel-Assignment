$(document).ready(function() {
    var timeframe = moment();
    var dayOfWeekOffset = 0;
    var date = moment();
    
    drawCalendar();
    
    function drawCalendar(){
      var output = "<ol>";
      var days = moment(timeframe).daysInMonth();
      var monthName = moment(timeframe).format("MMMM");
      var startOfMonth = moment(timeframe).startOf('month');
      
      /* Find the day of the week the month starting on 
    so we can calculate the offset for days of the week to line up correctly */
      dayOfWeekOffset = parseInt(moment(startOfMonth).format("d"),10);
      
      /* draw offset */
      for (i = 0; i < dayOfWeekOffset; i++) {
        output += "<li>";
        output += "</li>";
      }
      
      /*** draw days ***/  
      for (i = 1; i <= days; i++) {
        output += "<li>";
        output += i;
        output += "</li>";
      }
      
      output += "</ol>";
      document.getElementById("days").innerHTML = output;
      
      monthName = moment(timeframe).format("MMMM YYYY");
      document.getElementById("month").innerHTML = monthName;
      
      markToday();
      getSelectedDay();
    }
    
    function getSelectedDay(){
      $(".days li").click(function() {
        var myDay = $(this).text();
        
        /* make sure user clicked on an actual day not one of the offset boxes */
        if (!isNaN(parseInt(myDay, 10))){
          var myMonth = moment(timeframe).format("M");
          var myYear = moment(timeframe).format("YY");
          $("input").val(myMonth + "/" + myDay + "/" + myYear);
          styleDateValidation();
          styleSelectedDay();
        }
      });
    }
    
    function markToday(){
      var dayOfMonth = moment().format("D");
      var today =  dayOfWeekOffset + parseInt(dayOfMonth, 10);
      
      
      /* because today is calculated using the day of month, double check it's the current month */
      if (moment(timeframe).isSame(moment(), 'month')){
        $( ".days li:nth-Child(" + today + ")" ).addClass( "today" );
      } 
    }
    
    /* parse date from input field & re-draw calendar*/
    function parseDate(){
      var dateRaw = $("input").val();
      date = moment(dateRaw).format("YYYY-MM-DD");
      if(date !== "Invalid date"){
        timeframe = moment(date);
        drawCalendar();
        styleSelectedDay();
        return true;
      } else { return false; }
    }
    
    /* style input box to indicate a valid/invalid date */
    function styleDateValidation(){
      if (parseDate() === true) { 
        if ($("input").hasClass( "valid-date" ) !== true) {
          $("input").addClass("valid-date");
        }
        if ($("input").hasClass( "invalid-date" ) === true) {
          $("input").removeClass("invalid-date");
        }
      } else {
        if ($("input").hasClass( "invalid-date" ) !== true) {
          $("input").addClass("invalid-date");
        }
        if ($("input").hasClass( "valid-date" ) === true) {
          $("input").removeClass("valid-date");
        }
      }
    }
    
    function styleSelectedDay(){
      var selectedDayRaw = moment(date).format("D");
      if (!isNaN(parseInt(selectedDayRaw, 10))){
        var selectedDay =  dayOfWeekOffset + parseInt(selectedDayRaw, 10);
        $( ".days li:nth-Child(" + selectedDay + ")" ).addClass( "selected-day" );
      }
    }
    
    $(".calendar-icon").click(function() {
      $(".calendar").toggle();
    });
    
    $("input").click(function() {
      $(".calendar").show();
    });
    
    $("input").keyup(function() {
      styleSelectedDay();
      styleDateValidation();
    });
    
    /*** change month on calendar ***/
    $(".month-next").click(function() {
      timeframe = moment(timeframe).add('M', 1).format("YYYY-MM-DD");
      drawCalendar();
    });
    
    $(".month-prev").click(function() {
      timeframe = moment(timeframe).subtract('M', 1).format("YYYY-MM-DD");
      drawCalendar();
    });
    
  });