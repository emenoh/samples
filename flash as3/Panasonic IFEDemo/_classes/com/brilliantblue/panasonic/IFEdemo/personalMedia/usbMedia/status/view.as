﻿package com.brilliantblue.panasonic.IFEdemo.personalMedia.usbMedia.status{	import flash.display.*;	import flash.events.*;	import flash.text.*	import flash.utils.*	import flash.external.*	import flash.net.*;	import caurina.transitions.*;		import com.brilliantblue.panasonic.IFEdemo.overlay.view;	import com.brilliantblue.panasonic.IFEdemo.common.screen.*;	import com.brilliantblue.panasonic.IFEdemo.common.buttons.*;	import com.brilliantblue.panasonic.IFEdemo.common.key.*;	import com.brilliantblue.panasonic.IFEdemo.common.files.*;			public class view extends com.brilliantblue.panasonic.IFEdemo.overlay.view	{		public var myTextField:TextField;		private var exitButton;		private var originScreen;				public function view () 		{						setLayout("1column");			setScreenTitle("Please insert USB MEDIA");			adjustScreen();						this.x = 1280;			this.y = 200;			this.scaleX = .6;			this.scaleY = .6;												myTextField = createTextField(10, 20, 600, 50);			myTextField.text = "Please Insert USB Drive.";			myTextField.setTextFormat(CC_SubHeadFormat);			myTextField.scaleX = 1.5;			myTextField.scaleY = 1.5;						setContentMC(myTextField);						exitButton = new BasicButton();			exitButton.setTitle("cancel / exit");			exitButton.setClickEvent(exitStatus);			exitButton.name = "exitButton";			exitButton.x = 640 - (exitButton.width/2);			addChild(exitButton);						addEventListener(Event.ADDED_TO_STAGE, onAdded, false, 0, true);		}						private function onAdded(e:Event){						parentMC = this.parent;						originScreen = parentMC.getChildByName("baseView");			        			this.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));			exitButton.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));									removeEventListener(Event.ADDED_TO_STAGE, onAdded);		}				private function exitStatus(e:MouseEvent){						originScreen.closeButtonSoftClick();					}													}		}