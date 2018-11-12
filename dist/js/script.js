

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

postRender();

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
	section 1111&nbsp;2222

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
		& div
			color: yellow

`;





// function MyArray(...elements) {
// 	//return elements;
// }

// MyArray.prototype = Object.create(Array.prototype);
// MyArray.prototype.map = function() {console.log("map")};

// let arr = new MyArray(1,2,3,4,5);

// console.log(arr);


// // let target = {message: "article", mess: "another"};
// // let handler = {
// // 	get: (target, objectKey) => {
// // 		console.log(`reading "${objectKey}"`);
// // 		return target[objectKey];
// // 	}
// // };

// // let p = new Proxy(target, handler);

// // console.log(p.message);


// let sum = (...nums) => nums.reduce((acc, cur) => acc + cur, 0);
// let sum2 = (...nums) => sum(5, ...nums);



// //let hov = document.querySelector(".hover");



// function handler(e) { console.log(e.target) }

// //document.addEventListener("click", e => handler(e));

// //document.addEventListener("click", handler);


// function int(val) { return val + 5}

// function ext(num, cb) { return num * cb(7) }

// console.log(ext(10, int));

// console.log(ext(10, () => int(7) ));



// // let test = [
// // 	"123456",
// // 	[1,2,3,4,5,6],
// // 	{a: 1, b: 2, c: 3}
// // ];


// // function Iterator(target, deep = 0) {
// // 	this.target = target;
// // //	this.keys = this.target.map(key => key);
// // }

// // let it = test.map(item => new Iterator(item));

// // //console.log(it.map(item => item.keys));


// function request() {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("GET", "test.json", true);
	

// 	xhr.onload = (function() {console.log(JSON.parse(this.responseText))});

// 	xhr.send();
// }

// //request();

// // fetch("http://msementsov.ru/xhr/test.json")
// //   .then(response => response.json())
// //   .then(json => console.log(json))


// let url = "http://api.icndb.com/jokes/random";

// fetch(url).then(data => data.json()).then(json => console.log(json.value.joke));

// function request() {
// 	let xhr = new XMLHttpRequest();
// 	xhr.open("GET", url);
	

// 	xhr.onload = (function() {console.log(JSON.parse(this.responseText).value.joke)});

// 	xhr.send();
// }

// request();

