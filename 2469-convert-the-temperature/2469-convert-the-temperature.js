/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function(celsius) {
    let array = [celsius + 273.15, celsius * 1.80 + 32.0];
    
    console.log(array);
    return array;
};