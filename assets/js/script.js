
//add date time to header 
var timeDisplayEl = $('#currentDay');
// var currentTimeEl = moment().format('MMM DD, YYYY hh:mm:ss a');
var dateEl = new Date()
var timeEl = $('.hour')
var date = null; 
var datetime = null;
// console.log(currentTimeEl) //Oct 29, 2021 02:52:58 pm
// console.log(dateEl) //Fri Oct 29 2021 14:52:58 GMT-0500 (Central Daylight Time)
// console.log(timeEl) //r.fn.init(18) [td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, td.hour.col-1, prevObject: r.fn.init(1)]

//add date time to header
var update = function() {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
}
//make time real time


//target the hour of the event

var h = dateEl.getHours();
// console.log(h) // 14

var timeElArray = []
//create array of time elements in numeric form so they can be compared to the hour of the current time
for (var i=0; i < timeEl.length; i++) {
    var timeText = timeEl[i].innerText
    var timeTextSplit = timeText.split(" ")
    // console.log(timeTextSplit)

    if (timeTextSplit[1] === 'pm' && timeTextSplit[0] !== '12') {
        timeTextSplit[0] = Math.floor(timeTextSplit[0]) + 12
    } else {
        timeTextSplit[0] = Math.floor(timeTextSplit[0])
    }
    timeElArray.push(timeTextSplit[0])
}
console.log(timeElArray)

//function that compares the current hour of the live datetime to the hour for the event row

function currentEvent () {
    var event = document.querySelectorAll('tbody tr td.event')
    console.log(event)
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