var assert = require('assert');
var pair = require('../pair');
var Map = require('./map');

before(function() {
	pair.init();
    pair.prevPair = new Map();
    pair.result = new Map();
    
	pair.prevPair.put(1, 5);
	pair.prevPair.put(2, 6);
	pair.prevPair.put(3, 4);
});

describe('[CodeReviewMatchingPair]PairLogicConfirm Test Suite', function() {
	describe('CodeReviewPair Result Confirm', function() {
		it('result count is 3, the key and value of the map is not the same', function() {
			pair.fakeExtractPrevMembers();
			
			assert.equal(pair.result.size(), 3);
			
			var keys = pair.result.keys();
			for(var i=0; i< keys.length; i++) {
				assert.notEqual(keys[i] != pair.result.get(keys[i]), false);
	        }
		});
	});
});
