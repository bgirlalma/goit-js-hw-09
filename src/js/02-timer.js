// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
const buttonStart = document.querySelector('button[data-start]');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');
let targetDate = null;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        targetDate = selectedDates[0];
        if(targetDate.getTime() < options.defaultDate.getTime()){
            console.log(window.alert("Please choose a date in the future"));
            buttonStart.classList.remove('valid-date');
            buttonStart.classList.add('invalid-date');
        } else {
            buttonStart.classList.remove('invalid-date');
            buttonStart.classList.add('valid-date');
        }
    },
};
flatpickr('input#datetime-picker', options);
let timer = null;
let interval = 1000;
let timeDiff = null;
buttonStart.addEventListener('click', () => {
    if(targetDate){
        if(timer) {
            clearInterval(timer);
            timer = null;
        }
        timer = setInterval(() => {
            let currentDateInMs = new Date().getTime();
            timeDiff = targetDate.getTime() - currentDateInMs;
            if(timeDiff <= 0){
                clearInterval(timer);
                timer = null;
                alert('Time is up!'); // Notify user when time is up
                return;
            }
            let remainingTime = convertMs(timeDiff);
            const timeUnits = {
                days: spanDays,
                hours: spanHours, // Fixed typo in property name
                minutes: spanMinutes,
                seconds: spanSeconds,
            }
            Object.keys(timeUnits).forEach((unit) => {
                timeUnits[unit].textContent = String(remainingTime[unit]).padStart(2, '0');
            });
        }, interval);
    }
})
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
};