const exams = document.querySelector(".exams");
const examsMenu = document.querySelector(".exam-menu");
const fullMenu = document.querySelector(".navbar-full-menu");
const barBtn = document.querySelector(".navbar-btn");

exams.onclick = () => {
  examsMenu.classList.toggle("active");
};


barBtn.onclick = () => {
  fullMenu.classList.toggle("hidden");
};
