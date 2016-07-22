(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    var len = array.length;
    var begin = len-n < 0 ? 0 : len-n;
    return n === undefined ? array[len-1] : array.slice(begin,len);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (collection instanceof Array){
      for (var i=0; i<collection.length; i++){
        var value = collection[i];
        iterator(value, i , collection);
      }
    }
    else{
      for (var key in collection){
        var value = collection[key];
        iterator(value, key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
     var result = [];
     _.each(collection, function(entry){
      if(test(entry)){
        result.push(entry);
      }
     });
     return result;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var filtered = _.filter(collection, test);
    var rejected = _.filter(collection, function(entry){
      return _.indexOf(filtered, entry) === -1;
    });

    return rejected;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var uniques = [];
    _.each(array, function(entry){
      if(_.indexOf(uniques, entry) === -1){
        uniques.push(entry);
      }
    });
    return uniques;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {

    var mapped = [];

    _.each(collection, function(entry){
      mapped.push(iterator(entry));
    });

    return mapped;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {

    var reduced = accumulator === undefined ? collection[0] : accumulator;
    var bool = accumulator === undefined;

    _.each(collection, function(entry, index){
        if(bool && index===0);  
        //This should check whether the first array entry needs to be skipped during the reducing or not
        else{
          reduced = iterator(reduced, entry);
        }
    });

    return reduced;

  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {

    var iterator = iterator === undefined ? _.identity : iterator;
    //Defaults to identity function when iterator is not supplied. This is not useful, but will save an error from happening.

    return _.reduce(collection, function(wasFound, item) {
      if (!wasFound) {
        return false;
      }
      return Boolean(iterator(item));  //We must cast each iterator call into a boolean
    }, true);

    //Flipped logic on if statement, now if one call to iterator produces false, the chain breaks
    
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {

    var iterator = iterator === undefined ? _.identity : iterator;

    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return Boolean(iterator(item));  //We must cast each iterator call into a boolean
    }, false);

    // TIP: There's a very clever way to re-use every() here.
    //Could not figure out how to do this.

  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {

    _.each(arguments, function(entryobj,index){
      if(index===0);  //So superfluous overwriting doesn't happen on the first arg
      else{
        for(var key in entryobj){
          obj[key] = entryobj[key];
        }
      }
    });

    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    _.each(arguments, function(entryobj,index){
      if(index===0);  //So superfluous overwriting doesn't happen on the first arg
      else{
        for(var key in entryobj){
          if(obj[key] === undefined)
            obj[key] = entryobj[key];
        }
      }
    });

    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.

        //After learning about 'this', the keyword refers to when the enclosing
        //function is called at runtime. This is in the test suite assertion, after
        //assigning a function var 'add' to the closure. In this case 'this' is not bound to
        //any specific object. The reason why .apply is useful is because of the way it
        //passes along the arguments object. If we just called func(arguments), the func
        //would get all the args, but only as a single array arg [x,y,z]. Of course we could
        //manually grab all the args and call them normally, but there is really
        //no other good way to pass along an arbitrary number of args.
        result = func.apply(this,arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {

    var calledArgs = [];
    var savedResults = [];
    var result;

    return function(){

      var stringedArgs = JSON.stringify(arguments)
    
      if(!(_.contains(calledArgs, stringedArgs))){
        result = func.apply(this, arguments);
        calledArgs.push(stringedArgs);
        savedResults.push(result);
        return result;
      }
      else{
        return savedResults[_.indexOf(calledArgs,stringedArgs)];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    

    var newArgs = [];
    for (var i=0; i<arguments.length; i++){
      if( i !== 0 && i !== 1){
        newArgs.push(arguments[i]);
      }
    }
    //Grabbing all args that need to be passed to func

    return setTimeout(function(){
      return func.apply(this, newArgs);   
      //func must be wrapped, otherwise the call to func will be attempted when set timeout is interpreting it's args
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {

    var copyArr = array.slice(0);
    var newArr = [];

    while(copyArr.length > 0){
      var random = Math.floor(Math.random()*copyArr.length);
      newArr = newArr.concat(copyArr.splice(random, 1));
    }

    return newArr;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    
    //First check whether a method string or a function is provided
    if(typeof functionOrKey === 'function'){
      //Loop through each entry in the collection
      _.each(collection, function(entry, index, collection){
        //Applies the function to the entry ('this' in the applied function becomes entry)
        //Invoke is only to be used when the function passed makes use of the this keyword
        //to perform a method or chain of methods.

        //ex: function(){
        //      return this.split('').reverse().join('');
        //    }
          var processed = functionOrKey.apply(entry,args)
        

        //Reassign
        collection[index] = processed;
      });
      return collection;
    }

    else if(typeof functionOrKey === 'string'){
      _.each(collection, function(entry, index, collection){
        //Using bracket property lookup, then evalate with any args given
        //Must check if the given property is indeed a method, and just
        //access it as a property if not
        if(typeof entry[functionOrKey] === 'function')
          var processed = entry[functionOrKey](args);
        else
          var processed = entry[functionOrKey];
        collection[index] = processed;
      });
      return collection;
    }

    //Ensures that return is undefined if functionOrKey is not string or func
    else;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator, iteratorArgs) {

    //Re-use invoke logic here, but apply is not needed because we
    //are not calling a method or series of methods on each entry, just
    //pasing it to a transforming function.

    function sorter(entry){
      if(typeof iterator === 'function'){
        return iterator(entry);
      }
      else if (typeof iterator === 'string'){
        if(typeof entry[iterator] === 'function')
          return entry[iterator](iteratorArgs);
        else
          return entry[iterator];
      }
      else;
    }

    var bool = true;

    //For logic, we swap entried when one is larger than the other, and the array
    //passed through over and over until no swaps are made
    while(bool){
      bool = false;
      _.each(collection, function(entry, i, collect){
        
        var current = sorter(entry);

        //Don't comput next if we're at the end of the array
        //It will error out otherwise
        if(i<collect.length-1){
          var next = sorter(collect[i+1]);
        }

        //Logic must be able to handle values of undefined, making them
        //float to the end
        if((current !== undefined && current > next)||
            current === undefined && next !== undefined){
          var temp = collect[i];
          collect[i] = collect[i+1];
          collect[i+1] = temp;
          bool = true;
        }
      });
    }

    return collection;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    
    var zipped = [];
    var outsideArgs = arguments;
    //Assigning to another var so that passing to nested _.each works as expected


    var largest = function(biggest, current){
      if (current.length > biggest.length) return current;
      else return biggest;
    };

    var largestArr = _.reduce(arguments, largest);
    //Find the longest arg, so we can iterate through all indices that will be in the output array

    _.each(largestArr, function(entry,i) {
      zipped.push([]);
      //Initialize new inner array
      _.each(outsideArgs, function(singleArg){
        zipped[i].push(singleArg[i]);
        //Adds arg entry of the working index
      });
    });

    return zipped;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {

      var result = [];
      //Initially tried to pass along result through the recursive call stack,
      //which worked fine in a sandbox but not in the SpecRunner... weird

      _.each(nestedArray, function(entry, index){
          if(entry instanceof Array)
            result = result.concat(_.flatten(entry));
            //Call flatten recursively if the entry turns out to be an array
            //Then concat it to the results and reassign

          else 
            result.push(entry);
            //If it's not an array just push it into results
      });

      return result;

  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    
    var outerArgs = arguments,
        intersect = [],
        firstArr = arguments[0];

    //Loop through each entry in the first array
    _.each(firstArr, function(entry){

      //Initial bool is true
      var bool = true;

      //For each entry in the first array, check each entry in the other args
      //Using _.contains to check instead of indexOf
      _.each(outerArgs, function(array){

        //Logic is set up such that the first time it is found that the entry
        //is not shared in an arg, bool = false and no more args are checked
        if(bool && !(_.contains(array, entry)))
          bool = false;

      });

      //If bool never gets set to false it pushes to results
      if (bool) intersect.push(entry);

    });

    return intersect;

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

    //Same logic here as intersection, although we cannot re-use code
    var diff = [];  
    var newArgs = [];
    _.each(arguments, function(entry, i){
      if( +i !== 0 ) newArgs.push(entry);
    });

    _.each(array, function(entry){

      var bool = true;

      _.each(newArgs, function(checkArr){

        if(bool && _.contains(checkArr, entry))
          bool = false;

      });

      if (bool) diff.push(entry);

    });

    return diff;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

    //Storing these two variables in a closure, so they can be accessed on multiple
    //function calls
    var called = false;
    //var timedOut = true;
    var result;


    return function(){

      if(!called){
        //First case: timer expired. Call immediately then set timer

        called = true;
        //timedOut = false;
        result = func.apply(this, arguments);
        setTimeout(function(){
          called = false;
          //timedOut = true;
        }, wait);

        return result;
      } 
      //Instructions say to create a thrid option where the next call is scheduled,
      //but the test suite suggests this is not the case.

      // else if (called && timedOut){
      //   //Second case: 
      //   timedOut = false;
      //   setTimeout(function(){
      //     called = false;
      //     timedOut = true;
      //     return func.apply(this, arguments);
      //   }, wait);
      //   return result;
      // } 

      //When the function has already been called, it cannot be called again
      //until the timeout changes the boolean back to false
      else {
        return result;
      }

    };
  };
}());
