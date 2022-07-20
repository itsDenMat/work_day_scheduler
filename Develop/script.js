// Date and time
let currentDateEl = $('#currentDay');
let currentDate;
let currentTime;

// Set to and from local storage
let timeArr = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
let eventTime;
let eventTxt;

// Save button
let saveBtn = $('.saveBtn');

// Color Pick
let timeblock;
let timerInterval;
let timeblockID = $("textarea[id*='timeblock']");

// Functions to render date and events to DOM and update background color
function init() {
    momentDate();
    renderEvents();
    BGColors();
};

// Generate current date to display in div below jumnbotron
function momentDate() {
    currentDate = moment().format('dddd, LL, h:mm a');
    currentDateEl.text(currentDate);
};

// Renders event pulled from local storage to DOM
function renderEvents() {
    for (let i = 0; i < timeArr.length; i++) { 
        $('[id^=timeblock-]').each(function (i, v) {
            $(v).val(localStorage.getItem(timeArr[i]));
        })
    }
};

// Click handler for save buttons
saveBtn.on('click', saveHandler);

// Will pull time and date value when save button is clicked
function saveHandler(event) {
    event.preventDefault();

    // Set value to time when save button is clicked
    eventTime = $(this).attr('id').split('-')[1];
    // Set value to input when save button is clicked
    eventTxt = $(this).siblings('textarea[name^="timeblock"]').val().trim();
    // Call function to store in local storage
    saveEvents();
};

// Save time and input values to local storage
function saveEvents() {
    localStorage.setItem(eventTime, eventTxt);
};

// Function to change color and class (present, past, future) of blocks as time passes
function BGColors() {
  
    timeblockID.each(function () {
    timeBlock = $(this).attr('id').split('-')[1];
    timeBlock = parseInt(moment(timeBlock, 'H').format('H'));
    currentTime = parseInt(moment().format('H'));
    
    if (currentTime < timeBlock) {
        $(this).removeClass('past present');
        $(this).addClass('future');
    } else if (currentTime === timeBlock) {
        $(this).removeClass('past future');
        $(this).addClass('present');
    } else if (currentTime > timeBlock) {
        $(this).removeClass('present future');
        $(this).addClass('past');
    } else {
        console.log("Time Error");
    }
    })
};

// Changes date and time with colors every minute
function intervalMinute() {
    var currentDateSeconds = new Date().getSeconds();
    if (currentDateSeconds == 0) {
        setInterval(momentDate, 60000);
        setInterval(BGColors, 60000);
    } else {
        setTimeout(function () {
            intervalMinute();
        }, (60 - currentDateSeconds) * 1000);
    }
    momentDate();
    BGColors();
};

intervalMinute();

// Executes app
init();
