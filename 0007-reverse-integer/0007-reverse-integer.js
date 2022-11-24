/**
 * @param {number} x
 * @return {number}
 */
// var reverse = function(x) {
//     let MIN = Math.pow(2, 31) * (-1);
//     let MAX = Math.pow(2, 31) - 1;
    
//     let isNegative = false;
//     if (x<0) {
//         x *= (-1);
//         isNegative = true;
//     }
    
//     let result = 0;
//     while(x != 0) {
//         let digit = x % 10;
//         x = Math.floor(x / 10);
//         console.log(x);
    
//         if ((result > Math.floor(MAX / 10)) || 
//            ((result == Math.floor(MAX /10)) && (digit >= MAX % 10))
//            )
//             return 0;
//         else if ((result < Math.floor(MIN /10)) ||
//                 ((result == Math.floor(MIN/10)) && (digit <= MIN % 10))
//                  )
//             return 0;
//         result = (result * 10) + digit;
//     }
    
//     return result;
// };

var reverse = function(x) {
    let MIN = Math.pow(2, 31) * (-1);
    let MAX = Math.pow(2, 31) - 1;
    
    let result = 0;
    while(x != 0) {
        let digit = x % 10;
        if (x > 0)
            x = Math.floor(x / 10);
        else 
            x = Math.ceil(x/10);
    
        if ((result > (MAX / 10)) || 
           ((result == (MAX /10)) && (digit >= MAX % 10))
           )
            return 0;
        else if ((result < (MIN /10)) ||
                ((result == (MIN/10)) && (digit <= MIN % 10))
                 )
            return 0;
        result = (result * 10) + digit;
        if (result > 0)
            result = Math.floor(result);
        else 
            result = Math.ceil(result);
    }
    
    return result;
};