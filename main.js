let navList = $('nav li')
let index
let n = 0
let imgUrl = ['/images/macbook.png', 'images/mackookpro.png', 'images/imac.png', 'images/imcpro.png']
let titles = [{ 'h2': 'MacBook Air', 'h1': '轻轻地，再次倾心。' }, { 'h2': 'MacBook Pro', 'h1': '更强劲的，更专业的。' }, { 'h2': 'iMac', 'h1': '外形过分，实力过分。' }, { 'h2': 'iMac Pro', 'h1': '强大，大有专业风范。' }]
for (let i = 0; i < imgUrl.length; i++) {
    $('.window .imgs').append(`<a> <img src='${imgUrl[i]}'>`)
}

let pageWdith = $(window).width()
changeWidth()
makeFakeSlides()

$('.window .imgs').css({
    transform: `translateX(-${1 * pageWdith}px)`,

})

$('nav ul').on('click', 'li', (e) => {
    let index = $(e.currentTarget).index()
    if (n === imgUrl.length - 1 && index === 0) {
        $('.window .imgs').css({
            transform: `translateX(-${(imgUrl.length + 1) * pageWdith}px)`,
        })
            .one('transitionend', () => {
                $('.window .imgs').hide()
                    .offset()
                $('.window .imgs').css({
                    transform: `translateX(-${pageWdith}px)`,
                })
                    .show()
            })
        $('section h1').text(titles[0].h1)
        $('section h2').text(titles[0].h2)
    } else if (n === 0 && index === imgUrl.length - 1) {
        $('.window .imgs').css({
            transform: `translateX(0px)`,
        })
            .one('transitionend', () => {
                $('.window .imgs').hide()
                    .offset()
                $('.window .imgs').css({
                    transform: `translateX(-${(index + 1) * pageWdith}px)`,
                })
                    .show()
            })
        $('section h1').text(titles[imgUrl.length - 1].h1)
        $('section h2').text(titles[imgUrl.length - 1].h2)

    } else {
        $('.window .imgs').css({
            transform: `translateX(-${(index + 1) * pageWdith}px)`,
        })
        $('section h1').text(titles[index].h1)
        $('section h2').text(titles[index].h2)
    }
    n = index
})

function changeWidth() {
    $('.window').css({
        width: pageWdith + 'px'
    })

    $('.window a img').css({
        width: pageWdith + 'px'
    })
}

function makeFakeSlides() {
    let $lastImg = $('.window .imgs a').eq(0).clone(true)
    let $firstImg = $('.window .imgs a').eq(imgUrl.length - 1).clone(true)
    $('.window .imgs').append($lastImg)
    $('.window .imgs').prepend($firstImg)
}