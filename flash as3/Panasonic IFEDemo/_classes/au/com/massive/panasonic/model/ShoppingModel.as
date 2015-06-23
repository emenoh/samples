class au.com.massive.panasonic.model.ShoppingModel extends au.com.massive.event.EventBroadcasterBase
{
    var _totalPrice;
    var _totalPriceInvalid;
    var items;
    var itemsById;

    function ShoppingModel()
    {
        super();
        this.reset();
    }

    function reset()
    {
        this.items = new Array();
        this.itemsById = new Array();
        this._totalPriceInvalid = true;
    }

    function get totalPrice()
    {
        if (this._totalPriceInvalid == true) 
        {
            this._totalPriceInvalid = false;
            var __reg3 = undefined;
            var __reg2 = undefined;
            this._totalPrice = 0;
            __reg2 = 0;
            while (__reg2 < this.items.length) 
            {
                __reg3 = au.com.massive.panasonic.vo.account.CartItemVO(this.items[__reg2]);
                this._totalPrice = this._totalPrice + __reg3.quantity * __reg3.productVO.price;
                ++__reg2;
            }

        }

        return this._totalPrice;
    }

    function addItem(vo)
    {
        if (vo.quantity >= 0) 
        {
            if (this.itemsById[vo.productVO.__get__id()] == undefined) 
            {
                this.items.push(vo);
                this.itemsById[vo.productVO.__get__id()] = vo;
            }
            else 
            {
                var __reg2 = undefined;
                __reg2 = 0;
                while (__reg2 < vo.quantity) 
                {
                    ++au.com.massive.panasonic.vo.account.CartItemVO(this.itemsById[vo.productVO.__get__id()]).quantity;
                    ++__reg2;
                }

            }


            this._totalPriceInvalid = true;
        }

    }

    function removeItem(vo)
    {
        var __reg2 = undefined;
        var __reg4 = undefined;
        if (this.itemsById[vo.__get__id()] != undefined) 
        {
            __reg4 = au.com.massive.panasonic.vo.account.CartItemVO(this.itemsById[vo.__get__id()]);
            --__reg4.quantity;
            if (__reg4.quantity <= 0) 
            {
                delete this.itemsById[vo.__get__id()];
                __reg2 = this.items.length - 1;
                while (__reg2 >= 0) 
                {
                    if (au.com.massive.panasonic.vo.account.CartItemVO(this.items[__reg2]).productVO.__get__id() == vo.__get__id()) 
                    {
                        this.items.splice(__reg2, 1);
                    }

                    --__reg2;
                }

            }

        }

        this._totalPriceInvalid = true;
    }

}

