{{#categories}}
<div class="category">
<div class="categoryLabel">
<h3><a href="{{catURL}}" alt="category name">{{label}}</a></h3>
</div>
{{#products}}
<div class="product gridObject {{categories.label}}" id="{{id}}" style="height: {{categories.productSize}}px; width: {{categories.productSize}}px;">
	<div class="productImage">
		<a href="{{uri}}">		
			<img class="thumbnail" src="//s7d1.fossil.com/{{imageSrc}}&hei={{categories.imageSize}}&wid={{categories.imageSize}}" border="0" alt="{{name}}" title="{{name}} - {{id}}" height="{{categories.productSize}}" width="{{categories.productSize}}" style="width: 100%; ">
		</a>
	</div>
	 <div class="prodInfo">
	 	<a href="{{uri}}">
		 	<div class="prodName">
				{{#new}}
				<span class="newProductLabel">{{store.newLabel}}<span>-</span></span>
				{{/new}}	
				<span class="newProductText">{{name}}</span>
			</div>
			<img class="bg" src="http://www.fossil.com/wcsstore/Fossil/images//en_US/category/thumb_rollover.png">
		</a>
		<div class="priceSwatchWrap"> 
			<div class="priceRow">
				<a href="{{uri}}">
					<div class="price"><sup class="dollar">{{store.currency}}</sup>{{price}}</div>
				</a>
			</div>
			<div class="swatches" data-swatches="{{swatches}}"></div>
		</div>  	
	</div>
</div>
{{/products}}
</div>
{{/categories}}