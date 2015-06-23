module.exports = function (app, config) {

  var accountModel = app.getModel('Account')

  return app.getController("Application", true).extend(function(){
  	this.layout = 'account/layout'
  })
  .methods({
    login: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()

	    	data.leftNav = leftNavData
	    	
    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/login"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account login"
				,
				heading: "My Account"
	    	}

    		//console.log("leftNav Data: ", data.leftNav)

      		module.render(res, 'account/account_login', data)





    	}

    ,
    register: function (req, res) {
	var module = this


    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData
    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/register"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account register"
				,
				heading: "My Account - Create a New Account"
	    	}


      		module.render(res, 'account/account_register', data)




    	}	
    ,
    dashboard: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME


    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/dashboard"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account welcome"
				,
				heading: "My Account - Dashboard"
	    	}

      		module.render(res, 'account/account_dashboard', data)





    }
	,
    profile: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/profile"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account profile"
				,
				heading: "My Account - Profile"
	    	}

      		module.render(res, 'account/account_profile', data)




    	}

	,
    addressbook: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/addressbook"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account addressbook"
				,
				heading: "My Account - Addressbook"
	    	}

      		module.render(res, 'account/account_addressbook', data)

		



    	}

	,
    wishlist: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/wishlist"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account wishlist"
				,
				heading: "My Account - Wishlist"
	    	}


      		module.render(res, 'account/account_wishlist', data)

	



    	}

	,
    myproducts: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/myproducts"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account myproducts"
				,
				heading: "My Account - My Products"
	    	}

      		module.render(res, 'account/account_myproducts', data)

	



		}
	,
    orderhistory: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/orderhistory"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account orderhistory"
				,
				heading: "My Account - Order History"
	    	}

      		module.render(res, 'account/account_orderhistory', data)




    	}

	,
    savedcards: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/savedcards"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account savedcards"
				,
				heading: "My Account - Saved Credit Cards"
	    	}


      		module.render(res, 'account/account_savedcards', data)




    	}

	,
    forgotpassword: function (req, res) {
	var module = this

    var leftNavData = accountModel.getLeftNav()
	    	data.leftNav = leftNavData

    //need to set cookies for USER_TYPE and DISPLAY_NAME

    		data.page = {
	    		title: "Watches | Handbags | Charms | Clothing | FOSSIL"
	    		, 
	    		description: "Explore Watches, Handbags, Wallets, Jewelry & Clothing in Our New Winter Collection. Classic Watches & Fashion Since 1984.  Official Site."
	    		, 
	    		keywords: "watches watch mens watch mens wristwatches womens wallet fosil store handbags purses vintage shoes clothing jewelry gift jeans sweaters jackets sunglasses fossil"
	    		, 
	    		canonicalLink: "/en_US/shop/account/forgotpassword"
	    		, 
	    		router: "myAccount"
				,
				styles: [
					{link: "/wcsstore/CommonFossil/css/shell/content.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/customerCare.css"}
					,
					{link: "/wcsstore/CommonFossil/css/shell/account.css"}
					]
				,
				bodyClass: "account forgotpassword"
				,
				heading: "My Account - Forgot Password"
	    	}


      		module.render(res, 'account/account_forgotpassword', data)




    	}	

    })//end methods
    //end exports

}
