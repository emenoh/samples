﻿package com.brilliantblue.panasonic.IFEdemo.personalMedia.usbMedia.music{	import br.com.stimuli.loading.BulkLoader;    import br.com.stimuli.loading.BulkProgressEvent;	import flash.display.*;	import flash.events.*;	import flash.text.*	import flash.utils.*	import flash.external.*	import flash.net.*;	import caurina.transitions.*;		import com.brilliantblue.panasonic.IFEdemo.view;	import com.brilliantblue.panasonic.IFEdemo.common.screen.*;	import com.brilliantblue.panasonic.IFEdemo.common.buttons.*;	import com.brilliantblue.panasonic.IFEdemo.common.key.*;	import com.brilliantblue.panasonic.IFEdemo.common.files.*;	import com.brilliantblue.panasonic.IFEdemo.personalMedia.usbMedia.status.view;			public class view extends com.brilliantblue.panasonic.IFEdemo.view	{				public var tabInfoMC:MovieClip;		public var myTextField:TextField;		public var leftNav:Array;		private var imageLoader:BulkLoader;		private var xmlLoader:URLLoader;		private var _filesData:XML;		private var _files:XMLList;		private var _photos:XMLList;		private var _fullScreenTarget:String = '';		private var _fullScreen:Boolean = false;		private var _totalPhotos:Number = 0;		private var viewBtn;		public var usbTimer:Timer;		public var messageFormat:TextFormat;		private var usbStatus;		private var usbDirectory;		private var _xmlLoaded:Boolean = false;		private var totalFiles;		private var statusScreen;		private var _currentTrack;		private var _playAll:Boolean;		private var _mediaPlaying:Boolean;				public function view () 		{			setLayout("2column");			setScreenTitle("USB MEDIA - Music");			adjustScreen();									this.addEventListener(Event.ADDED_TO_STAGE, onAdded,false,0,true);											ExternalInterface.addCallback("FLsetUSBMediaDirectory",function(){		//ExternalInterface.call("myAlert","loadContent('/tmp/output.xml');");		loadContent("/tmp/output.xml");				}			);					}								private function onAdded(e:Event){			//trace("added");            stage.addEventListener(KeyboardEvent.KEY_UP, navUp,false,0,true);            stage.addEventListener(KeyboardEvent.KEY_DOWN, navDown,false,0,true);												this.visible = false;						parentMC = this.parent;			statusScreen = new com.brilliantblue.panasonic.IFEdemo.personalMedia.usbMedia.status.view();			parentMC.addChild(statusScreen);						Tweener.addTween(statusScreen,{							 x: 256, 							 time: 1, 							 delay: 0.25							 });						ExternalInterface.addCallback("FLtrackComplete", trackEnded);						loadUSBMedia();						removeEventListener(Event.ADDED_TO_STAGE, onAdded);		}								private function navUp(e:KeyboardEvent){			//trace(e.keyCode);						k = KH.convertKeyCodeToKey(e.keyCode, e.shiftKey)						switch(k)				{					case KeyType.LEFT://left arrow					trace(currentItemParent);					trace(currentItem);						if(currentItemGroup == "subNav"){							currentItem = currentItemParent;							currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));							totalItems = leftNav.length;							currentItemGroup = "leftNav";						}						break;					case KeyType.RIGHT://right arrow										trace(currentItemParent);					trace(currentItem);						if(currentItemGroup == "leftNav"){							currentItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));							currentItemGroup = "subNav";						}						break;											case KeyType.UP://up arrow											if(currentItemGroup == "subNav"){													trace(currentItem.name);						currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						prevItem = getPrevSubItem(currentItem);						prevItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));						currentItem = prevItem;						currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						currentItemOption = currentItem.extra.playButton;						currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));												}else{						trace(currentItem.name);						currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						prevItem = getPrevItem(currentItem);						prevItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));						currentItem = prevItem;						}						break;											case KeyType.DOWN://down arrow											if(currentItemGroup == "subNav"){						trace(currentItem.name);						currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						nextItem = getNextSubItem(currentItem);						nextItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));						currentItem = nextItem;												currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						currentItemOption = currentItem.extra.playButton;						currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));												}else{						trace(currentItem.name);						currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						nextItem = getNextItem(currentItem);						nextItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));						currentItem = nextItem;						}						break;											case KeyType.OK://select current item						//if(currentItem != previousItem){						//keyboard = true;						/*trace("OK :"+currentItem.name);						trace("OK :"+currentItemParent.name);						trace("OK :"+_fullScreen);						trace("OK :"+viewBtn.name);*/																		currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						//}						break;																case KeyType.HOME://back button						closeButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						break;											case KeyType.BACK://back button						closeButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						break;																					}						}						private function navDown(e:KeyboardEvent){						k = KH.convertKeyCodeToKey(e.keyCode, e.shiftKey)									switch(k)				{											/*case KeyType.UP://up arrow						upArrow.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));						break;											case KeyType.DOWN://down arrow						downArrow.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));						break;						*/										}						}										private function drawScreen(){										totalFiles = new TextField();				totalFiles.text = "Total Music Files: "+_totalPhotos.toString();				totalFiles.x = 115;				totalFiles.y = 180;				totalFiles.autoSize = TextFieldAutoSize.LEFT;				totalFiles.embedFonts = true;				totalFiles.selectable = false;				totalFiles.setTextFormat(LC_SubHeadFormat);			addChild(totalFiles);											viewBtn = new BasicButton();				viewBtn.setTitle("Play track");				viewBtn.x = 900;				viewBtn.y = 605;				viewBtn.name = "viewBtn";				viewBtn.setClickEvent(fullScreen);							//addChild(viewBtn);									/*leftNav = new Array("LIST", "THUMBNAIL", "SLIDESHOW");						var currentItemSet = false;			totalItems = leftNav.length;						for(var i = 0; i < totalItems; i++){								var leftNavBtn = new SelectButton();				leftNavBtn.setTitle(leftNav[i]);				leftNavBtn.x = 115;				leftNavBtn.y = 240+(i*80);				leftNavBtn.buttonWidth = 250;				leftNavBtn.name = "leftNavBtn_"+i;				leftNavBtn.extra.index = i;				leftNavBtn.setClickEvent(this[leftNav[i]+"_CLICK"]);								if(currentItemSet != true){				currentItem = leftNavBtn;				trace(currentItem.name);				currentItemSet = true;				}												addChild(leftNavBtn);												}*/						/*			var thumbnailBtn = new SelectButton();				thumbnailBtn.setTitle("THUMBNAIL");				thumbnailBtn.x = 120;				thumbnailBtn.y = 335;				thumbnailBtn.buttonWidth = 250;				thumbnailBtn.name = "thumbnailBtn";				thumbnailBtn.setClickEvent(setThumbView);							addChild(thumbnailBtn);												var listBtn = new SelectButton();				listBtn.setTitle("LIST");				listBtn.x = 120;				listBtn.y = 415;				listBtn.buttonWidth = 250;				listBtn.name = "listBtn";				listBtn.setClickEvent(setListView);							addChild(listBtn);												var slideShowBtn = new SelectButton();				slideShowBtn.setTitle("SLIDESHOW");				slideShowBtn.x = 120;				slideShowBtn.y = 495;				slideShowBtn.buttonWidth = 250;				slideShowBtn.name = "slideShowBtn";				slideShowBtn.setClickEvent(setSlideView);							addChild(slideShowBtn);													tabInfoMC = new TabInfoList;				tabInfoMC.x = 120;				tabInfoMC.y = 200;						addChild(tabInfoMC);			*/									loadPhotoList();						currentItemGroup = "subNav";						/*						currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));			currentItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));*/					}										private function fullScreen(e:MouseEvent){						var path = e.target.extra.path;						if(e.target.extra.playing == false){						trace(e.target.extra.trackId);					MovieClip(root).mediaType = "USBAUDIO";					MovieClip(root).mediaID = path;					MovieClip(root).launchMedia();					//e.target.gotoAndStop(2);					e.target.extra.playing = true;					}else{											MovieClip(root).mediaType = "USBAUDIO";					//MovieClip(root).mediaID = e.target.extra.trackId;					MovieClip(root).stopMedia();						//e.target.gotoAndStop(1);					e.target.extra.playing = false;					}													var p = e.target.parent;			for(var i=0; i < _totalPhotos;i++)			{				var selectButton = p.getChildByName("subNavButton_"+i);					selectButton.unSelectButton();			}			e.target.selectButton();						//_fullScreen = true;			/*if(_fullScreenTarget != ''){			var _imageLoader:Loader;			var _fullScreenMC:MovieClip = new MovieClip();			_fullScreenMC.name = "fullScreenMC";			_fullScreenMC.buttonMode = true;			_fullScreenMC.graphics.beginFill(0x000000, 0.8);			_fullScreenMC.graphics.drawRect(0,0,1280,800);			_fullScreenMC.graphics.endFill();						_fullScreenMC.addEventListener(MouseEvent.CLICK, removeFullScreen,false,0,true);			var _path:String = _fullScreenTarget;						loadImage(_path, attachMC);										function loadImage(imagePath, onImageLoaded)				{					_imageLoader = new Loader();					_imageLoader.contentLoaderInfo.addEventListener(Event.INIT, onImageLoaded,false,0,true);					_imageLoader.load( new URLRequest(imagePath));				}								function attachMC(e:Event)				{					var image = _imageLoader.content;															if (image.width > 1280){						image.width = 1280;						image.scaleY = image.scaleX;						if(image.height > 800){						image.height = 800;						image.scaleX = image.scaleY;						}					}																				image.x = 640 - (image.width/2);					image.y = 400 - (image.height/2);					_fullScreenMC.addChild(image);										addChild(_fullScreenMC);				}								}else{*/													return;			//}		}//end fullScreen				private function removeFullScreen(e:MouseEvent){			var removeMC = getChildByName("fullScreenMC")			removeMC.removeEventListener(MouseEvent.CLICK, removeFullScreen);			removeMC.removeChildAt(0);			removeChild(removeMC);						_fullScreen = false;		}						private function loadPhotoList(){												totalItems = _totalPhotos;															var headerFormat = new TextFormat();			headerFormat.font = "Reflex Bold";			headerFormat.kerning = true;			headerFormat.color = 0xFFFFFF;			headerFormat.size = 20;			headerFormat.align = "left";												var trackFormat = new TextFormat();			trackFormat.font = "Century Gothic";			trackFormat.kerning = true;			trackFormat.color = 0xFFFFFF;			trackFormat.size = 18;			trackFormat.align = "left";															contentMC = new MovieClip();			contentMC.y = 20;			contentMC.graphics.beginFill(0x000000, 0);			contentMC.graphics.drawRect(0,0,40,650);			contentMC.graphics.endFill();									var headerMC = new MovieClip();			headerMC.x = 25;			headerMC.y = 5;			var _trackColumnLabel = new TextField();			_trackColumnLabel.height = 40;				_trackColumnLabel.text = "TRACK";				_trackColumnLabel.x = 30;				_trackColumnLabel.y = 0;				_trackColumnLabel.selectable = false; 				_trackColumnLabel.setTextFormat(headerFormat);									var _addColumnLabel = new TextField();			_addColumnLabel.height = 40;				_addColumnLabel.text = "ADD";				_addColumnLabel.x = 500;				_addColumnLabel.selectable = false; 				_addColumnLabel.setTextFormat(headerFormat);									var _playColumnLabel = new TextField();			_playColumnLabel.height = 40;				_playColumnLabel.text = "PLAY";				_playColumnLabel.x = 580;				_playColumnLabel.selectable = false; 				_playColumnLabel.setTextFormat(headerFormat);						headerMC.addChild(_trackColumnLabel);			headerMC.addChild(_addColumnLabel);			headerMC.addChild(_playColumnLabel);						contentRegion.addChild(headerMC);			//trace(_playList);						var currentItemSet = false;			var currentItemOptionSet = false;			//trace(_tracks.length());						for (var i = 0; i < totalItems; i++){							var filenameArray:Array = _photos[i].@path.split("/");			var fileName = filenameArray[filenameArray.length-1].toLowerCase();			//var fileSize = _photos[i].@fileSize;			var filePath = _photos[i].@path;										//trace(_tracks[i].id);				var _id = filePath;				var trackWidth:Number = 640;				var trackHeight:Number = 40;				var _trackListing:MovieClip = new MovieClip();					_trackListing.y = (50*i);					//trace(_trackListing.y)					_trackListing.x = 10;					_trackListing.name = 'trackListing_'+i;					_trackListing.buttonMode = true;					_trackListing.selected = false;					_trackListing.mouseChildren = false;					_trackListing.extra = new Object();					_trackListing.extra.index = i;									var _background:MovieClip = new MovieClip();					_background.graphics.lineStyle(2, 0xFFFFFF);					_background.graphics.beginFill(0xFFFFFF, 0);					_background.graphics.drawRoundRect(0,0,trackWidth,trackHeight,trackHeight,trackHeight);					_background.graphics.endFill();					_background.name = 'trackBackground';					_background.alpha = 0;				var _trackTitle = new TextField();					_trackTitle.text = (i+1)+". "+ fileName;					_trackTitle.autoSize = TextFieldAutoSize.LEFT;					_trackTitle.embedFonts = true;					_trackTitle.x = 20;					_trackTitle.y = 5;					_trackTitle.selectable = false; 					if(_trackTitle.length > 45){						_trackTitle.replaceText(46, 1000, "...")						}										_trackTitle.setTextFormat(trackFormat);									var _button:MovieClip = new MovieClip();					_button.graphics.lineStyle(2, 0xFFFFFF, 0);					_button.graphics.beginFill(0xFFFFFF, 0);					_button.graphics.drawRoundRect(0,0,600,trackHeight,trackHeight,trackHeight);					_button.graphics.endFill();					_button.name = 'trackButton';					_button.alpha = 0;								_trackListing.addChild(_background);				_trackListing.addChild(_trackTitle);				_trackListing.addChild(_button);																var _playButton:MovieClip = new musicPlayButton();				_playButton.x = 580;				_playButton.y = (50*i);				_playButton.name = 'playButton_'+i;				_playButton.buttonMode = true;				_playButton.extra = new Object();				_playButton.extra.playing = false;				_playButton.extra.trackId = _id;								_trackListing.extra.playButton = _playButton;														contentMC.addChild(_trackListing);				contentMC.addChild(_playButton);								_trackListing.addEventListener(MouseEvent.CLICK, trackSelect,false,0,true);				_trackListing.addEventListener(MouseEvent.MOUSE_OVER, trackSelect,false,0,true);												_playButton.addEventListener(MouseEvent.CLICK, playTrack,false,0,true);				_playButton.addEventListener(MouseEvent.MOUSE_OVER, addGlow,false,0,true);				_playButton.addEventListener(MouseEvent.MOUSE_OUT, removeGlow,false,0,true);				//_trackListing.addEventListener(MouseEvent.MOUSE_UP, trackDeSelect); 								if(currentItemSet != true){				currentItem = _trackListing;				trace(currentItem.name);				currentItemSet = true;				}				if(currentItemOptionSet != true){				currentItemOption = _playButton;				trace(currentItemOption.name);				currentItemOptionSet = true;				}															}						 				contentMC.addEventListener(Event.ENTER_FRAME,trackListener,false,0,true);						/*			_description.width = contentRegion.width - 100;			//_description.height = 50;			_description.text = _bodyText + "\n\n" + _cost + "\n" + _rating + "\n" + _directors + "\n" + _starring + "\n" + _runTime + "\n" + _studio;			_description.wordWrap = true;			_description.autoSize = TextFieldAutoSize.LEFT;			_description.embedFonts = true;			_description.y = 0;			_description.setTextFormat(CC_BodyFormat);*/									setContentMC(contentMC);						//dummy clip for the "Games other people liked" section									currentItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));			currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));			currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));																		/*						var subMenuMC = new MovieClip();			subMenuMC.graphics.beginFill(0x000000, 0);			subMenuMC.graphics.drawRect(0,0,40,650);			subMenuMC.graphics.endFill();						var currentItemSet = false;			totalItems = _totalPhotos;			for (var i = 0; i < totalItems; i++){							var filenameArray:Array = _photos[i].@path.split("/");			var fileName = filenameArray[filenameArray.length-1].toLowerCase();			//var fileSize = _photos[i].@fileSize;			var filePath = _photos[i].@path;						var subNavButton:MovieClip = new MenuButton();			//selectButton2.name = 'selectButton1';						subNavButton.setTitle(fileName);			if (subNavButton.btn_label.text > 15){				subNavButton.btn_label.replaceText(15, 2000, "...")			}			subNavButton.setClickEvent(fullScreen);			subNavButton.x = 0;			subNavButton.y = 0+50*i;			subNavButton.buttonWidth = 650;			subNavButton.name = "subNavButton_"+i;			subNavButton.extra.path = filePath;			subNavButton.extra.index = i;			subNavButton.extra.playing = false;			//trace(navButton.name)			if(currentItemSet != true){				currentItem = subNavButton;				currentItemChild = subNavButton;				//trace(currentItem.name);				currentItemSet = true;				}											subMenuMC.addChild(subNavButton);											}						setContentMC(subMenuMC);*/					}						private function addGlow(e:MouseEvent){			e.target.filters = [glowFilter];		}				private function removeGlow(e:MouseEvent){			e.target.filters = [];		}				private function trackEnded(){						if(_playAll == true){			var _currentItem;				_currentTrack.gotoAndStop(1);				_currentTrack.extra.playing = false;				_currentTrack.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));				//if(currentItem.extra.index < totalItems){				_currentItem = getNextItem(currentItem);				_currentItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));				_currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));				currentItemOption = _currentItem.extra.playButton;				currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));				currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));				//}							}else{				_currentTrack.gotoAndStop(1);				_currentTrack.extra.playing = false;				_mediaPlaying = false;			}					}						private function playAllTracks(e:MouseEvent){			_playAll = true;							currentItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));				currentItem.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));				currentItemOption = currentItem.extra.playButton;				currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));				currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));					}				private function playTrack(e:MouseEvent):void {			_mediaPlaying = true;					MovieClip(root).mediaType = "USBAUDIO";					MovieClip(root).stopMedia();						if(e.target.extra.playing == false){												var p = e.target.parent;												for (var i=0; i < totalItems;i++)						{							var playButton = p.getChildByName('playButton_'+i);								playButton.gotoAndStop(1);								playButton.extra.playing = false;						}						trace(e.target.extra.trackId);						MovieClip(root).mediaID = e.target.extra.trackId;						MovieClip(root).launchMedia();						e.target.gotoAndStop(2);						e.target.extra.playing = true;						_currentTrack = e.target;										}else{											MovieClip(root).mediaType = "USBAUDIO";					MovieClip(root).mediaID = e.target.extra.trackId;					MovieClip(root).pauseMedia();						e.target.gotoAndStop(1);					e.target.extra.playing = false;					}											}																private function setFullScreen(e:MouseEvent){			var p = e.target.parent;			for(var i=0; i < _totalPhotos;i++)			{				var selectButton = p.getChildByName("subNavButton_"+i);					selectButton.unSelectButton();			}			e.target.selectButton();						_fullScreenTarget = e.target.extra.path;			//_fullScreen = true;		}						private function setFullScreenThumb(e:MouseEvent){			trace(e.target.name);			var p = e.target.parent;			var thumbButton;						for(var i=0; i < _totalPhotos;i++)			{				thumbButton = p.getChildByName("subNavButton_"+i);				//background = thumbButton.getChildByName("background");				thumbButton.alpha = 0;			}			e.target.alpha = 0.2;			_fullScreenTarget = e.target.extra.path;			//_fullScreen = true;					}				private function getNextItem(_currentItem){			var index = Number(_currentItem.extra.index);			var parentMC = _currentItem.parent;			var result;						if(index < Number(totalItems-1)){			result = parentMC.getChildByName("leftNavBtn_"+Number(index+1));			}else{			result = parentMC.getChildByName("leftNavBtn_0");			}			return result;						}					private function getPrevItem(_currentItem){			var index = Number(_currentItem.extra.index);			var parentMC = _currentItem.parent;			trace(totalItems);			var result;			if(index > 0){			result = parentMC.getChildByName("leftNavBtn_"+Number(index-1));			}else{			result = parentMC.getChildByName("leftNavBtn_"+Number(totalItems-1));			}						return result;						}								private function getNextSubItem(_currentItem){			var index = Number(_currentItem.extra.index);			var parentMC = _currentItem.parent;			var result;						if(index < Number(totalItems-1)){			result = parentMC.getChildByName("trackListing_"+Number(index+1));			}else{			result = parentMC.getChildByName("trackListing_0");			}			return result;						}					private function getPrevSubItem(_currentItem){			var index = Number(_currentItem.extra.index);			var parentMC = _currentItem.parent;			trace(totalItems);			var result;			if(index > 0){			result = parentMC.getChildByName("trackListing_"+Number(index-1));			}else{			result = parentMC.getChildByName("trackListing_"+Number(totalItems-1));			}						return result;						}							private function getNextOption(_currentItem){				var result;												return result;			}					private function getPrevOption(_currentItem){				var result;												return result;							}						private function trackSelect(e:MouseEvent):void			{			var target = e.target;							var tracks = e.target.parent.numChildren;			for(var i = 0; i < tracks; i++){			var track = e.target.parent.getChildAt(i);			if(track.selected == true){				track.selected = false;			}						}			target.selected = true;						}								private function trackListener(e:Event):void{			var tracks = e.target.numChildren;			for(var i = 0; i < tracks; i++){			var track = e.target.getChildAt(i);			//trace(track.name);			var background = track.getChildByName("trackBackground");			//var playButton = e.target.getChildByName("playButton_"+i);			//trace(track.selected);			if(track.selected == true){				Tweener.addTween(background,{alpha:1,time:0.5, transition:"easeOutBack"});							}else{				Tweener.addTween(background,{alpha:0,time:0.5, transition:"easeOutBack"});							}						/*			if(playButton.playing == true){				Tweener.addTween(background,{alpha:1,time:0.5, transition:"easeOutBack"});			}else{				Tweener.addTween(background,{alpha:0,time:0.5, transition:"easeOutBack"});							}*/															}								}								private function loadUSBMedia(){						usbTimer = new Timer(2000,0)			usbTimer.addEventListener(TimerEvent.TIMER, getUSBXML,false,0,true);			usbTimer.start();					}										private function getUSBXML(e:TimerEvent)		{						trace("USB Timer...");			usbStatus = MovieClip(root).getUSBStatus();						if(usbStatus == null){				trace("Undefined Status"+usbStatus);				loadContent("tmp/output.xml");				usbTimer.stop();			}else{				//myTextField.appendText(myAux);				if(usbStatus != ""){				if(_xmlLoaded == false){				trace("USB Status...");				//myTextField.appendText("YEah! "+ myAux.toString());				usbDirectory = MovieClip(root).getUSBDirectory(usbStatus);					}				//ExternalInterface.call("myAlert","Directory Status"+usbDirectory);														}else{											if(_xmlLoaded == true){																					Tweener.addTween(this,{x: 1280, time: 1, delay: 0.25, onComplete: function(){this.visible = false} });														removeChild(totalFiles);																					if(_fullScreen == true){								var removeMC = getChildByName("fullScreenMC");								removeMC.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));							}														_xmlLoaded = false;														parentMC = this.parent;																					statusScreen = new com.brilliantblue.panasonic.IFEdemo.personalMedia.usbMedia.status.view();							parentMC.addChild(statusScreen);														Tweener.addTween(statusScreen,{											 x: 256, 											 time: 1, 											 delay: 0.25											 });																				}														}							}								}														private function loadContent(xmlPath) 		{			//ExternalInterface.call("myAlert","Loading XML File.");			if(_xmlLoaded == false){				xmlLoader = new URLLoader();				xmlLoader.addEventListener(Event.COMPLETE,onLoadXML);             	xmlLoader.addEventListener(IOErrorEvent.IO_ERROR, errorHandler);				xmlLoader.load(new URLRequest(xmlPath));			}						}					private function onLoadXML(e:Event):void 		{			_xmlLoaded = true;			var image:RegExp = /^([a-zA-Z\/].*|[0-9].*)\.(((m|M)(p|P)(3)))$/;						_filesData = new XML(e.target.data);						//ExternalInterface.call("myAlert","XML Loaded: "+_filesData);						_photos = _filesData.file.(image["test"]( @path ) );						//ExternalInterface.call("myAlert","Photos Loaded: "+_photos);						_totalPhotos = _photos.length();									//ExternalInterface.call("myAlert","Total Photos: "+_totalPhotos);						trace("FILTERED "+_photos);								drawScreen();																				Tweener.addTween(statusScreen,{											 x: 1280, 											 time: 1, 											 delay: 0.25/*,											 onComplete: function(){statusScreen.closeButtonSoftClickNoMenu(); trace(statusScreen)},											 onCompleteScope: this*/											 });								this.x = 1280;				this.visible = true;				Tweener.addTween(this,{											 x: 0, 											 time: 1, 											 delay: 0.25											 });																							}						private function errorHandler(e:IOErrorEvent)		{							//ExternalInterface.call("myAlert","Had problem loading the XML File.");			myTextField.appendText("Had problem loading the XML File.\n");			myTextField.setTextFormat(messageFormat);						//loadContent("tmp/output.xml");			//loadUSBMedia();						}											override protected function screenShutDown(){						stage.removeEventListener(KeyboardEvent.KEY_UP, navUp);			stage.removeEventListener(KeyboardEvent.KEY_DOWN, navDown);		}									}		}