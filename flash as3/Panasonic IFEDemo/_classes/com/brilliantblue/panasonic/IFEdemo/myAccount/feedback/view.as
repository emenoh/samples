﻿package com.brilliantblue.panasonic.IFEdemo.myAccount.feedback{	import flash.display.*;	import flash.events.*;	import flash.net.*;	import flash.text.*;	import flash.filters.*;		import com.brilliantblue.panasonic.IFEdemo.view;	import com.brilliantblue.panasonic.IFEdemo.common.screen.*;	import com.brilliantblue.panasonic.IFEdemo.common.buttons.*;	import com.brilliantblue.panasonic.IFEdemo.common.key.*;		import caurina.transitions.*;		public class view extends com.brilliantblue.panasonic.IFEdemo.view	{				public var myMovieClip:MovieClip;				private var _xmlLoader:URLLoader		private var _imageLoader:Loader;		private var _extrasLoader:Loader;		private var _xmlData:XML;		private var _titleText:String;		private var _questions:XMLList;		private var _tracks:XMLList;		private var _bodyText:String;		private var _artist:String;		private var _thumbsrc:String;		private var _price:String;		private var _musicThumb:MovieClip;		private var _musicExtras:MovieClip;		private var _playAlbumButton:MovieClip;		private var _allTracksButton:MovieClip;		private var _viewPlayListButton:MovieClip;		private var _submitButton;										public function view () 		{																											var headerFormat = new TextFormat();			headerFormat.font = "Reflex Bold";			headerFormat.kerning = true;			headerFormat.color = 0xFFFFFF;			headerFormat.size = 20;			headerFormat.align = "left";												var headerMC = new MovieClip();			headerMC.x = 350;			headerMC.y = 85;			var _welcomeText = new TextField();			_welcomeText.height = 40;				_welcomeText.text = "We’re always looking for ways to improve our products & services.\nThis short survey will help us out.";				_welcomeText.x = 30;				_welcomeText.y = 0;				_welcomeText.autoSize = TextFieldAutoSize.LEFT;				_welcomeText.embedFonts = true;				_welcomeText.selectable = false; 				_welcomeText.setTextFormat(headerFormat);						headerMC.addChild(_welcomeText);						this.addChild(headerMC);						var footerMC = new MovieClip();			footerMC.x = 350;			footerMC.y = 600;			var _instructionText = new TextField();			_instructionText.height = 40;				_instructionText.text = "Please rate the service out of 4. 1 Poor - 4 Excellent.";				_instructionText.x = 30;				_instructionText.y = 0;				_instructionText.autoSize = TextFieldAutoSize.LEFT;				_instructionText.embedFonts = true;				_instructionText.selectable = false; 				_instructionText.setTextFormat(headerFormat);						footerMC.addChild(_instructionText);						this.addChild(footerMC);												glowFilter = new GlowFilter(0xFFFFFF,                                  .8,//alpha                                  2,//blurx                                  2,//blury                                  4,//strength                                  BitmapFilterQuality.LOW,//quality                                  true,//inner                                  false);//knockout																			this.addEventListener(Event.ADDED_TO_STAGE, onAdded,false,0,true);								}								private function onAdded(e:Event)		{			//trace("added");            stage.addEventListener(KeyboardEvent.KEY_UP, navUp,false,0,true);            stage.addEventListener(KeyboardEvent.KEY_DOWN, navDown,false,0,true);						_xmlData = MovieClip(root)._survey;						drawScreen();					}								private function navUp(e:KeyboardEvent)		{			//trace(e.keyCode);						k = KH.convertKeyCodeToKey(e.keyCode, e.shiftKey)						switch(k)				{										case KeyType.LEFT://left arrow											trace(currentItemOption.name);						//currentItem.dispatchEvent(new InteractiveScene3DEvent(InteractiveScene3DEvent.OBJECT_OUT, currentItem));						//currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OUT, true, false));						itemIndex = Number(currentItemOption.extra.index);						if(itemIndex > 0){						prevItemOption = getPrevOption(currentItemOption);						prevItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						currentItemOption = prevItemOption;						}						trace(currentItemOption.name);						break;					case KeyType.RIGHT://right arrow						trace(currentItemOption.name);						itemIndex = Number(currentItemOption.extra.index);						if(itemIndex < 4){						nextItemOption = getNextOption(currentItemOption);						nextItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						currentItemOption = nextItemOption;						}						trace(currentItemOption.name);						break;											case KeyType.UP://up arrow						trace(currentItem.name);												itemIndex = Number(currentItem.extra.index);									if(itemIndex > 0){						_scroller.scroller.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));						//_scroller.scroller.y -= Math.min(_scroller.scroller.y -_scroller.track.height/totalItems, 0);						_scroller.scroller.y = ((_scroller.track.height-_scroller.scroller.height)/totalItems)*(itemIndex-1);						_scroller.startScroll();						_scroller.scroller.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false));																		prevItem = getPrevItem(currentItem);						prevItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						currentItem = prevItem;						currentItemOption = currentItem.extra.starMC;						currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						trace(currentItem.name);						}						break;											case KeyType.DOWN://down arrow						trace(currentItem.name);												itemIndex = Number(currentItem.extra.index);																				if(itemIndex < totalItems-1){						_scroller.scroller.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));						//_scroller.scroller.y += Math.max(_scroller.track.height/totalItems, _scroller.track.height);						_scroller.scroller.y = ((_scroller.track.height-_scroller.scroller.height)/totalItems)*(itemIndex+1);						_scroller.startScroll();						_scroller.scroller.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false));												nextItem = getNextItem(currentItem);						nextItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						currentItem = nextItem;						currentItemOption = currentItem.extra.starMC;						currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						trace(currentItem.name);																		}else if (itemIndex == totalItems-1){							currentItemOption = _submitButton;							currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));						}																								break;																	case KeyType.OK://select current item						//if(currentItem != previousItem){						//keyboard = true;						trace(currentItem.name);						var optionButton = currentItemOption;						optionButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						//}						break;																case KeyType.HOME://back button						closeButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						break;											case KeyType.BACK://back button						closeButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));						break;																					}						}						private function navDown(e:KeyboardEvent)		{						k = KH.convertKeyCodeToKey(e.keyCode, e.shiftKey)						switch(k)				{											/*case KeyType.UP://up arrow						upArrow.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));						break;											case KeyType.DOWN://down arrow						downArrow.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));						break;						*/										}						}						override protected function screenShutDown()		{						stage.removeEventListener(KeyboardEvent.KEY_UP, navUp);			stage.removeEventListener(KeyboardEvent.KEY_DOWN, navDown);		}													private function drawScreen()		{			_questions = _xmlData.*;						//_price = _music.price.toString();									setLayout("1column");			setScreenTitle("FEEDBACK");						adjustScreen();						screen.title.x = (contentRegion.x - screen.x);												var trackFormat = new TextFormat();			trackFormat.font = "Century Gothic";			trackFormat.kerning = true;			trackFormat.color = 0xFFFFFF;			trackFormat.size = 16;			trackFormat.align = "left";															contentMC = new MovieClip();			contentMC.y = 20;									 /*trace(contentMC.width);			contentRegion.scrollArea.width = contentRegion.width;						 trace(contentRegion.scrollArea.width);			 trace(contentMC.height);*/			var currentItemSet = false;			totalItems = _questions.length();			//trace(_tracks.length());			var questionHolder = new MovieClip();			questionHolder.name = "questionHolder";						for (var i = 0; i < totalItems; i++){								var trackWidth:Number = 600;				var trackHeight:Number = 60;				var trackY = (70*i);				var _trackListing:MovieClip = new MovieClip();					_trackListing.y = trackY;					//trace(_trackListing.y)					_trackListing.x = 10;					_trackListing.name = 'trackListing_'+i;					_trackListing.buttonMode = true;					_trackListing.extra = new Object();					_trackListing.extra.selected = false;					_trackListing.extra.index = i;					_trackListing.mouseChildren = false;					_trackListing.addEventListener(MouseEvent.CLICK, trackSelect);				trace(_trackListing.name);				var _background:MovieClip = new MovieClip();					_background.graphics.lineStyle(2, 0xFFFFFF);					_background.graphics.beginFill(0xFFFFFF, 0);					_background.graphics.drawRoundRect(0,0,trackWidth,trackHeight,trackHeight,trackHeight);					_background.graphics.endFill();					_background.name = 'trackBackground';					_background.alpha = 0;				var _question = new TextField();					_question.text = (i+1)+". "+ _questions[i].question;					//_question.autoSize = TextFieldAutoSize.LEFT;					_question.wordWrap = true;					_question.width = trackWidth-40;					_question.embedFonts = true;					_question.x = 20;					_question.y = 5;					_question.selectable = false; 					_question.setTextFormat(trackFormat);									var _button:MovieClip = new MovieClip();					_button.graphics.lineStyle(2, 0xFFFFFF, 0);					_button.graphics.beginFill(0xFFFFFF, 0);					_button.graphics.drawRoundRect(0,0,trackWidth,trackHeight,trackHeight,trackHeight);					_button.graphics.endFill();					_button.name = 'trackButton';					_button.alpha = 0;								_trackListing.addChild(_background);				_trackListing.addChild(_question);				_trackListing.addChild(_button);								var _starMC = new MovieClip();				_starMC.mouseChildren = true;				_starMC.x  = trackWidth+20;								var currentItemOptionSet = false;								for(var j = 0; j < 4; j++){				var _starEmptyButton:MovieClip = new starEmpty();				_starEmptyButton.x = j*70;				_starEmptyButton.y = trackY;				_starEmptyButton.name = "starEmptyButton_"+i+"_"+j;								var _starFullButton:MovieClip = new starFilled();				_starFullButton.x = j*70;				_starFullButton.y = trackY;				_starFullButton.name = "starFullButton_"+i+"_"+j;				_starFullButton.alpha = 0;				_starFullButton.buttonMode = true;				_starFullButton.extra = new Object();				_starFullButton.extra.pIndex = i;				_starFullButton.extra.index = j;				_starFullButton.extra.selected = false;				_starFullButton.addEventListener(MouseEvent.CLICK, starFullClick);				_starFullButton.addEventListener(MouseEvent.MOUSE_OVER, addGlow);				_starFullButton.addEventListener(MouseEvent.MOUSE_OUT, removeGlow);								_starMC.addChild(_starEmptyButton);				_starMC.addChild(_starFullButton);										if(currentItemOptionSet != true){						_trackListing.extra.starMC = _starFullButton;												//trace(currentItemOption.name);						currentItemOptionSet = true;						}				}													questionHolder.addChild(_trackListing);				questionHolder.addChild(_starMC);												if(currentItemSet != true){				currentItem = _trackListing;				trace(currentItem.name);				currentItemSet = true;				}																								//_addButton.addEventListener(MouseEvent.MOUSE_DOWN, addTrack);				//_trackListing.addEventListener(MouseEvent.CLICK, trackDeSelect); 																						}												_submitButton = new BasicButton();			_submitButton.setTitle("Submit Feedback");			_submitButton.setClickEvent(submitSurvey);			_submitButton.x = questionHolder.width/2 - _submitButton.width/2;			_submitButton.y = questionHolder.height;			contentMC.addChild(_submitButton);																						//questionHolder.addEventListener(Event.ENTER_FRAME,trackListener);								contentMC.addChild(questionHolder);																setContentMC(contentMC);						currentItem.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));					}																			private function addGlow(e:MouseEvent){			e.target.filters = [glowFilter];		}				private function removeGlow(e:MouseEvent){			e.target.filters = [];		}											private function getNextItem(_currentItem){			var index = Number(_currentItem.extra.index);			var parentMC = _currentItem.parent;			var result;			if(index < Number(totalItems-1)){			result = parentMC.getChildByName("trackListing_"+Number(index+1));			}			return result;						}					private function getPrevItem(_currentItem){			var index = Number(_currentItem.extra.index);			var parentMC = _currentItem.parent;			trace(totalItems);			var result;			if(index > 0){			result = parentMC.getChildByName("trackListing_"+Number(index-1));			}						return result;						}					private function getNextOption(_currentItem){			trace(_currentItem.name);			var index = Number(_currentItem.extra.index);			var pIndex = Number(_currentItem.extra.pIndex);			var parentMC = _currentItem.parent;			var result;							if(index < 4){				result = parentMC.getChildByName("starFullButton_"+pIndex+"_"+Number(index+1));				}							return result;			}					private function getPrevOption(_currentItem){						trace(_currentItem.name);			var index = Number(_currentItem.extra.index);			var pIndex = Number(_currentItem.extra.pIndex);			var parentMC = _currentItem.parent;			trace(totalItems);			var result;							if(index > 0){				result = parentMC.getChildByName("starFullButton_"+pIndex+"_"+Number(index-1));				}						return result;							}																		private function starFullClick(e:MouseEvent)		{				var p = e.target.parent;				var index = e.target.extra.index;				var pIndex = e.target.extra.pIndex;				trace(index);				trace(pIndex);				e.target.extra.selected = true;				var i;				var fullStar				for (i = 0; i < 4; i++){					fullStar = p.getChildByName("starFullButton_"+pIndex+"_"+i);					fullStar.alpha = 0;				}								for(i = 0; i <= index; i++){					fullStar = p.getChildByName("starFullButton_"+pIndex+"_"+i);					fullStar.alpha = 1;				}		}					private function trackSelect(e:MouseEvent):void		{			trace(e.target.name);			var background;			//var tracks = totalTracks;				for(var i = 0; i < totalItems; i++){				var track = e.target.parent.getChildByName("trackListing_"+i);															if(track.selected == true){							track.selected = false;							background = track.getChildByName("trackBackground");							Tweener.addTween(background,{alpha:0,time:0.5, transition:"easeOutBack"});						}								}			e.target.selected = true;						background = e.target.getChildByName("trackBackground");			Tweener.addTween(background,{alpha:1,time:0.5, transition:"easeOutBack"});			currentItemOption = e.target.extra.starMC;			currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));			trace(currentItemOption.name);			}											private function trackListener(e:Event):void		{			var tracks = e.target.numChildren;			for(var i = 0; i < tracks; i++){			var track = e.target.getChildAt(i);			//trace(track.name);			var background = track.getChildByName("trackBackground");			//var playButton = e.target.getChildByName("playButton_"+i);			//trace(track.selected);			if(track.selected == true){				Tweener.addTween(background,{alpha:1,time:0.5, transition:"easeOutBack"});							}else{				Tweener.addTween(background,{alpha:0,time:0.5, transition:"easeOutBack"});							}						/*			if(playButton.playing == true){				Tweener.addTween(background,{alpha:1,time:0.5, transition:"easeOutBack"});			}else{				Tweener.addTween(background,{alpha:0,time:0.5, transition:"easeOutBack"});							}*/															}								}					private function submitSurvey(e:MouseEvent){						var thankYouMC = new MovieClip();				thankYouMC.graphics.beginFill(0x000000, 0);				thankYouMC.graphics.drawRect(0,0,1000,400);				thankYouMC.graphics.endFill();						var thankYou = createTextField(0, 20, 1000, 40);				thankYou.width = 600;				thankYou.text = "Thank You for your valuable feedback!";				thankYou.setTextFormat(CC_CategoryFormat);						thankYouMC.addChild(thankYou);						thankYou.x = thankYouMC.width/2 - thankYou.width/2;									var _submitButton = new BasicButton();			_submitButton.setTitle("Exit");			_submitButton.setClickEvent(exit);			_submitButton.x = thankYouMC.width/2 - _submitButton.width/2;			_submitButton.y = 100;			thankYouMC.addChild(_submitButton);						try{			var scrollBar = contentRegion.sb;						scrollBar.scroller.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_DOWN, true, false));			scrollBar.scroller.y = 0;			scrollBar.startScroll();			scrollBar.scroller.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_UP, true, false));						}catch(e:Error){			}						setContentMC(thankYouMC);						currentItemOption = _submitButton;						currentItemOption.dispatchEvent(new MouseEvent(MouseEvent.MOUSE_OVER, true, false));											}							private function exit(e:MouseEvent){			closeButton.dispatchEvent(new MouseEvent(MouseEvent.CLICK, true, false));		}							}		}