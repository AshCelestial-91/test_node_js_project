module.exports.findName = function (value, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]['name'] === value) {
            return arr[i];
        }
    }
};