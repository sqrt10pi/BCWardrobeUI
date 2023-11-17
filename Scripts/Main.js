const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

let hasInit = false;
let ctxStash;

async function init(){
	if (hasInit) {
		return ctxStash
	}

	AssetLoadAll();

	const canvas = document.createElement("canvas");
	canvas.height = 1000;
	canvas.width = 2000;
	const ctx = canvas.getContext("2d");
	ctxStash = ctx;
	hasInit = true;

	// @ts-expect-error blah
	MainCanvas = {};
	globalThis.ChatRoomLastMessage = {};

	return ctx;
}

function ApplyOutfit(C, bundleString) {
	if (!bundleString) {
		return;
	}

	try {
		const bundle = /** @type {ItemBundle[]} */ (
			bundleString.startsWith("[")
				? JSON.parse(bundleString)
				: JSON.parse(LZString.decompressFromBase64(bundleString))
		);

		if (
			!Array.isArray(bundle) ||
			bundle.length === 0 ||
			!bundle[0].Group
		) {
			throw new Error("Invalid bundle");
		}

		C.MemberNumber = 1;

		ServerAppearanceLoadFromBundle(
			C,
			"Female3DCG",
			bundle,
			C.MemberNumber
		);

		CharacterRefresh(C, false, false);
	} catch (e) {
		console.error(e);
	}
}


async function renderCharToData(outfit) {
	const ctx = await init();

	// Cheap way to clear the canvas
	ctx.canvas.height = 1001;
	ctx.canvas.height = 1000;
	ctx.canvas.width = 2000;
	// @ts-expect-error blah
	MainCanvas = {};
	globalThis.ChatRoomLastMessage = {};

	let Char = CharacterReset(0, "Female3DCG");

	// timing dependent... on my local machine 10 fails, 20 intermittent, 50 consistently passes. Probably dependent on network loads so we really should find a way to detect all network complete as part of init maybe?

	await sleep(50);

	ApplyOutfit(Char, outfit);

	await sleep(1000);

	DrawCharacter(Char, 1, 0, 1, true, ctx);

	const imgsrc = cropImageFromCanvas(ctx);

	return imgsrc;
}

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

// @ts-expect-error I'm defining this...
window.bc = {
	renderCharToData
}
