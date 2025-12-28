class Solution:
    def findKthLargest(self, nums: List[int], k: int) -> int:
        import heapq

        min_heap = []

        for num in nums:
            heapq.heappush(min_heap, num)
            print(min_heap)
            if len(min_heap) > k:
                heapq.heappop(min_heap)
                print(min_heap)

        return min_heap[0]