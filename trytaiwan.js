$(document).ready(function() {
  drawTaiwan()
});


function drawTaiwan(){

  var width = 1024;
  var height = 700;



  /*var path = d3.geo.path().projection( // 路徑產生器
  d3.geo.mercator().center([121,24]).scale(8000).translate([width / 2, height / 2]) // 座標變換函式
  );*/ //用下面的東西，把這行分開寫。

  var projection = d3.geo.mercator()
  .center([121,24])
  .scale(8000)
  .translate([width / 2, height / 2]);

  var path = d3.geo.path().projection(projection);

/*//為了後面的mouseover而貼在這裡，可是不知道有什麼意義。
  var div = d3.select("body").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("margin", "10px auto");*/

  d3.json(" TWN_TOWN_v2_topo.json", function(topodata) {
  //改掉json為自己推播的json網址

    var features = topojson.feature(topodata, topodata.objects.county).features;
    // 改掉.["county"]成為.county

    d3.select("svg").selectAll("path").data(features).enter().append("path").attr({
      d: path,
      name: function(d){
          return d.properties.C_Name;
      },
      fill:'#55AA00',
      stroke: '#E0FBE7'
    });
    /*
    d3.select("#pathCanvas").append("path")         //縣市/行政區界線>>一直失敗不知為何，所以放棄了。
      .datum(topojson.mesh(topodata, topodata.objects[type], function(a, b) { return a !== b ; }))
      .attr("d", path)
      .attr("id", "county-boundary");
    */
    d3.select("svg").selectAll("path").on("mouseenter", function() {          // title div 顯示滑鼠所指向的縣市/行政區
      fill = $(this).attr("fill");
      $(this).attr("fill", '#116493');
      $('#title').html($(this).attr("name"));      
      $('#panel').css({"height": "20px","width": "50px"});
       })
   .on("mouseout", function() {
             $(this).attr("fill", fill);
          });
 
      $("path").mouseover(function(){                   //panel 區塊跟隨滑鼠移動
        $("path").mousemove( function(e) {
             mouseX = e.pageX; 
             mouseY = e.pageY;
            });  
            $('#panel').css({'top':mouseY,'left':mouseX}).fadeIn('slow'); 
      });
/*
    //下面是青恩的，但是基本上跟我的整個檔案不合，應該不是這樣搞的，不要異想天開了。還是用現成的範例去改，比較務實。
    .on("mouseout", function() {
        $(this).attr("fill", fill);
        d3.select(this)
        .transition().duration(300)
        .style("opacity", 0.8);
        div.transition().duration(300)
        .style("opacity", 0);
      })

    .on("mouseover", function() {                //panel 區塊跟隨滑鼠移動
        $("path").mousemove( function(e) {
          d3.select(this).transition().duration(300).style("opacity", 1);
          div.transition().duration(300)
          .style("opacity", 1)
          div.text(name) //+ " : " + rateById[d.TOWN_ID] d.properties.T_Name
          .style("left", (d3.event.pageX) + "px")
          .style("top", (d3.event.pageY -30) + "px");
        });
    });*/

  });
};