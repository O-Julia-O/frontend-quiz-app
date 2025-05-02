
import data from '../../data.json';

const header = document.querySelector("header");
const logo = document.querySelector(".logo");
let parsedData = JSON.parse(JSON.stringify(data));
const quizzes = parsedData.quizzes;


document.addEventListener('DOMContentLoaded', () => {
  console.log("3245367890");
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
      console.log("kjfkjdjgl");
      topic = event.target.textContent;
      questions = getQuestions(topic);
      console.log(questions);


      // в header добавить текст "Тема: {topic}"
      header.style.justifyContent = "space-between"; // выровнять по краям
      logo.style.display = "block"; // показать логотип
      header.querySelector("img").src = quizzes[0].icon; // показать заголовок
      header.querySelector("h1").textContent = `${topic}`; // добавить текст в заголовок
      // и иконку с темой

      //Удалить текст
      //вместо текста добавить вопрос
      //заменить текст в кнопках
      //заменить картинку в кнопках
      //добавить кнопку "next"
      
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
