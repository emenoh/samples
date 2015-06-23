	


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