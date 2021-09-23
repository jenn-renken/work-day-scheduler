function timeUpdate() {
      
    var currentHour = moment().hours();

    $('.time-block').each(function() {
      var blockHour = parseInt(
        $(this)
          .attr('id')
          .split('-')[1]
      );

      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).removeClass('past');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past');
        $(this).removeClass('present');
        $(this).addClass('future');
      }
    });
  }

  function addTimeBlock() {
      // select
    var template = document.querySelector('#time-block');
    
    for (var i = 8; i <= 16; i++) {
        var amPm = i < 12 ? "AM": "PM";
        var time = "" + (i <= 12 ? i: i-12);
        var hour = time + amPm;
        var id = "hour-" + i;
        var description = localStorage.getItem(id) || "";
        // set
        template.content.querySelector('.time-block').id=id;
        template.content.querySelector('.hour').textContent= hour;
        template.content.querySelector('.description').textContent= description;
        

        // add to document DOM
        var clone = document.importNode(template.content, true); 
        $(".container").append(clone);
    }
  }

$(document).ready(function() {
    addTimeBlock();
    $('.saveBtn').on('click', function() {
      var value = $(this)
        .siblings('.description')
        .val();
      var time = $(this)
        .parent()
        .attr('id');
  
      localStorage.setItem(time, value);
     
      // validate a value has been added 

      $('.notification').addClass('show');
  
      setTimeout(function() {
        $('.notification').removeClass('show');
      }, 5000);
    });
  
    timeUpdate();
  
    setInterval(timeUpdate, 15000);
  
    $('#currentDay').text(moment().format('dddd, MMMM Do'));
  });
  