const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const submitButton = document.getElementById('submitButton');

function isEmailValid(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email.trim());
}

function validateFields() {
    const emailVal = emailInput.value.trim();
    const passwordVal = passwordInput.value.trim();

    if (!isEmailValid(emailVal)) {
        emailError.style.display = 'block';
        emailInput.classList.remove('valid');
        emailInput.classList.add('invalid');
    } else {
        emailError.style.display = 'none';
        emailInput.classList.remove('invalid');
        emailInput.classList.add('valid');
    }

    if (!passwordVal) {
        passwordError.style.display = 'block';
        passwordInput.classList.remove('valid');
        passwordInput.classList.add('invalid');
    } else {
        passwordError.style.display = 'none';
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
    }

    submitButton.disabled = !(isEmailValid(emailVal) && passwordVal.length > 0);
}

emailInput.addEventListener('blur', validateFields);
passwordInput.addEventListener('blur', validateFields);

document.getElementById('loginForm').addEventListener('submit', function (event) {
    validateFields();
    if (submitButton.disabled) event.preventDefault();
});