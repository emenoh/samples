/**

 */
var de=document.documentElement;if(de){de.className+=" js";}

if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = { log: function() { return false; } };
}

var FS = (function() {
    var FS = {},
            document = window.document,
            location = window.location,
            cartHeight = -1,
            accountHeight = 110,
            isAccountDropdownAnimated = false,
            timeout,
            isDropdownAnimated = false;

    FS.hostName = location.hostname;
    FS.isLocal = (location.hostname.match(/(fossil\.local|192\.168|172\.30|127\.|assetstore-stage.fossil.com)/));
    FS.form = {
            'submitted': ''
    };

    FS.respond = {
        menuShown: 1, // Boolean value
        menuToggleEnabled: false,
        pageOffset: 0,
        currentThreshold: null,
        secondaryContentHeight: 0,
        smallContent: false,
        pinned: false,
        leftNavWidth: function() {
            return (this.currentThreshold <= 1) ? 142 : 168;
        },
        adaptCallback: function(i, width) {
            FS.respond.currentThreshold = i;

            var html = document.documentElement;
            html.className = html.className.replace(/(\s+)?threshold\d/g, '');

            if (i > -1) {
                html.className += ' threshold' + i;
            }
        }
    };

    FS.miniCart = {
        bagEmpty: true,
        cartHeight: function(height) {
            return (typeof height === "undefined") ? cartHeight : cartHeight = height;
        },
        numCartImages: 1,
        imagesLoaded: 0
    };

    FS.scene7 = {
        hostAssigned: ("https:" == location.protocol) ? "https://a248.e.akamai.net/f/248/9086/1.ccd/s7diod-isorigin.scene7.com/" : "http://s7d2.scene7.com/",
        imgPath: 'fossilResponsive',
        recipeMiniTh: "$fossilResponsive_recommended$",
        sjCallbacks: new Array()
    };

    /**
      @param {Object} settings Object containing four keys buttonName, buttonClass, buttonId, and buttonLabel.
     */
    FS.button = function(settings) {
        return '<button name="'+settings.buttonName+'" class="'+settings.buttonClass+'" id="'+settings.buttonId+'"><span class="buttonLeft"><span class="buttonRight"><span class="buttonContent">'+settings.buttonLabel+'</span></span></span></button>';
    };

    /**
      @param {Object} params Object of key/value pairs to transform into a querystring for URL's.
      @param {Boolean} includeDefaults Flag to include default parameters (storeId, langId, catalogId) defaults to true.
     */
    FS.params = function(params, includeDefaults) {
        params = (typeof params === "undefined") ? {} : params;
        includeDefaults = (typeof includeDefaults === "undefined") ? true : includeDefaults;

        var defaults = {storeId: this.storeId, catalogId: this.catalogId, langId: this.langId};
        var data = includeDefaults ? $.extend(defaults, params) : params;

        return $.param(data);
    };

    FS.accountSlideDown = function() {
        var cartDropdown = $('#cartDropdown');
        var cartButton = $('#cartButton');
        var accountDropdown = $('#accountDropdown');
        var accountDropdownContent = $('#accountDropdownContent');
        var accountButton = $('#accountButton');

        if (isDropdownAnimated) {
            cartDropdown.css('visibility', 'hidden').hide();
            cartButton.removeClass('showBag');
            isDropdownAnimated = false;
            cartDropdown.stop().clearQueue();
        }

        if (!isAccountDropdownAnimated) {
            isAccountDropdownAnimated = true;

            //swap style
            accountDropdown.css('visibility', 'visible');
            accountButton.addClass('showBag');
            accountDropdownContent.css('height', (accountHeight-20));
            accountDropdown.show().animate({height: accountHeight},200);
        }
        else {
            var newTime = 200 * ((accountHeight-accountDropdown.height())/ accountHeight);
            accountDropdown.stop().clearQueue().animate({height: accountHeight},newTime);
        }
    };

    FS.accountSlideUp = function() {
        var accountDropdown = $('#accountDropdown');
        var accountButton = $('#accountButton');

        accountDropdown.animate({height: 0}, 300, function() {
            //swap style
            accountButton.removeClass('showBag');
            isAccountDropdownAnimated = false;
            accountDropdown.hide();
        });
    };

    FS.slideDown = function() {
        var cartDropdown = $('#cartDropdown');
        var cartButton = $('#cartButton');
        var accountDropdown = $('#accountDropdown');
        var accountButton = $('#accountButton');

        if (isAccountDropdownAnimated) {
            accountDropdown.css('visibility', 'hidden');
            accountButton.removeClass('showBag');
            isAccountDropdownAnimated = false;
        }

        if (!isDropdownAnimated) {
            isDropdownAnimated = true;
            //Only calculate height on first hover. Delayed calculation because Safari does not return proper image height immediately after ajax loads.
            //This is now used as a redundancy only! cart Height should be calculated on AJAX Success
            if (cartHeight == -1 ) {
                cartHeight = cartDropdown.height();
            }

            //swap style
            cartDropdown.css('visibility', 'visible').show();

            cartButton.addClass('showBag');
            cartDropdown.height(0).animate({height: cartHeight},300);
        }
        else {
            var newTime = 300 * ((cartHeight-cartDropdown.height())/ cartHeight);
            cartDropdown.stop().clearQueue().animate({height: cartHeight}, newTime);
        }
    };

    FS.slideUp = function() {
        var cartDropdown = $('#cartDropdown');
        var cartButton = $('#cartButton');

        cartDropdown.animate({height: 0},300,
            function() {
                cartDropdown.hide();
                //swap style
                cartButton.removeClass('showBag');
                isDropdownAnimated = false;
            }
        );
    };

    FS.htmlEncode = function(value) {
        return $('<div/>').text(value).html();
    };

    FS.htmlDecode = function(value) {
        return $('<div/>').html(value).text();
    };

    FS.queryString = function(qs) {
        this.params = {};

        if (qs == null) {
            qs = document.location.search.substring(1, document.location.search.length);
        }
        if (qs.length == 0) {
            return;
        }

        // Turn <plus> back to <space>
        // See: http://www.w3.org/TR/REC-html40/interact/forms.html#h-17.13.4.1
        qs = qs.replace(/\+/g, ' ');
        var args = qs.split('&'); // parse out name/value pairs separated via &

        // split out each name=value pair
        for (var i = 0; i < args.length; i++) {
            var pair = args[i].split('=');
            var name = decodeURIComponent(pair[0]);

            var value = (pair.length==2) ? decodeURIComponent(pair[1]) : name;
            this.params[name] = value;
        }
    }

    FS.queryString.prototype.get = function(key, default_) {
        var value = this.params[key];
        return (value != null) ? value : default_;
    }

    FS.queryString.prototype.contains = function(key) {
        var value = this.params[key];
        return (value != null);
    }

    FS.getStyleSheet = function(sheetTitle) {
        for(var i=0; i<document.styleSheets.length; i++) {
            var sheet = document.styleSheets[i];
            if(sheet.title == sheetTitle) {
                return sheet;
            }
        }
    };

    return FS;
}());

// Edit to suit your needs.
var ADAPT_CONFIG = {
    dynamic: true,
    callback: FS.respond.adaptCallback,
    range: [
        '0 to 1000',
        '1000 to 1300',
        '1300 to 1500',
        '1500'
    ]
};
(function(a,b,c,d){function o(){clearInterval(g),g=setInterval(n,100)}function n(){clearInterval(g);var c=a.innerWidth||b.documentElement.clientWidth||b.body.clientWidth||0,h,n,o,p,q,r,s=k,t=k-1;while(s--){h=j[s].split("="),n=h[0],r=h[1]?h[1].replace(/\s/g,""):s,q=n.match("to"),o=q?parseInt(n.split("to")[0],10):parseInt(n,10),p=q?parseInt(n.split("to")[1],10):d;if(!p&&s===t&&c>o||c>o&&c<=p){e=i+r;break}e=""}f?f!==e&&m(s,c):(m(s,c),i&&(b.head||b.getElementsByTagName("head")[0]).appendChild(l))}function m(a,b){l.href=e,f=e,h&&h(a,b)}if(!!c){var e,f,g,h=typeof c.callback=="function"?c.callback:d,i=c.path?c.path:"",j=c.range,k=j.length,l=b.createElement("link");l.rel="stylesheet",n(),c.dynamic&&(a.addEventListener?a.addEventListener("resize",o,!1):a.attachEvent?a.attachEvent("onresize",o):a.onresize=o)}})(this,this.document,ADAPT_CONFIG)

var WebFontConfig = {
    custom: { families: ['ArialNarrow', 'TradeGothicBoldCond', 'TradeGothicLTCond', 'HelveticaNeueLight', 'HelveticaNeueBoldCond'],
    urls: [ '/wcsstore/CommonFossil/css/shell/minified/fonts.css' ] }
};
