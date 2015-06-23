(function($){
    $.fn.extend({ 
        //plugin name - fswebcatalog
        fswebcatalog: function(options) {
            
            //Settings list and the default values
            var defaults = {
                width: 800,
                catalog: 'Summer1catalog',
                element: 'body',
                close: '.FSCatClose'
            };
             
            var options = $.extend(defaults, options);
         

            var template = "<script>"+				
            "var _gaq = _gaq || [];"+
            "_gaq.push(['gwo._setAccount', 'UA-23422187-1']);"+
            "_gaq.push(['gwo._trackPageview', '/3095534555/goal']);"+
            "(function() {"+
            "var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;"+
            "ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';"+
            "var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);"+
            "})();</script>"+
            '<div class="catOverlay"></div><div id="FSCatalogloader" class="FSCatalogloader"></div>'+
            '<div class="catalogContainer">'+
            '<div class="catalogWrapper">'+
            '<div id="ps_container" class="ps_container"><div class="FSCatClose"></div>'+
            '<div class="ps_image_wrapper">'+
            '<!-- First initial image -->'+
            '</div>'+
            '<!-- Navigation items -->'+
            '<div class="ps_next"></div>'+
            '<div class="ps_prev"></div>'+
            '<!-- Dot list with thumbnail preview -->'+
            '<div class="ps_navWrapper">'+
            '<ul class="ps_nav">'+
            '<li class="selected"></li>'+
            '<li class="ps_preview">'+
            '<div class="ps_preview_wrapper">'+
            '<!-- Thumbnail comes here -->'+
            '</div>'+
            '<!-- Little triangle -->'+
            '<span></span>'+
            '</li>'+
            '</ul>'+
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>';

			
            var o =options;
            //console.log(o.width+' '+o.catalog);



            var catalogData = {},
            $activated = false,
            $ps_container,
            $wrapper,
            $container,
            closeButton = o.close,
            $close,
            $ps_image_wrapper,
            $ps_next,
            $ps_prev,
            $ps_nav,
            $tooltip,
            $ps_preview_wrapper,
            $links,
            total_images,
            currentHovered,
            current,
            $loader,
            $overlay,
            overlayHeight,
            overlayWidth,
            catalog, 
            items, 
            page,
            loaded,
            firstImage,
            $currentImage,
            $newImage,
            element = o.element,
            cWidth = o.width,
            pWidth,
            cHeight,
            getPagesURI = 'http://content.fossil.com/catalog/service/getCatalogPages.php',
            getPageDataURI = 'http://content.fossil.com/catalog/service/getCatalogPageItems.php',
            imageServiceURI = 'http://s7ondemand1.scene7.com/is/image/FossilPartners/';


            //cWidth = getParameterByName('width');
            cWidth = Math.round($(window).width()/1.4);
          	cWidth = Math.floor(cWidth/50)*50;
           	pWidth = cWidth/2;


            $("html, body").animate({
                scrollTop: 0
            }, "slow");
            $(template).appendTo(element);


            /*check if you are using a browser*/	
            var ie 				= false;
            if ($.browser.msie) {
                ie = true;//you are not!Anyway let's give it a try
            }

            $.ajax({
                dataType: "jsonp"
                , 
                type: "get"
                , 
                url: getPagesURI
                , 
                data: {
                    'catalog': o.catalog
                    , 
                    'req': 'json'
                }
                , 
                crossDomain: true
                , 
                jsonpCallback: 'parsePages' 
                , 
                success: loadCatalog
            });
            
            if (isiOS()) {
                var answer = confirm ("Would you like to download our mobile catalog from the App Store?");
                if (answer) {
                    window.location = "http://itunes.apple.com/us/app/fossil-life-style/id403955529?mt=8";
                }
            }
            
            function isiOS(){
                return (
                    (navigator.platform.indexOf("iPhone") != -1) ||
                    (navigator.platform.indexOf("iPod") != -1)
                );
            }
            
            function loadCatalog(data, status, xhr){
                catalog = data;
                items = catalog.items.length;
                page = catalog.items;
                pages = [];
                for(var i = 0; i < items; i++){
                    page[i] = page[i].replace('FossilPartners/', '');
                    pages.push(page[i]);
                //console.log(pages[i]);
                };
                firstImage = '<img src="'+imageServiceURI+pages[0]+'?wid='+pWidth+'" />';
                initCatalog();
            //console.log(catalog);
            }



            function initCatalog(){

                var thumbDiv = $('.ps_nav');
                var thumbs = '';
                //example spread recipe
                //http://s7ondemand1.scene7.com/is/image/FossilPartners/Summer1catalog-4?&layer=0&wid=610&origin=0,0&extend=0,0,1220,0&layer=1&wid=610&origin=10,0&posN=0.5,0&src=Summer1catalog-5

                for(var i = 0; i < items; i++){
                    //console.log(page[i]);
                    var url;
                    if(i == 0){
                        url = imageServiceURI+pages[i]+'?wid='+pWidth;
                        thumbs+= '<li><a href=" '+url+' " rel=" '+url+' " >C</a></li>';
                    }else if (i == items-1){
                        url = imageServiceURI+pages[i]+'?wid='+pWidth;
                        thumbs+= '<li><a href=" '+url+' " rel=" '+url+' " >B</a></li>';
                    }else{
                        url = imageServiceURI+pages[i]+'?layer=0&origin=0,0&extendN=0,0,1,0&layer=1&wid='+cWidth+'&origin=0,0&posN=0.5,0&src='+pages[i+1];
                        thumbs+= '<li><a href="'+url+'" rel=" '+url+' " >'+(i+1)+'-'+(i+2)+'</a></li>';
                        i++;
                    }
                }
                thumbs+='<li class="ps_preview">'
                +'<div class="ps_preview_wrapper">'
                +'<!-- Thumbnail comes here -->'
                +'</div>'
                +'<!-- Little triangle -->'
                +'<span></span>'
                +'</li>';

                thumbDiv.html(thumbs);	

								
                activate();
            }



            function activate(){
                //some elements..
                $container		= $('.catalogContainer'),
                $wrapper			= $('.catalogWrapper'),
                $ps_container		= $('#ps_container'),
                $ps_image_wrapper 	= $ps_container.find('.ps_image_wrapper'),
                $ps_next			= $ps_container.find('.ps_next'),
                $ps_prev			= $ps_container.find('.ps_prev'),
                $ps_nav				= $ps_container.find('.ps_nav'),
                $tooltip			= $ps_container.find('.ps_preview'),
                $ps_preview_wrapper = $tooltip.find('.ps_preview_wrapper'),
                $links				= $ps_nav.children('li').not($tooltip),
                total_images		= $links.length,
                currentHovered		= -1,
                current				= null,
                last					= -1,
                $loader				= $('#FSCatalogloader'),
                $overlay = $('.catOverlay'),
                $close = $(closeButton);


                if(!ie)
                    $tooltip.css({
                        opacity	: 0
                    }).show();
								
                $overlay.click(function(){
                    removeAll();
                });
								
                $close.click(function(){
                    removeAll();
                });
								
							


                /*first preload images (thumbs and large images)*/
                loaded	= 0;
                $links.each(function(i){
                    var $link 	= $(this);
                    $link.find('a').preload({
                        onComplete	: function(){
                            ++loaded;
                            if(loaded == total_images){
                                //check screensize and bind resize event

                                //all images preloaded,
                                //show ps_container and initialize events
                                $loader.hide();
                                //console.log($loader);
                                $ps_container.show();
											
                                //$ps_image_wrapper.html(firstImage);

                                //when mouse enters the pages (the dots),
                                //show the tooltip,
                                //when mouse leaves hide the tooltip,
                                //clicking on one will display the respective image	
                                $links.bind('mouseenter',showTooltip)
                                .bind('mouseleave',hideTooltip)
                                .bind('click',showImage);
                                //navigate through the images
                                $ps_next.bind('click',nextImage);
                                $ps_prev.bind('click',prevImage);
                                $links.eq(0).trigger('click');//show the first image by clicking on the bound thumbnail link ;)
											
                            }
                        }
                    });
								

                });
							
							

            }


            function showTooltip(){
                var $link			= $(this),
                idx				= $link.index(),
                linkOuterWidth	= $link.outerWidth(),
                //this holds the left value for the next position
                //of the tooltip
                left,
                //the thumb image source
                $thumb			= $link.find('a').attr('rel'),
                imageLeft,
                toolTipWidth;


                if(idx == 0 || idx == total_images-1){
                    $tooltip.addClass('single');
                }

                toolTipWidth = $tooltip.width();
                //console.log(idx);
                //console.log(total_images);
									
                //haha I rock, this is much better than prior version ;) JH
                left = $(this).position();
                left = left.left;
                //console.log(left);
                left = left - toolTipWidth/2 + linkOuterWidth/2;
                //console.log(left);


                //console.log('width '+$tooltip.width());

                //if we are not hovering the current one
                if(currentHovered != idx){
                    //check if we will animate left->right or right->left
                    if(currentHovered != -1){
                        if(currentHovered < idx){
                            imageLeft	= toolTipWidth;
                        }
                        else{
                            imageLeft	= -(toolTipWidth);
                        }
                    }
                    currentHovered = idx;

                    //the next thumb image to be shown in the tooltip
                    var $newImage = $('<img/>').css('left','0px')
                    .attr('src',$thumb);//.attr('height','80').attr('width','auto');

                    //if theres more than 1 image 
                    //(if we would move the mouse too fast it would probably happen)
                    //then remove the oldest one (:last)
                    if($ps_preview_wrapper.children().length > 1)
                        $ps_preview_wrapper.children(':last').remove();

                    //prepend the new image
                    $ps_preview_wrapper.prepend($newImage);

                    var $tooltip_imgs		= $ps_preview_wrapper.children(),
                    tooltip_imgs_count	= $tooltip_imgs.length;


                    //if theres 2 images on the tooltip
                    //animate the current one out, and the new one in
                    if(tooltip_imgs_count > 1){
                        $tooltip_imgs.eq(tooltip_imgs_count-1)
                        .stop()
                        .animate({
                            left:-imageLeft+'px'
                        },150,function(){
                            //remove the old one
                            $(this).remove();
                        });
                        $tooltip_imgs.eq(0)
                        .css('left',imageLeft + 'px')
                        .stop()
                        .animate({
                            left:'0px'
                        },150);
                    }
                }


                //if we are not using a "browser", we just show the tooltip,
                //otherwise we fade it
                //
                if(ie)
                    $tooltip.css('left',left + 'px').show();
                else
                    $tooltip.stop()
                    .animate({
                        left		: left + 'px',
                        opacity		: 1
                    },150);
            }

            function hideTooltip(){

                //hide / fade out the tooltip
                if(ie)
                    $tooltip.removeClass('single').hide();
                else
                    $tooltip.stop()
                    .removeClass('single')
                    .animate({
                        opacity		: 0
                    },150);
            }

            function showImage(e){
                last = current;
                $currentImage 		= $ps_image_wrapper.find('img');
                var $link				= $(this),
                idx					= $link.index(),
                $image				= $link.find('a').attr('href'),
                currentImageWidth	= $currentImage.width();

									

                //if we click the current one return
                if(current != null && current == idx) return false;

                //add class selected to the current page / dot
                $links.eq(current).removeClass('selected');
                $link.addClass('selected');

                //the new image element
                $newImage = $('<img/>').css('left',currentImageWidth + 'px')
                .attr('src',$image);
								

                //if the wrapper has more than one image, remove oldest
                if($ps_image_wrapper.children().length > 1)
                    $ps_image_wrapper.children(':last').remove();

                //prepend the new image
                $ps_image_wrapper.prepend($newImage);


                /*
									$ps_image_wrapper.iviewer(
				                       {
				                       src: $image, 
				                       update_on_resize: false,
				                       initCallback: function ()
				                       {
				                           var object = this;
				                           $("#in").click(function(){ object.zoom_by(1);}); 
				                           $("#out").click(function(){ object.zoom_by(-1);}); 
				                           $("#fit").click(function(){ object.fit();}); 
				                           $("#orig").click(function(){  object.set_zoom(100); }); 
				                           $("#update").click(function(){ object.update_container_info();});
				                       },
				                       onMouseMove: function(object, coords) { },
				                       onStartDrag: function(object, coords) { return false; }, //this image will not be dragged
				                       onDrag: function(object, coords) { }
				                  });

									*/

                //the new image width and height. 
                //This will be the new width of the ps_image_wrapper
                var newImageWidth	= $newImage.width();
                var newImageHeight	= $newImage.height();
                $ps_image_wrapper.height(newImageHeight);
                $ps_container.height(newImageHeight);
                //$ps_image_wrapper.width(cWidth);
                $ps_container.width(cWidth);

                //check animation direction
                if(current > idx){
                    $newImage.css('left',-newImageWidth + 'px');
                    currentImageWidth = -newImageWidth;
                }	
                current = Number(idx);
                //animate the new width of the ps_image_wrapper 
                //(same like new image width)
                $ps_image_wrapper.stop().animate({
                    width	: newImageWidth + 'px'
                },350);
                //animate the new image in
                $newImage.stop().animate({
                    left	: '0px'
                },350);
                //animate the old image out
                $currentImage.stop().animate({
                    left	: -currentImageWidth + 'px'
                },350);

								
                if(idx == 0 ){
                    //console.log(pages[idx*2]);
                    //console.log(items);
                    drawImageMap(pages[idx*2], null);
                }else{		
                    //console.log(pages[idx*2-1]+' , '+pages[idx*2]);		
                    drawImageMap(pages[idx*2-1], pages[idx*2]);
                }

                e.preventDefault();
            }				

            function nextImage(){
                if(current < total_images){
                    $links.eq(current+1).trigger('click');
                //updating = true;
                }
            }
            function prevImage(){
                if(current > 0){
                    $links.eq(current-1).trigger('click');
                //updating = true;
                }
            }


            function drawImageMap(pageA,pageB){
                //console.log(page);
                if(pageB != null){

                    $.ajax({
                        dataType: "jsonp"
                        , 
                        type: "get"
                        , 
                        url: getPageDataURI
                        //, url: "http://s7ondemand1.scene7.com/is/image/FossilPartners/'+pages[i]+'?layer=0&wid=610&origin=0,0&extend=0,0,1195,0&layer=1&wid=610&origin=5,0&posN=0.5,0&src='+pages[i+1]";
                        , 
                        data: {
                            'page': 'FossilPartners/'+pageA
                            , 
                            'req': 'json'
                            , 
                            'wid': cWidth
                            , 
                            'secondPage': 'FossilPartners/'+pageB
                        }
                        , 
                        crossDomain: true
                        , 
                        jsonpCallback: 'parsePageItems' 
                        , 
                        success: loadPage
                    });

                }else{

                    $.ajax({
                        dataType: "jsonp"
                        , 
                        type: "get"
                        , 
                        url: getPageDataURI
                        //, url: "http://s7ondemand1.scene7.com/is/image/FossilPartners/'+pages[i]+'?layer=0&wid=610&origin=0,0&extend=0,0,1195,0&layer=1&wid=610&origin=5,0&posN=0.5,0&src='+pages[i+1]";
                        , 
                        data: {
                            'page': 'FossilPartners/'+pageA
                            , 
                            'req': 'json'
                            , 
                            'wid': pWidth
                        }
                        , 
                        crossDomain: true
                        , 
                        jsonpCallback: 'parsePageItems' 
                        , 
                        success: loadPage
                    });

                }



            }
							
						
							

            function loadPage(data, status, xhr){
                //console.log(data)
                var mapItems = data.items;
                //catalogData.page[pageNum].mapData = data;
                var lastMap = $('#pageMap'+last);
                //create map
                var map =document.createElement("map");
                map.id = 'pageMap'+current;
                map.name = 'pageMap'+current;
                $(map).addClass('catalogAreaMap');

                $newImage.attr('usemap', '#'+map.name);
                lastMap.remove();
							
							
                for(var i = 0; i < mapItems.length; i++){
                    //create area
                    var mapData = mapItems[i];
                    /*
								var area = document.createElement("area");
								area.coords = mapData.coords;
								area.shape = mapData.shape;
								area.href = mapData.href;
								area.alt = mapData.name;
								//append area
								$(area).appendTo(map);
								*/
                    /*adds tooltips to image map <a> tags with alt attribute */

                    var area = '<area shape="'+mapData.shape+'" href="'+mapData.href+'" alt="'+mapData.name+'" coords="'+mapData.coords+'" />';
								
                    map.innerHTML += area;
								
                }
								
								
                $('.catTooltip').remove();
							
                $(map).appendTo(element);
							
                //$("area").each(function(){
                //var mytip =  
                $("area").wTooltip({
                    content: true, 
                    appendTip: element,
                    follow: true,
                    className: 'catTooltip',
                    callBefore: function(tooltip,node) { 
                        $(tooltip).html($(node).attr('alt')+'<strong>SHOW NOW ></strong>');
                    //console.log();
                    } 
                });
            //});						


            }//end of loadPage
							
							
            var removeAll = function(){
                $('.catTooltip').remove();
                $('.catalogAreaMap').remove();
                $loader.remove();
                $container.hide().remove();
                $overlay.hide().remove();
                $close.hide().remove();
                								
            //kill all variables except defaults, free up memory
            /*
								template=options=o=catalogData=$activated=$ps_container=$wrapper=$container=$closeButton=$ps_image_wrapper=$ps_next=$ps_prev=$ps_nav=$tooltip=$ps_preview_wrapper=$links=total_images=currentHovered=current=$loader=$overlay=overlayHeight=overlayWidth=catalog=items=page=loaded=firstImage=$currentImage=$newImage=element=cWidth=pWidth=cHeight=getPagesURI =getPageDataURI=imageServiceURI=null;
								*/
								
            }
							
							


        }
    });
})(jQuery);




