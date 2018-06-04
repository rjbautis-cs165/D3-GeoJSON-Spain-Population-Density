var d3;

var svg = d3.select("svg"),
	margin = {top: 60, right: 20, bottom: 40, left: 60},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;

var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    yScale = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var colors = d3.scaleOrdinal(d3.schemeCategory10);


d3.csv("diets.csv", function(d) {
        d.fat = +d.fat;
        d.carbs = +d.carbs;
        d.sugar = +d.sugar;
        d.protein = +d.protein
        return d;
    }, function(error, data) {
    if (error) throw error;
    

    // Grab categories from csv file, starting with the column at the first index
    var categories = data.columns.slice(1).map(function(diet) {
        return {
            // Key = "diet", value = name of the diet
            diet: diet,
            // Key = "values", value = {category (i.e. the nutrient), nutrient value for current diet theory}
            values: data.map(function(d) {
                return {category: d.category, percentage: d[diet]};
            })
        };
    });
    
    // xScale
    xScale.domain(data.map(function(d) { return d.category; }));

    // From hw4 assignment. Repurpose for final project
    // yScale
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.percentage; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.percentage; }); })
    ]);


    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.category); })
        .attr("y", function(d) { return yScale(d.usda); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.usda); })
        .style("fill", function(d) { return colors(d.category); });

    // x-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", margin.top + 30)
        .attr("x", (width + margin.left)/2)
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "12px")
        .text("Nutrient");

    // y-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -(height + margin.top) /2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "13px")
        .text("Percentage of Calorie Intake"); 

    // Title
    svg.append("text")
        .attr("x", (width + margin.left)/ 2)             
        .attr("y", (margin.top / 2) + 10)
        .attr("text-anchor", "middle")  
        .style("font-size", "50px") 
        .text("USDA");
    
});


var svg2 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g2 = svg2.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("diets.csv", function(d) {
        d.fat = +d.fat;
        d.carbs = +d.carbs;
        d.sugar = +d.sugar;
        d.protein = +d.protein
        return d;
    }, function(error, data) {
    if (error) throw error;
    

    // Grab categories from csv file, starting with the column at the first index
    var categories = data.columns.slice(1).map(function(diet) {
        return {
            // Key = "diet", value = name of the diet
            diet: diet,
            // Key = "values", value = {category (i.e. the nutrient), nutrient value for current diet theory}
            values: data.map(function(d) {
                return {category: d.category, percentage: d[diet]};
            })
        };
    });
    
    xScale.domain(data.map(function(d) { return d.category; }));
      
    // From hw4 assignment. Repurpose for final project
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.percentage; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.percentage; }); })
    ]);

    
    g2.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g2.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g2.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.category); })
        .attr("y", function(d) { return yScale(d.paleo); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.paleo); })
        .style("fill", function(d) { return colors(d.category); });

    // x-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", margin.top + 30)
        .attr("x", (width + margin.left)/2)
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "12px")
        .text("Nutrient");

    // y-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg2.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -(height + margin.top) /2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "13px")
        .text("Percentage of Calorie Intake"); 

    // Title
    svg2.append("text")
        .attr("x", (width + margin.left)/ 2)             
        .attr("y", (margin.top / 2) + 10)
        .attr("text-anchor", "middle")  
        .style("font-size", "50px") 
        .text("Paleo");
    
});

var svg3 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g3 = svg3.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("diets.csv", function(d) {
        d.fat = +d.fat;
        d.carbs = +d.carbs;
        d.sugar = +d.sugar;
        d.protein = +d.protein
        return d;
    }, function(error, data) {
    if (error) throw error;
    

    // Grab categories from csv file, starting with the column at the first index
    var categories = data.columns.slice(1).map(function(diet) {
        return {
            // Key = "diet", value = name of the diet
            diet: diet,
            // Key = "values", value = {category (i.e. the nutrient), nutrient value for current diet theory}
            values: data.map(function(d) {
                return {category: d.category, percentage: d[diet]};
            })
        };
    });
    
    // xScale
    xScale.domain(data.map(function(d) { return d.category; }));
  
    
    // From hw4 assignment. Repurpose for final project
    // yScale
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.percentage; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.percentage; }); })
    ]);

    
    g3.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g3.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g3.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.category); })
        .attr("y", function(d) { return yScale(d.zone); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.zone); })
        .style("fill", function(d) { return colors(d.category); });
   
    // x-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg3.append("text")
        .attr("class", "label")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", margin.top + 30)
        .attr("x", (width + margin.left)/2)
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "12px")
        .text("Nutrient");

    // y-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg3.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -(height + margin.top) /2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "13px")
        .text("Percentage of Calorie Intake"); 

    // Title
    svg3.append("text")
        .attr("x", (width + margin.left)/ 2)             
        .attr("y", (margin.top / 2) + 10)
        .attr("text-anchor", "middle")  
        .style("font-size", "50px") 
        .text("Zone");
});


var svg4 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g4 = svg4.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


d3.csv("diets.csv", function(d) {
        d.fat = +d.fat;
        d.carbs = +d.carbs;
        d.sugar = +d.sugar;
        d.protein = +d.protein
        return d;
    }, function(error, data) {
    if (error) throw error;
    

    // Grab categories from csv file, starting with the column at the first index
    var categories = data.columns.slice(1).map(function(diet) {
        return {
            // Key = "diet", value = name of the diet
            diet: diet,
            // Key = "values", value = {category (i.e. the nutrient), nutrient value for current diet theory}
            values: data.map(function(d) {
                return {category: d.category, percentage: d[diet]};
            })
        };
    });
    
    xScale.domain(data.map(function(d) { return d.category; }));
  
    
    // From hw4 assignment. Repurpose for final project
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.percentage; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.percentage; }); })
    ]);

    
    g4.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    g4.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g4.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.category); })
        .attr("y", function(d) { return yScale(d.vegan); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(d.vegan); })
        .style("fill", function(d) { return colors(d.category); });

    // x-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg4.append("text")
        .attr("class", "label")
        .attr("transform", "translate(0," + height + ")")
        .attr("y", margin.top + 30)
        .attr("x", (width + margin.left)/2)
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "12px")
        .text("Nutrient");

    // y-axis label
    // Reference: https://bl.ocks.org/EfratVil/d956f19f2e56a05c31fb6583beccfda7
    svg4.append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 0)
        .attr("x", -(height + margin.top) /2)
        .attr("dy", ".71em")
        .style("text-anchor", "middle")
        .style('fill', 'black')
        .attr("font-size", "13px")
        .text("Percentage of Calorie Intake"); 

    // Title
    svg4.append("text")
        .attr("x", (width + margin.left)/ 2)             
        .attr("y", (margin.top / 2) + 10)
        .attr("text-anchor", "middle")  
        .style("font-size", "50px") 
        .text("Vegan");
});