let sass = `

.c
	border: 1px solid #000
	margin: 0 auto
	margin-top: 20px
	display: block

.btn_block
	display: flex
	flex-direction: row
	justify-content: center

button
	width: 100px
	height: 50px
	margin: 20px 10px 0 10px
	background-color: transparent
	outline: none
	border: 1px solid #000

button:hover
	cursor: pointer

input
	border: 1px solid #000
	margin: 0 auto
	margin-top: 20px
	display: block
	outline: none
	text-align: center

.curDr
	cursor: url(curDr.cur), pointer

.curEr
	cursor: url(curEr.cur), pointer

`;

crEl(`style(type="text/css") ${buildSass(sass)}`, sel("head"), "in");

let pug = `

canvas(class="c" width="1200" height="300")
div(class="btn_block")
	button(class="btn_er") erase
	button(class="btn_clr") clear
input

`;

let canv = buildPug(pug),
		btnC = sel(".btn_clr"),
		btnE = sel(".btn_er"),
		input = sel("input");

let ctx = canv.getContext("2d");

let [isDrEn, isDrSt, mode] = [false, false, "draw"];
const [erSize, erOffset] = [13, 2];

lis("mousedown", e => {
	let [tar, x, y] = [e.target, e.offsetX, e.offsetY];

	if (tar === canv) {
		[isDrEn, isDrSt] = [true, true];
		if (mode === "erase") ctx.clearRect(x + erOffset, y + erOffset, erSize, erSize);
	}
});

lis("mouseup", e => { if (e.target === canv) [isDrEn, isDrSt] = [false, false]; });

lis("mousemove", e => {
	let [tar, x, y] = [e.target, e.offsetX, e.offsetY];

	if (tar === canv && isDrEn) {
		if (mode === "draw") {
			if (isDrSt) {
				ctx.beginPath();
				ctx.moveTo(x, y);
				isDrSt = false;
			}
			else {
				ctx.lineTo(x, y);
				ctx.stroke();
			}
		}
		else if (mode === "erase") ctx.clearRect(x + erOffset, y + erOffset, erSize, erSize);
	}
});

lis("click", e => {
	if (e.target === btnC) ctx.clearRect(0, 0, canv.width, canv.height);

	if (e.target === btnE) {
		if (mode === "draw") {
			mode = "erase";
			btnE.style.backgroundColor = "yellow";
		}
		else if (mode === "erase") {
			mode = "draw";
			btnE.style.backgroundColor = "transparent";
		}
	}
});

lis("mouseover", e => {
	if (e.target === canv) {
	
	}
	else {
	
	}
});

lis("change", e => {
	if (e.target === input) {
		input.style.borderColor = ctx.strokeStyle = e.target.value;
		e.target.value = "";
	}
});
