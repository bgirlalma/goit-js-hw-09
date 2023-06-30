import { Notify } from 'notiflix/build/notiflix-notify-aio';

// знаходимо форму та інпути
const form = document.querySelector('form');
const delayInp = document.querySelector('input[name="delay"]');
const stepInp = document.querySelector('input[name="step"]');
const amountInp = document.querySelector('input[name="amount"]');

form.addEventListener('submit', onSubmit);

// створюємо проміс
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onSubmit(event) {
  // скасовуємо дефолтну поведінку форми
  event.preventDefault();

  // отримуємо значення інпутів і приводимо їх до числа
  let delayValue = Number(delayInp.value);
  const stepValue = Number(stepInp.value);
  const amountValue = Number(amountInp.value);

  // створюємо проміси згідно кількості amount
  for (let i = 1; i <= amountValue; i += 1) {
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    delayValue += stepValue;
  }
}