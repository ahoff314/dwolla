function idNumber(min, max) {
    var idPlease = (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0)
    + (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0) +
    (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0) +
    (Math.random() * (9 - 0) + 0).toFixed(0)+ (Math.random() * (9 - 0) + 0).toFixed(0) + (Math.random() * (9 - 0) + 0).toFixed(0);
    return idPlease
}

console.log(idNumber());