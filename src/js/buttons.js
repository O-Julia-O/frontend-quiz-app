import data from "../../data.json";

const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const textBlock = document.querySelector(".quiz-menu__text");
const quizButtons = document.querySelector(".quiz-menu__buttons");

let topic = "";
let questions = [];
let currentQuestionIndex = 0;

/* JSON */
let parsedData = JSON.parse(JSON.stringify(data));
const quizzes = parsedData.quizzes;

document.addEventListener("DOMContentLoaded", () => {
  //!SECTION - DOMContentLoaded
  const buttons = [
    document.querySelector("#html-btn"),
    document.querySelector("#css-btn"),
    document.querySelector("#js-btn"),
    document.querySelector("#access-btn"),
  ].filter(Boolean); // уберёт null

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      topic = event.target.textContent;
      questions = getQuestions(topic);

      // поменять header по теме вопроса. 
      createNewQuestionWindow(topic); // создать окно с вопросами

        //Удалить текст
      deleteAllChildren(textBlock); // очистить текст

      // удалить кнопки
      deleteAllChildren(quizButtons); // очистить кнопки

      // добавить текст
      textBlock.innerHTML = `
        <p class="text-preset-5-mobile">Question ${currentQuestionIndex} of 10</p>
        <h2 class="text-preset-3-mobile-medium">${questions[currentQuestionIndex].question}</h2>
      `;

      //добавить кнопки
      questions[currentQuestionIndex].options.forEach((option, index) =>
        createNewButtons(option, index)
      ); // создать кнопки

      createSubmitButton(); // создать кнопку "Submit Answer"
    });
  });
});

//!SECTION - Create new question window
function createNewQuestionWindow(topic) {
  header.style.justifyContent = "space-between"; // выровнять по краям
  logo.style.display = "flex"; // показать логотип
  header.querySelector("img").style.marginRight = "1rem";
  header.querySelector("h1").textContent = `${topic}`; // добавить текст в заголовок
  header.querySelector("h1").classList.add("text-preset-4-mobile-medium"); // add style for h1
  logo.style.alignItems = "center"; // выровнять логотип по центру
  addIcon(topic); // добавить иконку темы
  header.querySelector("img").style.padding = "5px";
  header.querySelector("img").style.borderRadius = "12px";
}

function createNewButtons(option, index) {
  const button = document.createElement("button");
  button.classList.add("button", "text-preset-4-mobile-medium");
  button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span> ${option}`;
  button.setAttribute("data-index", index);

  button.addEventListener("click", () => {
    // Удалить выделение со всех кнопок
    const buttons = quizButtons.querySelectorAll(".button");
    buttons.forEach((b) => b.classList.remove("selected"));
    // Добавить выделение на текущую
    button.classList.add("selected");
  });

  quizButtons.appendChild(button);
}

function createSubmitButton() {
  const button = document.createElement("button");
  button.classList.add("button", "text-preset-4-mobile-medium", "next-btn");
  button.innerHTML = `Submit Answer`;

  //ANCHOR - Submit Answer
  button.addEventListener("click", () => {
    const selectedButton = quizButtons.querySelector(".selected");
    if (!selectedButton) {
      alert("Please select an answer before submitting.");
      return;
    }

    let textFromButton = selectedButton.textContent; // выбранная кнопка
    const correctAnswer = questions[currentQuestionIndex].answer; // правильный ответ

    checkAnswer(textFromButton, correctAnswer); // проверить ответ

    // Удалить выделение со всех кнопок
    deleteSelected(); // удалить выделение

    // Показать следующий вопрос
    currentQuestionIndex++;
    textBlock.innerHTML = `
      <p class="text-preset-5-mobile">Question ${currentQuestionIndex+1} of 10</p>
      <h2 class="text-preset-3-mobile-medium">${
        questions[currentQuestionIndex].question
      }</h2>
    `;

    // удалить кнопки
    deleteAllChildren(quizButtons); // очистить кнопки

    //добавить кнопки
    questions[currentQuestionIndex].options.forEach((option, index) => {
      createNewButtons(option, index);
    });

    createSubmitButton(); // создать кнопку "Submit Answer"
  });
  quizButtons.appendChild(button); // добавить кнопку "Submit Answer"
}

/* GET ALL QUESTIONS FROM THE CHOSEN TOPIC */
function getQuestions(topic) {
  const quiz = quizzes.find((quiz) => quiz.title === topic);
  if (!quiz) {
    throw new Error(`Quiz with topic ${topic} not found`);
  }
  return quiz.questions;
}

function deleteAllChildren(node) {
  node.innerHTML = ""; // очистить все дочерние элементы
}

function checkAnswer(selectedButton, correctAnswer) {
  if (selectedButton.includes(correctAnswer)) {
    alert("Correct!"); // правильный ответ
  } else {
    alert("Incorrect!"); // неправильный ответ
  }
}

function deleteSelected() {
  const selectedButton = quizButtons.querySelector(".selected");
  if (selectedButton) {
    selectedButton.classList.remove("selected");
  }
}

/* Add icon to the header | QUESTION BLOCK */
function addIcon(topic) {
  switch (topic) {
    case "HTML":
      header.querySelector("img").src = quizzes[0].icon; // иконка темы
      header.querySelector("img").classList.add("html-btn"); // добавить класс для иконки
      break;
    case "CSS":
      header.querySelector("img").src = quizzes[1].icon; // иконка темы
      header.querySelector("img").classList.add("css-btn"); // цвет текста
      break;
    case "JavaScript":
      header.querySelector("img").src = quizzes[2].icon; // иконка темы
      header.querySelector("img").classList.add("js-btn"); // цвет текста
      break;
    case "Accessibility":
      header.querySelector("img").src = quizzes[3].icon; // иконка темы
      header.querySelector("img").classList.add("access-btn"); // цвет текста
      break;
    default:
      console.error("Unknown topic:", topic);
  }
}
