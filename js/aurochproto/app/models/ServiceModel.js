module.exports = function (app, config) {
  var http = require('http')
  var _ = require('underscore')
  var pSize = '292'
	//klass inheritance
  return app.getModel("Application", true).extend(function () {
	
	// super class is automagically called

  })
  .methods({
  	getProductByPartNumber: function(id,store, gender){

  		var module = this
  		var serviceURL = 'http://www.fossil.com/webapp/wcs/stores/servlet/FSAJAXService?service=getProductByPartNumber&langId=-1&storeId='+store+'&catalogId=25005&partNumber='+id
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
		  	var product = JSON.parse(data)

		  	serviceDeferred.resolve(product)


		  })
		  //return productDeferred.promise
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