'use strict'

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');
  
  let startTime;
  let timeoutId;
  let elapsedTime = 0;
  let gmt;
  
  function countUp() {
    const d = new Date(Date.now() - startTime + elapsedTime);
    const h = d.getHours() + gmt;
    const m = d.getMinutes();
    const s = d.getSeconds();
    const ms = String(d.getMilliseconds()).slice(0, 1);
    timer.textContent = `${h}:${m}:${s}:${ms}`;
    
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }
  
  function setButtonStateInitial() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
  }
  
  function setButtonStateRunning() {
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;
  }
  
  function setButtonStateStopped() {
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
  }
  
  start.addEventListener('click', () => {
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  });
  
  stop.addEventListener('click', () => {
    setButtonStateStopped();
    clearTimeout(timeoutId);
    elapsedTime += Date.now() - startTime;
  });
  
  reset.addEventListener('click', () => {
    setButtonStateInitial();
    timer.textContent = '0:0:0:0';
    elapsedTime = 0;
  });
  
  window.onload = function(){
    gmt = new Date().getTimezoneOffset() / 60;
    setButtonStateInitial();
  }
}