module.exports = function (app, config) {
  var http = require('http')
  var _ = require('underscore')
  var Deferred = require("promised-io/promise").Deferred;
  var GroupDeferred = require("promised-io/promise").all
  var q = 0
  var count = 0
  var leftNavData = {}
	//klass inheritance
  return app.getModel("Application", true).extend(function () {
	
	// super class is automagically called

  })
  .methods({

  	getLeftNav: function(store){
  		
  		var module = this
  		var menu = module.getMyAccount()
  		return menu

  	}
  	
  	

})

}//end module