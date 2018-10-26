;
// smart selector
let sel = (target, mode = 0) => {
	let arr = document.querySelectorAll(target);
	
	return (arr.length !== 1) ? [...arr] : ((mode !== 0) ? [arr[0]] : arr[0]);
};

// global event listener
let lis = (eventType, process) => window.addEventListener(eventType, process);

// shorted console.log()
let log = console.log.bind(console);

// shorted requestAnimationFrame
let raf = cb => requestAnimationFrame(cb);

// shorted cancelAnimationFrame
let caf = cb => cancelAnimationFrame(cb);

// shorted getComputedStyle
let gs = element => getComputedStyle(element);


function crAr(size, value = 0) {
	let primitives = ['boolean', 'null', 'undefined', 'number', 'string', 'symbol'],
			isPrimitive = primitives.indexOf(typeof value) > 0;
			
	if (!isPrimitive) value = JSON.stringify(value);

	return [...Array(size)].map(() => isPrimitive ? value : JSON.parse(value));
}


// function crEl (str, ref = "default", mode = "after") {
// 	let tag = str.indexOf("(") < 0 ? str.split(" ")[0] : str.slice(0, str.indexOf("("));
// 	let val = str.indexOf(")") < 0 ? str.split(" ")[1] : str.slice(str.indexOf(")") + 2);
// 	let attrs = (str.slice(str.indexOf("(") + 1, str.indexOf(")"))).split(`" `);
// 	attrs = attrs.map(attr => attr.replace(/"/g, "").split("="));

// 	let el = document.createElement(tag);
// 	el.textContent = val;
// 	attrs.map(item => { if(item.length === 2) el.setAttribute(...item) });

// 	if (ref === "default") sel("body").insertBefore(el, sel("script")[0]);
// 	else {
// 		if (mode === "after") ref.parentNode.insertBefore(el, ref.nextSibling);
// 		else if (mode === "before") ref.parentNode.insertBefore(el, ref);
// 		else if (mode === "in") {
// 			if (ref.tagName === "BODY") ref.insertBefore(el, sel("script")[0]);
// 			else {
// 				if (ref.children.length) ref.appendChild(el);
// 				else ref.insertBefore(el, ref.children[0]);
// 			}
// 		}
// 	}

// 	return el
// }


// function buildSass(sass) {
// 	let arr = sass.split(/\n/);

// 	arr = arr.map((item, i) => {
// 		item = item.trim();

// 		if (item !== "") item += ";";
// 		else item = "";

// 		if (item !== "" && arr[i-1] === "") item = item.slice(0, -1) + "{";
// 		if (arr[i+1] === "" && item !== "") item += "}";

// 		return item
// 	});
// 	return arr.join("");
// }


// function buildPug(pug) {
// 	let array = pug.split("\n").filter(item => item !== "");

// 	let [lengths, strings, refs] = crAr(3, []);

// 	array.map(item => {
// 		let temp = item.match(/	/g);
// 		lengths.push(temp ? temp.length : 0);
// 		strings.push(item.replace(/	/g, ""));
// 	});

// 	function compile() {
// 		let [ref, pre] = [sel("body"), -1];

// 		strings.map((String, i) => {
// 			if (i) pre = lengths[i-1];

// 			if (lengths[i] > pre) ref = refs[refs.length-1] || ref;
// 			else if (lengths[i] < pre) {
// 				let pos = lengths.indexOf(lengths[i]);
// 				ref = refs[pos-1];
// 			}

// 			refs.push(crEl(String, ref, "in"));
// 		});
// 	}
	
// 	compile();
// 	return refs[0]
// }








function insertElement(tag = "div", value = "", attributes = [], ref = "default", mode = "after") {
	let el = document.createElement(tag);
	el.textContent = value;
	attributes.map(item => (item.length === 2) && el.setAttribute(...item));

	if (ref === "default") document.body.insertBefore(el, sel("script")[0]);
	else {
		if (mode === "after") ref.parentNode.insertBefore(el, ref.nextSibling);
		else if (mode === "before") ref.parentNode.insert(el, ref);
		else if (mode === "in") {
			if (ref === document.body) ref.insertBefore(el, sel("script")[0]);
			else {
				if (ref.children.length) ref.appendChild(el);
				else ref.insertBefore(el, ref.children[0]);
			}
		}
	}

	return el
}


//log(insertElement(`span`, 7, [["id", "qw7"]], sel("body"), "in"));

function crEl(str, ref = "default", mode = "after") {
	// get tag
	let tag = str.match(/\w*[.#( ]?/)[0].match(/\w*/)[0];

	// get value
	let value = "";
	if (str.includes("(")) {
		if (str.indexOf("(") < str.indexOf(" ")) value = str.slice(str.indexOf(")") + 2);
		else if (str.includes(" ")) value = str.slice(str.indexOf(" ") + 1);
	}
	else if (str.includes(" ")) value = str.slice(str.indexOf(" ") + 1);

	// get id + classes + attributes
	let set = str;
	if (tag !== "" && value !== "") set = str.slice(str.indexOf(tag) + tag.length, 
	str.indexOf(value) - 1);
	else if (tag === "" && value !== "") set = str.slice(0, str.indexOf(" "));
	set = set.trim();

	// fix tag
	tag = tag || "div";

	// split id + classes & attributes
	let [attrs, idcl] = ["", set];
	if (set.includes("(")) {
		attrs = set.slice(set.indexOf("(") + 1).replace(")", "");
		idcl = set.slice(0, set.indexOf("("));
	}

	// split id & classes
	let [id, cls] = ["", idcl.split(".")];
	if (idcl.includes("#")) {
		id = idcl.slice(idcl.indexOf("#") + 1).split(".")[0];
		cls = idcl.replace(/#\w*/, "").split(".");
	}
	cls.shift();

	// inject classes & id into attributes
	if (id !== "") attrs += ` id="${id}"`;
	cls.map(item => {
		if (attrs.includes("class")) attrs += ` class="${item}"`;
		else attrs = attrs.replace(`class="`, `class="${item} `);
	});

	// split attributes
	attrs = attrs.trim().split(/['"] /);
	attrs = attrs.map(item => item.replace(/['"]/g, "").split("="));

	// insert element
	return insertElement(tag, value, attrs, ref, mode);
}

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

// log(str.map(item => crEl(item)));

function inline(str, ref = "default", modex = "after") {
	// get tag
	let tag = str.match(/\w*[.#( ]?/)[0].match(/\w*/)[0];

	// get value
	let value = "";
	if (str.includes("(")) {
		if (str.indexOf("(") < str.indexOf(" ")) value = str.slice(str.indexOf(")") + 2);
		else if (str.includes(" ")) value = str.slice(str.indexOf(" ") + 1);
	}
	else if (str.includes(" ")) value = str.slice(str.indexOf(" ") + 1);

	// ???
	let textEl = null;

	if (value.includes("#[")) {
		textEl = crEl(str.replace(value, ""), ref, modex);

		let crTN = text => document.createTextNode(text),
				temp = "",
				[regex1, regex2] = ["#[", "]"],
				regex3 = /[\wА-яЁё\t\s ~:;.,!?@$%^&<>(){}_+|'"\-=№*\/\\]*/,
				regex4 = /#\[[\wА-яЁё\t\s ~:;.,!?@$%^&<>(){}_+|'"\-=№*\/\\]*\]/,
				mode = true;

		while (value !== "") {
			let index = value.indexOf(mode ? regex1 : regex2);

			if (index !== -1) {
				temp = value.slice(0, index).replace(regex1, "");
				value = value.replace(mode ? regex3 : regex4, "");
			}
			else if (value.length) [temp, value] = [value, ""];

			if (mode) textEl.appendChild(crTN(temp));
			else crEl(temp, textEl, "in");

			mode ^= 1;	// true - number
		}
	}
	else textEl = crEl(str, ref, modex);

	return textEl;
}

log(inline(`a 1#[span 2]3#[span 4]5`));
