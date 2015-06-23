<script id="tpl-breadCrumbs" type="text/html">
<ul id="breadCrumb">  	
    {{#breadCrumbLinks}}					
	<li><a href="{{uri}}"> {{label}} </a></li>
	{{/breadCrumbLinks}}
	<li class="activePage">{{breadCrumbActive}}</li>
							
</ul>
</script>


<script id="tpl-storeLocator" type="text/html">
<div id="storeLocatorLink">
<a href="{{link}}">{{label}}</a>
</div>
</script>

<script id="tpl-accountMenu" type="text/html">
<div id="accountWrapper">
	<div id="accountButtonWrapper">
		<div id="accountButton">
				<a class="menuTrigger" href="{{signInlink}}" id="signOut">{{heading}}</a>
		</div>
		<div id="myAccountDrop" class="subMenu">		
			<h4>{{userHeading}}</h4>
			<ul class="col1">
				<li class="signIn"><a href="{{signInlink}}">{{signIn}}</a></li>						
				<li class="information"><a href="{{myProfileLink}}">{{myProfile}}</a></li>
				<li class="orderTrack"><a href="{{orderTrackLink}}">{{orderTrack}}</a></li>
				<li class="wishlist"><a href="{{wishlistLink}}">{{wishlist}}</a></li>
				<li class="addressBook"><a href="{{addressBookLink}}">{{addressBook}}</a></li>
				<li class="orderHistory"><a href="{{orderHistoryLink}}">{{orderHistory}}</a></li>
				<li class="savedCards"><a href="{{savedCardsLink}}">{{savedCards}}</a></li>		
			</ul>
		</div>			
	</div>
</div>	
</script>

<script id="tpl-localeMenu" type="text/html">
<div id="locale">
<a class="menuTrigger" href="javascript:void(0);">{{country}}</a>
<div id="localePicker" class="clearFix subMenu">
<div class="localeColumn localeBorderR">
<h4>{{americas}}</h4>
<ul>
<li id="en_US" class="currentLocale"><a href="{{en_USLink}}">{{en_US}}</a></li>
</ul>
</div>
<div class="localeColumn localeBorderR">
<h4>{{eu}}</h4>
<ul>
<li id="de_AT"><a href="{{de_ATLink}}">{{de_AT}}</a></li>
<li id="fr_FR"><a href="{{fr_FRLink}}">{{fr_FR}}</a></li>
<li id="de_DE"><a href="{{de_DELink}}">{{de_DE}}</a></li>
<li id="it_IT"><a href="{{it_ITLink}}">{{it_IT}}</a></li>
<li id="en_GB"><a href="{{en_GBLink}}">{{en_GB}}</a></li>
</ul>
</div>
<div class="localeColumn localeBorderR">
<h4>{{af}}</h4>
<ul>
<li id="en_ZA"><a href="{{en_ZALink}}">{{en_ZA}}</a></li>
</ul>
</div>
<div class="localeColumn">
<h4>Asia Pacific</h4>
<ul>
<li id="en_AU"><a href="{{en_AULink}}">{{en_AU}}</a></li>
<li id="zh_CN"><a href="{{zh_CNLink}}">{{zh_CN}}</a></li>
<li id="ja_JP"><a href="{{ja_JPLink}}">{{ja_JP}}</a></li>
<li id="ko_KR"><a href="{{ko_KRLink}}">{{ko_KR}}</a></li>
</ul>
</div>
</div>
</div>
</script>

<script id="tpl-leftNav" type="text/html">
<h3><a href="/?pr=homepage">{{shell.leftNav.shop}}</a></h3>
	<ul>
		<!--  Womens Category -->	
	{{#dept}}		   
	    <li class="leftNavGroup {{selected}}">    		
			<a id="wDept" href="{{uri}}" class="menuLabel menuTrigger">{{label}}</a>
			<ul class="accordion {{selected}}" >
		{{#menu}}
			<li class="leftNavSection">
				<span>{{label}}</span>
			</li>

			{{#links}}
			<li id="{{id}}" class="{{selected}}"><a href="{{uri}}">{{label}}</a>						
			
			
			{{#sub}}
			<div class="subMenu {{selected}}">
				<ul>
					{{#menu}}
							<li id="{{id}}" class="{{selected}}"><a href="{{uri}}">{{label}}</a></li>						
					{{/menu}}
				</ul>	
					<ul class="viewAll">
						<li class="{{selected}}">
							<a href="{{uri}}">
								{{shell.leftNav.viewAll}}&nbsp;{{label}}
							</a>
						</li>	
					</ul>
					
			</div>
			{{/sub}}	
			
			</li>

			{{/links}}
		{{/menu}}

			</ul>
		</li>
	{{/dept}}
	</ul> 
	<ul class="bottomMenu">
		<li class="leftNavGroup">
			<a class="menuLabel" href="/?pr=lifestyle">{{shell.leftNav.FLS1}}<span class="bull"> • </span>{{shell.leftNav.FLS2}}<span class="bull"> • </span>{{shell.leftNav.FLS3}}</a>
		</li>
		<li class="leftNavGroup">
			<a class="menuLabel" href="http://blog.fossil.com/">{{shell.leftNav.blog}}</a>
		</li>
	</ul>
</script>


<script id="tpl-shoppingCart" type="text/html">
<div id="shoppingCart">
        
       	<div id="cartButton">            
            <a href="https://www.fossil.com/webapp/wcs/stores/servlet/OrderCalculate?updatePrices=1&amp;calculationUsageId=-1&amp;calculationUsageId=-2&amp;calculationUsageId=-3&amp;calculationUsageId=-4&amp;calculationUsageId=-7&amp;langId=-1&amp;storeId=12052&amp;catalogId=25005&amp;orderId=.&amp;URL=OrderItemDisplay" title="Shopping Bag">
            <span class="buttonTitle">{{shell.shoppingCart.header}}</span>
             <span id="bagQuantityWrapper">(<span id="global_bag_qty">{{quantity}}</span>)</span>                
            </a>
        </div>
        <div id="cartDropdownShadow"></div>
        <div id="cartDropdown" >
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
</script>



<script id="tpl-footerMenu" type="text/html">
<div id="footLinks" class="clearfix scout">
	<!-- Hogan template -->
	<ul>
		<li class="cCare">
			<a href="{{h1_customerCareLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{h1_customerCare}}</a>
			<div class="subMenu">
				<div class="footCare clearfix redLinks">
					<div class="footCol col1 footBorderR">
						<h4>{{h2_orderInfo}}</h4>
						<ul>						
							<li id="howtoorder">
								<a href="{{howToOrderLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{howToOrder}}</a>
							</li>
							<li id="ordertracking">
								<a href="{{orderTrackingLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{orderTracking}}</a>
							</li>
							<li id="shippingpolicy">
								<a href="{{shippingPolicyLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{shippingPolicy}}</a>
							</li>
							
							<li id="paymentoptions">
								<a href="{{paymentOptionsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{paymentOptions}}</a>
							</li>
							<li id="creditcardsafe">
								<a href="{{ccSafeguardLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{ccSafeguard}}</a>
							</li>
						</ul>
					</div>
					<div class="footCol col2 footBorderR">
						<h4>{{h2_productInfo}}</h4>
						<ul>
							<li id="watchinstructions">
								<a href="{{watchInstructionsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{watchInstructions}}</a>
							</li>
							<li id="orderlinks">
								<a href="{{orderLinksBandsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{orderLinksBands}}</a>
							</li>
							<li id="warrantyrepairs">
								<a href="{{warrantyRepairsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{warrantyRepairs}}</a>
							</li>
							<li id="retexchanges">
								<a href="{{returnsExchangesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{returnsExchanges}}</a>
							</li>
							<li id="sizecharts">
								<a href="{{sizeChartLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{sizeChart}}</a>
							</li>
							<!--<li id="reviewinstructions">
								<a href="/webapp/wcs/stores/servlet/ContentView?storeId=12052&page=customerCare_reviewInstructions&catalogId=25005&langId=-1">Product Reviews</a>
							</li>-->
							<li id="watchRepairForm">
								<a target="_blank" href="{{watchRepairFormLink}}">{{watchRepairForm}}</a>
							</li>
						</ul>
					</div>
					<div class="footCol col3 footBorderR">
						<h4>{{h2_getInTouch}}</h4>
						<ul>
							<li id="contactus">
								<a href="{{contactUsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{contactUs}}</a>
							</li>
							<li>
								<a href="{{storeLocatorLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{storeLocator}}</a>
							</li>
							<li id="ideasubmission">
								<a href="{{ideaSubmissionLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{ideaSubmission}}</a>
							</li>
						</ul>
					</div>	
					<div class="footCol col4 footBorderR">
						<h4>{{h2_stayConnected}}</h4>
							<ul>
								<li id="catalogrequest">
									<a href="{{catalogRequestLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{catalogRequest}}</a>
								</li>
								<li id="emailsignup">
									<a href="{{emailSignupLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{emailSignup}}</a>
								</li>
								<li id="managesubscriptions">
									<a href="{{manageSubscriptionsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{manageSubscriptions}}</a>
								</li>
							</ul>
                            
                            <h4>{{h2_businessSales}}</h4>
                            	<ul>
                                	<li id="corporatesales">
                                    	<a href="{{corporateSalesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{corporateSales}}</a>
                                    </li>
                                    <li id="affiliatesales">
                                    	<a href="{{affiliateSalesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{affiliateSales}}</a>
                                    </li>
                                    <li id="distributors">
                                    	<a href="{{distributorsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{distributors}}</a>
                                    </li>
                                </ul>
					</div>
					<div class="footCol col5">
						<h4>{{h2_giftCards}}</h4>
						<ul>
							 <li class="marginL20 marginT20"><img src="http://www.fossil.com/wcsstore/CommonFossil/images/shell/footer/giftCardsFooter.png" /></li>
							 <li class="viewAll marginL15"><a href="{{purchaseGiftCardsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{purchaseGiftCards}}</a></li>
						</ul>
					</div>
				</div>
			</div>
		</li>
		<li class="aboutUs"><a href="{{h1_aboutUsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{h1_aboutUs}}</a>
			<div class="subMenu clearfix redLinks">
				<div class="footCol col1 footBorderR">
					<h4>{{h2_investorRelations}}</h4>
					<ul>
						<li id="companyprofile"><a href="{{companyProfileLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{companyProfile}}</a></li>
						<li id="earnings"><a href="{{earningsReleasesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{earningsReleases}}</a></li>
						<li id="financials"><a href="{{financialsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">financials</a></li>
						<li id="officersdirectors"><a href="{{officerDirectorsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{officerDirectors}}</a></li>						
						<li id="pressreleases"><a href="{{pressReleasesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{pressReleases}}</a></li>
						<li id="stocksecinfo"><a href="{{stockSECInfoLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{stockSECInfo}}</a></li>
						<li id="stocksecinfo"><a href="{{proxyMaterialsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{proxyMaterials}}</a></li>
					</ul>
				</div>
				<div class="footCol col2 footBorderR">
					<h4>{{h2_corporateGovernance}}</h4>
					<ul>						
						<li id="corporategovernance"><a href="{{corpGovGuidelinesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{corpGovGuidelines}}</a></li>
						<li id="corpguidelines"><a href="{{guidelinesLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{guidelines}}</a></li>
						<li id="codeofconductt"><a href="{{codeOfConductLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{codeOfConduct}}</a></li>
						<li id="ethicsforcfos" style="text-transform:none"><a href="{{codeOfEthicsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{codeOfEthics}}</a></li>
						<li id="auditcommitteecharter"><a href="{{auditCommCharterLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{auditCommCharter}}</a></li>
						<li id="nominatingcommitteecharter"><a href="{{corpGovCommCharterLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{corpGovCommCharter}}</a></li>
						<li id="compensationcommitteecharter"><a href="{{compensationCommCharterLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{compensationCommCharter}}</a></li>
						<li id="financecommitteecharter"><a href="{{financeCommCharterLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{financeCommCharter}}</a></li>
						<li id="supplychainsact"><a href="{{caTransparencyActLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{caTransparencyAct}}</a></li>
					</ul>
				</div>
				<div class="footCol col3 footBorderR">
					<h4>{{h2_connections}}</h4>
					<ul>
						<li id="calendarevents"><a href="{{calendarEventsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{calendarEvents}}</a></li>
						<li id="webcasts"><a href="{{webcastsLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{webcasts}}</a></li>
					</ul>
				</div>
			</div>
		</li>
		<li class="careers">
			<a href="{{h1_careersLink}}" target="_blank">{{h1_careers}}</a>
			<div class="subMenu clearfix redLinks">
				<div class="footCol col5">
					<h4>{{h2_careers}}</h4>
					<ul>
						 <li class="marginL20"><img src="http://www.fossil.com/wcsstore/CommonFossil/images/shell/footer/careersFooter.png" /></li>
						 <li class="viewAll marginL15"><a href="{{findCareerLink}}" target="_blank">{{findCareer}}</a></li>
					</ul>
				</div>
			</div>
		</li>
		<li class="legal">
		<a href="#">{{h1_legal}}</a>
		<div class="subMenu redLinks">
			<h4 class="paddingL10">{{h2_legalInfo}}</h4>
			<ul class="marginL10">
				<li id="termsofuse">
					<a href="{{termsOfUseLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{termsOfUse}}</a>
				</li>
				<li id="securityprivacy">
					<a href="{{privacySecurityLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}">{{privacySecurity}}</a>
				</li>
				<li id="calsecurityprivacy">
					<a href="{{calPrivacyLink}}&storeId={{storeId}}&catalogId={{catalogId}}&langId={{langId}}{{calPrivacyLinkHash}}">{{calPrivacy}}</a>					
				</li>
				<li>&nbsp;</li>
				<li class="marginL20 copy">{{h2_copyright}}</li>
			</ul>
		</div>
	</li>
	</ul>
</div>
</script>
<script id="tpl-refinements" type="text/html">
<div id="refineWrap">							
	<div id="refineCategoryTitle">
	<h2>{{store.pageHeading}}</h2>
	</div>	
	<div id="refinePanel">        
		<div id="refineryContainer">
			<div id="refinery" class="refineryColumn">      
				<div id="refineLeftLabel">{{shell.refinery.narrowByLabel}}</div>									
				<ul id="primaryRefinements">
				{{#refinery}}
					<li>
					<a title="">{{title}}</a>							
						<ul><div class="refineDrop">
						{{#links}}
						<li><a href="{{uri}}">{{label}}</a></li>
						{{/links}}
						</div></ul>
					</li>
				{{/refinery}}
				</ul>	
				<div class="label clearall"><a href="{{store.uri}}?parent_category_rn={{store.categoryId}}&amp;departmentCategoryId={{store.deptId}}&amp;Ns=&amp;N=0&amp;page=">{{shell.refinery.clearAllLabel}}</a></div>
				<div class="label sortlabel">{{shell.refinery.sortByLabel}}</div>
				<ul id="primarySortBy">
					<li>
					<a title="">{{shell.refinery.sortByLabel}}</a>					
						<ul><div class="refineDrop">
							{{#shell.refinery.sortOptions}}
							<li><a href="{{store.uri}}?parent_category_rn={{store.categoryId}}&amp;departmentCategoryId={{store.deptId}}&amp;{{param}}&amp;N=0&amp;NRec=&amp;recsPP=&amp;page=viewall&amp;N=0&amp;NRec=&amp;recsPP=">{{label}}</a></li>
							{{/shell.refinery.sortOptions}}
						</div></ul>			
					</li>
				</ul>												
			</div>
		</div>
	</div>					
</div>
</script>

<script id="tpl-products" type="text/html">
{{#categories}}
<div class="category">
<div class="categoryLabel">
<h3><a href="{{catURL}}" alt="category name">{{label}}</a></h3>
</div>
{{{catFeature}}}
{{#products}}
<a href="{{uri}}" class="product gridObject {{categories.label}}" id="{{id}}" style="height: {{categories.productSize}}px; width: {{categories.productSize}}px;">
			<img class="thumbnail" src="//s7d1.fossil.com/{{imageSrc}}&hei={{categories.imageSize}}&wid={{categories.imageSize}}" border="0" alt="{{name}}" title="{{name}} - {{id}}" height="{{categories.productSize}}" width="{{categories.productSize}}" style="width: 100%; ">
	 <div class="prodInfo">
		 	<div class="prodName">
				{{#new}}
				<span class="newProductLabel">{{store.newLabel}}<span>-</span></span>
				{{/new}}	
				<span class="newProductText">{{name}}</span>
			</div>
			<div class="priceRow">
					<div class="price"><sup class="dollar">{{store.currency}}</sup>{{price}}</div>
			</div>
			<div class="swatches" data-swatches="{{swatches}}"></div>
			<img class="bg" src="http://www.fossil.com/wcsstore/Fossil/images/en_US/category/thumb_rollover.png">
	</div>
</a>
{{/products}}
</div>
{{/categories}}
</script>


