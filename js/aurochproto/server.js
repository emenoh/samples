var matador = require('matador')
  , env = process.env.NODE_ENV || 'development'
  , argv = matador.argv
  , config = require('./app/config/' + env)
  , app = matador.createApp(__dirname, config, {})
  , port = argv.port || process.env.PORT || 3000

// Register the matador cache helper.
app.registerHelper('Cache', matador.helpers.CacheHelper)

app.configure(function () {

  app.set('view engine', 'html')
  app.register('.html', matador.engine)

  // Use the cache helper's no-cache middleware.
  app.use(app.getHelper('Cache').auditHeadersMiddleware)
  app.use(app.getHelper('Cache').noCacheMiddleware)

  app.use(matador.cookieParser())
  app.use(matador.session({secret: 'boosh'}))

  // TODO: Add JSON body parser middleware
  app.use(app.requestDecorator())
  app.use(app.preRouter())
})

app.configure('development', function () {
  app.use(matador.errorHandler({ dumpExceptions: true, showStack: true }))
  app.set('soy options', {
    eraseTemporaryFiles: true
    , allowDynamicRecompile: true
  })
  //Add access to config object from application
  app.set('config', config)
})

app.configure('production', function () {
  app.use(matador.errorHandler())
  //Add access to config object from application
  app.set('config', config)
})

app.configure(function () {
  app.use(app.router({}))
  //app.use('/data', matador.static(__dirname + '/data'))
  /*attempt at rewrite rule. May not work with static assets
  app.use(function(req, res, next) {
  var regex = /^(.+)\.(\d+)\.(js|css|png|jpg|gif)$/
  var url = req.url
  console.log(url)
  var newUrl = url.replace(regex, "$1.$3")
  console.log(newUrl)
  req.url = newUrl
  next();
  })
  */
  //app.use('/wcsstore', matador.static(__dirname + '/wcsstore'))


})

app.prefetch()
app.mount()
app.listen(port)
console.log('matador running on port ' + port)
