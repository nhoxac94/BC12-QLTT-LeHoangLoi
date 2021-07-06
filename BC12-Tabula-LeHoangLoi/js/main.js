function getEle (id) {
    return document.getElementById(id);
}

var userService = new UserService();

// Lấy danh sách người dùng

function getUsers() {
    userService.getListUsers() 
    .then(function(listUsers) {
        renderTeacher(listUsers.data);
        
    })
    .catch(function(error) {
        console.log(error);
    })
}

getUsers();

function renderTeacher(listUsers) {
    var content = ''; 
    var listTeacher = listUsers.filter(function(user) {
        return user.loaiND.includes('GV')
    })
    listTeacher.map(function(teacher) {
        content += `        
        <div class="teammate__item col-6 col-lg-3">
          <div class="teamamate__wrapitem">
            <div class="teammate__avata">
              <img src="${teacher.hinhAnh}" alt="">
            </div>
            <div class="teammate__description">
              <p>${teacher.ngonNgu}</p>
              <h3>${teacher.hoTen}</h3>
              <p>${teacher.moTa}</p>
            </div>      
          </div>              
        </div>
        
        
        
        
                   `
    })

    getEle('teacherTeam').innerHTML = content;
}