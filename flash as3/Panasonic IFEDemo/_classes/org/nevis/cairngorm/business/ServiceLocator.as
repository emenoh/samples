class org.nevis.cairngorm.business.ServiceLocator extends mx.core.UIObject
{

    function ServiceLocator()
    {
        super();
        org.nevis.cairngorm.business.ServiceLocator.serviceLocator == undefined;
        org.nevis.cairngorm.business.ServiceLocator.serviceLocator = this;
    }

    static function getInstance()
    {
        if (org.nevis.cairngorm.business.ServiceLocator.serviceLocator == undefined) 
        {
            org.nevis.cairngorm.business.ServiceLocator.serviceLocator = new org.nevis.cairngorm.business.ServiceLocator();
        }

        return org.nevis.cairngorm.business.ServiceLocator.serviceLocator;
    }

    function getService(serviceId)
    {
        this[serviceId] != undefined;
        return this[serviceId];
    }

}

