const compose = (...fns) => arg => fns.reduce((composed, f) => f(composed), arg)

const getCurrentWidth = display => display > 992 ?
	'desctop' : display <= 992 && display > 767 ? 'tablet' : 'mobile';

const jCarouselParams = obj =>
	Object.assign(obj, {
		linePosition: elt('.j-carousel-line').style.left,
		slideSize: elt('#j-carousel').offsetWidth / obj.amountItems[getCurrentWidth(document.body.offsetWidth)],
		itemsLength: elts('.j-carousel-line  > div').length,
		lineSize: elt('#j-carousel').offsetWidth / obj.amountItems[getCurrentWidth(document.body.offsetWidth)] * elts('.j-carousel-line  > div').length,
		counter: 0,
		counterLimit: (elts('.j-carousel-line  > div').length - obj.amountItems[getCurrentWidth(document.body.offsetWidth)]) * -1,
		navigationText: obj.navigationText,
		carouselWidth: obj.amountItems[getCurrentWidth(document.body.offsetWidth)],
		slideReady: false,
		clickPoint: 0
	})



const createCarousel = compose(
	jCarouselParams,
	createNavigation
)

const jActivateCarousel = (props) => {
	if (elt('#j-carousel') != null) {
		jStylingCarousel(jCarouselParams(props));
		elt('#j-carousel').appendChild(createCarousel(props));
		//bind functions on buttons
		elt('#j-carousel-prev').addEventListener('click', () => jCarouselSlide(props, 'prev'));
		elt('#j-carousel-next').addEventListener('click', () => jCarouselSlide(props, 'next'));
		//mouseDrag
		const changeReady = val => props.slideReady = val
		const getXData = val => props.clickPoint = val
		const dragCarousel = (e, xKind) => {
			if (props.slideReady && props.dragDrop) {
				changeReady(false)
				xKind - props.clickPoint > 0 ?
					jCarouselSlide(props, 'prev', true) : jCarouselSlide(props, 'next', true)
			}
		}
		const prepToSlide = e => {
			changeReady(true)
			getXData(e)
		}

		elt('.j-carousel-line').addEventListener('mousedown', e => prepToSlide(e.clientX))
		elt('.j-carousel-line').addEventListener('mousemove', e => dragCarousel(e, e.clientX))
		elt('.j-carousel-line').addEventListener('mouseup', () => changeReady(false))

		elt('.j-carousel-line').addEventListener('touchstart', e => prepToSlide(e.changedTouches[0].pageX))
		elt('.j-carousel-line').addEventListener('touchmove', e => dragCarousel(e, e.changedTouches[0].pageX))

		window.addEventListener('resize', () => jStylingCarousel(jCarouselParams(props)));
	}
}

