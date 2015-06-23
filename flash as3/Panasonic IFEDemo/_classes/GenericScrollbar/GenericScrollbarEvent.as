package 
{
    import flash.events.*;

    public class GenericScrollbarEvent extends Event
    {
        public var value:Number = -1;
        public static var CHANGE:String = "scrollChange";

        public function GenericScrollbarEvent(param1:String, param2:Number)
        {
            value = -1;
            super(param1);
            this.value = param2;
            return;
        }// end function

    }
}
