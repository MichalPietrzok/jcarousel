//base functions
const elt = (element) => 
	document.querySelector(element)

const elts = (elements) =>
	document.querySelectorAll(elements)

const addClass = (element, eltClass = '') =>
	element ?  element.classList.add(eltClass) : false

const addClasses = (elements, eltsClass, n = elements.length - 1) => {
	addClass(elements[n], eltsClass);
	return n == 0 ? false : addClasses(elements, eltsClass, n - 1)
}

const delElt = (targetElt) =>
	targetElt.parentNode.removeChild(targetElt)

const addTag = (tag, tagClass) => {
	let currentTag = document.createElement(tag);
	currentTag.classList.add(tagClass);
	return currentTag;
}

const cloneElt = (element) => 
	elt(element).cloneNode(true)

const addHtml = (element, htmlContain) => 
	elt(element).innerHTML = htmlContain
//-------------------------------------------------------
if(elt('#j-carousel')) {
	addClass(elt('#j-carousel'), 'j-carousel')
	addClass(elt('#j-carousel > div'), 'j-carousel-line')
	elt('#j-carousel').appendChild(addTag('div', 'j-carousel-wrap'))
	elt('.j-carousel-wrap').appendChild(cloneElt('.j-carousel-line'))
	delElt(elt('#j-carousel > div'))
	addClasses(elts('.j-carousel-line  > div'),'j-carousel__item')
}