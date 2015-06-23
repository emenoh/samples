class au.com.massive.panasonic.model.IpodModel extends au.com.massive.event.EventBroadcasterBase
{
    static var MODEL_IPOD_STATUS_CHANGE: String = "model.ipod.statusChange";
    static var MODEL_IPOD_VOLUME_CHANGE: String = "model.ipod.volumeChange";
    var _connected: Boolean = false;
    var _volume: Number = 20;
    var __get__connected;
    var __get__volume;
    var broadcastEvent;

    function IpodModel()
    {
        super();
    }

    function set connected(value)
    {
        if (this._connected != value) 
        {
            this._connected = value;
            this.broadcastEvent(au.com.massive.panasonic.model.IpodModel.MODEL_IPOD_STATUS_CHANGE, this._connected);
        }

    }

    function get connected()
    {
        return this._connected;
    }

    function set volume(value)
    {
        this._volume = value;
        this.broadcastEvent(au.com.massive.panasonic.model.IpodModel.MODEL_IPOD_VOLUME_CHANGE, this._volume);
    }

    function get volume()
    {
        return this._volume;
    }

}

