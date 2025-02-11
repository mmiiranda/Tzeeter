const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('terms');
const submitButton = document.getElementById('submitButton');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const monthSelect = document.getElementById('month');
const daySelect = document.getElementById('day');
const yearSelect = document.getElementById('year');

let passwordUsed = false;
let confirmPasswordUsed = false;

function isEmailValid(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
}

function validateEmail() {
  const emailVal = emailInput.value.trim();

  if (!isEmailValid(emailVal)) {
    emailError.style.display = 'block';
    emailInput.classList.add('invalid');
    emailInput.classList.remove('valid');
  } else {
    emailError.style.display = 'none';
    emailInput.classList.add('valid');
    emailInput.classList.remove('invalid');
  }
  validateForm();
}

function validatePasswords() {
  if (!passwordUsed || !confirmPasswordUsed) return;

  const passwordVal = passwordInput.value.trim();
  const confirmPasswordVal = confirmPasswordInput.value.trim();

  if (passwordVal !== confirmPasswordVal || confirmPasswordVal.length === 0) {
    passwordError.style.display = 'block';
    confirmPasswordInput.classList.add('invalid');
    confirmPasswordInput.classList.remove('valid');
  } else {
    passwordError.style.display = 'none';
    confirmPasswordInput.classList.add('valid');
    confirmPasswordInput.classList.remove('invalid');
  }
  validateForm();
}

function validateForm() {
  const nameVal = nameInput.value.trim();
  const emailVal = emailInput.value.trim();
  const passwordVal = passwordInput.value.trim();
  const confirmPasswordVal = confirmPasswordInput.value.trim();
  const termsChecked = termsCheckbox.checked;
  const monthSelected = monthSelect.value !== "";
  const daySelected = daySelect.value !== "";
  const yearSelected = yearSelect.value !== "";

  const isFormValid = 
    nameVal.length > 0 &&
    isEmailValid(emailVal) &&
    passwordVal.length >= 6 &&
    confirmPasswordVal.length > 0 &&
    passwordVal === confirmPasswordVal &&
    termsChecked &&
    monthSelected && daySelected && yearSelected;

  submitButton.disabled = !isFormValid;
}

function populateSelects() {
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= currentYear - 100; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    yearSelect.appendChild(option);
  }
}

function updateDays() {
  const month = parseInt(monthSelect.value, 10);
  const year = parseInt(yearSelect.value, 10);
  let daysInMonth = 31;

  if ([4, 6, 9, 11].includes(month)) {
    daysInMonth = 30;
  } else if (month === 2) {
    daysInMonth = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) ? 29 : 28;
  }

  daySelect.innerHTML = '<option value="">Dia</option>';
  for (let i = 1; i <= daysInMonth; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }
}

nameInput.addEventListener('blur', validateForm);
emailInput.addEventListener('blur', validateEmail);

passwordInput.addEventListener('input', () => {
  passwordUsed = true;
  validatePasswords();
});

confirmPasswordInput.addEventListener('input', () => {
  confirmPasswordUsed = true;
  validatePasswords();
});

termsCheckbox.addEventListener('change', validateForm);
monthSelect.addEventListener('change', validateForm);
daySelect.addEventListener('change', validateForm);
yearSelect.addEventListener('change', validateForm);
yearSelect.addEventListener('change', updateDays);

document.getElementById('signupForm').addEventListener('submit', function(event) {
  validateForm();
  if (submitButton.disabled) event.preventDefault();
});

populateSelects();