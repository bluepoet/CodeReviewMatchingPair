var pair = require('./pair');
var schedule = require('node-schedule');

var mysql = require('mysql')
  , DATABASE = 'test'
  , TABLE = 'test'
  , client = mysql.createConnection({
     host: 'test.com'
    ,user: 'test'
    ,password: 'test1111'
    ,multipleStatements: true
});

client.query('USE ' + DATABASE);

var mysqlUtil = module.exports = {
  result:undefined,
  viewMembers: function(res) {
 client.query(
   'SELECT first_id, after_id FROM ' + TABLE + ' where DATE_ADD(create_date, INTERVAL 7 DAY) > NOW() AND create_date < NOW();select * from member order by id', function(err, rows, fields) {
     if(err) {
       throw err;
     }
    
     res.render('userList', {
       users: rows[1],
       prevUsers: rows[0],
       title: 'Listing Developmemt Team CodeReview Matching Result'
    });   	
    });     
  },
  getMembers: function() {
 client.query(
   'SELECT *  FROM member', function(err, rows, fields) {
     if(err) {
       throw err;
     }
     
     return rows;
    });     
  },
  extractPrevMembers: function() {
    var me = this;

    client.query(
      'SELECT first_id, after_id FROM ' + TABLE + ' where DATE_ADD(create_date, INTERVAL 7 DAY) > NOW() AND create_date < NOW()', function(err, rows, fields) {
        if(err) {
          throw err;
        }
        
	if(rows.length == 3) {
          pair.init();
          pair.prevPair = new Map();
          pair.result = new Map();
          
          pair.prevPair.put(rows[0].first_id,rows[0].after_id);
          pair.prevPair.put(rows[1].first_id,rows[1].after_id);
          pair.prevPair.put(rows[2].first_id,rows[2].after_id);
 
	  for(var i=1; i<=6; i++) {
	    if(pair.existLeftNumber(i)) {
	        continue;
	    }

	    var randomNumber = pair.getRandomNumber(i);
	    pair.leftNumbers.push(i);
	    pair.leftNumbers.push(randomNumber);

	    pair.result.put(i, randomNumber);
	  }
          
          me.result = pair.result;
	}
   });
  },
  insertPrevMembers: function() {
    var me = this;
   
    client.query('insert into ' + TABLE + ' values('+me.result.keys()[0]+', '+me.result.values()[0]+', NOW());insert into ' + TABLE + ' values('+me.result.keys()[1]+', '+me.result.values()[1]+', NOW());insert into ' + TABLE + ' values('+me.result.keys()[2]+', '+me.result.values()[2]+', NOW())', function(err) { if(err) { throw err; } });
  } 
};

var rule = new schedule.RecurrenceRule();
var j = schedule.scheduleJob({hour:0, minute:0, second:30, dayOfWeek: 1}, function() {
  mysqlUtil.extractPrevMembers();
});


var k = schedule.scheduleJob({hour:0, minute:1, second:0, dayOfWeek: 1}, function() {
  mysqlUtil.insertPrevMembers();
});

var Map = function(){
 this.map = new Object();
};  

Map.prototype = {   
    put : function(key, value){   
        this.map[key] = value;
    },   
    get : function(key){   
        return this.map[key];
    },
    containsKey : function(key){    
     return key in this.map;
    },
    containsValue : function(value){    
     for(var prop in this.map){
      if(this.map[prop] == value) return true;
     }
     return false;
    },
    isEmpty : function(key){    
     return (this.size() == 0);
    },
    clear : function(){   
     for(var prop in this.map){
      delete this.map[prop];
     }
    },
    remove : function(key){    
     delete this.map[key];
    },
    keys : function(){   
        var keys = new Array();   
        for(var prop in this.map){   
            keys.push(prop);
        }   
        return keys;
    },
    values : function(){   
     var values = new Array();   
        for(var prop in this.map){   
         values.push(this.map[prop]);
        }   
        return values;
    },
    size : function(){
      var count = 0;
      for (var prop in this.map) {
        count++;
      }
      return count;
    }
};
