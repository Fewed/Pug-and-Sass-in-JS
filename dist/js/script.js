

// let url = "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png";

// let pug2 = `

// a(href="http://google.com")
// 	img(src="${url}" alt="img")

// `;

// sel(".hover").addEventListener("click", () => {
// 	pug.remove();
// 	buildPug(pug2);
// });



// let str = [
// 	`a.q.q2#aa5.oo(href="#" data-num='89') 1. is it good? - yep))`,
// 	`a.q.q2#aa5.oo(href="#" data-num='89') 1. is it good? - yep))`,
// 	`a#aa5.oo(href="#" data-num='89') 1. is it good? - yep))`,
// 	`a(href="#" data-num='89') 1. is it good? - yep))`,
// 	`a() 1. is it good? - yep))`,
// 	`a 1. is it good? - yep))`,
// 	`a`,
// 	`span 7`,
// 	`.q 65`
// ];



let pug = `

div(class="hover")
	ul
		li 1
		/*
		li 2
		li 3
		*/
		li 4
	.g 1#[span 2]3
	// div
	section

`;


let sass = `

*
	color: #fff
	background-color: #000

div
	color: yellow
	border: 1px solid #fff
	&:hover
		cursor: pointer
	& .g
		border: none
		& span
			color: lime

`;

console.log(render(pug, sass));