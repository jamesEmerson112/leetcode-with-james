/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 1)  return nums;
    
    let count = 1;
    let left = 1;
    let right = 1;
    while(right < nums.length) {
        if (nums[right-1] < nums[right]) {
            nums[left] = nums[right];
            left += 1;
        }
        
        // increment right
        right += 1;
    }
    
    return left;
};