/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length === 1) return 0;
    
    // l is buying, r is selling
    let l = 0, r = 1;
    let maxProfit = 0;
    
    while (l < r && r < prices.length) {
        if (prices[l] < prices[r]) {
            let profit = prices[r]-prices[l]
            maxProfit = Math.max(maxProfit, profit);
        } else {
            l = r;
        }
        r += 1;
    }
    
    return maxProfit;
};