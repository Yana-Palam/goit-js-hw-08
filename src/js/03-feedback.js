import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
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
  formData[evt.target.name] = evt.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  try {
    const dataJson = localStorage.getItem(STORAGE_KEY);
    if (!dataJson) return;
    formData = JSON.parse(dataJson);
    for (let key in formData) {
      refs.form.elements[key].value = formData[key];
    }
  } catch (error) {
    console.log(error.name); // "SyntaxError"
    console.log(error.message); // Unexpected token W in JSON at position 0
  }
}
