let pug = `

div(class="hover")
	ul
		li 1
		li 2
		li 3

`,

sass = `

body
	padding-top: 50px
	text-align: center

div
	width: 300px
	height: 150px
	border: 1px solid #000
	margin: 0 auto

.hover:hover
	cursor: pointer
	border-color: red

`;

crEl(`style(type="text/css") ${buildSass(sass)}`, sel("head"), "in");
pug = buildPug(pug);

let url = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

let pug2 = `

a(href="http://google.com")
	img(src="${url}" alt="img")

`;

sel(".hover").addEventListener("click", () => {
	pug.remove();
	buildPug(pug2);
});







