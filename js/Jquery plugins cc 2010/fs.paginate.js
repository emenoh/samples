(function($) {
    $.FSpaginate = $.fn.FSpaginate = function(method) {
        var defaults = {

        }
        

        var settings = {}

        var methods = {
            init : function(options) {
                settings = $.extend({}, defaults, options);

                return this.each(function() {
                    var element = $(this);
                    var data = element.data('FSpaginate');
                    
                    if (!data) {
                        element.data('FSpaginate', {
                            view : [],
                            gridObjects : {},
                            gridObject : [],
                            gridObjectCount : null,
                            currentPage : 0,
                            currentIndex : 0
                        });
                        data = element.data('FSpaginate');
                    }
                    FS.dom.body.addClass('paginated');
                    //get grid objects
                    if(FS.productCount>0){
                        data.gridObjects = $('.product').clone();
                        data.gridObjectCount = FS.productCount;
                    }else{
                        data.gridObjects = $('.gridObject').clone();
                        data.gridObjectCount = data.gridObjects.size();
                    }
                    for(x = 0; x<FS.view.length; x++){  
                        pagerView = {};
                        pagerView.gridSpaces = FS.view[x].area - (FS.catFeature.value ? FS.catFeature.value[x].area : 0);
                        pagerView.pageCount = Math.ceil(data.gridObjectCount/pagerView.gridSpaces);
                        console.log('pagerView.pageCount '+pagerView.pageCount);
                        data.view.push(pagerView);
                    }
                    FS.dom.body.bind("imgResize", function(e){                      
                        element.FSpaginate('imgResize');
                    });
                    element.data('FSpaginate', data);

                    element.FSpaginate('buildPagerHTML', 0);
                    element.FSpaginate('buildPagination');
                    FS.respond.constrainHeight();
                    
                    
                    
                });
            },
            buildPagerHTML : function(pageIndex){
                $('#primaryContent > div').not('#refineWrap').remove();
                var element = $(this);
                var data = element.data('FSpaginate');
                FS.dom.primaryContent.append(FS.catFeature.dom);
                var gridSize = data.view[FS.currentSizeIndex].gridSpaces;
                for(var x =0; x<gridSize; x++){
                    var gridObject = data.gridObjects.eq((pageIndex*gridSize)+x).clone();

                    var gridObjectContainer = document.createElement('div');
                    gridObjectContainer = $(gridObjectContainer);
                    gridObjectContainer.append(gridObject).attr('id', 'gridObjectContainer'+x).addClass('gridObjectContainer');
                    FS.dom.primaryContent.append(gridObjectContainer);
                }
                element.FSpaginate('fillInTheBlanks');
            },
            buildPagination : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                
                $('#pagination').append('<ul class="clearfix"><li class="pagerPrevious" id="pagerPrevious"><a href="#">Previous Page</a></li><li class="pagerKey">' + FS.local_lang.labels.pageLabel + ' <span id="currentPage">1</span>/<span id="numPages">'+data.view[FS.currentSizeIndex].pageCount+'</span></li><li class="pagerNext" id="pagerNext"><a href="#">Next Page</a></li></ul>');
                //var paginationOpacity = data.view[FS.currentSizeIndex].pageCount > 1 ? 'block' : 'none';
                //$('#pagerPrevious,#pagerNext').css({display: paginationOpacity});
                
                $('#pagerPrevious a').click(function(event){
                    event.stopPropagation();
                    element.FSpaginate('prevPage');
                    return false;
                });
                $('#pagerNext a').click(function(event){
                    event.stopPropagation();
                    element.FSpaginate('nextPage');
                    return false;
                });
                if(data.view[FS.currentSizeIndex].pageCount == 1){
                    $('#pagination').hide();
                }else{
                    $('#pagination').show();
                }
                $('#pagerPrevious a').hide();
            },
            updatePagination : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                $('#currentPage').html(data.currentPage+1);
                //var paginationOpacity = data.view[FS.currentSizeIndex].pageCount > 1 ? 'block' : 'none';
                //$('#pagerPrevious,#pagerNext').css({display: paginationOpacity});
                if(data.view[FS.currentSizeIndex].pageCount == 1){
                    $('#pagination').hide();
                }else{
                    $('#pagination').show();
                }
                if(data.currentPage == 0 ){
                    $('#pagerPrevious a').hide();
                }else{
                    $('#pagerPrevious a').show();
                }
                if(data.currentPage == (data.view[FS.currentSizeIndex].pageCount-1)){
                    $('#pagerNext a').hide();
                }else{
                    $('#pagerNext a').show();
                }
            },
            nextPage : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                
                if(data.currentPage < (data.view[FS.currentSizeIndex].pageCount - 1)){
                    var newPage = data.currentPage + 1;
                    element.FSpaginate('goToPage', newPage);
                    
                    /*$(this).once('pagerClick', function() {
                        $('.product').removeClass('viewed-processed loaded-processed');
                        var newPage = data.currentPage + 1;
                        $('.gridObjectContainer:first').find('.productImage img:first').animate({opacity: '0'}, {
                            duration: 500,
                            step: function(visibility) {
                                $('.gridObjectContainer:gt(0)').find('.productImage img:first').css({opacity: visibility});
                            },
                            complete: function() {
                                element.FSpaginate('goToPage', newPage);
                                $('#pagerNext a').attr('class', '');
                                $('.gridObjectContainer:first').find('.productImage img:first').animate({opacity: '1'}, {
                                    duration: 800,
                                    step: function(visibility) {
                                        $('.gridObjectContainer:gt(0)').find('.productImage img:first').css({opacity: visibility});
                                    }
                                });
                            }
                        });
                    });*/

                }
            },
            prevPage : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                
                if(data.currentPage > 0){
                    var newPage = data.currentPage - 1;
                    element.FSpaginate('goToPage', newPage);
                    /*
                    $(this).once('pagerClick', function() {
                        $('.product').removeClass('viewed-processed loaded-processed');
                        var newPage = data.currentPage - 1;
                        $('.gridObjectContainer:first').find('.productImage img:first').animate({opacity: '0'}, {
                            duration: 500,
                            step: function(visibility) {
                                $('.gridObjectContainer:gt(0)').find('.productImage img:first').css({opacity: visibility});
                            },
                            complete: function() {
                                element.FSpaginate('goToPage', newPage);
                                $('#pagerPrevious a').attr('class', '');
                                $('.gridObjectContainer:first').find('.productImage img:first').animate({opacity: '1'}, {
                                    duration: 800,
                                    step: function(visibility) {
                                        $('.gridObjectContainer:gt(0)').find('.productImage img:first').css({opacity: visibility});
                                    }
                                });
                            }
                        });
                    });
                    */
                }
            },
            updatePaginationCount : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                $('#numPages').html(data.view[FS.currentSizeIndex].pageCount);
            },
            goToPage : function(pageIndex){
                var element = $(this);
                var data = element.data('FSpaginate');

                data.currentPage = pageIndex;
                var gridSize = data.view[FS.currentSizeIndex].gridSpaces;
                data.currentIndex = (pageIndex*gridSize);
                var gridObjectIndex;
                for(var x = 0; x<gridSize; x++){
                    placeHolderHTML = '<div class="placeHolder"><img src="/wcsstore/CommonFossil/images/shell/prototype/thumbFiller.jpg"/></div>';
                    gridObjectIndex = data.currentIndex+x;
                    //console.log('data.currentIndex '+data.currentIndex);

                    if(gridObjectIndex < data.gridObjectCount){
                        $('#gridObjectContainer'+x).html(data.gridObjects.eq(gridObjectIndex).clone());
                    }else if(FS.dom.body.hasClass('subCategory')){
                        $('#gridObjectContainer'+x).html(placeHolderHTML);
                    }else{
                        $('#gridObjectContainer'+x).empty();
                    }  
                    
                }
                pagedProductLoad();
                element.FSpaginate('updatePagination');
                FS.fixIEpng();
            },
            imgResize : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                
                element.FSpaginate('buildPagerHTML');
                var newPage = element.FSpaginate('getpageIndexByGridIndex');
                element.FSpaginate('goToPage', newPage);
                element.FSpaginate('updatePaginationCount');
                FS.updateThumbImg();
                FS.fixIEpng();
            },
            getpageIndexByGridIndex : function(){
                var element = $(this);
                var data = element.data('FSpaginate');
                var gridSize = data.view[FS.currentSizeIndex].gridSpaces;
                var page = Math.floor(data.currentIndex/gridSize);
                return page;
            },
            fillInTheBlanks : function() {
                var element = $(this);
                var data = element.data('FSpaginate');
                var gridSize = data.view[FS.currentSizeIndex].gridSpaces;
                for(var x =0; x<gridSize; x++){
                    var gridObjectContainer = $('#gridObjectContainer'+x);
                    if(gridObjectContainer.html() === "") {
                        $('#primaryContent').append('<div class="placeHolder"><img src="/wcsstore/CommonFossil/images/shell/prototype/thumbFiller.jpg"/></div>');
                    }
                }
            }
        }//end methods

        var helpers = {
        }

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        else {
            $.error( 'Method "' +  method + '" does not exist in FSpaginate plugin!');
        }
    }
})(jQuery);
