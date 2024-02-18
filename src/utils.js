const dbQueryCallback = (modelQueryFunction, ...args) => {
    return new Promise((resolve, reject) => {
        const callback = (err, data) => {
            if (err) {
                reject();
            } else {
                resolve(data);
            }
        };

        if(args.length > 0){
            modelQueryFunction(args, callback);
        }else{
            modelQueryFunction(callback);
        }
    });
};

module.exports = {
    dbQueryCallback
};