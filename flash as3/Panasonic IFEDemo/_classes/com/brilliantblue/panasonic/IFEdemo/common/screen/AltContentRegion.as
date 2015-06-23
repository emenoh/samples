package com.brilliantblue.panasonic.IFEdemo.common.screen
{
	
	import caurina.transitions.*;
	import flash.display.*;
	import flash.text.*;
	import flash.events.*;
	import flash.geom.*;
	import com.brilliantblue.utils.Scrollbar;
	
		
	public class ContentRegion extends flash.display.MovieClip
	{
	
		public function ContentRegion (contentMC:MovieClip) 
		{
			
			this.name = "contentRegion";
			//teis only loads the contentMC.... it's up to the detail screen MovieClip class to define that variable.... 
			//so for instance you could create a MoviceClip from scratch, draw something in there or attach a video stream or whatever.
			//typically this will be the result of an XML load and the contents of several nodes or one node.
			
			
			var w = contentMC.width;
			
			this.scrollArea.addChild(contentMC);
			
			
			//adjust the contentRegion graphics to match the width setting
			this.y = 166;
			
			this.sb.track.height = this.background.height-70;
			
			
			setLayout("1Column");
			
			
			//textClip.wordWrap = true;
			
			//trace("content region width " + contentWidth);
			//trace(targetMC);
			
			
			
		}
		
		public function setLayout(layout) {
			
			var w:Number;
			
			switch(layout) {
				case "1columnPaginated":
					w = 1180;
					this.x = 180;
					this.background.width = w;
					this.outline.width = w+2;
					this.sb.x = (w - this.sb.width) - 20;
					break;
					
				case "1column":
					w = 1047;
					this.x = 116;
					this.background.width = w;
					this.outline.width = w+2;
					this.sb.x = (w - this.sb.width) - 20;
					break;
					
					
				case "2column":
					w = 756;
					this.x = 404;
					this.background.width = w;
					this.outline.width = w+2;
					this.sb.x = (w - this.sb.width) - 20;
					break;
					
					
				case "3column":
					
					w = 542;
					this.x = 404;
					this.background.width = w;
					this.outline.width = w+2;
					this.sb.x = (w - this.sb.width) - 20;
					break;
					
					
					
				case "custom":
					var clip = this.parent.getChildByName("contentRegion");
					trace(clip.name);
					this.scrollArea.visible = false;
					this.sb.visible = false;
					clip.visible = false;
					break;
					
					
					
			}
			
			
		}
		
		
			
		
		
	}
	
	
}