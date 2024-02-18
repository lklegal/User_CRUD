const fetchUsers = (model) => {
    return new Promise((resolve, reject) => {
        model.listAllUsers((err, data) => {
            if (err) {
                reject();
            } else {
                resolve(data);
            }
        });
    });
};

module.exports = {
    fetchUsers
};