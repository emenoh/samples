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

package de.mightypirates.megazine.gui {
	
	import flash.display.DisplayObject;
	import flash.display.MovieClip;
	
	/**
	 * Document class for the swf with the graphical elements.
	 * 
	 * @author fnuecke
	 * @version 1.0
	 */
	public class LibrarySWF extends MovieClip implements ILibrarySWF {
		
		/** Version number of the library */
		public const VERSION:Number = 1.031;
		
		/**
		 * Provides new instances of elements in the library.
		 * @param type The id of the element to get. Use constants from
		 * the LibraryConstants class.
		 */
		public function getInstanceOf(type:String):DisplayObject {
			
			switch (type) {
				case LibraryConstants.BACKGROUND:
					return new Background();
					
				case LibraryConstants.BAR_BACKGROUND:
					return new BarBackground();
					
				case LibraryConstants.BUTTON_ARROW_LEFT:
					return new ButtonArrowLeft();
					
				case LibraryConstants.BUTTON_ARROW_RIGHT:
					return new ButtonArrowRight();
					
				case LibraryConstants.BUTTON_CLOSE:
					return new ButtonClose();
					
				case LibraryConstants.BUTTON_FULLSCREEN:
					return new ButtonFullscreen();
					
				case LibraryConstants.BUTTON_HELP:
					return new ButtonHelp();
					
				case LibraryConstants.BUTTON_MUTE:
					return new ButtonMute();
					
				case LibraryConstants.BUTTON_PAGE:
					return new ButtonPage();
					
				case LibraryConstants.BUTTON_PAGE_FIRST:
					return new ButtonPageFirst();
					
				case LibraryConstants.BUTTON_PAGE_LAST:
					return new ButtonPageLast();
					
				case LibraryConstants.BUTTON_PAUSE:
					return new ButtonPause();
					
				case LibraryConstants.BUTTON_PLAY:
					return new ButtonPlay();
					
				case LibraryConstants.BUTTON_RESTORE:
					return new ButtonRestore();
					
				case LibraryConstants.BUTTON_SCROLL:
					return new ButtonScroll();
					
				case LibraryConstants.BUTTON_SETTINGS:
					return new ButtonSettings();
					
				case LibraryConstants.BUTTON_UNMUTE:
					return new ButtonUnmute();
				
				case LibraryConstants.BUTTON_ZOOM:
					return new ButtonZoom();
					
				case LibraryConstants.CURSOR_TURN_LEFT:
					return new CursorTurnLeft();
					
				case LibraryConstants.CURSOR_TURN_RIGHT:
					return new CursorTurnRight();
					
				case LibraryConstants.LOADING_BAR:
					return new LoadingBar();
					
				case LibraryConstants.LOADING_SIMPLE:
					return new LoadingSimple();
					
				case LibraryConstants.PAGE_NUMBER:
					return new PageNumberGraphics();
					
				case LibraryConstants.PASSWORD_FORM:
					return new PasswordFormGraphics();
					
				case LibraryConstants.SETTINGS:
					return new Settings();
					
				default:
					return null;
				
			}
		}
		
		/** Version number of the library */
		public function getVersion():Number {
			return VERSION;
		}
		
	}
	
}