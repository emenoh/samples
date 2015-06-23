module.exports = function (app, config) {


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

}//end module