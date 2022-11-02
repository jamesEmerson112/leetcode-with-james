/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    if(!head) return head;
    else if (!head.next) return head;
    
    let result = new ListNode(head.val);
    let current = head.next;
    
    while(current) {
        let temp = new ListNode(current.val);
        temp.next = result;
        result = temp;
        current = current.next;
    }
    
    return result;
};