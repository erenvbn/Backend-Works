module.exports.getDate = getDate;
console.log(module.exports);

function getDate() {
    let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    let today = new Date();
    let todayString = today.toLocaleDateString("en-US", options);
    return todayString;
};


exports.getDay = function () {
    let options = {
        weekday: 'long',
    };
    let today = new Date();
    let todayString = today.toLocaleDateString("en-US", options);
    return todayString;
 }; 
