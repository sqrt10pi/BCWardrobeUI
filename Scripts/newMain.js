// // While we want KD to be backwards compatible with BC, we want to avoid making modifications that are standalone specific to the KD code itself
// // These bootstraps must be loaded last, as they replace BC specific KD functionality
// KinkyDungeonMainRun = () => {};
// KinkyDungeonMainClick = () => {};

// ChatRoomChatLog = [];
// ChatRoomLastMessage = [];

// PreferenceMessage = "";

// ChatRoomCharacterUpdate = () => {};
// ChatRoomCharacterItemUpdate = () => {};

// ArcadeKinkyDungeonEnd = () => {}
// KinkyDungeonMultiplayerUpdate = () => {};

// ArcadeDeviousDungeonChallenge = false;

// const _CharacterAppearanceSetDefault = CharacterAppearanceSetDefault;
// const _CharacterAppearanceFullRandom = CharacterAppearanceFullRandom;
// const _CharacterLoadCanvas = CharacterLoadCanvas;
// const _CharacterRefresh = CharacterRefresh;

// function suppressCanvasUpdate(fn) {
// 	CharacterAppearanceSetDefault = () => {};
// 	CharacterAppearanceFullRandom = () => {};
// 	CharacterLoadCanvas = () => {};
// 	CharacterRefresh = () => {};
// 	let ret = fn();
// 	CharacterAppearanceSetDefault = _CharacterAppearanceSetDefault;
// 	CharacterAppearanceFullRandom = _CharacterAppearanceFullRandom;
// 	CharacterLoadCanvas = _CharacterLoadCanvas;
// 	CharacterRefresh = _CharacterRefresh;
// 	return ret;
// }

// window.onload = function() {
// 	// ArcadeDeviousDungeonChallenge = false;
// 	// KinkyDungeonRootDirectory = "Game/";

// 	// // window.onload in index.html
// 	// ServerURL = "foobar";
// 	// CommonIsMobile = CommonDetectMobile();
// 	// TranslationLoad();
// 	// DrawLoad();
// 	// ControllerActive = false;
// 	// let _TextLoad = TextLoad; // Avoid nonexistent text query
// 	// TextLoad = () => {};
// 	// CommonSetScreen("KinkyDungeon", "KinkyDungeonMain");
// 	// TextLoad = _TextLoad;

// 	// // LoginLoad
// 	// Character = [];
// 	// CharacterNextId = 1;
// 	// CharacterReset(0, "Female3DCG");

// 	// // Player.ArousalSettings.VFXFilter = "VFXFilterHeavy";
// 	// // Player.OnlineSharedSettings = {};
// 	// // Player.OnlineSharedSettings.ItemsAffectExpressions = true
// 	// // Player.AudioSettings = {};
// 	// // Player.AudioSettings.Volume = 1;
// 	// // Player.ImmersionSettings = {};

// 	// CharacterLoadCSVDialog(Player);

// 	// CharacterAppearanceSetDefault(Player);
// 	// CurrentCharacter = null;
// 	// MiniGameStart("KinkyDungeon", 1, "ArcadeKinkyDungeonEnd");

// 	// setTimeout(() => {
// 	// 	DrawCharacter(Player, 1, 0, 1)
// 	// }, 100)

// 	renderCharacterToImage().then(imgsrc => {
// 		const img = document.createElement("img");

// 		img.src = imgsrc;
// 		document.body.appendChild(img);
// 	});
// };

// function cropImageFromCanvas(ctx) {
// 	var canvas = ctx.canvas, 
// 	  w = canvas.width, h = canvas.height,
// 	  pix = {x:[], y:[]},
// 	  imageData = ctx.getImageData(0,0,canvas.width,canvas.height),
// 	  x, y, index;

// 	for (y = 0; y < h; y++) {
// 	  for (x = 0; x < w; x++) {
// 		index = (y * w + x) * 4;
// 		if (imageData.data[index+3] > 0) {
// 		  pix.x.push(x);
// 		  pix.y.push(y);
// 		} 
// 	  }
// 	}
// 	pix.x.sort(function(a,b){return a-b});
// 	pix.y.sort(function(a,b){return a-b});
// 	var n = pix.x.length-1;

// 	w = 1 + pix.x[n] - pix.x[0];
// 	h = 1 + pix.y[n] - pix.y[0];
// 	var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);

// 	canvas.width = w;
// 	canvas.height = h;
// 	ctx.putImageData(cut, 0, 0);
        
// 	var image = canvas.toDataURL();
// 	return image;
// }

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
// let memoCtx;
// let hasInit = false;

// async function init() {
// 	if (hasInit) {
// 		return memoCtx;
// 	}

// 	AssetLoadAll();

// 	const canvas = document.createElement("canvas");
// 	canvas.style.background = "red";
// 	canvas.height = 1000;
// 	canvas.width = 2000;
// 	const ctx = canvas.getContext("2d");
// 	memoCtx = ctx;
// 	document.body.appendChild(canvas);

// 	// @ts-expect-error relax typescript...
// 	MainCanvas = {};
// 	hasInit = true;

// 	await sleep(1000);

// 	return memoCtx;
// }

// async function renderCharacterToImage() {
// 	const ctx = await init();

// 	let Char = CharacterReset(0, "Female3DCG");
// 	DrawCharacter(Char, 0, 0, 1, true, ctx)

// 	// return cropImageFromCanvas(ctx);
// }

// // module.exports = {
// // 	renderCharacterToImage
// // }