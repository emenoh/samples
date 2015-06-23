module.exports = function (app, config) {
  var appConfig = app.set('config')
  var serviceModel = app.getModel("Service")

  return app.getController("Application", true).extend()
  .methods({
    getCategoryById: function (req, res) {
    var module = this
    var cid = req.params.id
    var serviceURL = appConfig.domain+'/wcs/resources/store/'+store+'/categoryview/byId/'+cid
    //console.log('serviceURL', serviceURL)
    module.getServiceResponse(req,res,serviceURL)

    }
    ,
    getCategoryByParentId: function (req, res) {
    var module = this
    var cid = req.params.id
    var serviceURL = appConfig.domain+'/wcs/resources/store/'+store+'/categoryview/byParentCategory/'+cid
    //console.log('serviceURL', serviceURL)
    module.getServiceResponse(req,res,serviceURL)

    }
    ,

    getProductsByCategory: function (req, res) {
    var module = this
    var cid = req.params.id
    var serviceURL = appConfig.domain+'/wcs/resources/store/'+store+'/productview/byCategory/'+cid
    module.getServiceResponse(req,res,serviceURL)

    }
    ,
    getService: function(req, res){
      var module = this
      var query = require('url').parse(req.path, true).query
      var service = query['service']
      var langId = query['langId']
      var storeId = query['storeId']
      var catalogId = query['catalogId']


      switch(service) {
        case 'getProductByPartNumber':
        var partNumber = query['partNumber']
        var serviceURL = appConfig.domain+'/webapp/wcs/stores/servlet/FSAJAXService?service=getProductByPartNumber&langId='+langId+'&storeId='+storeId+'&catalogId='+catalogId+'&partNumber='+partNumber
        module.getServiceResponse(req,res,serviceURL)
        break
        case 'getMiniCart':
        var serviceName = 'MiniCart'
        module.getModelResponse(req,res,serviceName)
        break

      }

      

    }
    ,
    getServiceResponse: function(req,res,serviceURL){
      var module = this
      var result = ''
      var request = require("promised-io/http-client").request
      request({
        url: serviceURL,
        method: "GET", // optional
        headers: {
          'Content-Type': 'application/json'
        } // also optional
      }).then(function(response){
      //console.log(response.status)// -> http status code
      //console.log(response.headers)// -> http response headers
        response.on("data", function(chunk){
          result += chunk
        })
        response.on("end", function(){
          //console.log(result)
          result = JSON.parse(result)
          //result = JSON.stringify(result)

          module.json(res, result)

        })
    });


    }
    ,
    getModelResponse: function(req,res,serviceName){
      var module = this
      switch(serviceName){
      case 'MiniCart':
      module.snippet(res, 'MiniCart')
      break
      }

    }
    
  })
}
