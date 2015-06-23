/*
MegaZine 3 - A Flash application for easy creation of book-like webpages.
Copyright (C) 2007-2008 Florian Nuecke

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see http://www.gnu.org/licenses/.
*/

package de.mightypirates.megazine.elements {
	
	import de.mightypirates.megazine.*;
	import de.mightypirates.megazine.events.*;
	import de.mightypirates.megazine.gui.ILibrary;
	import de.mightypirates.utils.*;
	
	import flash.display.*;
	import flash.events.*;
	import flash.filters.*;
	import flash.geom.*;
	import flash.net.*;
	import flash.text.*;
	
	/**
	 * The navigation element is meant to be used to create table
	 * of contents in an easy to use fashion.
	 * @author fnuecke
	 * @version 1.0
	 */
	public class Navigation extends AbstractElement {
		
		// ----------------------------------------------------------------------------------- //
		// Constructor
		// ----------------------------------------------------------------------------------- //
		
		/**
		 * Creates a new navigation/index element.
		 * @param mz   The MegaZine containing the page containing this element.
		 * @param lib  The library to obtain gui graphics from.
		 * @param page The page containing this element.
		 * @param even On the odd or on the even page?
		 * @param xml  The XML data for this element.
		 */
		public function Navigation(mz:IMegaZine, loc:Localizer, lib:ILibrary,
								   page:IPage, even:Boolean, xml:XML)
		{
			super(mz, loc, lib, page, even, xml);
		}
		
		override public function init():void {
			// Text alignment.
			var align:String = TextFormatAlign.LEFT;
			if (_xml.@align != undefined) {
				switch(_xml.@align.toString()) {
					case "right":
						align = TextFormatAlign.RIGHT;
						break;
					case "center":
						align = TextFormatAlign.CENTER;
						break;
				}
			}
			
			// Get the width and height.
			var sizex:int = -1;
			if (_xml.@width != undefined) {
				sizex = int(_xml.@width.toString());
				sizex = sizex > 0 ? sizex : -1;
			}
			var sizey:int = -1;
			if (_xml.@height != undefined) {
				sizey = int(_xml.@height.toString());
				sizey = sizey > -1 ? sizey : -1;
			}
			sizey /= _xml.children().length();
			
			// Normal and hover colors
			var color:int = 0x000000;
			var hover:int = 0x333333;
			if (_xml.@color != undefined) {
				color = int(_xml.@color.toString());
				color = color > 0 ? color : 0x000000;
			}
			if (_xml.@hover != undefined) {
				hover = int(_xml.@hover.toString());
				hover = hover > 0 ? hover : 0x333333;
			}
			
			// Parse all lnk elements and build the navigation.
			var t:TextField = new TextField();
			t.autoSize = TextFieldAutoSize.LEFT;
			t.multiline = true;
			t.selectable = false;
			t.textColor = color;
			t.width = sizex;
			t.wordWrap = true;
			
			var dropShadow:DropShadowFilter = new DropShadowFilter(2, 45, 0x000000, 0.5, 3, 3, 1,
																   BitmapFilterQuality.MEDIUM);
			var l:Sprite;
			
			for each (var lnk:XML in _xml.elements("lnk")) {
				t.defaultTextFormat = new TextFormat("Verdana, Helvetica, Arial, _sans", "14",
													 null, null, null, null, null, null, align);
				t.htmlText = lnk.toString();
				stage.quality = StageQuality.BEST;
				var bd:BitmapData = new BitmapData(t.width, Math.max(t.height, sizey), true, 0);
				bd.draw(t, new Matrix(1, 0, 0, 1, 0, sizey > t.height
														? (sizey - t.height) / 2
														: 0));
				var b:Bitmap = new Bitmap(bd, PixelSnapping.NEVER, true);
				var s:Sprite = new Sprite();
				s.addChild(b);
				if (l != null) {
					s.y = l.y + l.height;
				}
				l = s;
				if (lnk.@url != undefined && lnk.@url.toString() != "") {
					s.buttonMode = true;
					s.addEventListener(MouseEvent.MOUSE_OUT,
						function(e:MouseEvent):void {
							var ct:ColorTransform = new ColorTransform();
							ct.color = color;
							e.target.transform.colorTransform = ct;
							e.target.filters = null;
						});
					s.addEventListener(MouseEvent.MOUSE_OVER,
						function(e:MouseEvent):void {
							var ct:ColorTransform = new ColorTransform();
							ct.color = hover;
							e.target.transform.colorTransform = ct;
							e.target.filters = [dropShadow];
						});
					s.addEventListener(MouseEvent.CLICK, getLinkHandler(lnk.@url.toString()));
				}
				addChild(s);
				
			}
			
			removeChild(_loading);
			dispatchEvent(new MegaZineEvent(MegaZineEvent.ELEMENT_COMPLETE,
											_page.getNumber(_even)));
		}
		
		private function getLinkHandler(url:String):Function {
			return function(e:MouseEvent):void {
					// Check if it is a link to an anchor
					if (url.search("anchor:") == 0) {
						// Internal link
						_mz.gotoAnchor(url.slice(7));
					} else {
						// External link
						url = _mz.getAbsPath(url, ["http://", "https://", "file://",
												   "ftp://", "mailto:"]);
						try {
							navigateToURL(new URLRequest(url));
						} catch (ex:Error) {
							Logger.log("MegaZine Nav", "Error navigating to url '" + url + "': "
										+ ex.toString(), Logger.TYPE_WARNING);
						}
					}
				};
		}
		
	}
	
}
