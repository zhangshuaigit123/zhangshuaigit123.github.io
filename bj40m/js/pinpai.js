 $(function () {

     //预加载
     var loader = new resLoader({
         baseUrl: "http://www.baicmotorsales.com/pc/wap/new_h5/img/",
         resources: [
             'H5-mp3.mp3', 'vedio1.mp4',

         ],
         baseUrl: "img/",
         resources: [
             'banner.jpg',
             'title.png',
             '1961.png',
             '1966.png',
             '2007.png',
             '2013.png',
             '2015.png',
             '2016_1.png',
             '2016_2.png',
             '2016_3.png',
             '2017_1.png',
             '2017_2.png',
             '2017_3.png',
             '2017_4.png',
             '2017_5.png',
             '2017_6.png',
             '2017_7.png',
             '2017_8.png',
             '2017_9.png',
             '2017_10.png',
             '2018.png',
             'titlebtm.png'
         ],

         onStart: function (total) {
             //  console.log('start:' + total);
         },
         onProgress: function (current, total) {
             //  console.log(current + '/' + total);
             var percent = parseInt(current / total * 100);
             $('.process').text("[" + percent + "%]");
             $('body').css('overflow', 'hidden');
             //  console.log(percent)
             if (percent == 100) {
                 playMove();
             }
         },
         onComplete: function (total) {
             $('.process').fadeOut();
         }
     });

     loader.start();

     function playMove() {
         $('.ppLayer').hide();
         $('body').css('overflow', 'auto');
         $('.yueye').addClass('yueyeText');
         $('.bannerBottom').addClass('bannerMove');
         $('.ddText').addClass('ddMove');
         $('.bSpanText').addClass('spanMove');
         $('.bEmText').addClass('emMove');
         $('.bIText').addClass('iMove');
         $('.ppContentBox dl:eq(0) dd').addClass('imgMove');
         $('.ppContentBox dl:eq(0) dt em').addClass('numMove');
         $('.ppContentBox dl:eq(0) dt span').addClass('titleMove');
         $('.ppContentBox dl:eq(0) dt div').addClass('textMove');
     }
     var ppNum = 0;
     $(document).scrollTop(0);
     $(document).on('scroll', function () {
         var thisScrollTop = $(this).scrollTop();
         if (thisScrollTop >= 8100) {
             $('.ppContinuesPic').addClass('yueyeText');
         }
         console.log(thisScrollTop)
         if (ppNum ==20){
             $('.ppContentBox dl:eq(' + ppNum + ') dd').addClass('imgMove2');
             $('.ppContentBox dl:eq(' + ppNum + ') dt em').addClass('numMove2');
             $('.ppContentBox dl:eq(' + ppNum + ') dt span').addClass('titleMove2');
             $('.ppContentBox dl:eq(' + ppNum + ') dt div').addClass('textMove2');
             ppNum++;
         }else if (thisScrollTop > 380 * ppNum + 100) {
                 $('.ppContentBox dl:eq(' + ppNum + ') dd').addClass('imgMove2');
                 $('.ppContentBox dl:eq(' + ppNum + ') dt em').addClass('numMove2');
                 $('.ppContentBox dl:eq(' + ppNum + ') dt span').addClass('titleMove2');
                 $('.ppContentBox dl:eq(' + ppNum + ') dt div').addClass('textMove2');
                 ppNum++;
         }     
        
     });
 });