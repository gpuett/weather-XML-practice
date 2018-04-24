// import { Constructor } from './project.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

$(document).ready(function() {
  $('#weatherLocation').click(function() {
    let zip = $('#location').val();
    $('#location').val("");
    let promise;
    promise = new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      let url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${process.env.WEB_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
    let body;
    promise.then(function(response) {
      body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${zip} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in Kelvins is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
