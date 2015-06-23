module.exports = function (app, config) {

	var Deferred = require("promised-io/promise").Deferred
	this.Deferred = Deferred
	var date = Date.now()
	    var model = app.getModel('Application')
	    var userData = model.getUserData()
	    var data = {}
	    data.user = userData
	    console.log(data.user.creditcards[0])
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
	    	}

	    data.strings = model.getComStrings()
	    data.store = model.getStore()
	    data.leftNavStrings = model.getLeftNavStrings()
	    data.leftNavExtras = model.getLeftNavExtras()
	    data.myAccount = model.getMyAccount()
	    data.localeMenu = model.getLocaleMenu()
	    data.shoppingCart = model.getShoppingCart()
	    data.storeLocator = model.getStoreLocator()
	    data.footer = model.getFooter()
	    data.cartContents = model.getShoppingCartContents()

	    

	    //data.leftNav.menu[1].selectedDept = ''
	    //data.leftNav.menu[0].selectedDept = ''




	  data.cacheBuster = date;

	  this.data = data

	  this.store = data.store.storeId
	  this.catalogId = data.store.catalogId
	  this.langId = data.store.langId


  return app.controllers.Base.extend()
}