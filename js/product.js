$(document).ready(function () {
  var str = decodeURI(location.search)
  console.log(location.href)
  str = str.split('?')
  var search = str[1].split('=')
  search = search[1]
  console.log(str)
  console.log(search)
  $("#mb").html(search)
  $.ajax({
    url: "http://127.0.0.1:3000/details/search",
    type: "get",
    data: {
      search
    },
    dataType: "json",
    success: function (result) {
      console.log(result)
      layui.use('laypage', function () {
        var laypage = layui.laypage;
        //调用分页
        laypage.render({
          elem: 'biuuu_city_list', //页码
          count: result.length,
          limit: 8,
          jump: function (obj) {
            console.log(obj);
            console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            console.log(obj.limit); //得到每页显示的条数
            //模拟渲染，页面显示位置
            document.getElementById('products').innerHTML = function () {
              var arr = [],
                thisData = result.concat().splice(obj.curr * obj.limit - obj.limit, obj.limit); //每页数据
              console.log(thisData)
              layui.each(thisData, function (index, item) {
                console.log(item)
                arr.push(`
                <div>
                  <a href="product_details.html?lid=${item.lid}">
                  <img src ="${item.img}" alt="五粮液52度普五 500ML（新老包装随机发货">
                  <p>￥${item.price}</p>
                  <p>${item.title}</p>
                  </a> 
                  <div class="d-flex">
                  <a href="">加入购物车</a> 
                  </div> 
                  </div>`);
              });
              return arr.join('');
            }();
          }
        });

      });

    }
  })
})