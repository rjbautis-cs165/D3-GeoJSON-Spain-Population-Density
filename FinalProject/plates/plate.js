var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xAttr = 50;

d3.csv("plate.csv", function(d, i, columns) {
    console.log(d[columns[0]]);
    
    for (i = 1; i < columns.length; ++i){
        var str = d[columns[i]];

        if(str.valueOf()==="Ptrue")
            console.log("Got value: " + str);
//        var circle = svg.append("circle")
//                        .attr("class","node")
//                        .style("fill","apple.png")
//                        .style("stroke", "red")
//                        .attr("cx", xAttr)
//                        .attr("cy", 30)
//                        .attr("r", 20);
        
//        var circle = svg.append("circle")
//            .style("href","apple.png")
//            .attr("cx", 400)
//            .attr("cy", 400)
//            .attr("r",20);
        
        var circle = svg.append("circle")
            .style("fill", "blue")
            .attr("cx", 400)
            .attr("cy", 400)
            .attr("r",20);
        
        var text = svg.append("text")
                        .attr("x",xAttr)
                        .attr("y",200)
                        .text(function(d){return str});
        xAttr += 50;

        
        circle.append("image")
                .attr("href","apple.png")
                .attr("width","40px")
                .attr("height","40px");
        
//        circle.append("image")
//                .attr("xlink:href", function (d){
//                    if (str.valueOf()==="Ptrue"){
//                        return ("apple.png");
//                    } else {
//                        return ("apple.png");
//                    }});
        
    }
    },  function(error, data) {
        if (error) throw error;
});