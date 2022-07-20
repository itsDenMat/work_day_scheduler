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