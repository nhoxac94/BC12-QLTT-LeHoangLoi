function UserService () {
    this.getListUsers = function () {
        return axios({
            url: 'https://60dbdc30c2b6280017feb50c.mockapi.io/users',
            method: 'GET',
        });
    };

    this.addUser = function(user) {
        return axios({
            url: 'https://60dbdc30c2b6280017feb50c.mockapi.io/users',
            method: 'POST',
            data: user,
        })
    }

    this.deleteUser = function(id) {
        return axios({
            url: `https://60dbdc30c2b6280017feb50c.mockapi.io/users/${id}`,
            method: 'DELETE',
        })
    }

    this.reviewUser = function(id) {
        return axios({
            url: `https://60dbdc30c2b6280017feb50c.mockapi.io/users/${id}`,
            method: 'GET',
        })
    }

    this.changeInforUser = function(id, user) {
        return axios({
            url: `https://60dbdc30c2b6280017feb50c.mockapi.io/users/${id}`,
            method: 'PUT',
            data: user,
        })
    }

    this.searchUser = function (value, itemSearch, listUsers) {
        return listUsers.filter(function (user) {
            return user[itemSearch].toLowerCase().includes(value.toLowerCase());
            
        })
    }
}

