class Solution:
    def merge(self, nums1: List[int], m: int, nums2: List[int], n: int) -> None:
        """
        Do not return anything, modify nums1 in-place instead.
        """

        # edge case if length of nums1 is equal to length of nums2
        if m == n:
            for i in range(n):
                nums1[i] = nums2[i]
            return nums1

        # store top and last number of nums 1
        # store top and last number of nums 2
        # if last of nums2 < first of nums1, place nums1 at the start of nums2 (or place elments of nums1 into the beginning of nums2)
        # if first of nums1 > last of nums2, place nums2 at the end of nums1
        # once added into nums1 together, also remove any elements that are 0 from nums1

        # The array nums1 has a total length of (m+n), 
        # with the first m elements containing the values to be merged, 
        # and the last n elements set to 0 as placeholders.
        # therefore last 1 is not the last element of nums1
        # but it is the m-1-nth element of nums1

        top1, last1 = nums1[0], nums1[m - n]
        top2, last2 = nums2[0], nums2[n - 1]

        print(top1, last1, top2, last2)


        if last2 < top1:
            # place elements of nums1 at the start of nums2
            for i in range(m - 1, -1, -1):
                nums1[i + n] = nums1[i]
            for j in range(n):
                nums1[j] = nums2[j]

        elif top1 > last2:
            # place elements of nums2 at the end of nums1
            for i in range(n):
                nums1[m + i] = nums2[i]

        return nums1