var d3;

var svg = d3.select("svg"),
	margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = +svg.attr("width") - margin.left - margin.right,
	height = +svg.attr("height") - margin.top - margin.bottom;

var xScale = d3.scaleBand().rangeRound([0, width]).padding(0.1),
    yScale = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
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
                return {category: d.category, BTU: d[diet]};
            })
        };
    });
    
    xScale.domain(data.map(function(d) { return d.category; }));
  
    console.log(xScale.domain());
    
    // From hw4 assignment. Repurpose for final project
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.BTU; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.BTU; }); })
    ]);

    
    
    console.log(yScale.domain());
    
    
    console.log(categories);

    
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
        .attr("height", function(d) { return height - yScale(d.usda); });
});

var g2 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
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
                return {category: d.category, BTU: d[diet]};
            })
        };
    });
    
    xScale.domain(data.map(function(d) { return d.category; }));
  
    console.log(xScale.domain());
    
    // From hw4 assignment. Repurpose for final project
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.BTU; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.BTU; }); })
    ]);

    
    
    console.log(yScale.domain());
    
    
    console.log(categories);

    
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
        .attr("height", function(d) { return height - yScale(d.paleo); });
});

var g3 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
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
                return {category: d.category, BTU: d[diet]};
            })
        };
    });
    
    xScale.domain(data.map(function(d) { return d.category; }));
  
    console.log(xScale.domain());
    
    // From hw4 assignment. Repurpose for final project
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.BTU; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.BTU; }); })
    ]);

    
    
    console.log(yScale.domain());
    
    
    console.log(categories);

    
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
        .attr("height", function(d) { return height - yScale(d.zone); });
});

var g4 = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
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
                return {category: d.category, BTU: d[diet]};
            })
        };
    });
    
    xScale.domain(data.map(function(d) { return d.category; }));
  
    console.log(xScale.domain());
    
    // From hw4 assignment. Repurpose for final project
    yScale.domain([
        d3.min(categories, function(c) {
            return d3.min(c.values, function(d) { 
                return d.BTU; 
            }); 
        }),
        d3.max(categories, function(c) { 
            return d3.max(c.values, function(d) { 
                return d.BTU; }); })
    ]);

    
    
    console.log(yScale.domain());
    
    
    console.log(categories);

    
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
        .attr("height", function(d) { return height - yScale(d.vegan); });
});