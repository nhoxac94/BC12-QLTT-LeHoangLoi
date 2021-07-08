function getEle(id) {
  return document.getElementById(id);
}

var userService = new UserService();
var validation = new Validation();
var listDataUser = [];

function validate(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh, originalTaiKhoan) {
  var isValid = true; 
  isValid &= validation.checkEmpty(taiKhoan, "errorTaiKhoan", `(*) Vui lòng nhập tài khoản người dùng` )
          && validation.checkDuplicate (taiKhoan, listDataUser, 'taiKhoan', "errorTaiKhoan", `(*) Tài khoản đã tồn tại!`,originalTaiKhoan)
          && validation.checkCharsAndNum (taiKhoan, "errorTaiKhoan", `(*) Tài khoản bao gồm chữ và số`)       
  
  isValid &= validation.checkEmpty (hoTen, "errorHoTen", `(*) Vui lòng nhập học tên người dùng`)
          && validation.checkName(hoTen, "errorHoTen", `(*) Họ tên người dùng không chưa số và kí tự đặc biệt`)

  isValid &= validation.checkEmpty(matKhau, "errorMatKhau", `(*) Vui lòng nhập mật khẩu của người dùng`)
          && validation.checkLength(matKhau, 6, 8, "errorMatKhau", `(*) Vui lòng nhập khẩu có độ dài từ 6 - 8 kí tự`)
          && validation.checkPassword (matKhau, "errorMatKhau", `(*) Mật khẩu chứa ít nhât 1 ký tự hoa, 1 ký tự đặc biệt, 1 số`)

  isValid &= validation.checkEmpty (email, "errorEmail", `(*) Vui lòng nhập email người dùng`)
          && validation.checkEmail (email, "errorEmail", `(*) Vui lòng nhập emai có dạng example@mail.com`)
  
  isValid &= validation.checkEmpty (hinhAnh, "errorHinhAnh", `(*) Vui lòng nhập hình ảnh người dùng`)

  isValid &= validation.checkChoose (loaiND, "Chọn loại người dùng" , "errorLoaiND",  `(*) Vui lòng chọn loại người dùng`)

  isValid &= validation.checkChoose (ngonNgu, "Chọn ngôn ngữ" , "errorNgonNgu",  `(*) Vui lòng chọn ngôn ngữ`)

  isValid &= validation.checkEmpty(moTa, "errorMoTa", `(*) Vui lòng nhập mô tả người dùng`)
          && validation.checkLength ( moTa,0 ,60 ,"errorMoTa" ,  `(*) Vui lòng nhập mô tả dưới 60 kí tự`)

  return isValid;
}


// Thêm user mới
function addNewUser() {
  

  var taiKhoan = getEle("TaiKhoan").value.trim();
  var hoTen = getEle("HoTen").value.trim();
  var matKhau = getEle("MatKhau").value.trim();
  var email = getEle("Email").value.trim();
  var loaiND = getEle("loaiNguoiDung").value.trim();
  var ngonNgu = getEle("loaiNgonNgu").value.trim();
  var moTa = getEle("MoTa").value.trim();
  var hinhAnh = getEle("HinhAnh").value.trim();

   var isValid = validate(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh, isValid)

  if (!isValid) return;


  var user = new User(taiKhoan,hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);

  userService.addUser(user) 
    .then (function() {
        getUsers();
    })
    .catch (function(err) {
        console.log(err);
    })

  alert ('Thêm User thành công')
}

// Thêm nút thêm người dùng cho modal

getEle("btnThemNguoiDung").addEventListener("click", function () {
  getEle('formInput').reset();
  document.querySelectorAll('.form-group>p').forEach(function(value) {
    value.style.display = 'none';

  })
  document.querySelector(".modal-footer").innerHTML = `
            <button class="btn btn-success" id="btnAddUser"> Thêm người dùng</button>
        `;
  getEle("btnAddUser").addEventListener("click", addNewUser);
});

// Function xóa người dùng

function removeUser(id) {
  userService
    .deleteUser(id)
    .then(function () {
        getUsers();
    })
    .catch(function (err) {
      console.log(err);
    });
}



function updateUser(id) {
  var taiKhoan = getEle("TaiKhoan").value;
  var hoTen = getEle("HoTen").value;
  var matKhau = getEle("MatKhau").value;
  var email = getEle("Email").value;
  var loaiND = getEle("loaiNguoiDung").value;
  var ngonNgu = getEle("loaiNgonNgu").value;
  var moTa = getEle("MoTa").value;
  var hinhAnh = getEle("HinhAnh").value;
  
  var originalTaiKhoan = listDataUser[id-1].taiKhoan;
  var isValid = validate(taiKhoan, hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh, originalTaiKhoan);  
  console.log(originalTaiKhoan);
  if (!isValid) return;

  var user = new User(taiKhoan,hoTen, matKhau, email, loaiND, ngonNgu, moTa, hinhAnh);
  
  userService.changeInforUser(id, user) 
    .then(function(){
      getUsers();
      document.querySelector(".modal-header .close").click();
    })
    .catch(function (err) {
      console.log(err);
    })
  
}

// Xem thong tin nguoi dung

function checkUser(id) {
  userService.reviewUser(id) 
    .then (function () {
      getEle('btnThemNguoiDung').click();            
        userService.reviewUser(id)
        .then(function(user){
          var inforUser = user.data;
          getEle("TaiKhoan").value = inforUser.taiKhoan;
          getEle("HoTen").value = inforUser.hoTen;
          getEle("MatKhau").value = inforUser.matKhau;
          getEle("Email").value = inforUser.email;
          getEle("loaiNguoiDung").value = inforUser.loaiND;
          getEle("loaiNgonNgu").value = inforUser.ngonNgu;
          getEle("MoTa").value = inforUser.moTa;
          getEle("HinhAnh").value = inforUser.hinhAnh;          
          document.querySelector(".modal-footer").innerHTML = `
            <button class="btn btn-success" id="btnUpdateUser" onclick = "updateUser('${inforUser.id}')"> Cập nhật</button>
          `;
          
        })
        .catch(function (err) {
          console.log(err);
        })
      
    })
    .catch(function (err) {
      console.log(err);
    })
  
}





// Render danh sách

function renderListUsers(dataUsers) {
    var content = "";
    dataUsers.map(function (user, index) {
    content += `
                        <tr>
                        <td>${index + 1}</td>
                        <td>${user.taiKhoan}</td>
                        <td>${user.matKhau}</td>
                        <td>${user.hoTen}</td>
                        <td>${user.email}</td>
                        <td>${user.ngonNgu}</td>
                        <td>${user.loaiND}</td>
                        <td>
                            <btn class = "btn btn-success" onclick = "checkUser('${user.id}')">Xem</btn>
                            <btn class = "btn btn-danger" onclick = "removeUser('${user.id}')">Xóa</btn>

                        </td>
                        </tr>
                    `;
  });
  getEle("tblDanhSachNguoiDung").innerHTML = content;
}

//Lay danh sach nguoi dung 

function getUsers() {
    userService.getListUsers()
        .then(function (listUsers) {
          listDataUser = listUsers.data;
            renderListUsers(listUsers.data);  
            setLocalStorage(listUsers.data);                   
         })
        .catch(function (err) {
      console.log(err);
        });
}

getUsers();

// search 

getEle('btnSearch').addEventListener('keyup', function () {
  
  var listUsers = getLocalStorage();
  
  var keySearch = getEle('btnSearch').value;
  var listSearch = userService.searchUser(keySearch, 'hoTen', listUsers)
  console.log(keySearch);
  renderListUsers(listSearch);
})


function setLocalStorage(listUsers) {
  localStorage.setItem('ListUsers', JSON.stringify(listUsers));
}

function getLocalStorage() {
  if (localStorage.getItem('ListUsers')) {
    return JSON.parse(localStorage.getItem('ListUsers'));
  }
}

getLocalStorage()


