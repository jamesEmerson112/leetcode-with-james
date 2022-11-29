/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    if(!head) {
        return head;
    }
    
    while(head) {
        if (head.val === val) {
            if (head.next)
                head = head.next;
            else {
                head = null;
            }
        }
        else
            break;
    }
    
    let current = head;
    let prev = head;
    
    while(current) {
        let next = current.next;
        
        if (current.val === val) {
            prev.next = next;
        } else {
            prev = current;
        }
        
        current = next;
    }
    
    return head;
};