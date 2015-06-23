module.exports = function (app, config) {
  return app.getController("Application", true).extend()
  .methods({
    index: function (req, res) {
      var data = {title: 'The Matador Framework'}
      data.cool = 'asdfasdfdsa'
      data.sport = 'sport thing'
      var query = require('url').parse(req.path, true).query
      if (query.fragment) data.layout = false
      this.render(res, 'index', data)
    }
    
  })
}
