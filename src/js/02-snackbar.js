import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Znajdź formularz w DOM
const form = document.querySelector('.form');

// Funkcja, która obsługuje utworzenie obietnicy
form.addEventListener('submit', event => {
  event.preventDefault(); // Zapobiegaj przeładowaniu strony

  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  // Tworzymy obietnicę z opóźnieniem
  createPromise(delay, state)
    .then(delay => {
      iziToast.success({
        title: 'Success',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
});

// Funkcja tworząca obietnicę
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
