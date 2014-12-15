var assert = require('assert');
var db = require('./db');
var repo = require('../repository');

before(function() {
	repo.getMembers();
});

describe('[CodeReviewMatchingPair]DbDataConfirmTest Test Suite', function() {
	describe('Total Member Count : Direct Query', function() {
		it('All Member is six', function(done) {
			db.query(
			   'SELECT *  FROM member', function(err, rows, fields) {
			     if(err) {
			       throw err;
			     }
			     
			     assert.equal(rows.length, 6);
			     done();
			    });   
		});
	});
	describe('CodeReview Member Data Confirm', function() {
		it('result count is 3, the key and value of the map is not the same', function(done) {
			db.query(
		      'SELECT first_id, after_id FROM member_match_list where DATE_ADD(create_date, INTERVAL 7 DAY) > NOW() AND create_date < NOW()', function(err, rows, fields) {
		        if(err) {
		          throw err;
		        }
		        
		        assert.equal(rows.length, 3);
		        
		        for(var i=0; i< rows.length; i++) {
		        	assert.notEqual(rows[i].first_id != rows[i].after_i, false);		        	
		        }
		        done();
		      });
		});
	});
	describe('Total Member Count : Other Module Called', function() {
		it('All Member is six', function() {
			assert.equal(repo.result.length, 6);			
		});
	});
});
