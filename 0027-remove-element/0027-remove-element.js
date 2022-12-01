/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    // two pointers
    
    let left = 0;
    
    for (let right = 0; right < nums.length; right += 1) {
        if (nums[right] != val) {
            nums[left] = nums[right]
            left += 1;
        }
    }
    
    return left;
};