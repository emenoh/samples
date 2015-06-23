module.exports = function (app, config) {

var uiStrings = require('../models/fixtures/strings.json')
var cartContents = require('../models/fixtures/shoppingCart.json')
var leftNavExtras = require('../models/fixtures/leftNav.json')
var commerceStrings = require('../models/fixtures/fossil_en_US.json')
var userData = require('../models/fixtures/user.json')

//console.log(leftNav.menu)

  return app.getModel('Base', true).extend()
  	.methods({
  	getStore: function(){
		return uiStrings.store
  	
  	}
  	,
  	getShell: function(){
  		return uiStrings.shell
  	}
  	,
  	getLeftNavStrings: function(){
  		return uiStrings.shell.leftNav
  	}
  	,
  	getLeftNavExtras: function(){
  		return leftNavExtras.menu
  	}
  	,
  	getMyAccount: function(){
  		return uiStrings.shell.myAccount
  	}
  	,
  	getMyAccountLoggedIn: function(){
  		return uiStrings.shell.myAccountLoggedIn
  	}
  	,
  	getLocaleMenu: function(){
  		return uiStrings.shell.localeMenu
  	}
  	,
  	getShoppingCart: function(){
  		return uiStrings.shell.shoppingCart
  	}
  	,
  	getShoppingCartContents: function(){
  		return cartContents.cart
  	}
  	,
  	getStoreLocator: function(){
  		return uiStrings.shell.storeLocator
  	}
  	,
  	getRefinery: function(){
  		return uiStrings.shell.refinery
  	}
  	,
  	getFooter: function(){
  		return uiStrings.shell.footer
  	}
    ,
    getComStrings: function(){
      return commerceStrings
    }
    ,
    getUserData: function(){
      return userData
    }
})
}