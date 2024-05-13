import ToastManager from './toast.js';
const questions = [
  {
      question: "What does CSS stand for?",
      mark: 1,
      answers: [
          { text: "A. Computer Style Sheets", correct: false },
          { text: "B. Creative Style Sheets", correct: false },
          { text: "C. Cascading Style Sheets", correct: true },
          { text: "D. Colorful Style Sheets", correct: false },
      ],
  },
  {
      question: "Which programming language is commonly used for client-side scripting in web development?",
      mark: 1,
      answers: [
          { text: "A. Java", correct: false },
          { text: "B. Python", correct: false },
          { text: "C. JavaScript", correct: true },
          { text: "D. Ruby", correct: false },
      ],
  },
  {
      question: "What is the purpose of HTML?",
      mark: 1,
      answers: [
          { text: "A. Hypertext Markup Language", correct: true },
          { text: "B. Hyperlink and Text Markup Language", correct: false },
          { text: "C. High-level Text Markup Language", correct: false },
          { text: "D. Hyper Transfer Markup Language", correct: false },
      ],
  },
];

//   tạo mảng chứa các lựa chọn của người dùng (măc định là -1, tức là chưa chọn gì cả) và có độ dài bằng số lượng câu hỏi
const userChoices = Array(questions.length).fill(-1);

const listExam = document.getElementById('list-exam');
const optionsElement = document.getElementById('options');
const countdownElement = document.getElementById('countdown');
const submitBtn = document.getElementById('submitBtn');
const messageElement = document.getElementById('message');

const totalTime = 60*45; // Thời gian làm bài, tính theo giây
let timeLeft = totalTime;
let totalMark = 0;

// Tính tổng số điểm của bài thi sau khi hoàn thành
function calculateTotalMark(option, idQuestion) {
    const question = questions[idQuestion - 1];
    userChoices[idQuestion - 1] = option;
    const mark = question.mark;
    if (question.answers[option].correct) {
        totalMark += mark;
    }
}

// Đổi màu câu hỏi trong thẻ có id list-exam khi được bấm vào
export function updateColor(id) {
    const question = document.getElementById(`question-${id}`);
    // add class to the clicked question and remove any existing classes from the another question
    question.classList.add('active');
    for (let i = 1; i <= questions.length; i++) {
        if (i !== id) {
            const anotherQuestion = document.getElementById(`question-${i}`);
            anotherQuestion.classList.remove('active');
        }
    }
}

// Hiển thị toàn bộ câu hỏi và các đáp án có thể nhấn chọn
function displayAllQuestions() {
    questions.forEach((question, index) => {
        const id = index + 1;

        // Hiển thị câu hỏi trong bảng thông tin bài thi
        const questionNum = `<a class="list-group-item list-group-item-action col-sm-4" id="question-${id}" href="#exam-question-${id}" onclick="updateColor(${id})">${id}</a>`;
        listExam.innerHTML += questionNum;

        // Hiển thị câu hỏi và các đáp án chi tiết
        const questionElement = document.createElement('div');
        questionElement.className = 'd-flex flex-row justify-content-space-around align-items-start exam-question gap-3 mb-3';
        questionElement.id = 'exam-question-' + id;


        // Đổi điểm từ số sang số thập phân có 2 chữ số sau dấu phẩy
        const mark = question.mark.toFixed(2);

        // Hiển thị Số thứ tự câu hỏi và cờ đánh dấu câu hỏi
        const questionNumElement = document.createElement('div');
        questionNumElement.className = 'col-sm-2 exam-question-num';
        questionNumElement.innerHTML = `<div class="d-flex flex-row justify-content-start align-items-end">
                                            <p class="mb-2 fw-bold">Question</p>
                                            <h3 class="mb-2 mx-1"> ${id}</h3>
                                        </div>
                                        <p>Marked out of ${mark}</p>
                                        <div id="mark-question-${id}" class="exam-question-flag d-flex flex-row justify-content-start align-items-center" onclick="flagQuestion(${id})">
                                            <i class="far fa-flag"></i>
                                            <p class="flag-content">Flag question</p>
                                        </div>`;
        questionElement.appendChild(questionNumElement);

        // Hiển thị nội dung câu hỏi và các đáp án
        const questionContent = document.createElement('div');
        questionContent.className = 'col-sm-10 exam-question-content';

        questionContent.innerHTML = `<div class="exam-question-tilte">
                                        <h3>${question.question}</h3>
                                     </div>`;
        const answers = document.createElement('div');
        answers.className = 'exam-question-answers';
        question.answers.forEach((option, index) => {
            answers.innerHTML += `<div class="exam-question-answer d-flex flex-row justify-content-start align-items-center">
                                        <input type="radio" name="exam-question-${id}-choice" value="${index}" onclick="selectOption(${index}, ${id})">
                                        <p>${option.text}</p>
                                  </div>`;
        });
        // Thêm Xóa lựa chọn
        answers.innerHTML += `<div class="exam-clear-choice" onclick="clearOption(${id})">
                                <p>Clear my choice</p>
                                </div>`;
        questionContent.appendChild(answers);
        questionElement.appendChild(questionContent);
        optionsElement.appendChild(questionElement);
    });
}

// Chọn lựa chọn
export function selectOption(option, idQuestion) {
  // Xử lý lựa chọn ở đây (nếu cần)
  updateColor(idQuestion);
  calculateTotalMark(option, idQuestion);
}

// Xóa lựa chọn
export function clearOption(idQuestion) {
  // Xóa tick chọn trong input radio
    const question = document.getElementById(`exam-question-${idQuestion}`);
    const options = question.querySelectorAll('input');
    options.forEach((option) => {
        option.checked = false;
    });
    updateColor(idQuestion);
}

// Đánh dấu câu hỏi đồng thời thay đổi nội dung đánh dấu và cờ đánh dấu và thay đổi hàm xử lý khi click
export function flagQuestion(id) {
    const markQuestion = document.getElementById(`mark-question-${id}`);
    const question = document.getElementById(`question-${id}`);

    // Thay đổi icon sang <i class="fa-solid fa-flag" style="color: #ff0000;"></i>
    const flagIcon = markQuestion.querySelector('i');
    flagIcon.className = 'fa-solid fa-flag';
    flagIcon.style.color = '#ff0000';

    // Thay đổi nội dung và thay đổi hàm xử lý khi click 
    const flagContent = markQuestion.querySelector('.flag-content');
    flagContent.textContent = 'Remove flag';
    question.classList.add('flagged');
    markQuestion.setAttribute('onclick', `unflagQuestion(${id})`);
}

// Xóa đánh dấu câu hỏi đồng thời thay đổi nội dung đánh dấu và cờ đánh dấu
export function unflagQuestion(id) {
    const markQuestion = document.getElementById(`mark-question-${id}`);
    const question = document.getElementById(`question-${id}`);

    // Thay đổi icon sang <i class="far fa-flag"></i>
    const flagIcon = markQuestion.querySelector('i');
    flagIcon.className = 'far fa-flag';
    flagIcon.style.color = '#86c3b7';

    // Thay đổi nội dung và thay đổi hàm xử lý khi click 
    const flagContent = markQuestion.querySelector('.flag-content');
    flagContent.textContent = 'Flag question';
    question.classList.remove('flagged');
    markQuestion.setAttribute('onclick', `flagQuestion(${id})`);
}

// Bắt đầu bộ đếm thời gian
function startTimer() {
    const timerInterval = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = formatTime(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}


// Gửi bài làm
export const submitExam = () => {
    const submittedTime = formatDateTimeCurrent();
    const result = {
        submittedTime: submittedTime,
        totalMark: totalMark,
        totalTime: 60*30-timeLeft,
        questions: questions,
        userChoices: userChoices
    }
    localStorage.setItem('result', JSON.stringify(result));
    const toastManager = new ToastManager();
    toastManager.createToastInRedirectedPage('success', 'Submitted exam successfully!', 'finish.html');
    // setTimeout(() => {
    //     window.location.href = 'result.html';
    // }, 500);
}

// Format thời gian: h:mm:ss
function formatTime(seconds) {
    // multiply the seconds by 1000 to convert to milliseconds
    const time = new Date(seconds * 1000);
    return time.toISOString().substring(12, 19);
    // const minutes = Math.floor(seconds / 60);
    // const remainingSeconds = seconds % 60;
    // return `${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

function formatDateTimeCurrent() {
    const dateTime = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    // Monday, March 4, 2024 at 8:38 PM
    const dateStr = dateTime.toLocaleDateString('vn-VN', options);

    // Format time: Monday, 1 January 2022, 3:00 PM
    const splitTime = dateStr.split(', ');
    const dateMonths = splitTime[1].split(' ');
    const yearTime = splitTime[2].split(' ');
    return splitTime[0] + ', ' + dateMonths[1] + ' ' + dateMonths[0] + ' ' + yearTime[0] + ', ' + yearTime[2] + ' ' + yearTime[3];
}

// Khởi động bài thi
 export function startExam() {
    // displayQuestion();
    displayAllQuestions();
    startTimer();
}

// Bắt đầu bài thi khi trang được tải
startExam();
