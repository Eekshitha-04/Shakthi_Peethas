// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

import { firebaseConfig } from './config.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM elements
const form = document.getElementById('form');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const error_message = document.getElementById('error-message');

// Form submit handler
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = email_input.value.trim();
  const password = password_input.value;

  const errors = getLoginFormErrors(email, password);
  if (errors.length > 0) {
    error_message.innerText = errors.join(". ");
    return;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    alert("Login successful");
    window.location.href = "homepage.html";
  } catch (error) {
    error_message.innerText = "Login failed: " + error.message;
  }
});

// Simple login field validation
function getLoginFormErrors(email, password) {
  let errors = [];
  if (!email) {
    errors.push('Email is required');
    email_input.parentElement.classList.add('incorrect');
  }
  if (!password) {
    errors.push('Password is required');
    password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

// Clear error styling on input
[email_input, password_input].forEach(input => {
  input.addEventListener('input', () => {
    input.parentElement.classList.remove('incorrect');
    error_message.innerText = '';
  });
});
