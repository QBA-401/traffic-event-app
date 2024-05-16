'use strict';

// Date function is partially chatgpt generated
function getDate(){

  // Create a new Date object
  var currentDate = new Date();
  
  // Get the current date
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();
  
  // Get the current time
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  
  // Format the date and time as desired
  var formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;
  var formattedTime = (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  
  
  // return the date and time
  return `${formattedTime} on ${formattedDate}`;
  
  }

  module.exports = getDate;