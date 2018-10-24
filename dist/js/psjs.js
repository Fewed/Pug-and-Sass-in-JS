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
	attributes.map(item => {if (item.length === 2) el.setAttribute(...item)});

	if (ref === "default") sel("body").insertBefore(el, sel("script")[0]);
	else {
		if (mode === "after") ref.parentNode.insertBefore(el, ref.nextSibling);
		else if (mode === "before") ref.parentNode.insert(el, ref);
		else if (mode === "in") {
			if (ref.tagName === "BODY") ref.insertBefore(el, sel("script")[0]);
			else {
				if (ref.children.length) ref.appendChild(el);
				else ref.insertBefore(el, ref.children[0]);
			}
		}
	}

	return el
}


insertElement(`span`, 7);


