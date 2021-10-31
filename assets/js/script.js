
var saveBtn = $('.saveBtn')
//set basis for the local storage so that the page grabs existing items in local storage
var eventInputEl = localStorage.getItem("dataObject") || "[]";
var eventInputList = JSON.parse(eventInputEl);


// loop through each item in the array, grab each item to then display if there is an item
for (var i = 0; i < eventInputList.length; i++) {
    var eventFormEl = eventInputList[i].hour
  //   console.log(eventFormEl)
    var eventValueEl = eventInputList[i].event //grabs the entered value n event field
    $('#' + eventFormEl).val(eventValueEl);
  //   // console.log(timeID)
  //   // console.log(valueVal)
  //   // console.log($('#' + timeID))
  }
  

//based on the id of the event input item, have the system grab the existing local storage to display in the event input text area
saveBtn.on("click", function() {
    var hourVal = $(this).siblings(".event").children(".event-input").attr("id")
      //console.log(hour)
    var inputVal = $(this).siblings(".event").children(".event-input").val()
      //console.log(inputVal)
      //has to be a value in order to grab value. create an object that contains both values
    eventInputList.push({
        hour: hourVal, 
        event: inputVal
    })
    console.log(eventInputList)
      //update the local storage witht he new values
    localStorage.setItem("dataObject", JSON.stringify(eventInputList))
  })


//Date Time Variables
var timeDisplayEl = $('#currentDay');
var dateEl = new Date()
var timeEl = $('.hour')
var date = null; 
var datetime = null;
var h = dateEl.getHours();
var timeElArray = []

//add date time to header
var update = function() {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
}

//create array of time elements in numeric form so they can be compared to the hour of the current time
for (var i=0; i < timeEl.length; i++) {
    var timeText = timeEl[i].innerText
    var timeTextSplit = timeText.split(" ")
    if (timeTextSplit[1] === 'pm' && timeTextSplit[0] !== '12') {
        timeTextSplit[0] = Math.floor(timeTextSplit[0]) + 12
    } else {
        timeTextSplit[0] = Math.floor(timeTextSplit[0])
    }
    timeElArray.push(timeTextSplit[0])
}

//function that compares the current hour of the live datetime to the hour for the event row
function currentEvent () {
    var event = document.querySelectorAll('tbody tr td.event')
    // console.log(event)
    for (var i=0; i < timeElArray.length; i++) {
        if (timeElArray[i] < h) {
            event[i].classList.add('past');
        }
        else if (timeElArray[i] > h) {
            event[i].classList.add('future');
        } else {
            event[i].classList.add('present');
        }
    }
};

//create function to run both the time and the class update to each event row every second
$(document).ready(function() {
    datetime = $('#currentDay')
    update();
    currentEvent();
    setInterval(update, 1000);
    setInterval(currentEvent,1000);
})

