module.exports = function (app, config) {

	var productModel = app.getModel('Product')
	var categoryModel = app.getModel('Category')
	var leftNav = app.getModel('LeftNav')

  return app.getController("Application", true).extend()
  .methods({
    show: function (req, res) {
    	var gender = req.params.g
    	data.dept = gender
    	var id = req.params.id
    	var pid = req.params.pid
		//var store = data.store.storeId
    	//console.log(req.params);
    	//test category = 331097
    	var that = this
		data.page = {
			title: "Women's Watches | Handbags | Jewelry | Clothing | FOSSIL"
			, 
			description: "Shop Fossil Women's Watches, Handbags, Accessories, Jewelry, Shoes & Clothing. Vintage Styled Fashion for Women Since 1984."
			, 
			keywords: "womens store shop women watches watch handbags bags clothing vintage womans jewelry jackets coats shoes woman boots accessories gifts for her woman gift gifts for women"
			, 
			canonicalLink: "/en_US/shop/category/"
			, 
			router: "pdp"
			,
			styles: [
				{link: "/wcsstore/CommonFossil/css/shell/pdp.css"}
				]
			,

	   	}

	   	

    		productDeferred = new Deferred()
    		leftNavDeferred = new Deferred()
    		categoryDeferred = new Deferred()

    		productModel.getProductByPartNumber(pid, store, gender)//productsDefered is resolved
    		categoryModel.getCategory(id, store)
    		leftNav.getLeftNav(store)

    		leftNavDeferred.then(function(leftNavData){
    			data.leftNav = leftNavData
    			//console.log("leftNav Data: ", data.leftNav)
    				   	if(data.dept == 'men'){
					    data.leftNav.menu[0].selectedDept = ''
					    data.leftNav.menu[1].selectedDept = 'opened'
					   	}else if (data.dept == 'women'){
					    data.leftNav.menu[0].selectedDept = 'opened'
					    data.leftNav.menu[1].selectedDept = ''
					   	}else{
					    data.leftNav.menu[0].selectedDept = ''
					    data.leftNav.menu[1].selectedDept = ''
					   	}

	    		categoryDeferred.then(function(categoryData){
		    		categories = categoryData
		    		data.categories = categories
			    	data.categories.label = categories.CatalogGroupView[0].name
			    	data.categories.FSCC = categories.CatalogGroupView[0].identifier

		    		productDeferred.then(function(productData){
		    			//console.log(productData)
				    	data.product = productData
				    	//data.breadCrumbs = productsData.BreadCrumbTrailEntryView

					//console.log("All data: ", data)
					that.render(res, 'product', data)
				      	
		    		})//end productDefered then
	    		})//end categoryDeferred then

    		})

    

    }
    
    
    
  })
}
