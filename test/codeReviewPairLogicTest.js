var assert = require('assert');
var pair = require('../pair');
var Map = require('./map');
var keys;

before(function() {
	pair.init();
    pair.prevPair = new Map();
    pair.result = new Map();
    
	pair.prevPair.put(1, 5);
	pair.prevPair.put(2, 6);
	pair.prevPair.put(3, 4);
	
	pair.fakeExtractPrevMembers();
	keys = pair.result.keys();
});

describe('[CodeReviewMatchingPair]PairLogicConfirm Test Suite', function() {
	describe('CodeReviewPair Result Confirm[1]', function() {
		it('The total number is 6', function() {
			var count = 0;
			for(var i=0; i< keys.length; i++) {
				var firstMemberId = keys[i];
				var secondMemberId = pair.result.get(keys[i]);
				
				if(isValidMemberId(firstMemberId)) {
					count++;
				}  					
				if(isValidMemberId(secondMemberId)) {
					count++;
				}  					
	        }
			
			assert.equal(count, 6);
		});
	});
	describe('CodeReviewPair Result Confirm[2]', function() {
		it('Comprises all the numbers 1 to 6, each number is not duplicated', function() {
			var result = false;
			var numbers = [1,2,3,4,5,6];
			
			for(var i=0; i< keys.length; i++) {
				var firstMemberIdIndex = numbers.indexOf(keys[i]);
				numbers.splice(firstMemberIdIndex, 1);

				var secondMemberIdIndex = numbers.indexOf(pair.result.get(keys[i]));
				numbers.splice(secondMemberIdIndex, 1);				
			}
			
			assert.equal(numbers.length, 0);
		});
	});
	describe('CodeReviewPair Result Confirm[3]', function() {
		it('result count is 3, the key and value of the map is not the same', function() {
			assert.equal(pair.result.size(), 3);
			
			for(var i=0; i< keys.length; i++) {
				assert.notEqual(keys[i] != pair.result.get(keys[i]), false);
	        }
		});
	});
});

function isValidMemberId(memberId) {
	if(memberId !== undefined && memberId !== null && (memberId >= 1 && memberId <= 6)) {
		return true;
	}
	
	return false;
}