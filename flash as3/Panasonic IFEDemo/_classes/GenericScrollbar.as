package 
{
    import GenericScrollbar.*;
    import flash.display.*;
    import flash.events.*;

    public class GenericScrollbar extends EventDispatcher
    {
        private var _track:SimpleButton;
        private var _button:SimpleButton;
        private var _minimum:Number = 0;
        private var _maximum:Number = 0;
        private var _value:Number = 0;
        private var stage:Stage = null;

        public function GenericScrollbar(param1:Stage, param2:SimpleButton, param3:SimpleButton)
        {
            stage = null;
            _minimum = 0;
            _maximum = 0;
            _value = 0;
            this.stage = param1;
            this._track = param2;
            this._button = param3;
            this._button.addEventListener(MouseEvent.MOUSE_DOWN, handleButtonDown, false, 0, true);
            this._track.addEventListener(MouseEvent.MOUSE_DOWN, handleButtonDown, false, 0, true);
            return;
        }// end function

        private function handleButtonDown(param1:MouseEvent)
        {
            calculateValue(_track.mouseX);
            stage.addEventListener(MouseEvent.MOUSE_MOVE, doDrag, false, 0, true);
            stage.addEventListener(MouseEvent.MOUSE_UP, handleButtonUp, false, 0, true);
            return;
        }// end function

        public function get minimum()
        {
            return _minimum;
        }// end function

        private function positionButton()
        {
            _button.x = _track.x + (value - minimum) / (maximum - minimum) * (_track.width - _button.width);
            return;
        }// end function

        protected function doSetValue(param1:Number)
        {
            var _loc_2:Number;
            _loc_2 = _value;
            _value = Math.max(minimum, Math.min(maximum, Math.round(param1)));
            dispatchEvent(new GenericScrollbarEvent(GenericScrollbarEvent.CHANGE, value));
            positionButton();
            return;
        }// end function

        public function set minimum(param1:Number)
        {
            _minimum = param1;
            positionButton();
            return;
        }// end function

        public function get maximum()
        {
            return _maximum;
        }// end function

        protected function doDrag(param1:MouseEvent) : void
        {
            calculateValue(_track.mouseX);
            return;
        }// end function

        public function set value(param1:Number)
        {
            _value = param1;
            positionButton();
            return;
        }// end function

        protected function calculateValue(param1:Number)
        {
            var _loc_2:Number;
            if (param1 >= 0)
            {
            }// end if
            if (param1 > _track.width)
            {
                return;
            }// end if
            _loc_2 = (param1 - _button.width / 2) / (_track.width - _button.width) * (maximum - minimum);
            doSetValue(_loc_2);
            return;
        }// end function

        public function set maximum(param1:Number)
        {
            _maximum = param1;
            positionButton();
            return;
        }// end function

        public function get value()
        {
            return _value;
        }// end function

        private function handleButtonUp(param1:MouseEvent)
        {
            stage.removeEventListener(MouseEvent.MOUSE_MOVE, doDrag);
            stage.removeEventListener(MouseEvent.MOUSE_UP, handleButtonUp);
            dispatchEvent(new GenericScrollbarEvent(GenericScrollbarEvent.CHANGE, value));
            return;
        }// end function

        public function destroy()
        {
            this._button.removeEventListener(MouseEvent.MOUSE_DOWN, handleButtonDown);
            this._track.removeEventListener(MouseEvent.MOUSE_DOWN, handleButtonDown);
            _track = null;
            _button = null;
            return;
        }// end function

    }
}
