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


// regex tests


let testStr = `

div
div
div
div

/*
div
div
div
div
*/

div
div
div
div

/*
div
div
div
div
*/

div
div
div
div

`;

// remove /* */
//let reg = /\/\*[\n\w\d\s\-+='"?;:#$()*\\`@№%^&\[\]{}]*\*\//g;

// remove //
//let reg = /\/\/[\w \t]*/g;

let str = [
	`a.q.q2#aa5.oo(href="#" data-num='89') 1. is it good? - yep))`,
	`a.q.q2#aa5.oo(href="#" data-num='89') 1. is it good? - yep))`,
	`a#aa5.oo(href="#" data-num='89') 1. is it good? - yep))`,
	`a(href="#" data-num='89') 1. is it good? - yep))`,
	`a() 1. is it good? - yep))`,
	`a 1. is it good? - yep))`,
	`a`,
	`span 7`,
	`.q 65`
];

// get tags excluding .class
let str2 = str.map(item => item.match(/\w*[.#( ]?/)[0].match(/\w*/)[0]);

// get values
let str3 = str.map(item => {
	if (item.lastIndexOf(") ") > 0) return item.slice(item.indexOf(") ") + 2);
	else if (item.lastIndexOf(" ") > 0) return item.slice(item.indexOf(" ") + 1);
	return ""
});

// get id + classes + attributes
let str4 = str.map((item, i) => item.slice(item.indexOf(str2[i]) + str2[i].length,
	item.indexOf(str3[i]) - 1));

// get tags finally
str2 = str2.map(item => item || "div");

/*
console.table(str2);
console.table(str3);
console.table(str4);
*/

