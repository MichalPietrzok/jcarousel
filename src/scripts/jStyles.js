const addCarouselStyles = (elements, obj) => {
	Object.keys(obj).map(item => {
		if (!elements.length) elements.style[item] = obj[item]
		else Array.from(elements).map(element => element.style[item] = obj[item])
	})
}

const jStylingCarousel = (props) => {
	addCarouselStyles(elt('#j-carousel'), {
		width: '100%',
	})
	addCarouselStyles(elt('.j-carousel-wrap'), {
		overflow: 'hidden'
	})
	addCarouselStyles(elt('.j-carousel-line'), {
		display: 'flex',
		width: props.lineSize + 'px',
		position: 'relative',
		transition: '.4s ease',
		left: '0'
	})
	addCarouselStyles(elts('.j-carousel-line  > div'), {
		width: props.slideSize + 'px'
	})
}
