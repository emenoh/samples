module.exports = function (app) {
  return {
  	 '/': {'get': 'Content.home'}
  ,  '/en_US/shop/': {'get': 'Content.home'}
  ,  '/en_US/shop/:g/': {'get':'Content.dept'}
  ,  '/en_US/shop/:g/:cname/:id': {'get': 'Category.show'}
  ,  '/en_US/shop/:g/:cname/:id/:pname/:pid': {'get': 'Product.show'}
  ,  '/en_US/shop/product/:pname/:pid': {'get': 'Product.show'}
  ,  '/en_US/shop/account/login': {'get': 'Account.login'}
  ,  '/en_US/shop/account/register': {'post': 'Account.register'}
  ,  '/en_US/shop/account/dashboard': {'get': 'Account.dashboard'}
  ,  '/en_US/shop/account/profile': {'get': 'Account.profile'}
  ,  '/en_US/shop/account/addressbook': {'get': 'Account.addressbook'}
  ,  '/en_US/shop/account/myproducts': {'get': 'Account.myproducts'}
  ,  '/en_US/shop/account/wishlist': {'get': 'Account.wishlist'}
  ,  '/en_US/shop/account/orderhistory': {'get': 'Account.orderhistory'}
  ,  '/en_US/shop/account/savedcards': {'get': 'Account.savedcards'}
  ,  '/en_US/shop/account/forgotpassword': {'get': 'Account.forgotpassword'}
  ,  '/webapp/wcs/stores/servlet/FSAJAXService': {'get': 'Service.getService'}
  ,  '/wcs/resources/store/:store/categoryview/byId/:id': {'get': 'Service.getCategoryById'}
  ,  '/wcs/resources/store/:store/productview/byCategory/:id': {'get': 'Service.getProductsByCategory'}
  ,  '/wcs/resources/store/:store/categoryview/byParentCategory/:id': {'get': 'Service.getCategoryByParentId'}
  //,  '/*': {'get': 'Content.home'}
  }
  
}
