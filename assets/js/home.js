var winWT = $(window).innerWidth();
$(document).ready(function () {

    var owl = $('.bannerHld').owlCarousel({
        animateOut: 'fadeOut',
        autoplay: true,
        loop: true,
        lazyLoad: true,
        items: 1,
        margin: 0,
        stagePadding: 0,
        smartSpeed: 1300,
        autoplayTimeout: 8000,
        dots: true,
        navigation: false,
        mouseDrag: false,
        pagination: false,
        autoHeight:true
    });


    function onSlideChange() {
        TweenMax.set('.bannerDet .overlay', { width: 0 });
        TweenMax.set('.bannerDet span', { opacity: 0, top: '60px' });
        TweenMax.set('.knowMoreBtn', { opacity: 1, y: 10 });

        TweenMax.killTweensOf('#slider_holder .owl-stage-outer img');
        setTimeout(function () {
            var currAnim = $('#slider_holder .owl-stage-outer .active');
            TweenMax.staggerTo(currAnim.find('.bannerDet .overlay'), 0.7, {
                width: '100%',
                ease: Sine.easeOut,
                onComplete: function () {
                    TweenMax.set(currAnim.find('.bannerDet span'), { opacity: 1, });
                    TweenMax.staggerTo(currAnim.find('.bannerDet span'), 0.7, {
                        top: 0,
                        ease: Sine.easeOut,
                        onComplete: function () {
                            TweenMax.to(currAnim.find('.knowMoreBtn'), 0.5, { opacity: 1, y: 0, ease: Sine.easeOut });
                        }
                    }, 0.1);
                }
            }, 0.2);


            TweenMax.killTweensOf(currAnim.find('img'));
            //TweenMax.set(currAnim.find('img'), { scale: 1, opacity: 1 });
            //TweenMax.to(currAnim.find('img'), 0.5, { opacity: 1, ease: Sine.easeOut });
            //TweenMax.to(currAnim.find('img'), 25, { scale: 1.1, ease: Sine.easeOut });

        }, 10);
    }
    onSlideChange();

    owl.on('changed.owl.carousel', onSlideChange);

    owl.on('translated.owl.carousel', function (event) {
        var notActiveSlide = $('.carouselCon .owl-item').not('.active');
        TweenMax.set(notActiveSlide.find('img'), { opacity: 0 });

    });

    $('.mouse_icon').bind('click', function(){
        $("html, body").animate({ scrollTop:($('#application').offset().top - 70) }, {duration:1200});
    });

    /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    var tilesGroup;
    var tilesArr = $('.tilesCon .tiles');
    var item;
    tilesArr.remove();

    if (isMobile.iPad()) {
        tilesGroup = 6;
    } else if (isMobile.any() && winWT >= 900) {
        tilesGroup = 6;
    } else if (isMobile.any() && winWT < 900) {
        tilesGroup = 4;
    } else {
        tilesGroup = 6;
    }

    for (var i = 0; i < tilesArr.length; i++) {
        var htmlStr = tilesArr[i];

        if ((i % tilesGroup) == 0) {
            item = $('<div class="item"></div>')
            $('.tilesCon').append(item);
        }

        item.append($(htmlStr));

    }

    $('.tilesCon').owlCarousel({
        autoplay: false,
        loop: false,
        items: 1,
        margin: 15,
        stagePadding: 0,
        smartSpeed: 1300,
        autoplayTimeout: 8000,
        dots: true,
        navigation: false,
        mouseDrag: false,
        pagination: false
    });

    var tilesPagination = $('.tilesCon').find('.owl-dot');
    tilesPagination.each(function () {
        $(this).children('span').text($(this).index() + 1);
    });


    $('.counter').counterUp({
        delay: 8,
        time: 1000
    });

    TweenMax.set('.unitIconCon', { scale:0.6,opacity:0,y:30});

    $('#counterHolder').waypoint(function() {
        TweenMax.staggerTo('.unitIconCon',0.5, { scale: 1, opacity:1, y: 0, ease: Sine.easeInOut}, 0.2);
    }, {offset:'80%'});

   

    setCubeRolloverEffect();

    if (winWT <= 1023) {
        var brandList = $('#top_brands').find('li');
        $(brandList).addClass('item');
        $('#top_brands ul').owlCarousel({
            autoplay: false,
            loop: false,
            items: 3,
            margin: 0,
            stagePadding: 0,
            smartSpeed: 800,
            autoplayTimeout: 5000,
            dots: true,
            navigation: false,
            mouseDrag: true,
            pagination: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                }
            }
        });

        $('#subsidiaries').find('li').addClass('item');

        $('#subsidiaries ul').owlCarousel({
            autoplay: false,
            loop: false,
            items: 3,
            margin: 0,
            stagePadding: 0,
            smartSpeed: 800,
            autoplayTimeout: 5000,
            dots: true,
            navigation: false,
            mouseDrag: true,
            pagination: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                680: {
                    items: 3
                }
            }
        });




    }

    if(isMobile.InternetExplorer){
		$('svg').css({'display':'none'});
	}


});

function setCubeRolloverEffect() {
    function set3dEffect() {
        var cubeHeight, halfCubeHeight;

        $('.tilesCon .tile_front_face, .tilesCon .tile_back_face').addClass('cubeInnerShadow');

        function onResize() {
            cubeHeight = $('.tilesCon .tiles').height();
            halfCubeHeight = cubeHeight / 2;
            TweenMax.set('.tilesCon .tiles', { perspective: '500px', verticalAlign: 'top' });
            TweenMax.set('.tilesCon .cube', { height: cubeHeight, transformStyle: 'preserve-3d' });
            TweenMax.set('.tilesCon .tile_front_face,.tilesCon .tile_back_face', { height: cubeHeight });
            TweenMax.set('.tilesCon .tile_back_face', { display: 'block' });

        }
        $(window).resize(onResize);
        onResize();
        var cubeParent = $('.tilesCon .tiles');
        cubeParent.hover(function (e) {
            var cube = $(this).find('.cube');
            var data = $(this).data();
            if (e.type == 'mouseenter') {
                var speed = 0.8;
                TweenMax.killTweensOf(cube);
                TweenMax.to(cube, speed, { rotationX: 90, y: -halfCubeHeight, ease: Sine.easeInOut });
                TweenMax.to(cube, speed / 2, { z: -150, ease: Sine.easeOut });
                TweenMax.to(cube, speed / 2, { z: -halfCubeHeight, ease: Sine.easeIn, delay: speed / 2 });
                if (data.rollOverFun) {
                    data.rollOverFun();
                }
            }
            if (e.type == 'mouseleave') {
                var speed = 0.8;
                TweenMax.killTweensOf(cube);
                TweenMax.to(cube, speed, { rotationX: 0, y: 0, ease: Sine.easeInOut });
                TweenMax.to(cube, speed, { z: 0, ease: Sine.easeIn });
                if (data.rollOutFun) {
                    data.rollOutFun();
                }
            }
        });
        TweenMax.set('.tile_back_face', { y: -halfCubeHeight, z: -halfCubeHeight, rotationX: -90 });


        function createAnimDivForHoverEffect(obj) {
            var tilesHolder = $(obj.id);
            var backface = tilesHolder.find('.tile_back_face');
            backface.css({ background: '#ffffff', overflow: 'hidden' });
            var animDiv = $('<div class="animDiv"></div>');
            backface.prepend(animDiv);
            obj.tilesHolder = tilesHolder;
            obj.animDiv = animDiv;
            return obj;
        }

        function setOverOutFun(obj) {
            function startDropAnim() {
                obj.tl.timeScale(1);
                obj.tl.play();
            }

            function stopDropAnim() {
                obj.tl.timeScale(2);
                obj.tl.reverse();
            }
            if (obj.startDropAnim != undefined) {
                obj.tilesHolder.data("rollOverFun", obj.startDropAnim);
                obj.tilesHolder.data("rollOutFun", obj.stopDropAnim);
            } else {
                obj.tilesHolder.data("rollOverFun", startDropAnim);
                obj.tilesHolder.data("rollOutFun", stopDropAnim);
            }
        }

       



       


    }


    function set2dEffect() {
        var cubeHeight, halfCubeHeight;

        function onResize() {
            cubeHeight = $('.tilesCon .tiles').height();
            halfCubeHeight = cubeHeight / 2;
            $('.tilesCon .cube').css({ height: cubeHeight + 'px', overflow: 'hidden' });
            $('.tilesCon .tile_front_face,.tilesCon .tile_back_face').css({ height: cubeHeight + 'px' });
            $('.tilesCon .tile_back_face').css({ display: 'block', position: 'relative' });

        }
        $(window).resize(onResize);
        onResize();
        var cubeParent = $('.tilesCon .tiles');
        cubeParent.hover(function (e) {
            var front = $(this).find('.cube .tile_front_face');
            if (e.type == 'mouseenter') {
                front.animate({
                    marginTop: -cubeHeight + 'px'
                }, 400);
            }
            if (e.type == 'mouseleave') {
                front.animate({
                    marginTop: '0px'
                }, 400);
            }
        })
        setBackgroundImageToBackface();
    }

    function setBackgroundImageToBackface() {
        var backFaces = $('.tilesCon .tile_back_face');
        backFaces.each(function (index) {
            data = $(this).data();
            if (data.background) {
                $(this).css({ background: data.background });
                if (data.backgroundSize) {
                    $(this).css({ backgroundSize: data.backgroundSize });
                }
            }
        });
    }

    function setMobileEffect() {
        TweenMax.set('.tilesCon .tile_front_face', { display: 'none' });
        TweenMax.set('.tilesCon .tile_back_face', { display: 'block' });
        $('.mobIcon').css({'display':'inline-block'});
        $('.exploe_con p').css({'display':'inline-block'});
    }

    function setCommonCSS() {
        var frontFaces = $('.tilesCon .tile_front_face');
        var backFacess = $('.tilesCon .tile_back_face');
        var face, back;
        var colorWhite = '#ffffff';
        var colorBlack = '#2d2d2d';
        var colorBlue = '#45359e';

        for (var i = 0; i < frontFaces.length; i++) {
            face = $(frontFaces[i]);
            back = $(backFacess[i]);
            var mod4 = i % 4;
            if (isMobile.iPad()) {
                if (mod4 == 0 || mod4 == 3) {
                    back.css({ background: colorBlue });
                    back.find('.exploe_con p').css({ color: colorWhite });
                } else {
                    back.css({ background: colorWhite });
                    back.find('.exploe_con p').css({ color: colorBlack });
                }
            } else if (isMobile.any() && winWT >= 900) {
                if (mod4 == 0 || mod4 == 3) {
                    back.css({ background: colorBlue });
                    back.find('.exploe_con p').css({ color: colorWhite });
                } else {
                    back.css({ background: colorWhite });
                    back.find('.exploe_con p').css({ color: colorBlack });
                }
            } else if (isMobile.any() && winWT < 900) {
                var plser;
                if (i % 8 <= 3) {
                    plser = 0;
                } else {
                    plser = 1;
                }

                if ((i + plser) % 2 == 0) {
                    back.css({ background: colorBlue });
                    back.find('.exploe_con p').css({ color: colorWhite });
                } else {
                    back.css({ background: colorWhite });
                    back.find('.exploe_con p').css({ color: colorBlack });
                }
                $('.tiles').css({ display: 'block', width: '100%' });
            } else {
                if (mod4 == 0 || mod4 == 3) {
                    face.css({ background: colorBlue });
                    face.find('.desc_con').css({ color: colorWhite });
                } else {
                    face.css({ background: colorWhite, color: colorBlue });
                    face.find('.desc_con').css({ color: colorBlack });
                }
            }

        }
    }
    setCommonCSS();
    if (isMobile.any()) {
        setMobileEffect();
    } else if (window.Modernizr && Modernizr.csstransforms3d && Modernizr.preserve3d) {
        set3dEffect();
    } else {
        set2dEffect();
    }
}
//Modernizr.csstransforms3d = false;

if (isMobile.any()) {
    $('#top_brands .front_face').css({ 'display': 'none' });
} else if (window.Modernizr && Modernizr.csstransforms3d && Modernizr.preserve3d) {
    document.write('<link href="assets/css/direction-reveal.css" rel="stylesheet" type="text/css">');
    document.write('<script type="text/javascript" src="assets/js/bundle.js"></script>');
} else {
    $('.direction-reveal__overlay').addClass('for_desk');
    $('#top_brands li').each(function () {
        $(this).hover(
            function () {
                TweenMax.to($(this).find('.direction-reveal__overlay'), 0.5, { top: 0, ease: Sine.easeOut }, 'startPoint')
            },
            function () {
                TweenMax.to($(this).find('.direction-reveal__overlay'), 0.5, { top: '100%', ease: Sine.easeOut }, 'startPoint')
            }
        );
    });
}
