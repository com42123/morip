;(function($,window,document,undefined){


    var jason = {
        init:   function(){
            var that = this;

            that.heaerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();

        },
        heaerFn:function(){
            var that = null;
            var $window = $(window);            
            var $heaer = $('#header');
            var $scroll = false;
            var t = false;

                $heaer.on({                    
                    mouseenter:function(){
                        that = $(this);
                        that.addClass('addHeader'); 
                    },
                    mouseleave:function(){
                        that = $(this);
                        if( $scroll === false ){
                            that.removeClass('addHeader'); 
                        }
                    }
                });


                $window.scroll(function(){
                    that = $(this);
                    if( that.scrollTop() >= 30 ){
                        $scroll = true;  //스크롤 10px 이상인경우 true 변경
                        $heaer.addClass('addHeader');
                        if( t===false ){
                            t=true;
                            var headerH = $('#header').height();
                            $('html,body').stop().animate({scrollTop:$('#section2').offset().top-headerH},600,'easeInOutExpo');
                        }
                        
                    }
                    else{
                        t=false;
                        $scroll = false;  //스크롤 10px 이하인경우 false 변경
                        $heaer.removeClass('addHeader');
                    }
                });

        },
        section1Fn:function(){
            var cnt = 0;
            var n = $('.slide').length-2; //4
            var $nextBtn = $('.next-btn');
            var $prevBtn = $('.prev-btn');
            var $slideWrap = $('.slide-wrap');
            var setId = null;
            var setId2 = null;
            var $second = 5; //4초 간격
            var tCnt = 0; 

            
            
            /////////// slide ////////////////////////////////////////////////////////

            //메인 슬라이드 함수
            function mainSlideFn(){               
                $slideWrap.stop().animate({left:-(100*cnt)+'%'},600, function(){
                    if(cnt>n-1){cnt=0;} //n개인경우 = n-1
                    if(cnt<0){cnt=n-1;} 
                    $slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                });
                //페이지버튼 함수 호출(매개변수)
                pageBtnFn(cnt);
            }

            //페이지 버튼(인디세이터 버튼) 이벤트 함수
            function pageBtnFn(z){
                z==n?z=0:z;     //n(4)
                z==-1?z=n-1:z;  //3=n(4)-1
                $('.page-btn').removeClass('addCurrent');
                $('.page-btn').eq(z).addClass('addCurrent');
            }

            //다음 슬라이드 카운트 함수
            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            //이전 슬라이드 카운트 함수
            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            //자동 플레이
            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*$second);
            }

            //버튼 이벤트 발생시 타이머 콘트롤 함수
            function timerFn(){
                tCnt=0;
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    tCnt++; //1초에 1씩증가 1 2 3 4 5
                    if(tCnt>$second){ //4초 후에
                        clearInterval(setId2);
                        nextCountFn();
                        autoTimerFn();
                    }
                },1000);
            }

            //페이지 버튼 이벤트
            $('.page-btn').each(function(index){
                $(this).on({
                    click:function(event){
                        event.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        cnt = index;
                        mainSlideFn();
                    }
                });
            });
                
            //다음 슬라이드 버튼 클릭 이벤트
            $nextBtn.on({
                click:  function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                }
            });

            //이전 슬라이드 버튼 클릭 이벤트
            $prevBtn.on({
                click:  function(event){
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });

            //터치 스와이프 이벤트
            $('#section1').swipe({
                swipeLeft:  function(event){ //다음 슬라이드
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                   if(!$slideWrap.is(':animated')){
                        nextCountFn();
                   } 
                },
                swipeRight:  function(event){ //이전 슬라이드
                    event.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if(!$slideWrap.is(':animated')){                    
                        prevCountFn();
                    }
                }
            });



            setTimeout(autoTimerFn,10);


            /////////// smooth button ////////////////////////////////////////////////
            $('.smooth-btn').on({
                click:  function(e){
                    e.preventDefault();
                    var headerH = $('#header').height();
                    var url = $(this).attr('href');
                        $('html,body').stop().animate({ scrollTop:$( url ).offset().top-headerH },600,'easeInOutExpo');
                }
            });
                       

            /////////// resize ////////////////////////////////////////////////
            var winW = $(window).width();
            var winH = $(window).height();
                
                //여기서부터 식사하고 진행...
                function resizeFn(){
                    winW = $(window).width(); //리얼하게 너비
                    winH = $(window).height();//리얼하게 높이                    
                    $('#section1').css({ height:winH }); //리얼하게 적용
                    $('#section2').css({ marginTop:winH }); //리얼하게 적용
                    $('.slide').css({ width:winW });  //리얼하게 적요
                }
                setTimeout(resizeFn,10);

                $(window).resize(function(){
                    resizeFn();
                });




        },
        section2Fn:function(){

            var $win = $(window);
            var $gal = $('.gallery li');
            var $galW = $('.gallery li').width();
            var $galH =  $galW * 0.832468967;

                function resizeFn(){
                    $galW = $('.gallery li').width(); //칸 너비
                    $galH =  $galW * 0.832468967; //칸 높이 비율계산                  
                    $gal.css({height:$galH});
                }

                setTimeout(resizeFn,10);

                $win.resize(function(){
                    resizeFn();
                });
        },
        
        section3Fn:function(){

        },
        section4Fn:function(){

        },
        section5Fn:function(){

        }
    };

    jason.init();


})(jQuery,window,document);