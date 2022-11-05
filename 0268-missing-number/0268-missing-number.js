/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    let sum = 0;
    for (let i = 0; i <= nums.length; i += 1) {
        sum += i;
    }
    
    for (let i in nums) {
        sum -= nums[i];
    }
    
    console.log(sum);
    
    return sum;
};