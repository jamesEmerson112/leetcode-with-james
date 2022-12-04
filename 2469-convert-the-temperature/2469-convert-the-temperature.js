/**
 * @param {number} celsius
 * @return {number[]}
 */
var convertTemperature = function(celsius) {
    let kelvin = celsius + 273.15;
    let fahrenheit = celsius * 1.80 + 32.0;
    let array = [kelvin, fahrenheit];
    
    console.log(array);
    return array;
};