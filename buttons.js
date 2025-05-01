const htmlBtn = document.querySelector("#html-btn");
const cssBtn = document.querySelector("#css-btn");
const jsBtn = document.querySelector("#js-btn");
const accessBtn = document.querySelector("#access-btn");

/* add all buttons same eventListener */
[htmlBtn, cssBtn, jsBtn, accessBtn].forEach((btn) => {
  btn.addEventListener("click", () => {
    window.location.href = 'frontend-quiz-app/questions.html';
  });
});