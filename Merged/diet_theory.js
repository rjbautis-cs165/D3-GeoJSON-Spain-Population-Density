var d3;

//var svg = d3.select("svg"),

var margin1 = {top: 20, right: 20, bottom: 30, left: 40},
    width = 600,
    height = 350;

var x = d3.scaleBand()
    .rangeRound([0, width-100])
    .paddingInner(0.50)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#993333", "#99ff99", "#ff6666"]);

d3.csv("test.csv", function(d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
},  function(error, data) {
        if (error) throw error;

        var bars = d3.select(".bar_chart")
            .append("svg")
            .attr("height", height + margin1.top + margin1.bottom)
            .attr("width", width + + margin1.left + margin1.right)
            .append("g")
            .attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
    
  
        var keys = data.columns.slice(1);

        data.sort(function(a, b) { return b.total - a.total; });
        x.domain(data.map(function(d) { return d.Diet; }));
        y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
        z.domain(keys);
    
        bars.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
            .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
            .attr("x", function(d) { return x(d.data.Diet); })
            .attr("y", function(d) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); })
            .attr("width", x.bandwidth());

        // x-axis
        bars.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
    
        

        // y-axis
        bars.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
        .append("text")
            .attr("x", -200)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "-3.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .attr("transform", "rotate(-90)")
            .text("Percentage");

        var legend = bars.append("g")
                .attr("font-family", "sans-serif")
                .attr("font-size", 10)
                .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
                .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
                .attr("x", width - 19)
                .attr("width", 19)
                .attr("height", 19)
                .attr("fill", z);

        legend.append("text")
                .attr("x", width - 25)
                .attr("y", 9.5)
                .attr("dy", "0.32em")
                .text(function(d) { return d; });
});



/************************ Food Pyramids ************************/



// SET UP DIMENSIONS
var w = 600,
    h = 400;

// margin.middle is distance from center line to each y-axis
var margin = {
    top: 20,
    right: 124,
    bottom: 30,
    left: 195,
    middle: 28
};


// the width of each side of the chart
// <-regionWidth-><-middle-><-middle-><-regionWidth->
var regionWidth = w  / 2 - margin.middle - 20;

// these are the x-coordinates of the y-axes
var pointA = regionWidth; //left
var  pointB = w - regionWidth; //right

// svg transform string
function translation(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

var categories;
var yScale;
var xScale;

d3.csv('./food.csv', function(data) {
    // Group databy year
//    d3.select(".test")
//        .append('p')
//        .html('Diet Recommended Servings')
//        .style('text-align', 'center');

    var chart = d3.select(".test")
        .append('svg')
        .attr("id", "help")
        .attr("height", h + margin.bottom + margin.top)
        .attr("width", w)
        .style('margin', 'auto')
        .style('display', 'block')
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.right + ')');

    var maxValue = Math.max(
        d3.max(data, function(d) {
        return +d.serving;
        }),
        d3.max(data, function(d) {
        return +d.serving;
        })
    );

    // d3.scale.linear()
    xScale = d3.scaleLinear()
        .domain([0, maxValue])
        .range([0, regionWidth -9])
        .nice();

    // d3.scale.ordinal()
    yScale = d3.scaleBand()
        .domain(data.map(function(d) {
        return d.category;
        }))
        .rangeRound([h - margin.bottom, 0], 0.1);


    // d3.scale.ordinal()
    var color = d3.scaleOrdinal()
        .range(["#b2907c", "#6ae1b0", "#ff5b67", "#8acbe3", "#ffe156", "#ff8c00"]);


    // d3.svg.axis()
    var yAxisLeft = d3.axisRight(yScale)
        .tickSize(4, 0)
        .tickPadding(margin.middle + 12);

    var yAxisRight = d3.axisLeft(yScale)
        .tickSize(4, 0)
        .tickFormat('');

    var xAxisRight = d3.axisBottom(xScale)
        .tickValues([1,2,3,4,5,6,7,8])
        .tickSize(4, 1)
        .tickFormat(d3.format(''));

    var xAxisLeft = d3.axisBottom(xScale.copy().range([pointA, 8]))
        .tickValues([1,2,3,4,5,6,7,8])
        .tickSize(4, 1)
        .tickFormat(d3.format(''));

    var svg = d3.select("#help");
    
    
    // MAKE GROUPS FOR EACH SIDE OF CHART
    // scale(-1,1) is used to reverse the left side so the bars grow left instead of right
    var leftBarGroup = 
        svg.append('g')
            .attr('class', 'leftBarGroup')
            .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
    
    var rightBarGroup = 
        svg.append('g')
            .attr('class', 'rightBarGroup')
            .attr('transform', translation(pointB, 0));

    //USDA
    var leftUSDAGroup = 
        svg.append('g')
            .attr('class', 'leftUSDAGroup')
            .attr('transform', translation(pointA, 0) + 'scale(-1,1)');
    
    var rightUSDAGroup = 
        svg.append('g')
            .attr('class', 'rightUSDAGroup')
            .attr('transform', translation(pointB, 0));


//    // ADD MARKS
//    svg.append('text')
//        .text('Diet 1 (Vegan)')
//        .style('text-anchor', 'middle')
//        .attr('transform', translation(w/10, h/10));
//    svg.append('text')
//        .text('Diet 2 (Paleo)')
//        .style('text-anchor', 'middle')
//        .attr('transform', translation(w-w/10, h/10));
//

    // DRAW AXES
    svg.append('g')
        .attr('class', 'axis y left')
        .attr('transform', translation(pointA, 0))
        .call(yAxisLeft)
        .selectAll('text')
        .style('text-anchor', 'middle');

    svg.append('g')
        .attr('class', 'axis y right')
        .attr('transform', translation(pointB, 0))
        .call(yAxisRight);

    svg.append('g')
        .attr('class', 'axis x left')
        .attr('transform', translation(0, h-margin.bottom))
        .call(xAxisLeft)
        .append("text")
        .attr("transform", 
              "translate(" + (width/4) + " ," + 
                             (margin.bottom + 10) + ")")
        .text("Serving Size")
        .style("font", "14px sans-serif")
        .style('fill', 'black')
        .style("text-anchor", "middle");

    svg.append('g')
        .attr('class', 'axis x right')
        .attr('transform', translation(pointB, h-margin.bottom))
        .call(xAxisRight)
        .append("text")
        .attr("transform", 
              "translate(" + (width/5) + " ," + 
                             (margin.bottom + 10) + ")")
        .text("Serving Size")
        .style("font", "14px sans-serif")
        .style('fill', 'black')
        .style("text-anchor", "right");

    // DRAW THE BARS
    var leftUSDABar = d3.select('.leftUSDAGroup')
                        .selectAll('rectUSDA')
                        .data(data.filter(function(d) {return d.diet =="USDA";}));
    var rightUSDABar = d3.select('.rightUSDAGroup')
                        .selectAll('rectUSDA')
                        .data(data.filter(function(d) {return d.diet =="USDA";}));

    var leftBars = d3.select('.leftBarGroup')
                        .selectAll('rect')
                        .data(data.filter(function(d) {return d.diet =="Vegan";}));
    var rightBars = d3.select('.rightBarGroup')
                        .selectAll('rect').data(data.filter(function(d) {return d.diet =="Paleo";}));

    
    rightBars.enter().append('rect')
        .attr('class', 'enter')
        .attr('x',0)
        .style('fill', function(d) { return color(d.category); })
        .attr('height', yScale.bandwidth())
        .attr('y', function(d) { return yScale(d.category); })
        .attr("width", function(d) { return xScale(d.serving); });

    leftBars.enter().append('rect')
        .attr('class', 'enter')
        .attr('x',0)
        .style('fill', function(d) { return color(d.category); })
        .attr('height', yScale.bandwidth())
        .attr('y', function(d) { return yScale(d.category); })
        .attr("width", function(d) { return xScale(d.serving); });

    // USDA BARS
    leftUSDABar.enter().append('rect')
        .attr('class', 'enter')
        .attr('class', 'rectUSDA')
        .attr("style", "outline: 3px solid #7d4fc3;") 
        .attr('x',0)
        .attr('height', yScale.bandwidth())
        .attr('y', function(d) { return yScale(d.category); })
        .attr("width", function(d) { return xScale(d.serving); });

    rightUSDABar.enter().append('rect')
        .attr('class', 'enter')
        .attr('class', 'rectUSDA')
        .attr("style", "outline: 3px solid #7d4fc3;") 
        .attr('x',0)
        .attr('height', yScale.bandwidth())
        .attr('y', function(d) { return yScale(d.category); })
        .attr("width", function(d) { return xScale(d.serving); });

});


 




