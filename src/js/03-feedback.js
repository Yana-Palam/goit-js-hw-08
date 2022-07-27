import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const STORAGE_DATA = {
  EMAIL: 'email',
  MESSAGE: 'message',
};
const formData = {};

const refs = {
  form: document.querySelector('.feedback-form'),
  inputEmail: document.querySelector('input[name="email"]'),
  message: document.querySelector('textarea[name="message"]'),
};

refs.form.addEventListener('submit', onSubmitClick);
refs.form.addEventListener('input', throttle(onFormInput, 500));

populateForm();

function onSubmitClick(evt) {
  evt.preventDefault();

  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormInput(evt) {
  if (evt.target === refs.inputEmail) {
    takeFormData(STORAGE_DATA.EMAIL, evt.target.value);
  }
  if (evt.target === refs.message) {
    takeFormData(STORAGE_DATA.MESSAGE, evt.target.value);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function takeFormData(dataKey, value) {
  formData[dataKey] = value;
  console.log(formData);
}

function populateForm() {
  try {
    const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log(savedData);
    if (savedData[STORAGE_DATA.EMAIL]) {
      refs.inputEmail.value = savedData[STORAGE_DATA.EMAIL];
    }
    if (savedData[STORAGE_DATA.MESSAGE]) {
      refs.message.value = savedData[STORAGE_DATA.MESSAGE];
    }
  } catch (error) {
    console.log(error.name); // "SyntaxError"
    console.log(error.message); // Unexpected token W in JSON at position 0
  }
}
