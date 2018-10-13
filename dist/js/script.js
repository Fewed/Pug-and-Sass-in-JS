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






buildPug(pug);