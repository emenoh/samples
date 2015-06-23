module.exports = function (app, config) {

var users = require('../models/fixtures/user.json')
/*
var users = {'users': [
	  	{
	  	'id': '1'
		,'first':'Jimmy'
		,'last':'Hatfield'
		,'age':'34'
		}
		, 
		{
		'id' : '2'
		,'first':'James'
		,'last':'Hatfield'
		,'age':'34'
		}
	]
}
*/
	//klass inheritance
  return app.getModel("Application", true).extend(function () {
	
	// super class is automagically called

  })
	.methods({
  	find: function(id){
	console.log(users)
	return users.users[id-1]
  	
  	}
  	,
  	list: function(){
	return users
  	}
  	
})

}//end module