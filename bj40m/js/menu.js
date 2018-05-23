;
(function ($) {
	var $header = $("#head_tmpl");
	var $footer = $("#foot_tmpl");


	$.get("menu.html", function (data) {
		var dom = data.split("===");
		$header.html(dom[0]);
		$footer.html(dom[1]);

		$('.index_hid').hide();
		var headerH = 1.05 * (100 * (document.documentElement.clientWidth / 750));
		$('.menu_btn').click(function () {

			if ($('.index_hid').css('display') == 'none') {
				$('.index_hid').show();

				$('.indexBox').animate({
					"left": -7.5 + "rem"
				}, 500);
				$('body').css('overflow-y', 'hidden');
				//				设置右边模块的高
				$('.indexBox_r').height($(window).height());
			} else {
				$('.indexBox').animate({
					"left": 0 + "rem"
				}, 500, function () {
					$('.index_hid').hide();
					$('body').css('overflow-y', 'auto');
					$('.indexBox_r').height(0);
				});
			}
		});

		$('.index_hid, .indexBox_r_close').click(function () {

			if ($('.index_hid').css('display') == 'block') {
				$('.indexBox').animate({
					"left": 0 + "rem"
				}, 500, function () {
					$('.index_hid').hide();
					$('body').css('overflow-y', 'auto');
					$('.indexBox_r').height(0);
				});

			}



		});


		//问题下拉
		$(".indexBox_r ul").hide();
		$(".indexBox_r h3 em").hide();
		$(".indexBox_r").find('h3').click(function () {
			//菜单点击隐藏
			if ($('.index_hid').css('display') == 'block') {
				$('.indexBox').animate({
					"left": 0 + "rem"
				}, 500, function () {
					$('.index_hid').hide();
					$('body').css('overflow-y', 'auto');
					$('.indexBox_r').height(0);
				});
			}
		});

		//锚点定位
		function Maodian(whichLi, scrLength) {
			$('.proIntNav_i ul li:eq(' + whichLi + ')').on('click', function () {
				$('body').animate({
					'scrollTop': scrLength
				});
			});

		}
	});
})($)