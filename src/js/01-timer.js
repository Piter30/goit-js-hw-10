import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysSpan = document.querySelector('span[data-days]');
const hoursSpan = document.querySelector('span[data-hours]');
const minutesSpan = document.querySelector('span[data-minutes]');
const secondsSpan = document.querySelector('span[data-seconds]');

let userSelectedDate = null;
let timerInterval = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= currentDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      iziToast.success({
        title: 'Success',
        message: 'Valid date selected! Click start to begin countdown.',
      });
      startButton.disabled = false;
    }
  },
};

flatpickr(datePicker, options);

function startCountdown() {
  startButton.disabled = true;

  const updateTime = () => {
    const currentTime = new Date();
    const timeDifference = userSelectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      iziToast.info({
        title: 'Completed',
        message: 'Countdown has finished!',
      });
      return;
    }

    const timeLeft = convertMs(timeDifference);

    daysSpan.textContent = addLeadingZero(timeLeft.days);
    hoursSpan.textContent = addLeadingZero(timeLeft.hours);
    minutesSpan.textContent = addLeadingZero(timeLeft.minutes);
    secondsSpan.textContent = addLeadingZero(timeLeft.seconds);
  };

  updateTime();
  timerInterval = setInterval(updateTime, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = 60 * second;
  const hour = 60 * minute;
  const day = 24 * hour;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startButton.addEventListener('click', startCountdown);
