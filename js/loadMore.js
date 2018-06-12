//
//
// mui.init({
//     pullRefresh : {
//         container:"#more",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
//         up : {
//             height:50,//可选.默认50.触发上拉加载拖动距离
//             auto:false,//可选,默认false.自动上拉加载一次
//             contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
//             contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
//             callback : function () {
//                     var _self = this;
//                     getDataFromServer("/api/pedigree/myJoinlist", {currentPage: 1, limit: 20}, function (res) {
//                         if (res.code == "SUCCESS") {
//                             let list = res.result.content;
//                             if (list && list.length > 0) {
//                                 var record = "";
//                                 for (let item of list) {
//                                     record += '<li class="mui-table-view-cell mui-media">' +
//                                         '<img class="mui-media-object mui-pull-left" src="' + item.totem + '">' +
//                                         '<div class="mui-media-body">' + item.nickname +
//                                         '<p>' + item.nickname + '</p>' +
//                                         '<p class="time">' + item.rowAddTime + '</p>' +
//                                         '<p class="addr">' + item.province + item.city + item.county + '</p>' +
//                                         '</div>' +
//                                         '</li>';
//                                 }
//                                 $("#data").append(record)
//
//                             }
//                         }
//                         mui('#more').pullRefresh().disablePullupToRefresh();
//
//                     }, function (error) {
//                         alert(error);
//                     });
//                 }
//         }
//     }
// });
var isLoad = true;
var islast =true;
var page =1;
$(window).scroll(function () {
    if (isLoad || islast) {
        return;
    }
    var scrollTop = $(this).scrollTop();
    var scrollHeight = $(document).height();
    var windowHeight = $(this).height();
    if ((scrollTop + windowHeight == scrollHeight) && !islast) {
        isLoad = true;
        loadMore();
    }
});
function loadMore() {
    getDataFromServer("/api/pedigree/myJoinlist", {currentPage: page, limit: 20,content:$("input[type=search]").val()}, function (res) {
        if (res.code == "SUCCESS") {
            let list = res.result.content;
            if (list && list.length > 0) {
                var record = "";
                for (let item of list) {
                    record += '<li class="mui-table-view-cell mui-media">' +
                        '<img class="mui-media-object mui-pull-left" src="' + item.totem + '">' +
                        '<div class="mui-media-body">' + item.nickname +
                        '<p>' + item.nickname + '</p>' +
                        '<p class="time">' + item.rowAddTime + '</p>' +
                        '<p class="addr">' + item.province + item.city + item.county + '</p>' +
                        '</div>' +
                        '</li>';
                }
                $("#data").append(record);
                islast = res.result.last;
                isLoad = false;
            }
            page++;
        }else {
            alert(res.message)
        }
    }, function (error) {
        console.log(JSON.stringify(error));
    });
}
loadMore();