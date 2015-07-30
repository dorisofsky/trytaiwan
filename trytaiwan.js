$(document).ready(function() {
  drawTaiwan()
});


function drawTaiwan(){

     d3.json(" http://dorisofsky.github.io/taiwan_realtime2/county.json", function(topodata) {
      //改掉json為自己推播的json網址
        var features = topojson.feature(topodata, topodata.objects.county).features;
        // 改掉.["county"]成為.county
       
        var path = d3.geo.path().projection( // 路徑產生器
          d3.geo.mercator().center([121,24]).scale(6000) // 座標變換函式
         );

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
           }).on("mouseout", function() {
             $(this).attr("fill", fill);
          });

        $("path").mouseover(function(){                   //panel 區塊跟隨滑鼠移動
          $("path").mousemove( function(e) {
           mouseX = e.pageX; 
           mouseY = e.pageY;
          });  
          $('#panel').css({'top':mouseY,'left':mouseX}).fadeIn('slow');
        });

      });
};