module.exports = function (app, config) {

  return app.getController("Application", true).extend()
  .methods({
    index: function (req, res) {

    	var model = app.getModel('User')

    	console.log(model)

    	var users = model.list()

    	this.render(res, 'users', users)

    }
    ,id: function (req, res) {
    	//var model = require('../models/UserModel.js')
    	var model = app.getModel('User')
    	var id = req.params.id
    	//console.log(req)
    	
    	//console.log(model)

    	var user = model.find(id)

    	console.log(user)

    	this.render(res, 'user', user)
	    
    }
  })

}