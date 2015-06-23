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
				<ul>
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