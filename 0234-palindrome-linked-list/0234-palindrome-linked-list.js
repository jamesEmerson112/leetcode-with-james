/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    if (!head) {
        return false;
    }
    
    let array = [];
    let current = head;
    
    while (current) {
        array.push(current.val);
        current = current.next;
    }
    /////////////////////////
    let left = 0;
    let right = array.length-1;
    
    while(left <= right) {
        if (array[left] !== array[right]) return false;
        left += 1;
        right -= 1;
    }
    
    return true;
};