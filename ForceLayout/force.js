var d3;

//Define Margin
var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


//Define SVG
var svg = d3.select("body")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("class", "example");

var range = 8;

var data = {
    nodes:d3.range(0, range).map(function(d){ return {label: "l"+d , r: 40, color: "blue"}}),
}

var simulation = d3.forceSimulation()
    .force("collision",d3.forceCollide().radius( function(d){return d.r }) )
    .force("charge", d3.forceManyBody().strength(-15))
    .force("center", d3.forceCenter(960 / 2, 500 / 2))
    .force("y", d3.forceY(0))
    .force("x", d3.forceX(0))


var node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("circle")
    .data(data.nodes)
    .enter()
    .append("g")
    .attr("id", "yes")
    .append("circle")
    .attr("r", function(d){  return d.r })
    .attr("fill", function(d) {return d.color })
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

var ticked = function() {
    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
}  

simulation
    .nodes(data.nodes)
    .on("tick", ticked);


function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
} 
