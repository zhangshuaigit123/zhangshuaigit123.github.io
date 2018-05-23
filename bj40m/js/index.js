(function ($) {
    $.fn.myTab = function (a, b, c, d, e) {
        //这里的this 指的是 jquery的一个数组 谁调用就是谁
        return this.each(function () {
            var $navLis = $(this).find('>' + a + '>' + b); //获取导航菜单的li数组
            var $conLis = $(this).find('>' + e + '>' + c + '>' + b);
            //初始化 下面这三行可以封装成一个方法
            $navLis.eq(0).addClass(d);
            $conLis.hide();
            $conLis.eq(0).show();
            $navLis.on('click', function () {
                $navLis.removeClass(d);
                $(this).addClass(d);
                var ind = $(this).index();
                $conLis.hide();
                $conLis.eq(ind).show();
            });
        });
    };
    // 颜色切换
    $.fn.carTab = function () {
        //这里的this 指的是 jquery的一个数组 谁调用就是谁
        return this.each(function () {
            var $navLis = $(this).find(">.choose_back>div"); //获取导航菜单的li数组
            var $conLis = $(this).find(">.imgbox>img");
            //初始化 下面这三行可以封装成一个方
            $navLis.find('>p').addClass("hide");
            $navLis.eq(0).find('>p').removeClass("hide");
            $conLis.css('display', 'none');
            $conLis.eq(0).show();
            $navLis.on('click', function () {
                $navLis.find('>p').addClass('hide');
                $(this).find('>p').removeClass('hide');
                var ind = $(this).index();
                $conLis.hide();
                $conLis.eq(ind).show();

            });
        });
    }
})(jQuery);
$(function () {
    // banner 数据获取
    $.get(data.url2 + "/jeesite/web/article/queryLinkList?id=215d578973184e81b9b911ba0b7deba3", function (response) {
        var bannerimg = response.body.data.list;
        $('#bannerbox').html('');
        var html = '';
        $.each(bannerimg, function (i, j) {

            //i为元素的索引，从0开始,j为当前处的元素对象
            var bannerurl = data.url2 + bannerimg[i].image;
            html += '<div class="swiper-slide"> <img src = ' + bannerurl + '></div>'
            $('#bannerbox').html(html)
        });

        // var bannerurl = data.url2 + response.body.data.list[0].image;
        // $(".banner1").attr("src", bannerurl);
        var mySwiper = new Swiper('.swiper-banner', {
            loop: true,
            autoplay: true,
            observer: true,
            observeParents: true,
            autoplay: {
                disableOnInteraction: false
            }
        })
    });
    // 车型

    var url = data.url2;
    $.get(data.url2 + "/jeesite/web/article/queryCarInfoList?carTypeSite=BJ40&carSiteSeries", function (data) {
        var datalist = data.body.data;
        var datalist2 = data.body.data;
        for (var i = 0; i < datalist.length; i++) {
            datalist[i].url = url;
        }
        for (var i = 0; i < datalist2.length; i++) {
            datalist2[i].url = url;
        }
        var imgColor = data.body.data;
        $('.imgColor1').html('');
        $("#imgColor1").tmpl({
            imgC: imgColor
        }).appendTo('.imgColor1');
        $(".changeColorbox").myTab('ul', 'li', 'ol', 'changeColor', '#carbox') //车型调用
        $(".carcon").carTab()
    });
    //王者风采    
    var mySwiper = new Swiper('.swiper-king', {
        loop: true,
        autoplay: true,
        observer: true,
        observeParents: true,
        autoplay: {
            disableOnInteraction: false
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    })

    // 车型配置
    //车型配置渲染数据 选型卡
    function carpeizhi(series, id) {
        $.get(data.url2 + "/jeesite/web/car/queryCarSiteModelParam?carTypeSite=BJ40&carSiteSeries=" + series + "&modelId=" + id, function (data) {
            var arr = [];
            $(".price_listcontentbox").html("");
            $("#jiage_peizhi1").tmpl({
                list1: data.body.data[0].t1,
                list2: data.body.data[0].t2,
                list3: data.body.data[0].t3,
                list4: data.body.data[0].t4,
                list5: data.body.data[0].t5,
                list6: data.body.data[0].t6,
                list7: data.body.data[0].t7,

            }).appendTo('.price_listcontentbox');
            $(".price_listR").click(function () {
                $(this).toggleClass("price_listR2");
                $(this).parent().next().toggleClass("price_list2_content2")

            })


        })
        var url = data.url2;
        $.get(data.url2 + '/jeesite/web/car/queryCarSiteModelParam?carTypeSite=BJ40&carSiteSeries=' + series, function (data) {
            $(".moni2").html("")
            $("#jiage_peizhi").tmpl({
                list: data.body.data,
            }).appendTo('.moni2');

            $(".cite").unbind("click").click(function () {
                var ul = $(".moni2");
                if (ul.css("display") == "none") {
                    ul.slideDown("fast");
                } else {
                    ul.slideUp("fast");
                }
            });
            var txt2 = $(".moniu").eq(0).text();
            $(".cite").html(txt2);

            $(".moniu").click(function () {
                $(".moniu").show();
                var txt = $(this).text();
                $(".cite").html(txt);
                $(this).parent().hide();

                $(".moni2").hide();
                var data_id = $(this).attr("data-id");

                $.get(url + "/jeesite/web/car/queryCarSiteModelParam?carTypeSite=BJ40&carSiteSeries=" + series + "&modelId=" + data_id, function (data) {

                    var arr = [];
                    $(".price_listcontentbox").html("");
                    $("#jiage_peizhi1").tmpl({
                        list1: data.body.data[0].t1,
                        list2: data.body.data[0].t2,
                        list3: data.body.data[0].t3,
                        list4: data.body.data[0].t4,
                        list5: data.body.data[0].t5,
                        list6: data.body.data[0].t6,
                        list7: data.body.data[0].t7,

                    }).appendTo('.price_listcontentbox');
                    $(".price_listR").click(function () {
                        $(this).toggleClass("price_listR2");
                        $(this).parent().next().toggleClass("price_list2_content2")

                    })
                })
            });
        });
    }
    carpeizhi("BJ40 PLUS", "8deaccb6af52455bb9afdce59920bdba");
    $("#peizhi ul li").click(function (e) {
        e.preventDefault();
        var index3 = $(this).index();
        $("#peizhi ul li").removeClass('changeColor');
        $(this).addClass('changeColor');
        if (index3 == 0) {
            $("#peizhi .carcon-img img").attr('src', './img/pzcar3.png');
            carpeizhi("BJ40 PLUS", "8deaccb6af52455bb9afdce59920bdba");
        } else if (index3 == 1) {
            $("#peizhi .carcon-img img").attr('src', './img/pzcar1.png');
            carpeizhi("BJ40经典版（两门）", "8690f798178344cbb0e3cbc5dfe49820");
        } else if (index3 == 2) {
            $("#peizhi .carcon-img img").attr('src', './img/pzcar2.png');
            carpeizhi("BJ40经典版（四门）", "1ab07f26377c4274b83abfb6725d6d64");
        }

    });
    var url = data.url2;
    // 精彩集锦图集
    $.get(data.url2 + "/jeesite/web/article/colofulList?colorfulplantform=wap&carTypeSite=BJ40&colorfultype=2", function (data) {
        var datalist = data.body.data;
        var datalist2 = data.body.videoList.list;
        for (var i = 0; i < datalist.length; i++) {
            datalist[i].url = url;
        }
        for (var i = 0; i < datalist2.length; i++) {
            datalist2[i].url = url;
        }
        $('.atlasbox').html('');
        $("#atlasbox").tmpl({
            atlas: data.body.videoList.list
        }).appendTo('.atlasbox');
        var mySwiper = new Swiper('.swiper-jincai', {
            loop: true,
            autoplay: true,
            observer: true,
            observeParents: true,
            autoplay: {
                disableOnInteraction: false
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        })
    });

    // 视屏

    $.get(data.url2 + "/jeesite/web/article/colofulList?colorfulplantform=wap&carTypeSite=BJ40&colorfultype=1", function (data) {
        var datalist = data.body.data;
        var datalist2 = data.body.videoList.list;
        for (var i = 0; i < datalist.length; i++) {
            datalist[i].url = url;
        }
        for (var i = 0; i < datalist2.length; i++) {
            datalist2[i].url = url;
        }
        $('.avideobox').html('');
        $("#avideobox").tmpl({
            videos: data.body.videoList.list
        }).appendTo('.avideobox');
        $('.play').click(function () {
            var video = document.getElementsByTagName("video");
            var index = $(this).index('.play');
            video[index].style.opacity = '1';
            video[index].style.width = "100%";
            video[index].style.height = "5rem";
            video[index].play();
            $(this).hide();
            $('.videotext').eq(index).hide();
            $('.spfm').eq(index).hide();
            // if (video[index].requestFullscreen) {
            //     video[index].requestFullscreen();
            // } else if (video[index].mozRequestFullScreen) {
            //     video[index].mozRequestFullScreen();
            // } else if (video[index].webkitRequestFullscreen) {
            //     video[index].webkitRequestFullscreen();
            // } else if (video[index].msRequestFullscreen) {
            //     video[index].msRequestFullscreen();
            // }

            video[index].onpause = function () {
                // alert(11)                  
                video = document.getElementsByTagName("video");
                video[index].style.opacity = '0';
                video[index].style.width = "0px";
                video[index].style.height = "0px";

                $('.spfm,.videotext,.play').show();
            }


        })

        var mySwiper = new Swiper('.swiper-sp', {
            // loop: true,
            autoplay: true,
            observer: true,
            observeParents: true,
            autoplay: {
                disableOnInteraction: false
            },
            // 如果需要前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next1',
                prevEl: '.swiper-button-prev1',
            },
            on: {
                slideChangeTransitionStart: function () {
                    var video = document.getElementsByTagName("video");
                    for (var i = 0; i < video.length; i++) {
                        // video[i].load();
                        video[i].pause();
                        video[i].style.opacity = '0';
                        video[i].style.width = "0px";
                        video[i].style.height = "0px";
                        $('.spfm,.videotext,.play').show();
                    }
                },
            }

        })

    });











    // 媒体新闻
    function mediaNew(params) {
        $.get(data.url2 + params, function (data) {
            var datalist = data.body.data;
            var datalist2 = data.body.data.list;
            for (var i = 0; i < datalist.length; i++) {
                datalist[i].url = url;
            }
            for (var i = 0; i < datalist2.length; i++) {
                datalist2[i].url = url;
            }
            $('.mediaNews').html('');
            $("#mediaNews").tmpl({
                News: data.body.data.list
            }).appendTo('.mediaNews');
            var mySwiper = new Swiper('.swiper-meiti', {
                // loop: true,
                autoplay: true,
                observer: true,
                observeParents: true,
                autoplay: {
                    disableOnInteraction: false
                },
                // 如果需要前进后退按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            })
        });

    }
    mediaNew('/jeesite/web/article/queryLinkList?id=eadaa58514934a5eb47bad76314cecdc');
    $('#mediaNew ul li').on('click', function (e) {
        e.preventDefault();
        var aIndex = $(this).index();
        $("#mediaNew ul li").removeClass('changeColor');
        $(this).addClass('changeColor');
        if (aIndex == 0) {
            mediaNew('/jeesite/web/article/queryLinkList?id=eadaa58514934a5eb47bad76314cecdc');
        } else if (aIndex == 1) {

            mediaNew('/jeesite/web/article/queryLinkList?id=f432505943bf42e0b02f82474f5c8f65');
        } else if (aIndex == 2) {

            mediaNew('/jeesite/web/article/queryLinkList?id=bce1fd8d6e5d41969cd414e7778874e5');
        }
    })
    //快速预约
    //获取url字段
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg); //匹配目标参数
        if (r != null) return decodeURIComponent(encodeURIComponent(decodeURIComponent(r[2])));
        return null; //返回参数值
    }

    //验证字符串是否为手机号码格式
    function validateMobile(mobile) {
        var myreg = /^1(3|4|5|7|8)\d{9}$/;
        if (!myreg.test(mobile)) {
            return false;
        }
    }
    // 弹窗函数
    function baocuo(text) {
        layer.open({
            type: 1,
            skin: 'alertc', //样式类名
            closeBtn: 0, //不显示关闭按钮
            btn: ['确定'],
            title: 0,
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: '<div class="import">' + text + '</div>',
            success: function () {
                $(".content").css("overflow", "hidden");
            },
            end: function () {
                $(".content").css("overflow", "auto");
            }

        });


    }

    var flag = true;
    $(".yuyue_c").click(function () {
        if (!flag) {
            return false;
        }
        var car_model = "18";
        var username = $("#quick_name").val();
        var mobile = $("#quick_phone").val();
        var platform = 'WAP';
        var utm_source = getUrlParam('utm_source');
        var utm_campaign = getUrlParam('utm_campaign');
        var utm_channel = getUrlParam('utm_channel');
        var utm_adgroup = getUrlParam('utm_adgroup');
        var utm_term = getUrlParam('utm_term');
        var utm_medium = getUrlParam('utm_medium');
        var setHeight = function () {
            $('body,html').height($(window).height()).css({
                'overflow-y': 'visible'
            });
        }
        username = username.replace(/\s+/g, '');
        var dianReady = true;
        dianyanzheng();

        function dianyanzheng() {
            // for (var i = 0; i < username.length; i++) {
            // if(username[i] != '·'){
            // dianReady = false;
            // }
            // };
            if (username[0] == '·' && username[length - 1] == '·') {
                dianReady = false;
            }
        }

        var reg = /^[A-Za-z\u4e00-\u9fa5\·]+$/;
        if (username == "") {
            baocuo("请填写姓名");
            // $('#quick_name').focus();
            setHeight();
            return false;
        } else if (!reg.exec(username)) {
            baocuo("姓名不能是数字或特殊字符，请重新填写!");
            // $("#quick_name").focus();
            setHeight();
            return false;
        } else if (!dianReady) {
            baocuo("请填写正确的姓名格式");
            // $("#quick_name").focus();
            setHeight();
            return false;
        }
        if (mobile == "") {
            baocuo("请填写手机号");
            // $("#quick_name").focus();
            setHeight();
            return false;
        } else if (validateMobile(mobile) == false) {
            baocuo("请填写正确的手机号码", {
                onclose: function () {
                    // $("#yy_tel").focus();
                    setHeight();
                }
            });

            return false;
        }
        var params = {
            "city": "未知",
            "county": "未知",
            "car_model": car_model,
            "username": username,
            "mobile": mobile,
            "platform": platform,
            "utm_source": utm_source,
            "utm_campaign": utm_campaign,
            "utm_channel": utm_channel,
            "utm_adgroup": utm_adgroup,
            "utm_term": utm_term,
            "utm_medium": utm_medium,

        };
        flag = false;
        // 向后台发送请求
        $.ajax({
            type: "get",
            url: data.url,
            data: params,
            dataType: 'jsonp',
            success: function (data) {
                if (data.code == "0") {
                    baocuo("您已预约成功")
                    bj40drive(data.leads_id, params);
                    $(".yuyue_l input").val("");
                    flag = true;
                } else {
                    baocuo(data.msg);
                }

            }

        })

        /*监测脚本*/
        function bj40drive(oid, param) {
            var  orderid  =  oid;
            //ordered保证每个申请唯一，之前北汽使用的规则为13位字母、数字组成的随机字符-活动着陆页名称。
            //例如：29of391mm651p-官网X65预约试驾
            _gsq.push(["T", "GWD-002394", "addOrder", "orderid", 1]);
            //产品名称、产品分类需根据用户在页面上实际预约的车型动态赋值
            //注：产品SKU若没有可以传"产品名称"，但是该处不能为空。
            _gsq.push(["T", "GWD-002394", "addProduct", "orderid", "", "sku", 1, 1, "Province"]);
            _gsq.push(["T", "GWD-002394", "addProduct", "orderid", "", "sku", 1, 1, "City"]);
            _gsq.push(["T", "GWD-002394", "addProduct", "orderid", "BJ40", "sku", 1, 1, "Brand "]);
            //例如：_gsq.push(["T","GWD-002394","addProduct",orderid,"绅宝D20","产品SKU",1,1,"绅宝"]);
            _gsq.push(["T", "GWD-002394", "addProduct", "orderid", param.username, "sku", 1, 1, "Name"]);
            _gsq.push(["T", "GWD-002394", "addProduct", "orderid", param.mobile, "sku", 1, 1, "Phone"]);
            // 手机号可加密后再传值
            _gsq.push(["T", "GWD-002394", "addProduct", "orderid", "", "sku", 1, 1, "Dealer"]);
            _gsq.push(["T", "GWD-002394", "track", "/targetpage/AppointmentDrive_btn" + location.pathname]);
            _gsq.push(["T", "GWD-002394", "trackECom"]);
        }
    })
})