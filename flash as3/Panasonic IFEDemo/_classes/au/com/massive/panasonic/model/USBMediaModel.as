class au.com.massive.panasonic.model.USBMediaModel extends au.com.massive.event.EventBroadcasterBase
{
    static var POLL_INTERVAL: Number = 6;
    static var MAX_FILES_PER_DIRECTORY: Number = 60;
    var lastPoll: Number = 0;
    var __get__directoryVO;
    var __get__isActive;
    var _directoryVO;
    var _isActive;
    var broadcastEvent;
    var maxFilesPerDirectory;
    var pollInterval;

    function USBMediaModel()
    {
        super();
        this._isActive = false;
        this.pollInterval = au.com.massive.panasonic.model.USBMediaModel.POLL_INTERVAL;
        this.maxFilesPerDirectory = au.com.massive.panasonic.model.USBMediaModel.MAX_FILES_PER_DIRECTORY;
    }

    function set directoryVO(value)
    {
        this._directoryVO = value;
        this.broadcastEvent(au.com.massive.panasonic.model.ModelLocator.MODEL_USB_DIRECTORY_CHANGE, this._directoryVO);
    }

    function get directoryVO()
    {
        return this._directoryVO;
    }

    function set isActive(b)
    {
        this._isActive = b;
        this.broadcastEvent(au.com.massive.panasonic.model.ModelLocator.MODEL_USB_ACTIVE, this._isActive);
    }

    function get isActive()
    {
        return this._isActive;
    }

}

