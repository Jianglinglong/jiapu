document.write('<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>')
$(document).ready(function(){
				var userInfo = window.localStorage.getItem("userInfo");
				var shareUserId = "";
				if(null != userInfo){
					shareUserId = JSON.parse(userInfo).userId;
				}
        initPage(shareUserId);
    });
    function initPage(shareUserId) {
    	/***用于获得当前连接url用**/
        //alert(window.location.href);
        /***用户点击分享到微信圈后加载接口接口*******/
        $.get("//api.yunji128.com/homage/api/wexin_mp/v_1/config",{"url":window.location.href.split("#")[0]},function(data,status){
            console.log(data.appId+" "+data.timestamp+" "+data.nonceStr+" "+data.signature);
            wx.config({
                debug: false,
                appId: data.appId,
                timestamp:data.timestamp,
                nonceStr:data.nonceStr,
                signature:data.signature,
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareAppMessage',
                    'onMenuShareTimeline',
                    'onMenuShareQQ',
                    'hideOptionMenu',
                    'getLocation',
                    'openLocation'
                ]
            });
            var shareTitle = "一起分享吧！";
            var desc = "分享描述";
            var shareImg = "http://img.yunji128.com/homage/upload/sacrifice/2018/06/75ca75abf4864918b70794d2390d43cc.png";
            var link = "http://wx.yunji128.com/tpl/share.html?shareUserId="+shareUserId;
            var option={
                infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
                latitude: 0, // 纬度，浮点数，范围为90 ~ -90
                longitude: 0, // 经度，浮点数，范围为180 ~ -180。
                name: '', // 位置名
                address: '', // 地址详情说明
                scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
            };
            wx.getLocation({
                type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
                success: function (res) {
                    option.latitude = res.latitude ||29.50207;
                    option.longitude=res.longitude || 106.5114;
                    option.scale=15;
                    option.name="重庆";
                    option.address="九龙坡";
                    var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                    var speed = res.speed; // 速度，以米/每秒计
                    var accuracy = res.accuracy; // 位置精度
                }
            });
            $("#location").click(function () {
                wx.openLocation(option);
            });
            wx.ready(function(){
            	 /*分享给朋友*/  
		        wx.onMenuShareAppMessage({  
		            title: shareTitle, // 分享标题  
		            desc: desc, // 分享描述  
		            link: link, // 分享链接  
		            imgUrl: shareImg, // 分享图标  
		            type: 'link', // 分享类型,music、video或link，不填默认为link  
		            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空  
		            success: function () {   
		                showMessage("您已分享");  
		            },  
		            cancel: function () {   
		                showMessage('您已取消分享');  
		            }  
		        });
                wx.onMenuShareTimeline({
                    title : shareTitle, // 分享标题
                    link : link, // 分享链接
                    imgUrl : shareImg, // 分享图标
                    success : function() {
                        showMessage("分享成功");
                    },
                    cancel : function() {
                        showMessage("分享取消");
                    }
                });
                wx.onMenuShareQQ({  
		            title: shareTitle, // 分享标题  
		            desc: desc, // 分享描述  
		            link: link, // 分享链接  
		            imgUrl: shareImg, // 分享图标  
		            success: function () {   
		               showMessage("分享成功");
		            },  
		            cancel: function () {   
		              showMessage("分享取消");
		            }  
		        });
                //wx.hideOptionMenu();/***隐藏分享菜单****/
            });
        });
    }