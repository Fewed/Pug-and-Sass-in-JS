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
