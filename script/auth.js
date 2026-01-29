// const { data, error } = await supabase.auth.signUp({
//   email: 'example@email.com',
//   password: 'example-password',
// })

import { supabase } from "./supabase.js";

// require ('./supabase.js');

const mailInput = document.getElementById("email-input");
const passInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async () => {
  console.log("Login button clicked");
  const email = mailInput.value;
  const password = passInput.value;

  console.log("Email:", email);
  console.log("Password:", password);
//   const { data, error } = await supabase.auth.signInWithPassword({
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    document.getElementById("error-message").innerText = error.message;
  } else {
    console.log("data", data);
    // Redirect to student dashboard on successful login
    // window.location.href = 'student.html';
  }
});


// modular, common js