﻿package com.brilliantblue.panasonic.IFEdemo.common.buttons{		import caurina.transitions.*;	import flash.display.*;	import flash.text.*;	import flash.events.*;	import flash.geom.*;	import flash.utils.*;				public class MCPSwitch extends flash.display.MovieClip	{		public var onMouseClickEvent;				public var Glow;		//public var Flare;		public var Fill;		//public var Ball;		public var IsPlaying;		public var doubleCheck;		public var Pause;		public var Play;		private var clickEvent;						public function MCPSwitch () 		{						Glow = this.glow_mc;			Fill = this.fill_btn;			//Flare = this.flare_mc;			//Ball = this.ball_mc;			Pause = this.pause_icon;			Play = this.play_icon;			this.alpha = .6;			Glow.alpha = 0;			Fill.alpha = 0;			// Flare.alpha = 0;			Pause.alpha = 0;			//Ball.alpha = 0;			//Ball.blendMode = "overlay";			this.buttonMode = true;			this.mouseChildren = false;			IsPlaying = true;									this.addEventListener (MouseEvent.MOUSE_DOWN, onMouseDownEvent,false,0,true);			this.addEventListener (MouseEvent.MOUSE_UP, onMouseUpEvent,false,0,true);				addEventListener(Event.REMOVED_FROM_STAGE, onRemoved,false,0,true);				}						private function onRemoved(e:Event){									this.removeEventListener (MouseEvent.MOUSE_DOWN, onMouseDownEvent);			this.removeEventListener (MouseEvent.MOUSE_UP, onMouseUpEvent);			removeClickEvent();						//this.removeEventListener (MouseEvent.CLICK, onMouseClickEvent);			//can't do this without using a janitor class of some sort, - later...					}						public function setClickEvent(onMouseClickEvent)		{			clickEvent = onMouseClickEvent;			this.addEventListener (MouseEvent.CLICK, onMouseClickEvent,false,0,true);		}				public function removeClickEvent()		{			this.removeEventListener (MouseEvent.CLICK, clickEvent);		}						private function onMouseDownEvent(evt:MouseEvent)		{			Tweener.addTween(Glow, {alpha:1, time:1, transition: "easeInOutStrong"});			var clip = this;			Tweener.addTween(clip, {alpha:1, time:.25});		}						private function onMouseUpEvent(evt:MouseEvent)		{			trace("Is Playing = " + (IsPlaying));			Tweener.addTween(Fill, {alpha:.5, time:.5, transition: "easeInOutStrong"});			//Tweener.addTween(Flare, {alpha:1, time:.5, transition: "easeInOutStrong"});			//Tweener.addTween(Ball, {alpha:.5, time:.5, transition: "easeInOutStrong"});			doubleCheck = setInterval(Catinit, 250);			if (IsPlaying == true)			{				Tweener.addTween(Play, {alpha:0, time:.2, transition: "linear"});				Tweener.addTween(Pause, {alpha:1, time:.2, transition: "linear"});				IsPlaying = false;			}			else			{				Tweener.addTween(Play, {alpha:1, time:.2, transition: "linear"});				Tweener.addTween(Pause, {alpha:0, time:.2, transition: "linear"});				IsPlaying = true;			}		}								public function Catinit()		{			Tweener.addTween(Glow, {alpha:0, time:2, transition: "easeOutQuad"});			Tweener.addTween(Fill, {alpha:0, time:.5, transition: "easeOutQuad"});			//Tweener.addTween(Flare, {alpha:0, time:2, transition: "easeOutQuad"});			//Tweener.addTween(Ball, {alpha:0, time:1, transition: "easeOutQuad"});			var clip = this;			Tweener.addTween(clip, {alpha:.6, time:2});			clearInterval(doubleCheck);		}			}		}