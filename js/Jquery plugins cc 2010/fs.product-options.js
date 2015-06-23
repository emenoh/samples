
(function($) {
    $.fn.FSproductOptions = function(FSproductOptions, bundle, editOptions) {
        if (typeof FSproductOptions !== 'object') {
            return false;
        }

        // This is for a random bug on Relic where the object passed in is wrapped in another object.
        // We reset the object here to the desired state if that happens to be the case.
        if (typeof FSproductOptions.productOptionsJSON === 'object') {
            FSproductOptions = FSproductOptions.productOptionsJSON;
        }

        if (typeof(bundle) === 'undefined') {
            bundle = false;
        }
        else if (typeof(bundle) === 'object') {
            editOptions = bundle;
            bundle = false;
        }

        if (typeof(editOptions) === 'undefined') {
            editOptions = false;
        }

        return this.each(function() {
            var obj = $(this);
            var colors = obj.find('.color');
            var hasColors = false;
            var currentColor;
            var currentColorIndex;
            var colorSwatches = [];
            var currentSize;
            var currentSizeIndex;
            var hasSize = false;
            var sizeOnly = false;
            var sizes = [];
            var sizesSwatches = [];
            var hasSecondSize = false;
            var secondSizes = [];
            var secondSizesSwatches = [];
            var hasDenomination = false;
            var denomSwatches = [];
            var optionsForm = (obj.find("#OrderItemAddForm").length > 0) ? obj.find("#OrderItemAddForm") : obj.parent("#OrderItemAddForm");
            var addToBagButton = (bundle) ? $(".addToBagSubmitButton") : (optionsForm.find('#addToBagSubmitButton').length > 0 ) ? optionsForm.find('#addToBagSubmitButton') : optionsForm.find('#updateSubmitButton');

            var qs = new FS.queryString();
            var leaderImage = (typeof(qs.params.imagePath) !== "undefined") ? qs.params.imagePath : FSproductOptions.familyLeaderImage;

            var sortOptionSwatches = function(a, b) {
                return parseInt(a.text(), 10) - parseInt(b.text(), 10);
            }

            var sortSizes = function(a, b) {
                return parseInt(a, 10) - parseInt(b, 10);
            }

            var stripslashes = function(str) {
                return (str + '').replace(/\\(.?)/g, function (s, n1) {
                    switch (n1) {
                        case '\\':
                            return '\\';
                        case '0':
                            return '\u0000';
                        case '':
                            return '';
                        default:
                            return n1;
                    }
                });
            };

            var makeLocalizedSize = function(optionName) {
                switch (optionName) {
                case 'Waist':
                    return FS.local_lang.labels.waist;
                break;
                case 'Length':
                    return FS.local_lang.labels.length;
                    break;
                case 'Size' :
                    return FS.local_lang.labels.size;
                    break;
                default:
                    return optionName;
                    break;
                }
            };

            var makeOptionsDOM = function(optionName, options, className) {
                var optionsPicker = $('<div class="' + className + ' floatContainer options"><p>' + optionName + '</p><div class="sizeChart"></div></div>');

                var sizeChart = optionsPicker.find('.sizeChart');
                $.each(options, function(index, value) {
                    sizeChart.append(value);
                });
                if (bundle) {
                    obj.append(optionsPicker);
                }
                else {
                    obj.find('.quantityList').before(optionsPicker);
                }
            };

            var getPrice = function() {
                var price;
                var minPrice = FSproductOptions.minItemPrice ? parseFloat(FSproductOptions.minItemPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10) : 0;
                var maxPrice = FSproductOptions.maxItemPrice ? parseFloat(FSproductOptions.maxItemPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10) : 0;
                if (minPrice === maxPrice) {
                    price = minPrice;
                }
                else if (hasSecondSize) {
                    price = (typeof(currentSecondSize) === 'undefined') ? parseFloat(currentColor.options[0].options[0].resolvedItem.offerPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10) : parseFloat(currentSecondSize.resolvedItem.offerPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10);
                }
                else if (hasSize){
                    price = (typeof(currentSize) === 'undefined') ? parseFloat(currentColor.options[0].resolvedItem.offerPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10) : parseFloat(currentSize.resolvedItem.offerPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10);
                }
                else {
                    price = parseFloat(FSproductOptions.resolvedItem.offerPrice.match(/(\d+(,|\.)\d+)/)[0].replace(FS.local_lang.labels.decimalDelimiter, '.'), 10);
                }
                return price;
            };

            var updateColor = function(index) {
                currentColor = FSproductOptions.options[index];
                currentColorIndex = index;

                // update current color values
                optionsForm.find('#color_attrName').val(currentColor.attributeRefNo);
                optionsForm.find('#color_attrValue').val(stripslashes(currentColor.value));

                obj.find('.colorName').html("("+stripslashes(currentColor.value)+")");
                obj.find('.swatch').removeClass('selected');
                obj.find('.swatch:eq('+index+')').addClass('selected');

                //unbind click event
                obj.find('.size .sizeButton').unbind('click');

                if (!bundle) {
                    validateOptions();
                }
                else {
                    updateBagButton();
                }

                if (hasSize) {
                    updateSizes(true);
                }
            };

            var updateSizes = function(clearSize) {
                if (typeof(clearSize) === 'undefined') {
                    clearSize = false;
                }
                var availableSizes;
        var sizeButtons = obj.find('.size .sizeButton');

                sizeButtons.removeClass('disabled');

                if (hasColors) {
                    availableSizes  = currentColor.availableSizes;
                }
                else {
                    availableSizes = FSproductOptions.availableSizes;
                }

                $.each(sizes, function(i, size) {
                    selectedSizeButton = obj.find('.size .sizeButton:eq('+i+')');
                    if (availableSizes == null || jQuery.inArray(size, availableSizes) == '-1') {
                        selectedSizeButton.addClass('disabled').unbind('click');

                        //remove selected
                        if (selectedSizeButton.hasClass('selected')) {
                            selectedSizeButton.removeClass('selected');
                            clearSize = true;
                        }
                    }
                    else {
                        //bind click event
                        selectedSizeButton.click(function() {
                            addToBagButton.trigger("blur");
                            if (!sizeOnly) {
                                selectSize($(this).data(currentColorIndex+"_index"));
                            } else {
                                selectSize(i);
                            }
                        });
                    }
                });

                if (clearSize) {
                    currentSize = {};
                    optionsForm.find('#size_attrName').val("");
                    optionsForm.find('#size_attrValue').val("");

                    obj.find('.size .sizeButton').removeClass('selected');

                    if (hasSecondSize) {
                        currentSecondSize = {};
                        updateSecondSizes(true);
                    }
                }
            };

            var updateDenomination = function(i){
                //update form values
                currentDenomination = FSproductOptions.options[i];

                // update current color values
                optionsForm.find('#denomination_attrName').val(currentDenomination.attributeRefNo);
                optionsForm.find('#denomination_attrValue').val(currentDenomination.value);

                //remove previous value
                obj.find('.sizeButton.selected').removeClass('selected');

                //set new values
                currentDenominationIndex = i;
                currentDenomination = currentDenomination.value;

                //update option value
                obj.find('.sizeButton:eq('+i+')').addClass('selected');
                obj.find('.desc').html(currentDenomination);
                validateOptions();
            };

            var selectSize = function(index) {
                if (hasColors) {
                    currentSize = currentColor.options[index];
                    currentSizeIndex = index;
                }
                else {
                    currentSize = FSproductOptions.options[index];
                    currentSizeIndex = index;
                }

                // update current size values
                if (typeof(currentSize) !== 'undefined') {
                    optionsForm.find('#size_attrName').val(currentSize.attributeRefNo);
                    optionsForm.find('#size_attrValue').val(stripslashes(currentSize.value));

                    obj.find('.size .sizeButton').removeClass('selected').each(function(i, elem) {
                        if ($(elem).text() === currentSize.value) {
                            $(elem).addClass("selected");
                        }
                    });

                    if (hasSecondSize) {
                        //unbind click event
                        obj.find('.secondSize .sizeButton').unbind('click');
                        updateSecondSizes();
                    }
                    else {
                        if (!bundle) {
                            validateOptions();
                        }
                        else {
                            updateBagButton();
                        }
                    }
                }
            };

            var updateSecondSizes = function(clearSecondSize) {
                if (typeof(clearSecondSize) === 'undefined') {
                    clearSecondSize = false;
                }
                var secondSizeButtons = obj.find('.secondSize .sizeButton');

                secondSizeButtons.removeClass('disabled');

                $.each(secondSizes, function(i, secondSize) {
                    selectedSecondSizeButton = obj.find('.secondSize .sizeButton:eq('+i+')');

                    if (currentSize.availableSecondSizes == null || jQuery.inArray(secondSize, currentSize.availableSecondSizes) == '-1') {
                        selectedSecondSizeButton.addClass('disabled').unbind('click');

                        //remove selected
                        if (selectedSecondSizeButton.hasClass('selected')) {
                            selectedSecondSizeButton.removeClass('selected');
                            clearSecondSize = true;
                        }
                    }
                    else {
                        //bind click event
                        selectedSecondSizeButton.click(function() {
                            addToBagButton.trigger("blur");
                            selectSecondSize(i);
                        });
                    }
                });

                if (clearSecondSize) {
                    currentSecondSize = {};
                    $('#secondSize_attrName').val("");
                    $('#secondSize_attrValue').val("");

                    obj.find('.secondSize .sizeButton').removeClass('selected');
                }
            };

            var selectSecondSize = function(i) {
                for (var x in currentSize.options) {
                    if (currentSize.options[x].value == secondSizes[i]) {
                        currentSecondSize = currentSize.options[x];
                    }
                }

                // update current second size values
                optionsForm.find('#secondSize_attrName').val(currentSecondSize.attributeRefNo);
                optionsForm.find('#secondSize_attrValue').val(stripslashes(currentSecondSize.value));

                obj.find('.secondSize .sizeButton').removeClass('selected');
                obj.find('.secondSize .sizeButton:eq('+i+')').addClass('selected');
                if (!bundle) {
                    validateOptions();
                }
                else {
                    updateBagButton();
                }
            };

            var validateOptions = function() {
                if (hasSize && typeof(currentSize) !== 'undefined') {
                    if (hasSize && currentSize.value == null) {
                        $('#errorMessage #messageContent').html(FS.local_lang.errors.pleaseSelectLabel+makeLocalizedSize(sizeName));
                        disableButtons();
                        return false;
                    }
                    else if (hasSecondSize && currentSecondSize.value == null) {
                        $('#errorMessage #messageContent').html(FS.local_lang.errors.pleaseSelectLabel+makeLocalizedSize(secondSizeName));
                        disableButtons();
                        return false;
                    }
                    else {
                        enableButtons();
                        return true;
                    }
                }
                else if (hasColors && !hasSize && !hasSecondSize && typeof currentColor !== 'undefined') {
                    enableButtons();
                    return true;
                }
                else {
                    disableButtons();
                }
            };

            var disableButtons = function() {
                addToBagButton.removeClass('primary').addClass('disabled').unbind("click").bind("click", function(e) {
                    e.preventDefault();
                    validateOptions();
                    showTooltip();
                }).bind("blur", function(e) {
                    $('#errorMessage').fadeOut(175);
                });

                $('.wishlist button').unbind("click").bind("click", function(e) {
                    e.preventDefault();
                    showTooltip();
                    $('.wishlist button').bind("blur", function(e) {
                        $('#errorMessage').fadeOut(175);
                    });
                });
            };

            var enableButtons = function() {
                addToBagButton.unbind("click").removeClass('disabled').addClass('primary').bind("click",function(e) {
                    e.preventDefault();
                    var addToBagId = addToBagButton.attr('id');
                    if( addToBagId == 'updateSubmitButton' ) {
                        if (!editOptions) {
                            prepareSubmit(document.OrderItemAddForm, "updateBag");
                        }
                        else {
                            var newItemId;
                            if (hasSecondSize) {
                                newItemId = currentSecondSize.resolvedItem.itemId;
                            }
                            else if (hasSize) {
                                newItemId = currentSize.resolvedItem.itemId;
                            }
                            else if (hasColors) {
                                newItemId = currentColor.resolvedItem.itemId;
                            }
                            else {
                                newItemId = FSproductOptions.resolvedItem.itemId;
                            }

                            submitEditWishlistItem(editOptions.listId, editOptions.itemId, newItemId);
                        }
                    }
                    else if( addToBagId == 'addToBagSubmitButton' ) {
                        prepareSubmit(document.OrderItemAddForm, "addToBag");
                    }
                    else {
                        prepareSubmit(document.OrderItemAddForm, "addToBagBundle");
                    }
                    return false;
                });

                $('.wishlist button').unbind("click").bind("click", function(e) {
                    prepareSubmit(document.OrderItemAddForm, 'wishlist');
                });
            };

            var showTooltip = function(offset){
                var isMSIE = /*@cc_on!@*/false;
                if (isMSIE) {
                    var toolTipWidth = $('#errorMessage').width() - 6;
                    $('#errorMessage iframe').css('width', toolTipWidth+'px');
                }

                //reset size
                $('#errorMessage #messageContent').removeAttr("style").css({'zIndex': '-3'});
                $('#errorMessage').css({'left': '0px', 'top': '0px', 'display': 'block'});
                $('#errorMessage #messageContent').css('white-space', 'nowrap').css('zIndex', '1000');
                $('#errorMessage').css({'display': 'none'});

                //position element
                var offset = addToBagButton.offset();
                offset.top -= 29;

                windowResize();

                $('#errorMessage').css({'left': offset.left+'px', 'top': offset.top+'px'}).fadeIn(175);
            };

            //window resize stuff
            var windowResize = function(offset){
                $(window).bind('resize', function() {
                    var newLeft = addToBagButton.offset().left;
                    $('#errorMessage').css('left', newLeft+'px');
                });
            };

            var updateBagButton = function() {
                var quantityDropdowns = $('.quantityDropDown .quantity');
                var numProducts = 0;

                quantityDropdowns.each(function(i, elem) {
                    if ($(elem).val() > 0) {
                        numProducts = numProducts+1;
                    }
                });

                var product = (numProducts == '1') ? FS.local_lang.labels.productsSelectedSingular : FS.local_lang.labels.productsSelectedPlural;

                if (numProducts > 0 && validateOptions()) {
                    enableButtons();
                    $('.addToBagButton .desc').html(numProducts+' '+product);
                } else {
                    disableButtons();
                    $('.addToBagButton .desc').html('0 '+ FS.local_lang.labels.productsSelectedPlural);
                }
            };
            if (FSproductOptions.options !== null) {
                obj.find('.color').empty();

                if (bundle) {
                    var quantitySelect = obj.parents('.productContent').find('.quantityDropDown select');

                    quantitySelect.bind("change", function() {
                        if ($(this).val() > 0) {
                            updateBagButton();
                            addToBagButton.trigger("blur");
                        }
                    });

                    var validateOptions = function() {
                        if (quantitySelect.val() > 0) {
                            if (hasColors && (!hasSize && !hasSecondSize)) {
                                if ($.isEmptyObject(currentColor)) {
                                    $('#errorMessage #messageContent').html(FS.local_lang.errors.bundleSelectOneItem);
                                    return false;
                                }
                            }
                            if (hasSize && hasSecondSize) {
                                if ($.isEmptyObject(currentSize) || $.isEmptyObject(currentSecondSize)) {
                                    $('#errorMessage #messageContent').html(FS.local_lang.errors.bundleSelectOneItem);
                                    return false;
                                }
                            }
                            else if (hasSize && !hasSecondSize) {
                                if ($.isEmptyObject(currentSize)) {
                                    $('#errorMessage #messageContent').html(FS.local_lang.errors.bundleSelectOneItem);
                                    return false;
                                }
                            }

                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                }
                else {
                    enableButtons();
                }

                var colorIndex = 0;
                var colorsOutOfStock = [];

                // Loop through options
                for (var x in FSproductOptions.options) {

                    // Check if we are looking at colors.
                    if (FSproductOptions.options[x].type === 'Color') {
                        hasColors = true;
                        swatchImage = FSproductOptions.options[x].swatch.search(/_swatch/) >= 0 ? FSproductOptions.options[x].swatch : FSproductOptions.options[x].swatch+"_swatch";
            swatch = $('<a class="swatch"><span><img id="' + FSproductOptions.options[x].image + '" src="' + FS.scene7.hostAssigned + 'is/image/FossilPartners/' + swatchImage + '?$'+FS.scene7.imgPath+'_swatch$" alt="'+ FSproductOptions.options[x].value +'"/></span></a>');
                        // Add color swatch objects into array and assign some data to them.
                        if (FSproductOptions.options[x].options === null) {
                            console.log(FSproductOptions.options[x].resolvedItem.inStock);
                            if (FSproductOptions.options[x].resolvedItem.inStock) {
                                colorSwatches.push(swatch);
                                jQuery.data(colorSwatches[colorIndex], "colorIndex", colorIndex);
                                colorIndex++;
                            } else {
                                colorsOutOfStock.push(x);
                            }
                        }

                        // Look for sizes
                        if (typeof(FSproductOptions.options[x].options) === 'object' && FSproductOptions.options[x].options !== null) {

                            hasSize = true;
                            var sizeName = FSproductOptions.options[x].options[0].type;
                            FSproductOptions.options[x].availableSizes = [];

                            // Loop through sizes.
                            for (var y in FSproductOptions.options[x].options) {
                                // Put new array into FSproductOptions object of available sizes for each color.
                                if (typeof FSproductOptions.options[x].options[y].resolvedItem === 'object' && FSproductOptions.options[x].options[y].resolvedItem.inStock) {
                                    FSproductOptions.options[x].availableSizes.push(FSproductOptions.options[x].options[y].value);
                                } else if (FSproductOptions.options[x].options[y].options !== null) {
                                    FSproductOptions.options[x].availableSizes.push(FSproductOptions.options[x].options[y].value);
                                }

                                // Check if size is in our sizes array
                                if (jQuery.inArray(FSproductOptions.options[x].options[y].value, sizes) === -1) {
                                    // If not in array add it to sizes array and build it's button and assign data.
                                    sizes.push(FSproductOptions.options[x].options[y].value);
                                    sizesSwatches.push($('<a class="sizeButton"><span>'+FSproductOptions.options[x].options[y].value+'</span></a>').data(colorIndex+"_index", y));
                                } else {
                                    $.each(sizesSwatches, function(index, elem) {
                                        if (elem.text() === FSproductOptions.options[x].options[y].value) {
                                            elem.data(colorIndex+"_index", y);
                                        }
                                    });
                                }

                                // Look for second sizes
                                if (typeof(FSproductOptions.options[x].options[y].options) === 'object' && FSproductOptions.options[x].options[y].options !== null) {
                                    hasSecondSize = true;
                                    var secondSizeName = FSproductOptions.options[x].options[y].options[0].type;
                                    FSproductOptions.options[x].options[y].availableSecondSizes = [];

                                    // Loop through second sizes
                                    for (var z in FSproductOptions.options[x].options[y].options) {
                                        // Put new array into FSproductOptions object of available second sizes for each size.
                                        if (typeof FSproductOptions.options[x].options[y].options[z].resolvedItem === 'object' && FSproductOptions.options[x].options[y].options[z].resolvedItem.inStock) {
                                            FSproductOptions.options[x].options[y].availableSecondSizes.push(FSproductOptions.options[x].options[y].options[z].value);
                                        }

                                        // Check if second size is in our secondSizes array
                                        if (jQuery.inArray(FSproductOptions.options[x].options[y].options[z].value, secondSizes) === -1) {
                                            // If not in array add it to secondSizes array and build it's button and assign data.
                                            secondSizes.push(FSproductOptions.options[x].options[y].options[z].value);
                                            secondSizesSwatches.push($('<a class="sizeButton disabled"><span>'+FSproductOptions.options[x].options[y].options[z].value+'</span></a>').data(y+"_index", z));
                                            if (FSproductOptions.options[x].options[y].options[z].resolvedItem.isDefault) {
                                                jQuery.data(secondSizesSwatches[z], "isDefault", true);
                                            }
                                        }
                                    }
                                }
                            }

                            if (FSproductOptions.options[x].availableSizes.length === 0) {
                                colorsOutOfStock.push(x);
                            }
                            else {
                                colorSwatches.push(swatch);
                                jQuery.data(colorSwatches[colorIndex], "colorIndex", colorIndex);
                                colorIndex++;
                            }
                        }
                    } // Color isn't present we assume there are only sizes.
                    else if (FSproductOptions.options[x].type === 'Size') {
                        hasSize = true;
                        sizeOnly = true;
                        var sizeName = FSproductOptions.options[0].type;
                        FSproductOptions.availableSizes = [];

                        // Loop through sizes.
                        for (var x in FSproductOptions.options) {
                            // Put new array into FSproductOptions object of available sizes for each color.
                            if (typeof FSproductOptions.options[x].resolvedItem === 'object' && FSproductOptions.options[x].resolvedItem.inStock) {
                                FSproductOptions.availableSizes.push(FSproductOptions.options[x].value);
                            } else if (FSproductOptions.options[x].options !== null) {
                                FSproductOptions.availableSizes.push(FSproductOptions.options[x].value);
                            }

                            // Check if size is in our sizes array
                            if (jQuery.inArray(FSproductOptions.options[x].value, sizes) === -1) {
                                // If not in array add it to sizes array and build it's button and assign data.
                                sizes.push(FSproductOptions.options[x].value);
                                sizesSwatches.push($('<a class="sizeButton">'+FSproductOptions.options[x].value+'</a>').data("index", x));
                            } else {
                                $.each(sizesSwatches, function(index, elem) {
                                    if (elem.text() === FSproductOptions.options[x].value) {
                                        elem.data(x+"_index", y);
                                    }
                                });
                            }

                            // Look for second sizes
                            if (typeof(FSproductOptions.options[x].options) === 'object' && FSproductOptions.options[x].options !== null) {
                                hasSecondSize = true;
                                var secondSizeName = FSproductOptions.options[x].options[0].type;
                                FSproductOptions.options[x].availableSecondSizes = [];

                                // Loop through second sizes
                                for (var y in FSproductOptions.options[x].options) {
                                    // Put new array into FSproductOptions object of available second sizes for each size.
                                    if (typeof FSproductOptions.options[x].options[y].resolvedItem === 'object' && FSproductOptions.options[x].options[y].resolvedItem.inStock) {
                                        FSproductOptions.options[x].availableSecondSizes.push(FSproductOptions.options[x].options[y].value);
                                    }

                                    // Check if second size is in our secondSizes array
                                    if (jQuery.inArray(FSproductOptions.options[x].options[y].value, secondSizes) === -1) {
                                        // If not in array add it to secondSizes array and build it's button and assign data.
                                        secondSizes.push(FSproductOptions.options[x].options[y].value);
                                        secondSizesSwatches.push($('<a class="sizeButton disabled">'+FSproductOptions.options[x].options[y].value+'</a>').data(x+"_index", y));
                                        if (FSproductOptions.options[x].options[y].resolvedItem.isDefault) {
                                            jQuery.data(secondSizesSwatches[z], "isDefault", true);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    else if (FSproductOptions.options[x].type === 'Denomination') {
                        hasDenomination = true;
                        denominationName = FSproductOptions.options[x].type;
                        denomSwatches.push($('<a class="sizeButton">'+FSproductOptions.options[x].value+'</a>'));
                        jQuery.data(denomSwatches[x], "denomIndex", x);
                    }
                }

                // Append items to DOM and bind click events.
                if (colorsOutOfStock.length < FSproductOptions.options.length) {
                    if (hasColors) {
                        if (optionsForm.find("#color_attrName").length === 0 && optionsForm.find("#color_attrValue").length === 0) {
                            optionsForm.append('<input type="hidden" id="color_attrName" value="" /><input type="hidden" id="color_attrValue" value="" />');
                        }
                        colors.append('<p>'+FS.local_lang.labels.color+'&nbsp;<span class="colorName desc">()</span></p>');

                        if (hasSize) {
                            if (!isNaN(parseInt(sizes[0], 10))) {
                                sizes.sort(sortSizes);
                                sizesSwatches.sort(sortOptionSwatches);
                            }

                            if (optionsForm.find("#size_attrName").length === 0 && optionsForm.find("#size_attrValue").length === 0) {
                                optionsForm.append('<input type="hidden" id="size_attrName" value="" /><input type="hidden" id="size_attrValue" value="" />');
                            }
                            makeOptionsDOM(makeLocalizedSize(sizeName), sizesSwatches, "size");
                        }

                        if (hasSecondSize) {
                            if (!isNaN(parseInt(secondSizes[0], 10))) {
                                secondSizes.sort(sortSizes);
                                secondSizesSwatches.sort(sortOptionSwatches);
                            }
                            if (optionsForm.find("#secondSize_attrName").length === 0 && optionsForm.find("#secondSize_attrValue").length === 0) {
                                optionsForm.append('<input type="hidden" id="secondSize_attrName" value="" /><input type="hidden" id="secondSize_attrValue" value="" />');
                            }
                            makeOptionsDOM(makeLocalizedSize(secondSizeName), secondSizesSwatches, "secondSize");
                        }

                        colorsOutOfStock.reverse();
                        $.each(colorsOutOfStock, function(index, value) {
                            FSproductOptions.options.splice(value, 1);
                        });

                        $.each(colorSwatches, function(index, value) {

                            colors.append(value);

                            value.bind("click", function(e) {
                                e.preventDefault();
                                var index = jQuery.data(value, "colorIndex");
                                addToBagButton.trigger("blur");
                                updateColor(index);
                            });
                        });

                        var defaultColorSet = false;
                        for (var a in FSproductOptions.options) {
                            if (typeof FSproductOptions.options[a].resolvedItem === "object" && FSproductOptions.options[a].resolvedItem.isDefault) {
                                updateColor(a);
                                defaultColorSet = true;
                            }

                            if (!defaultColorSet && leaderImage !== 'undefined' && leaderImage === FSproductOptions.options[a].image) {
                                updateColor(a);
                            }

                            if (hasSize) {
                                for (var b in FSproductOptions.options[a].options) {
                                    if (FSproductOptions.options[a].options[b].isDefault || (typeof(FSproductOptions.options[a].options[b].resolvedItem) == "object" && FSproductOptions.options[a].options[b].resolvedItem.isDefault)) {
                                        FSproductOptions.familyLeaderImage = leaderImage = FSproductOptions.options[a].image;
                                        updateColor(a);
                                        selectSize(b);
                                    }

                                    if (hasSecondSize) {
                                        for (var c in FSproductOptions.options[a].options[b].options) {
                                            if (FSproductOptions.options[a].options[b].options[c].resolvedItem.isDefault) {
                                                FSproductOptions.familyLeaderImage = leaderImage = FSproductOptions.options[a].image;
                                                updateColor(a);
                                                selectSize(b);
                                                selectSecondSize(c);
                                            }
                                        } // end for c loop
                                    } // end hasSecondSize check
                                } // end for b loop
                            } // end hasSize check
                        } // end for a loop (find default color)
                    } // end if hasColors check
                } // end if colorsOutOfStock check
                else {
                    obj.find('.color').empty().append('<p>'+FS.local_lang.labels.itemOutOfStock+'</p>');
                    obj.siblings('.quantityOptions').remove();
                }

                if (hasDenomination) {
                    if (optionsForm.find("#denomination_attrName").length === 0 && optionsForm.find("#denomination_attrValue").length === 0) {
                        optionsForm.append('<input type="hidden" id="denomination_attrName" value="" /><input type="hidden" id="denomination_attrValue" value="" />');
                    }
                    colors.removeClass("color").addClass("denomination").append('<p>'+denominationName+':&nbsp;<span class="denominationName desc"></span></p>');
                    var denomChart = $('<div class="sizeChart">');
                    $.each(denomSwatches, function(index, value) {
                        denomChart.append(value);

                        value.bind("click", function(e) {
                            e.preventDefault();
                            var index = jQuery.data(value, "denomIndex");
                            addToBagButton.trigger("blur");
                            updateDenomination(index);
                        });
                    });
                    colors.append(denomChart);

                    for (var a in FSproductOptions.options) {
                        if (FSproductOptions.options[a].isDefault) {
                            updateDenomination(a);
                        }
                    }
                }

                if (sizeOnly) {
                    colors.remove();
                    if (!isNaN(parseInt(sizes[0], 10))) {
                        sizes.sort(sortSizes);
                        sizesSwatches.sort(sortOptionSwatches);
                    }

                    if (optionsForm.find("#size_attrName").length === 0 && optionsForm.find("#size_attrValue").length === 0) {
                        optionsForm.append('<input type="hidden" id="size_attrName" value="" /><input type="hidden" id="size_attrValue" value="" />');
                    }
                    makeOptionsDOM(makeLocalizedSize(sizeName), sizesSwatches, "size");
                }

                if (colorsOutOfStock.length < FSproductOptions.options.length) {
                    updateSizes(true);
                }
            }
            //Product has NO options
            else {
                obj.find('.color').remove();
                var hasColor, hasSize, hasSecondSize = false;
                //if not a bundle, immediately enable the add to bag button
                if( !bundle ) {
                    enableButtons();
                }

                if (bundle) {
                    obj.html('').height(0);

                    var quantitySelect = obj.parents('.productContent').find('.quantityDropDown select');

                    quantitySelect.bind("change", function() {
                        if ($(this).val() > 0) {
                            updateBagButton();
                            addToBagButton.trigger("blur");
                        }
                    });

                    var validateOptions = function() {
                        if (quantitySelect.val() > 0) {
                            if ((hasSize && currentSize.value == null) || (hasSecondSize && currentSecondSize.value == null)) {
                                select.attr('checked', false);
                                return false;
                            }

                            return true;
                        }
                        else {
                            return false;
                        }
                    };
                }

            }

        });
    };
})(jQuery);
