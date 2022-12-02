/**
 * @param {string[]} emails
 * @return {number}
 */
var numUniqueEmails = function(emails) {
    let hash = {};
    let test = "Hello 12345"
    for (let email of emails) {
        let [local, domain] = email.split('@');
        local = local.split(/[+]/)[0].split('.').join('');
        local += '@' + domain;
        console.log(local);
        if (!hash.hasOwnProperty(local)) {
            hash[local] = 1;
        } else {
            hash[local] += 1;
        }
    }
    
    return Object.keys(hash).length;
};