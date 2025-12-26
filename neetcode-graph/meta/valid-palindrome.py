class Solution:
    def validPalindrome(self, s: str) -> bool:
        # check if a string is a palindrome
        # two pointer approach
        if not s:
            return False
        
        if len(s) < 2:
            return True

        skipped = False

        def is_palindrome_range(i, j):
            while i < j:
                if s[i] != s[j]:
                    # we allow for one mismatch
                    # either skip the left character or the right character
                    if s[i + 1] == s[j]:
                        if s[i] == s[j - 1]:
                            # we can continue
                            # mark skipped = True
                            skipped = True
                        else:
                            return False
                    else:
                        return False
                i += 1
                j -= 1

        # hint: we can just check the whole string once, and if we find a mismatch, we can check the two substrings
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                # check the two substrings
                return is_palindrome_range(left + 1, right) or is_palindrome_range(left, right - 1)
            left += 1
            right -= 1

            return True
        
        return False