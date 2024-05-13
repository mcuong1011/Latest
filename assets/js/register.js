const PASSWORD_RULE = {
    containNumber: true,
    containUpperCase: true,
    minLength: 8,
  };
  function validateEmail(email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  };
  const passwordValidation = (password) => {
    const status = {
      isValidated: false,
      message: '',
    };
    if (password.length < PASSWORD_RULE.minLength) {
      status.message = 'Mật khẩu phải chứa ít nhất 8 ký tự.';
      return status;
    }
    if (!/\d/.test(password) && PASSWORD_RULE.containNumber) {
      status.message = 'Mật khẩu phải chứa ít nhất một số.';
      return status;
    }
    if (!/[A-Z]/.test(password) && PASSWORD_RULE.containUpperCase) {
      status.message = 'Mật khẩu phải chứa ít nhất một chữ hoa.';
      return status;
    }
    status.isValidated = true;
    return status;
  };

document.addEventListener('DOMContentLoaded', function() {
    var backbutton = document.getElementById('topRightButton_3');
    backbutton.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('register_form_id');
  
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('register__user').value;
        const password = document.getElementById('register__pw').value;
        
        if (!validateEmail(email)) {
          loginStatusNoti(false, 'Email không hợp lệ.');
          return;
        }
        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        const existingUser = users.find(user => user.email === email);
        
        if (existingUser) {
            alert('Người dùng đã tồn tại!');
            return;
        }
        
        const newUser = {
            email: email,
            password: password
        };
        users.push(newUser);
        
        localStorage.setItem('users', JSON.stringify(users));
        
        alert("Đăng ký thành công");
        window.location.href = "index.html";
    });
  });

  const loginStatusNoti = (isPositive, message) => {
    const loginStatus = document.querySelector('#login__status_noti');
    toggleClass(loginStatus, 'd-block');
    const loginStatusMessage = document.querySelector(
      '#login__status_noti > p > span'
    );
    loginStatusMessage.innerHTML = message;
    loginStatusMessage.style.color = isPositive ? 'green' : 'red';
  };
