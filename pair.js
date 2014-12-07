var CodeReview = module.exports = {
  result: undefined,
  leftNumbers: [],
  prevPair: undefined,
  init: function() {
    var me = this;
    
    me.leftNumbers = []; 
  },
  clear: function() {
    var me = this;

    me.result.clear();
    me.prevPair.clear();
  },
  existLeftNumber: function(number) {
    var me = this;

    if(me.leftNumbers.length > 0) {
        for(var i=0; i<me.leftNumbers.length; i++) {
            if(number == me.leftNumbers[i]) {
                return true;
            }
        }
    }

    return false;
  },
  getRandomNumber: function(selectedNumber) {
    var me = this;

    var randomNumbers = [1,2,3,4,5,6];
    randomNumbers.splice(randomNumbers.indexOf(selectedNumber), 1);

    var prevPairNumber = me.prevPair.get(selectedNumber); 
    
    if(prevPairNumber !== undefined) {
      randomNumbers.splice(randomNumbers.indexOf(prevPairNumber), 1);
    }

    for(var i=0; i<me.leftNumbers.length; i++) {
        if(randomNumbers.indexOf(me.leftNumbers[i]) == -1) {
          continue;
        }

        randomNumbers.splice(randomNumbers.indexOf(me.leftNumbers[i]), 1);
    }
    
    if(randomNumbers.length == 3) {
         var deleteNumber = randomNumbers.slice(0);
         for(var i=0; i<randomNumbers.length; i++) {
              if(me.prevPair.get(randomNumbers[i]) !== undefined) {
                  var key = randomNumbers[i];
                  var value = me.prevPair.get(randomNumbers[i]);

                  deleteNumber.splice(deleteNumber.indexOf(key), 1);
                  deleteNumber.splice(deleteNumber.indexOf(value), 1);
                  break;
              }
         }

         randomNumbers.splice(randomNumbers.indexOf(deleteNumber[0]), 1);    
    }
    
    var randomNumbersCnt = randomNumbers.length;    
    var randomNumberIndex = Math.floor(Math.random() * (randomNumbersCnt - 1 + 1)) + 1;

    return randomNumbers[randomNumberIndex-1];   
  },
  fakeExtractPrevMembers: function() {
	  var me = this;
	  for(var i=1; i<=6; i++) {
	    if(me.existLeftNumber(i)) {
	        continue;
	    }

	    var randomNumber = me.getRandomNumber(i);
	    me.leftNumbers.push(i);
	    me.leftNumbers.push(randomNumber);

	    me.result.put(i, randomNumber);
	  }
  }
};
