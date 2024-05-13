
let exams = [
  { 
      id: 1, 
      name: "Kỳ thi A", 
      description: "Mô tả kỳ thi A", 
      type: "Tự do", 
      questions: ["Câu hỏi 1", "Câu hỏi 2", "Câu hỏi 3"] 
  },
  { 
      id: 2, 
      name: "Kỳ thi B", 
      description: "Mô tả kỳ thi B", 
      type: "Thời gian cụ thể", 
      questions: ["Câu hỏi 1", "Câu hỏi 2"] 
  },
];

let users = [
  { 
      id: 1, 
      exam: "Kỳ thi A", 
      score: 85, 
      status: "Hoàn thành", 
      timeJoined: "2024-03-06 08:00:00" 
  },
  { 
      id: 2, 
      exam: "Kỳ thi B", 
      score: 70, 
      status: "Không hoàn thành", 
      timeJoined: "2024-03-06 09:00:00" 
  },
];


function displayExams() {
  const examListBody = document.getElementById('examListBody');
  examListBody.innerHTML = '';
  exams.forEach(exam => {
      const row = `<tr><td>${exam.name}</td><td>${exam.description}</td><td>${exam.type}</td><td>${exam.questions.join(', ')}</td></tr>`;
      examListBody.innerHTML += row;
  });
}


function displayUsers() {
  const userListBody = document.getElementById('userListBody');
  userListBody.innerHTML = '';
  users.forEach(user => {
      const row = `<tr><td>${user.exam}</td><td>${user.score}</td><td>${user.status}</td><td>${user.timeJoined}</td></tr>`;
      userListBody.innerHTML += row;
  });
}

function addExam(newExam) {
  exams.push(newExam);
  displayExams();
}

function editExam(id, updatedExam) {
  const index = exams.findIndex(exam => exam.id === id);
  if (index !== -1) {
      exams[index] = updatedExam;
      displayExams();
  } else {
      console.log('Không tìm thấy kỳ thi để chỉnh sửa');
  }
}

function deleteExam(id) {
  exams = exams.filter(exam => exam.id !== id);
  displayExams();
}


function addUser(newUser) {
  users.push(newUser);
  displayUsers();
}


function editUser(id, updatedUser) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
      users[index] = updatedUser;
      displayUsers();
  } else {
      console.log('Không tìm thấy người dùng để chỉnh sửa');
  }
}


function deleteUser(id) {
  users = users.filter(user => user.id !== id);
  displayUsers();
}


document.getElementById('addExamBtn').addEventListener('click', function() {
  const newExam = {
      id: exams.length + 1,
      name: "Kỳ thi mới",
      description: "Mô tả kỳ thi mới",
      type: "Tự do",
      questions: ["Câu hỏi 1", "Câu hỏi 2"]
  };
  addExam(newExam);
});

document.getElementById('editExamBtn').addEventListener('click', function() {
  const id = parseInt(prompt('Nhập ID của kỳ thi bạn muốn chỉnh sửa:'));
  const updatedExam = {
      name: prompt('Nhập tên kỳ thi mới:'),
      description: prompt('Nhập mô tả kỳ thi mới:'),
      type: prompt('Nhập loại kỳ thi mới (Tự do hoặc Thời gian cụ thể):'),
      questions: prompt('Nhập danh sách câu hỏi mới, cách nhau bằng dấu phẩy (,):').split(',')
  };
  editExam(id, updatedExam);
});

document.getElementById('deleteExamBtn').addEventListener('click', function() {
  const id = parseInt(prompt('Nhập ID của kỳ thi bạn muốn xóa:'));
  deleteExam(id);
});

document.getElementById('addUserBtn').addEventListener('click', function() {
  const newUser = {
      id: users.length + 1,
      exam: "Kỳ thi mới",
      score: 0,
      status: "Chưa hoàn thành",
      timeJoined: new Date().toLocaleString()
  };
  addUser(newUser);
});

document.getElementById('editUserBtn').addEventListener('click', function() {
  const id = parseInt(prompt('Nhập ID của người dùng bạn muốn chỉnh sửa:'));
  const updatedUser = {
      exam: prompt('Nhập tên kỳ thi mới:'),
      score: parseFloat(prompt('Nhập điểm số mới:')),
      status: prompt('Nhập trạng thái mới (Hoàn thành hoặc Chưa hoàn thành):'),
      timeJoined: prompt('Nhập thời gian tham gia mới:')
  };
  editUser(id, updatedUser);
});

document.getElementById('deleteUserBtn').addEventListener('click', function() {
  const id = parseInt(prompt('Nhập ID của người dùng bạn muốn xóa:'));
  deleteUser(id);
});


displayExams();
displayUsers();
