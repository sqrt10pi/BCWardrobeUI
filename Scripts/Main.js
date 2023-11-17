// While we want KD to be backwards compatible with BC, we want to avoid making modifications that are standalone specific to the KD code itself
// These bootstraps must be loaded last, as they replace BC specific KD functionality
KinkyDungeonMainRun = () => {};
KinkyDungeonMainClick = () => {};

ChatRoomChatLog = [];
ChatRoomLastMessage = [];

PreferenceMessage = "";

ChatRoomCharacterUpdate = () => {};
ChatRoomCharacterItemUpdate = () => {};

ArcadeKinkyDungeonEnd = () => {}
KinkyDungeonMultiplayerUpdate = () => {};

ArcadeDeviousDungeonChallenge = false;

const _CharacterAppearanceSetDefault = CharacterAppearanceSetDefault;
const _CharacterAppearanceFullRandom = CharacterAppearanceFullRandom;
const _CharacterLoadCanvas = CharacterLoadCanvas;
const _CharacterRefresh = CharacterRefresh;

function suppressCanvasUpdate(fn) {
	CharacterAppearanceSetDefault = () => {};
	CharacterAppearanceFullRandom = () => {};
	CharacterLoadCanvas = () => {};
	CharacterRefresh = () => {};
	let ret = fn();
	CharacterAppearanceSetDefault = _CharacterAppearanceSetDefault;
	CharacterAppearanceFullRandom = _CharacterAppearanceFullRandom;
	CharacterLoadCanvas = _CharacterLoadCanvas;
	CharacterRefresh = _CharacterRefresh;
	return ret;
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let hasInit = false;
let ctxStash;

function init(){
	if (hasInit) {
		return ctxStash
	}

	AssetLoadAll();

	const canvas = document.createElement("canvas");
	canvas.style.background = "red";
	canvas.height = 1000;
	canvas.width = 2000;
	const ctx = canvas.getContext("2d");
	ctxStash = ctx;
	hasInit = true;

	MainCanvas = {};

	return ctx;
}

async function doIt(ctx) {
	let Char = CharacterReset(0, "Female3DCG");

	await sleep(50);

	DrawCharacter(Char, 1, 0, 1, true, ctx)

	const imgsrc = cropImageFromCanvas(ctx)
	return imgsrc;
}

window.onload = function() {
	const ctx = init();
	doIt(ctx).then(imgsrc => {
		const img = document.createElement("img");
		img.src = imgsrc;
		document.body.appendChild(img);
	})
};

function cropImageFromCanvas(ctx) {
	var canvas = ctx.canvas, 
	  w = canvas.width, h = canvas.height,
	  pix = {x:[], y:[]},
	  imageData = ctx.getImageData(0, 0, canvas.width,canvas.height),
	  x, y, index;
	
	for (y = 0; y < h; y++) {
	  for (x = 0; x < w; x++) {
		index = (y * w + x) * 4;
		if (imageData.data[index+3] > 0) {
		  pix.x.push(x);
		  pix.y.push(y);
		} 
	  }
	}
	pix.x.sort(function(a,b){return a-b});
	pix.y.sort(function(a,b){return a-b});
	var n = pix.x.length-1;
	
	w = 1 + pix.x[n] - pix.x[0];
	h = 1 + pix.y[n] - pix.y[0];
	var cut = ctx.getImageData(pix.x[0], pix.y[0], w, h);
  
	canvas.width = w;
	canvas.height = h;
	ctx.putImageData(cut, 0, 0);
		  
	var image = canvas.toDataURL();
	return image;
}
