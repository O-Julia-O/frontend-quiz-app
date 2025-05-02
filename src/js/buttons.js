
import data from '../../data.json';

const header = document.querySelector("header");
const logo = document.querySelector(".logo");
const textBlock = document.querySelector(".quiz-menu__text");
const quizButtons = document.querySelector(".quiz-menu__buttons");
let parsedData = JSON.parse(JSON.stringify(data));
const quizzes = parsedData.quizzes;

//TODO - 
document.addEventListener('DOMContentLoaded', () => {
  const buttons = [
    document.querySelector("#html-btn"),
    document.querySelector("#css-btn"),
    document.querySelector("#js-btn"),
    document.querySelector("#access-btn")
  ].filter(Boolean); // уберёт null

  let topic = '';
  let questions = [];

  buttons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      topic = event.target.textContent;
      questions = getQuestions(topic);
      console.log(questions);


      // в header добавить текст "Тема: {topic}"
      header.style.justifyContent = "space-between"; // выровнять по краям
      logo.style.display = "flex"; // показать логотип
      
      header.querySelector("img").style.marginRight = "1rem"; 
      header.querySelector("h1").textContent = `${topic}`; // добавить текст в заголовок
      header.querySelector("h1").classList.add("text-preset-4-mobile-medium"); // add style for h1
      logo.style.alignItems = "center"; // выровнять логотип по центру

      switch (topic) {
        case "HTML":
          header.querySelector("img").src = quizzes[0].icon; // иконка темы
          header.querySelector("img").classList.add("html-btn"); // добавить класс для иконки
          break;
        case "CSS":
          header.querySelector("img").src = quizzes[1].icon; // иконка темы
          header.querySelector("img").classList.add("css-btn");// цвет текста
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

      header.querySelector("img").style.padding = "5px"; 
      header.querySelector("img").style.borderRadius = "12px";  

      //Удалить текст
      textBlock.innerHTML = ''; // очистить текстовый блок
      textBlock.innerHTML = `
        <p class="text-preset-5-mobile">Question 1 of 10</p>
        <h2 class="text-preset-3-mobile-medium">${questions[0].question}</h2>
      `;

      // удалить кнопки
      quizButtons.innerHTML = ''; // очистить кнопки
      // добавить кнопки
      questions[0].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("button", "text-preset-4-mobile-medium");
        button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span> ${option}`;
        button.setAttribute("data-index", index); // добавить атрибут с индексом
        quizButtons.appendChild(button);
      });

      const button = document.createElement("button");
      button.classList.add("button", "text-preset-4-mobile-medium", "next-btn");
      button.innerHTML = `Submit Answer`;
      quizButtons.appendChild(button); // добавить кнопку "Submit Answer"

    });
  });
});


console.log(parsedData);
console.log(quizzes);


function getQuestions(topic) {    
    const quiz = quizzes.find(quiz => quiz.title === topic);
    if (!quiz) {
        throw new Error(`Quiz with topic ${topic} not found`);
    }
    return quiz.questions;
}
