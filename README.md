# Factors and Caching

Input: Given an array of integers

Output: In whatever representation you wish, output each integer in the array and all the other integers in the array that are
factors of the first integer.  

```
Example:

  Given an array of [10, 5, 2, 20], the output would be:

  {10: [5, 2], 5: [], 2: [], 20: [10,5,2]}
```

### Run `npm test`

## Additional Questions

1. *What if you were to cache the calculation, for example in the file system.  What would an example implementation of the cache look like?  By cache I mean, given an array input, skip the calculation of the output if you have already calculated the output at least once already.*

  * It depends on how long-lived the cache should be and to whom it should be available and in what context. Assuming it was to be available to all users that attempt to input the same array, I would use some key-value persistence layer like redis or memcached. You could make the key some combination of the digit in question, and the raw array; perhaps something like `fastHash("10[10, 5, 2, 20]")` that way it's unique to the digit/array in question.  Given that, you could query the store for `fastHash("10[10, 5, 2, 20]")` and it would return [5, 2]; however if you tried to hit it with `fastHash("10[5, 2]")` even though the answer would be the same, it wouldn't hit the cache because the array is different.

2. *What is the performance of your caching implementation?  Is there any way to make it more performant.*

  * Performance should be amortized constant (O(1)) for writing/reading to/from the key-value store, but would take up O(N) additional space in memory. It might be faster without the hashing, it also has the drawback of expecting the array to be in the same order, so if you sort before hashing that adds run-time complexity of O(Nlog(N)) on what would hopefully be small sets. It would probably be faster to create an object/hash that has the values of the array as the keys, with nothing in the value; using that for the fastHash would be O(N) to create the new mapping and would handle cases where the results from [2, 2, 4, 8] would output the same structure as [2, 4, 8].
    * For example: [2, 2, 4, 8] => { 2: null, 4: null, 8: null }, so you could `fastHash("2{2:null,4:null,8:null}")`.

3. *What if you wanted to reverse the functionality.  What if you wanted to output each integer and all the other integers in the array that is the first integer is a factor of I.E:*

```
  Given an array of [10, 5, 2, 20], the output would be:

  {10: [20], 5: [10,20], 2: [10, 20], 20: []}
```

Would this change your caching algorithim?

With caching, the output should be the same except the calculations are not performed.

  * The caching algorithm would have to change to either write to another key-value store with the opposite requirements, or I imagine some sort of graphing solution would do; where when first iterating over an array you could create a node for each value in the array that has edges to the values that it is a factor of and edges to the values that has it as a factor. This would require more thought, but that's my gut instinct. It would be difficult to go into more detail unless I began trying to implement it.
