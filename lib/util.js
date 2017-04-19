exports.dataToString = data => {
    if (data instanceof Object) {
        data = JSON.stringify(data, null, 2);
    }
    return data.toString();
};
