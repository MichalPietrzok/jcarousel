//render navigation
const createNavigation = (props) => {
	const carouselNav = document.createElement('div');
	carouselNav.classList.add('j-carousel-nav');
	carouselNav.innerHTML = `
		<button id="j-carousel-prev" class="j-carousel__button">
			${props.navigationText[0]}
		</button>
		<button id="j-carousel-next" class="j-carousel__button">
			${props.navigationText[1]}
		</button>
	`;
	return carouselNav;
}

const getNumericData = data =>
	Number(data.replace(/[^-0-9]/gim, ''));

const getAbsoluteNumber = num =>
	Math.floor(getNumericData(num));

const slideCondition = (dest, props) => {
	if (props.loop === false && dest === 'next') return props.counterLimit < props.counter
	else if (props.loop === false && dest === 'prev') return props.counter < 0
	return true
}

const getCounterValue = (destination, props) =>
	destination === 'next' ? props.counter-- : props.counter++

const changeSlidePos = (dest, element, props) => {
	getCounterValue(dest, props);
	if (dest == 'next') return getAbsoluteNumber(element.style.left) - Math.floor(props.slideSize)
	else if (dest == 'prev') return getAbsoluteNumber(element.style.left) + Math.floor(props.slideSize)
}
const carouselMove = (targetStyle, value) =>
	targetStyle.style.left = value

const carouselReset = (targetStyle, dest, props) => {
	if (props.reverse) {
		if (dest == 'next') {
			targetStyle.style.left = '0px'
			props.counter = 0
		} else {
			targetStyle.style.left = `-${(Math.floor(props.slideSize) * props.itemsLength) - (Math.floor(props.slideSize) * props.carouselWidth)}px`
			props.counter = props.counterLimit
		}
	}
}

const jCarouselSlide = (props, dest, drag = false) => {
	if (slideCondition(dest, props)) {
		carouselMove(elt('.j-carousel-line'), `${changeSlidePos(dest, elt('.j-carousel-line'), props)}px`)
	} else {
		!drag ? carouselReset(elt('.j-carousel-line'), dest, props) : false
	}
}