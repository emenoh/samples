module.exports = function (app, config) {
  var http = require('http')
  var _ = require('underscore')
  var pSize = '292'
	//klass inheritance
  return app.getModel("Application", true).extend(function () {
	
	// super class is automagically called

  })
  .methods({
  	getSubCats: function(cid, store){

  		//temporary fixture to prove out model
  		//return require('../models/fixtures/subcategory/'+id+'.json')

		var serviceURL = 'http://www.fossil.com/wcs/resources/store/'+store+'/categoryview/byParentCategory/'+cid
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
		  response.on("data", function(chunk){
		  	data += chunk
		  })
		  response.on("end", function(){
		  	//console.log(data)
		  	var category = JSON.parse(data)

		  	//console.log("getSubCats End event")
		  	getSubCatsDeferred.resolve(category)


		  })
		  return getSubCatsDeferred.promise
		});


  	}
  	,
  	getCategory: function(cid, store){

  		//temporary fixture to prove out model
  		//return require('../models/fixtures/categoryview/'+id+'.json')

  		var serviceURL = 'http://www.fossil.com/wcs/resources/store/'+store+'/categoryview/byId/'+cid
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
		  response.on("data", function(chunk){
		  	data += chunk
		  })
		  response.on("end", function(){
		  	//console.log(data)
		  	var category = JSON.parse(data)

		  	//console.log("getCategory End event")
		  	categoryDeferred.resolve(category)


		  })
		  return categoryDeferred.promise
		});

  	}
  	,
  	getProductsByCategory: function(cid,store,gender,cat){

  		//temporary fixture to prove out model
  		//return require('../models/fixtures/productview/'+id+'.json')
  		var module = this
  		var serviceURL = 'http://www.fossil.com/wcs/resources/store/'+store+'/productview/byCategory/'+cid
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
		  response.on("data", function(chunk){
		  	data += chunk
		  })
		  response.on("end", function(){
		  	//console.log(data)
		  	var category = JSON.parse(data)
		  	  		_.each(category.CatalogEntryView, function(product){

			  			product.xcatentry_Offerprice =  Number(product.xcatentry_Offerprice).toFixed(0)
			  			product.imageURI = '//s7d1.fossil.com/is/image/FossilPartners/'+product.fullImage+'_main?$fossilResponsive_thumb$&wid='+pSize+'&hei='+pSize
			  			product.imageSize = pSize

			  			var swatchObject = product.xcatentry_ColorSwatch
		  	  			product.swatches = []
		  	  			product.swatchList = ''
			  			//console.log(swatchObject);
			  			if(swatchObject !== undefined){
			  				swatchObject = swatchObject.split(',')
			  				//console.log(swatchObject)
			  				var swatchListArray = []
			  				_.each(swatchObject, function(part, i, list){
			  					//console.log("count: ", i, "length: ", list.length)
			  					var swatch = {}
			  					swatch.sku = part.split(':')[1].replace('_swatch','')
			  					swatch.name = part.split(':')[0]
			  					product.swatches.push(swatch)
			  					swatchListArray.push(swatch.sku)
			  				})
			  				product.swatchList = swatchListArray.join(',')
			  			}
			  			
			  			//product.swatches.push(_.each(product.xcatentry_ColorSwatch.split(','), function(swatch){
			  			//	console.log(swatch[0])
			  			//})) 
			  			var partObject = module.getSku_PartNumber(product.partNumber)
			  			//console.log('partObject: ',partObject)
			  			product.productURI = '/en_US/shop/'+gender+'/'+cat+'/'+cid+'/'+product.name+'/'+partObject.sku+'?parent_category_rn='+cid+'&partNumber='+partObject.sku
			  			//console.log('product: ',product)
			  		})


		  	//console.log("getProductsByCategory End event")
		  	productsDeferred.resolve(category)


		  })
		  return productsDeferred.promise
		});



  	}
  	, getSku_PartNumber : function (partNumber) {

			/**
				@Function: getSku_selectedSwatch
					Separates sku and style numbers

				@Return: Object
			*/

			var sku,selectedSwatch;

			if(partNumber.match(/P$/)){
				sku = partNumber;
				selectedSwatch = partNumber.replace(/P$/,'');
			} else if(partNumber.match(/^[A-Z]{1}\d{6}/)){
				sku = partNumber + 'P';
				selectedSwatch = partNumber;
			} else if(partNumber.match(/C$/)){
				sku = partNumber.replace(/^([A-Z]{2,3}\d{4})([^C].+?)$/,'$1P');
				partnumber = partNumber;
				selectedSwatch = partNumber.replace(/C$/,'');
			} else {
				if(partNumber.match(/^[A-Z]{2,3}\d{8}/)){
					sku = partNumber.replace(/^([A-Z]{2,3}\d{5})([^P].+?)?$/,'$1P');
				} else {
					sku = partNumber.replace(/^([A-Z]{2,3}\d{4})([^P].+?)?$/,'$1P');
				}
				selectedSwatch = partNumber;
			}

			return {"sku":sku,"selectedSwatch":selectedSwatch};
		}

})

}//end module