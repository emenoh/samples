<div id="shoppingCart">
        
       	<div id="cartButton">            
            <a href="https://www.fossil.com/webapp/wcs/stores/servlet/OrderCalculate?updatePrices=1&amp;calculationUsageId=-1&amp;calculationUsageId=-2&amp;calculationUsageId=-3&amp;calculationUsageId=-4&amp;calculationUsageId=-7&amp;langId=-1&amp;storeId=12052&amp;catalogId=25005&amp;orderId=.&amp;URL=OrderItemDisplay" title="Shopping Bag">
            <span class="buttonTitle">{{shell.shoppingCart.header}}</span>
             <span id="bagQuantityWrapper">(<span id="global_bag_qty">{{quantity}}</span>)</span>                
            </a>
        </div>
        <div id="cartDropdownShadow"></div>
        <div id="cartDropdown" style="display: none; ">
        	<div id="cartDropdownContent">
	            <div id="lastProd">                          
	                <div id="bagProdHeader">
	                    <span id="bagProdHeaderText">
	                        {{shell.shoppingCart.lastItemLabel}}
	                    </span>
	                </div>
	                
	                        <a id="bag_prod_img" href="{{lastItem.uri}}">
	                    
	                
					<img src="{{lastItem.imgSrc}}" border="0" alt="JA4255221" title="JA4255221">
	                </a>
	                
	                <div id="bagProdInfo">
	                	<p id="cartBrandName">
	                		
	                	</p>
	                    <p id="prodName">
	                    	
			                        <a id="pdpNameLink" href="{{lastItem.uri}}">
			                    {{lastItem.name}}
	                        </a>
	                    </p>                
	                    <ul>
	                        <li>{{shell.shoppingCart.styleLabel}} 
	                           <span id="bagStyleNum">
	                                {{lastItem.style}}
	                            </span>
	                        </li>
	                        
	                        <li>{{shell.shoppingCart.priceLabel}}
	                            <span id="bagPrice">
	                            	
		<span id="price">{{shell.store.currency}}{{lastItem.price}}</span>
	
	                            </span>
	                        </li>
	                    </ul>
	                    
	                    <p id="bagSubtotal">{{shell.shoppingCart.subTotalLabel}}</p>
	                    <p id="bagSub">{{shell.store.currency}}{{subtotal}}</p>
	                    <a href="https://www.fossil.com/webapp/wcs/stores/servlet/OrderCalculate?updatePrices=1&amp;calculationUsageId=-1&amp;calculationUsageId=-2&amp;calculationUsageId=-3&amp;calculationUsageId=-4&amp;calculationUsageId=-7&amp;langId=-1&amp;storeId=12052&amp;catalogId=25005&amp;orderId=.&amp;URL=OrderItemDisplay"><div class="viewBag">
	                       <span class="buttonLeft"><span class="buttonRight"><span class="buttonContent">{{shell.shoppingCart.viewBagLabel}}</span></span></span>
	                    </div>
	                    </a>
	                </div>
	            </div>
	        </div>
            <div id="noProd">
                <p>
                    <strong>0 {{shell.shoppingCart.numberItemsLabel}}</strong>
                    {{shell.shoppingCart.inCartLabel}}
                </p>
            </div>
            <div class="espotWrapper">
				<div class="espot">

        <a href="//www.fossil.com/wcsstore/Fossil/images/en_US/shippingoptions/freeShipPopup.20120803155952.jpg" class="eSpotDetailsGlobal">
<img src="//www.fossil.com/wcsstore/Fossil/images/en_US/shippingoptions/freeShipping.20120803155952.jpg" border="0" class="fullbleed">
</a>

				</div>
			</div>
			<div class="espotWrapper2">
				<div class="espot">

				</div>
			</div>
            <div class="menuBar"></div>
            
        </div>
	</div>