function Validation() {
  this.checkEmpty = function (value, idShowMess, mess) {
    if (value) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }
    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  this.checkDuplicate = function (value, users, itemCheck, idShowMess, mess, originalTaiKhoan) {
    var isDuplicate = false;    
    
    console.log(value != originalTaiKhoan);
    for (var i = 0; i < users.length && !isDuplicate; i++) {
      console.log(value !== originalTaiKhoan);
      if (users[i][itemCheck].includes(value) && value !== originalTaiKhoan ){
        isDuplicate = true;
      }
    }
    

    if (!isDuplicate) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }

    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  this.checkCharsAndNum = function (value, idShowMess, mess) {
    var regexCharsAndNum = /^[a-zA-Z0-9_]+$/
    if (regexCharsAndNum.test(value)) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }
    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };


  this.checkName = function (value, idShowMess, mess) {
    var regexName = /^[a-zA-Z ]+$/;
    if (regexName.test(value)) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }
    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  this.checkLength = function (value, min, max, idShowMess, mess) {
    if (value.length >= min && value.length <= max) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }

    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  this.checkPassword = function (value, idShowMess, mess) {
    var regexMatKhau = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*\d)(?=.*?[#?!@$%^&*-])/;
    if (regexMatKhau.test(value)) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }
    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  this.checkEmail = function (value, idShowMess, mess) {
    var regexEmail =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regexEmail.test(value)) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }
    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  this.checkChoose = function (value, optionDefault, idShowMess, mess) {
    if (value !== optionDefault) {
      getEle(idShowMess).style.display = "none";
      getEle(idShowMess).innerHTML = "";
      return true;
    }
    getEle(idShowMess).style.display = "block";
    getEle(idShowMess).innerHTML = `<p class = "text-danger">${mess}</p>`;
    return false;
  };

  
}
