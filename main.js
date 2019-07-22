let navList = $('nav li')
let index
let n = 0
let imgUrl = ['./images/macbook.png', './images/mackookpro.png', './images/imac.png', './images/imcpro.png']
let titles = [{ 'h2': 'MacBook Air', 'h1': '轻轻地，再次倾心。' }, { 'h2': 'MacBook Pro', 'h1': '更强劲的，更专业的。' }, { 'h2': 'iMac', 'h1': '外形过分，实力过分。' }, { 'h2': 'iMac Pro', 'h1': '强大，大有专业风范。' }]
for (let i = 0; i < imgUrl.length; i++) {
    $('.window .imgs').append(`<a> <img src='${imgUrl[i]}'>`)
}

let pageWdith = $(window).width()
initialWidth()
changeWidth()
makeFakeSlides()
initiaTransform(0)

$('nav ul').on('click', 'li', (e) => {
    let index = $(e.currentTarget).index()
    if (n === imgUrl.length - 1 && index === 0) {
        changeTransform(imgUrl.length + 1, index)
        changeTitle(titles[0])
    } else if (n === 0 && index === imgUrl.length - 1) {
        changeTransform(0, index)
        changeTitle(titles[imgUrl.length - 1])
    } else {
        initiaTransform(index)
        changeTitle(titles[index])
        changeWidth(index)
    }
    n = index
})

function initiaTransform(index) {
    $('.window .imgs').css({
        transform: `translateX(-${(index + 1) * pageWdith}px)`,
    })
}

function initialWidth() {
    $('.window').css({
        width: pageWdith + 'px'
    })

    $('.window a img').css({
        width: pageWdith + 'px'
    })
}

function changeWidth(index) {
    $(window).resize(() => {
        if (n === 0) {
            pageWdith = $(window).width()
            initialWidth()
            $('.window .imgs').css({
                transform: `translateX(-${pageWdith}px)`,
            })
        } else {

            pageWdith = $(window).width()
            initialWidth()
            $('.window .imgs').css({
                transform: `translateX(-${(index + 1) * pageWdith}px)`,
            })
        }
    })
}

function makeFakeSlides() {
    let $lastImg = $('.window .imgs a').eq(0).clone(true)
    let $firstImg = $('.window .imgs a').eq(imgUrl.length - 1).clone(true)
    $('.window .imgs').append($lastImg)
    $('.window .imgs').prepend($firstImg)
}

function changeTitle(titlesLength) {
    $('section h1').text(titlesLength.h1)
    $('section h2').text(titlesLength.h2)
}

function changeTransform(moveNumber, index) {
    $('.window .imgs').css({
        transform: `translateX(-${(moveNumber) * pageWdith}px)`,
    })
        .one('transitionend', () => {
            $('.window .imgs').hide()
                .offset()
            $('.window .imgs').css({
                transform: `translateX(-${(index + 1) * pageWdith}px)`,
            })
                .show()
        })
}