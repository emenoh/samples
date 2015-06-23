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
  		
  		var serviceURL = 'http://www.fossil.com/wcs/resources/store/'+store+'/categoryview/@top'

 		module.getResult(serviceURL, buildMenu, leftNavData)
 		
 			
		  	function buildMenu(results){

		  		var data = results.data
		  		var parent = results.parent
		  		var catalog = data.CatalogGroupView

		  			var FSSC = /^FSSC/
		  			var FSSCHidden = /^(?!FSSCHidden).+/
		  		catalog = _.filter(catalog, function(cat){
		  			return cat.identifier.match(FSSC)

		  		})

		  		catalog = _.filter(catalog, function(cat){
		  			return cat.identifier.match(FSSCHidden)

		  		})

		  		_.each(catalog, function(cat){
		  			//console.log(cat.identifier)
		  			if (cat.identifier == 'FSSCWomens'){
		  				cat.productsURL = '/en_US/shop/women'
		  				cat.dept = 'women'
		  			}else if (cat.identifier == 'FSSCMens'){
		  				cat.productsURL = '/en_US/shop/men'
		  				cat.dept = 'men'
		  			}else{
		  				cat.dept = parent.dept
		  				cat.productsURL = '/en_US/shop/'+cat.dept+'/'+cat.name+'/'+cat.uniqueID+'?categoryId='+cat.uniqueID+'&parent_category_rn='+parent.uniqueID
		  			}
		  		})

		  		if(parent.subMenu === true){
		  		
		  		var catLength = catalog.length
		  		/*set up countdown for nested categories*/
		  		q += catLength
		  		
		  		var menu = parent.menu = []

		  		for(i=0; i < catLength; i++){
		  			var name = catalog[i].identifier
		  			var id = catalog[i].uniqueID
		  			/*decrement nested categories count*/
		  			q--
		  				
			  			menu.push(catalog[i])
			  			var serviceURL = 'http://www.fossil.com/wcs/resources/store/'+store+'/categoryview/byParentCategory/'+id
	 					module.getResult(serviceURL, buildMenu, catalog[i], name)
	 					//console.log(catalog[i])
	 					
		  			}
		  		}
		  		//console.log(parent)

		  	}
		  

  	}
  	, checkCount: function(){
  			//console.log("q: ",q)
  			//console.log("count: ", count)
  		if(q == 0){
  			/*decrement request count */
  			count--
  			//console.log("q: ",q)
  			//console.log("count: ", count)
		  	if(count == 0){
		  		leftNavData.strings = data.leftNavStrings
		  		leftNavData.extras = data.leftNavExtras
		  		//console.log("leftNavData 0: ",leftNavData)
		  		leftNavDeferred.resolve(leftNavData)
		  	}
		  	//
		  
		}

  	}

  	, getResult: function(serviceURL, callback, obj){

  		var module = this
  		/*increment request count */
  		count++
  		
  		//temporary fixture to prove out model
  		//return require('../models/fixtures/subcategory/'+id+'.json')
  		var data = ''
		var request = require("promised-io/http-client").request;
		request({
		  url: serviceURL,
		  method: "GET", // optional
		  headers: {
		  	'Content-Type': 'application/json'
		  } // also optional
		}).then(function(response){
		  //console.log(response.status)// -> http status code
		  //console.log(response.headers)// -> http response headers
		  if(response.status == 200){
		  obj.subMenu = true
		  response.on("data", function(chunk){
		  	data += chunk
		  })
		  response.on("end", function(){
		  	var results = {}
		  	results.data = JSON.parse(data)
		  	results.parent = obj
		  	callback(results)
		  	module.checkCount()
		  })
		  response.on("error", function(e){
		  	console.log("error: "+e.message)
		  })
		}else{
			
			obj.subMenu = false
  			module.checkCount()
			return
		}
		});

  	}
  	

})

}//end module