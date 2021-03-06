;
function replaceEntities(text) {
	let entities = new Map([
		["nbsp", 160],
		["ensp", 8194],
		["emsp", 8195]
	]);

	[...entities.keys()].map(key => {
		let reg = new RegExp(`&${key};`, "g");
		let val = String.fromCharCode(entities.get(key));
		text = text.replace(reg, val);
	});

	return text;
}


function insertElement(tag = "div", value = "", attributes = [], ref = "default", mode = "after") {
	let el = document.createElement(tag);
	el.textContent = value;
	attributes.map(item => (item.length === 2) && el.setAttribute(...item));

	if (ref === "default") document.body.insertBefore(el, document.querySelector("script"));
	else {
		if (mode === "after") ref.parentNode.insertBefore(el, ref.nextSibling);
		else if (mode === "before") ref.parentNode.insert(el, ref);
		else if (mode === "in") {
			if (ref === document.body) ref.insertBefore(el, document.querySelector("script"));
			else {
				if (ref.children.length) ref.appendChild(el);
				else ref.insertBefore(el, ref.children[0]);
			}
		}
	}

	return el
}


function getValue(str) {
	let value = "";
	if (str.includes("(")) {
		if (str.indexOf("(") < str.indexOf(" ")) value = str.slice(str.indexOf(")") + 2);
		else if (str.includes(" ")) value = str.slice(str.indexOf(" ") + 1);
	}
	else if (str.includes(" ")) value = str.slice(str.indexOf(" ") + 1);

	return replaceEntities(value);
}


function crEl(str, ref = "default", mode = "after") {
	// get tag
	let tag = str.match(/\w*[.#( ]?/)[0].match(/\w*/)[0];

	// get value
	let value = getValue(str);

	// get id + classes + attributes
	let set = str;
	if (tag && value) set = str.slice(str.indexOf(tag) + tag.length, str.indexOf(value) - 1);
	else if (!tag && value) set = str.slice(0, str.indexOf(" "));
	set = set.trim();

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
		if (!attrs.includes("class")) attrs += ` class="${item}"`;
		else attrs = attrs.replace(`class="`, `class="${item} `);
	});

	// split attributes
	attrs = attrs.trim().split(/['"] /);
	attrs = attrs.map(item => item.replace(/['"]/g, "").split("="));

	// insert element
	return insertElement(tag || "div", value, attrs, ref, mode);
}


function inline(str, ref = "default", modex = "after") {
	// get value
	let value = getValue(str);

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


function remTabs(string) {
	// remove "//..."
	let text = string.replace(/\/\/ [\wА-яЁё\t ~:;.,!?@#$%^&<>()\[\]{}_+|'"\-=№*\/\\]*/g, "");

	// remove "/*...*/"
	text = text.replace(/\/\*[^*]*\*\//g, "");

	// remove empty lines
	text = text.split(/\n/).filter(item => item.trim());

	// remove tabs
	let tabs = [];
	text = text.map(item => {
		let regex = /	/g,
				temp = item.match(regex);
		tabs.push(temp ? temp.length : 0);
		return item.replace(regex, "");
	});

	return [text, tabs];
}


function buildPug(target) {
	// remove tabs
	let [text, tabs] = remTabs(target);

	// create elements
	let [ref, extra] = [document.body, []];

	for (let i = Math.max(...tabs) + 1; i--;) extra.push([]);

	text.map((string, i) => {
		if (tabs[i] !== tabs[i-1]) {
			if (!tabs[i]) ref = document.body;
			else ref = extra[tabs[i] - 1][extra[tabs[i] - 1].length - 1];

			extra[tabs[i]].push(inline(string, ref, "in"));
		}
		else inline(string, ref, "in");
	});

	return extra[0][0];
}


function buildSass(target) {
	// remove tabs
	let [text, tabs] = remTabs(target);

	// insertion
	let list = [];

	function insert(array, index) {
		let temp = array[index];
		for (let i = index; i--;) temp = temp.replace("&", array[i]);
		return temp;
	}

	text = text.map((str, i) => {
		if (str.includes("&") || (str.search(/\w+/gi) !== -1 && !tabs[i])) {
			if (tabs[i] > list.length-1) list.push(str);
			else list[tabs[i]] = str;
			str = insert(list, tabs[i]);
			tabs[i] = true;
		}
		else if (!tabs[i]) tabs[i] = true;
		else tabs[i] = false;

		return str;
	});
	
	// minification
	text = text.map((item, i) => tabs[i] ? `}${item}{` : `${item};`);
	text = text.join("").slice(1) + "}";
	text = text.replace(/: /g, ":").replace(/, /g, ",").replace(/;}/g, "}").replace(/[ .-\w\d]+{}/g, "");
	return text;
}


function render(pug, sass) {
	crEl(`style(type=text/css) ${buildSass(sass)}`, document.head, "in");
	return buildPug(pug);
}


function postRender() {
	setTimeout(() => render(pug, sass), 0);
}