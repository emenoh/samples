﻿package com.brilliantblue.panasonic.IFEdemo.common.screen{		import caurina.transitions.*;	import flash.display.*;	import flash.text.*;	import flash.events.*;	import flash.geom.*;	import com.brilliantblue.panasonic.IFEdemo.common.scroller.*;				public class ContentRegion extends flash.display.MovieClip	{					public function ContentRegion (contentMC:MovieClip) 		{												//teis only loads the contentMC.... it's up to the detail screen MovieClip class to define that variable.... 			//so for instance you could create a MoviceClip from scratch, draw something in there or attach a video stream or whatever.			//typically this will be the result of an XML load and the contents of several nodes or one node.									//adjust the contentRegion graphics to match the width setting			this.y = 166;						//this.sb.track.height = this.background.height-70;									setLayout("1column");									//textClip.wordWrap = true;						//trace("content region width " + contentWidth);			//trace(targetMC);											}				public function destroyScroller(){			this.sb.destroyScroller();		}						public function setLayout(layout) {						var w:Number;						switch(layout) {				case "1columnPaginated":					w = 925;					this.x = 180;					this.background.width = w;					this.outline.width = w+2;					this.sb.x = (w - this.sb.width) - 20;																		var _1columnPaginated:MovieClip = new MovieClip();					_1columnPaginated.graphics.beginFill(0xFFFFFF, 1);					_1columnPaginated.graphics.drawRect(0,0,w-100,50);					_1columnPaginated.graphics.endFill();					_1columnPaginated.name = 'contentBackground';					_1columnPaginated.alpha = 0;					this.scrollArea.addChild(_1columnPaginated);																					break;									case "1column":					w = 1045;					this.x = 115;					this.background.width = w;					this.outline.width = w+2;					this.sb.x = (w - this.sb.width) - 20;										var _1column:MovieClip = new MovieClip();					_1column.graphics.beginFill(0xFFFFFF, 1);					_1column.graphics.drawRect(0,0,w-100,50);					_1column.graphics.endFill();					_1column.name = 'contentBackground';					_1column.alpha = 0;					this.scrollArea.addChild(_1column);					break;														case "2column":					w = 755;					this.x = 405;					this.background.width = w;					this.outline.width = w+2;					this.sb.x = (w - this.sb.width) - 20;										var _2column:MovieClip = new MovieClip();					_2column.graphics.beginFill(0xFFFFFF, 1);					_2column.graphics.drawRect(0,0,500,50);					_2column.graphics.endFill();					_2column.name = 'contentBackground';					_2column.alpha = 0;					this.scrollArea.addChild(_2column);					break;														case "3column":										w = 542;					this.x = 404;					this.background.width = w;					this.outline.width = w+2;					this.sb.x = (w - this.sb.width) - 20;					/*					var _3column:MovieClip = new MovieClip();					_3column.graphics.beginFill(0xFFFFFF, 1);					_3column.graphics.drawRect(0,0,w-100,5);					_3column.graphics.endFill();					_3column.name = 'contentBackground';					_3column.alpha = 0;					this.scrollArea.addChild(_3column);*/					break;																			case "custom":					var clip = this.parent.getChildByName("contentRegion");					trace(clip.name);					this.scrollArea.visible = false;					this.sb.visible = false;					clip.visible = false;															break;									case "1columnTall":					w = 1045;					this.x = 115;					this.background.width = w;					this.background.height = this.background.height+60;					this.outline.width = w+2;					this.outline.height = this.outline.height+60;					this.sb.x = (w - this.sb.width) - 20;										var _1columnTall:MovieClip = new MovieClip();					_1columnTall.graphics.beginFill(0xFFFFFF, 1);					_1columnTall.graphics.drawRect(0,0,w-100,50);					_1columnTall.graphics.endFill();					_1columnTall.name = 'contentBackground';					_1columnTall.alpha = 0;					this.scrollArea.addChild(_1columnTall);					break;																		}								}												}		}