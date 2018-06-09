//var svg = d3.select("svg"),

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 750,
    height = 500;
//    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3.scaleBand()
    .rangeRound([0, width-100])
    .paddingInner(0.50)
    .align(0.1);

var y = d3.scaleLinear()
    .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
    .range(["#993333", "#EEBC62", "#ff3300"]);

d3.csv("test.csv", function(d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
},  function(error, data) {
        if (error) throw error;

        var bars = d3.select(".bars")
            .append("svg")
            .attr("height", height + margin.top + margin.bottom)
            .attr("width", width + + margin.left + margin.right)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
  
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

        bars.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // y-axis label
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

        // Legend
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