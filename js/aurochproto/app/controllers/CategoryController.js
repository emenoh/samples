module.exports = function (app, config) {
	var model = app.getModel('Category')
	var leftNav = app.getModel('LeftNav')

  return app.getController("Application", true).extend()
  .methods({
  	viewAll: function(req,res) {
    	var gender = req.params.g
  		var id = req.params.id
  		data.subCats = model.getSubCats(id)
    	data.category = model.getCategory(id)
    	data.products = model.getProducts(id)
    	data.breadCrumbs = model.getBreadCrumbs(id)
  		
  	}
  	,
    show: function (req, res) {

    	var gender = req.params.g
    	data.dept = gender
    	var id = req.params.id
		//var store = data.store.storeId
    	var cat = req.params.cname
    	//console.log(req.params);
    	//test category = 331097
    	var module = this
		data.page = {
			title: "Women's Watches | Handbags | Jewelry | Clothing | FOSSIL"
			, 
			description: "Shop Fossil Women's Watches, Handbags, Accessories, Jewelry, Shoes & Clothing. Vintage Styled Fashion for Women Since 1984."
			, 
			keywords: "womens store shop women watches watch handbags bags clothing vintage womans jewelry jackets coats shoes woman boots accessories gifts for her woman gift gifts for women"
			, 
			canonicalLink: "/en_US/shop/category/"
			, 
			router: "category"
			,
			styles: [
				{link: "/wcsstore/CommonFossil/css/shell/category.css"}
				]
			,
   	}

	   	




    		categoryDeferred = new Deferred()
    		productsDeferred = new Deferred()
    		leftNavDeferred = new Deferred()
    		model.getCategory(id, store)
    		
    		
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
			    	/* wait to get the products data until the category data is set */
			    	model.getProductsByCategory(id, store, gender, cat)//productsDefered is resolved
		    		productsDeferred.then(function(productsData){

				    	data.products = productsData.CatalogEntryView
				    	data.breadCrumbs = productsData.BreadCrumbTrailEntryView

					//console.log("All data: ", data)
					module.render(res, 'category', data)
				      	
		    		})//end productsDefered then
	    		})//end categoryDeferred then

    		})

    

    }
    
    
    
  })
}
