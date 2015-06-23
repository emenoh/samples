module.exports = function (app, config) {

  var leftNav = app.getModel('LeftNav')

  return app.getController("Application", true).extend()
  .methods({
    home: function (req, res) {
	var module = this

    leftNavDeferred = new Deferred()
    leftNav.getLeftNav(store)

    leftNavDeferred.then(function(leftNavData){
    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/"
	    		, 
	    		router: "homepage"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/home.css"}
					]
				,
	    	}

	    	data.leftNav = leftNavData
    			//console.log("leftNav Data: ", data.leftNav)

			data.leftNav.menu[0].selectedDept = ''
			data.leftNav.menu[1].selectedDept = ''
      		module.render(res, 'home', data)

		})



    }
    ,
    dept: function (req, res) {
    var module = this
    data.dept = req.params.g
    var store = data.store.storeId
    leftNavDeferred = new Deferred()
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

			if(data.dept == 'women'){
				    data.page = {
				    		title: "Women's Watches | Handbags | Jewelry | Clothing | FOSSIL"
				    		, 
				    		description: "Shop Fossil Women's Watches, Handbags, Accessories, Jewelry, Shoes & Clothing. Vintage Styled Fashion for Women Since 1984."
				    		, 
				    		keywords: "womens store shop women watches watch handbags bags clothing vintage womans jewelry jackets coats shoes woman boots accessories gifts for her woman gift gifts for women"
				    		, 
				    		canonicalLink: "/en_US/shop/women/"
				    		, 
				    		router: "department"
							,
							stylesheetURI: "/wcsstore/CommonFossil/css/common/dept/dept.css"
				    		
				    	}
				    

				    //data.leftNav.menu[1].selectedDept = ''
				    //data.leftNav.menu[0].selectedDept = 'opened'


			      module.render(res, 'womens', data)
			      
			}else if (data.dept == 'men'){
			  		data.page = {
				    		title: "Men's Watches | Leather Bags | Wallets | Clothing | FOSSIL"
				    		, 
				    		description: "Shop Fossil Men's Watches, Leather Bags, Shoes & Clothing. Vintage Inspired Fashion for Men Since 1984. Explore New Winter Styles with Free Shipping on Orders Over 100. Long Live Vintage!"
				    		, 
				    		keywords: "men men's fashion men's shop watches leather sport chronograph clothing bag bags watch wallet"
				    		, 
				    		canonicalLink: "/en_US/shop/men/"
				    		, 
				    		router: "department"			
				    		,
							stylesheetURI: "/wcsstore/CommonFossil/css/common/dept/dept.css"
				    	}
				    
				    //data.leftNav.menu[0].selectedDept = ''
				    //data.leftNav.menu[1].selectedDept = 'opened'


			      module.render(res, 'mens', data)

			}else{
				console.log('no gender supplied and probably a bad route')
			}

	    })

	}

    
   
    
  })
}
