var require = {
    baseUrl: "/wcsstore/CommonFossil/javascript/app",
    paths: {
        plugins: "../plugins",
        content: "../content",
        projects: "../../projects",
        util: "util",
        lib: "lib",
        modernizr: "lib/modernizr-custom",
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        handlebars: "lib/handlebars",
        hogan: "lib/hogan",
        jsonpath: "lib/jsonpath",
        text: "util/text",
        modules: "modules",
        mediator: "mediator",
        models: "models",
        views: "views",
        templates: "templates",
        controllers: "controllers",
        collections: "collections",
        localStorage: "localStorage",
        routes: "routes",
        ab: "modules/a-b",
        tracking: "modules/tracking/tracking",
        core: "modules/core",
        FSwrapper: "modules/misc/FSwrapper",
        vendors: "plugins/modules",
        "lib/GA": "//www.google-analytics.com/ga",
        "lib/coremetrics": "//libs.coremetrics.com/eluminate",
        "lib/facebook": "//connect.facebook.net/" + localLanguage + "/all",
        "lib/twitter": "//platform.twitter.com/widgets",
        "lib/bazaarvoice": "//display.ugc.bazaarvoice.com/static/Fossil/Main%20Site/en_US/bvapi",
        "lib/bazaarvoiceQL": "//display.ugc.bazaarvoice.com/static/Fossil/Quicklook/en_US/bvapi"
    },
    shim: {
        modernizr: {
            exports: "Modernizr"
        },
        jquery: {
            exports: "$"
        },
        "plugins/jquery.tagIt": ["jquery"],
        "plugins/wtooltip": ["jquery"],
        "plugins/jquery.colorbox": ["jquery"],
        "plugins/jquery.jscrollpane-autoscroll": ["jquery"],
        "plugins/jquery.jscrollpane-quicklook": ["jquery"],
        "plugins/preload": ["jquery"],
        "plugins/jquery.hoverIntent": ["jquery"],
        "plugins/jquery.map_resizer": ["jquery"],
        "plugins/flexslider": ["jquery"],
        "plugins/jquery.mousewheel": ["jquery"],
        "plugins/jquery.ba-bbq": ["jquery"],
        "plugins/twitter-bootstrap": ["jquery"],
        "plugins/bootstrap-select": ["jquery"],
        "plugins/swfobject": {
            exports: "SWFObject"
        },
        underscore: {
            exports: "_"
        },
        hogan: {
            exports: "Hogan"
        },
        backbone: {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        handlebars: {
            exports: "handlebars"
        },
        jsonpath: {
            exports: "jsonPath"
        }
    },
    waitSeconds: 60
};
country === "CN" && (require.paths["lib/facebook"] = "modules/misc/nothing.js?facebook");
if (country === "CN" || country === "KR") require.paths["lib/twitter"] = "modules/misc/nothing.js?twitter";