

define("modules/product-options/models/option", ["jquery", "underscore", "backbone", "mediator", "store/" + country + "/locale/main", "modules/product-options/helpers", "modules/product-options/collections/options"], function($, _, backbone, mediator, store, helpers, cOptions) {
    return backbone.Model.extend({
        defaults: {
            sequence: null,
            value: null,
            isDefault: !1,
            attributeRefNo: null,
            type: null,
            image: null,
            swatch: null,
            optionDepth: 1,
            options: [],
            resolvedItem: null,
            hasChild: !1,
            parentOption: null,
            inStock: !1,
            isLowInventory: !1,
            isPreorder: !1,
            sslProtocol: location.protocol === "https:" ? !0 : !1
        },
        initialize: function(this) {
            this.constructor.__super__.initialize(this), this.buildModelInfo()
        },
        buildModelInfo: function() {
            var item, items, i, priceobject, options = this.get("options"),
                swatchEl = this.get("swatch");
            this.set("optionDepth", this.get("parentOption").get("optionDepth") + 1), this.set("value", this.get("value").replace("\\", "")), this.get("type") === "Color" && this.set({
                swatch: swatchEl.match(/_/) ? swatchEl : swatchEl + "_swatch"
            });
            if (options && options.length > 0) {
                cOptions = cOptions || require("modules/product-options/collections/options");
                for (item = 0, i = options.length; item < i; item++) options[item].parentOption = this;
                this.set({
                    options: new cOptions(options),
                    hasChild: !0
                })
            } else {
                items = this.get("resolvedItem");
                for (item in items) items.hasOwnProperty(item) && (this.attributes[item] = items[item]);
                priceobject = {
                    dispListPrice: helpers.formatPrice(items.listPrice),
                    dispOfferPrice: helpers.formatPrice(items.offerPrice),
                    isSale: items.listPrice !== items.offerPrice
                }, this.set(priceobject), this.bubbleAttributesToParents(this.get("inStock"), priceobject), this.bubbleAttributesToParents(this.get("inStock"), $.extend(priceobject, {
                    isLowInventory: this.get("isLowInventory"),
                    isPreorder: this.get("isPreorder")
                }))
            }
            mediator.publish("optionModelBuilt", {
                type: this.get("type"),
                depth: this.get("optionDepth")
            })
        },
        bubbleAttributesToParents: function(attribute, value) {
            var parentOption = this.get("parentOption");
            parentOption && (parentOption.set(value), !backbone.get("inStock") && attribute && backbone.set("inStock", attribute), typeof backbone.bubbleAttributesToParents == "function" && backbone.bubbleAttributesToParents(attribute, value))
        }
    })
}), 





