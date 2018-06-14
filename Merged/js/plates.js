var d3, document;


    


d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("USDA_Plate").appendChild(xml.documentElement);

    
    

//Define Margin
var margin = {left: 80, right: 80, top: 50, bottom: 50 }, 
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


//Define SVG
var svg = d3.select("#USDA_Plate")
    .select("svg")
    .append("g")
    .attr("transform", "translate(" + 0 + "," + 150 + ")")
    .attr("class", "force_layout");

// Define how many circles will be made
var range = 8;

// Imported data
var data = {
    nodes:d3.range(0, range).map(function(d){ return {label: "l"+d , r: 100, color: "lightblue"}}),
}

// Create force simulation with collision and charge
var simulation = d3.forceSimulation()
    .force("collision",d3.forceCollide().radius( function(d){return d.r }) )
    .force("charge", d3.forceManyBody().strength(-15))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("y", d3.forceY(0))
    .force("x", d3.forceX(0))

// Append a "g" tag that represents each node. Each node "g" tag will have transformation for dragging
var node = svg.selectAll("g")
    .data(data.nodes)
    .enter().append("svg:g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

// For each node, append a circle
node.append("circle")
    .attr("r", function(d){  return d.r })
    .attr("fill", function(d) {return d.color });

// For each node, append a food image
node.append("svg:image")
    .attr("xlink:href",  "apple.png")
    .attr("x", function(d) { console.log(d); return -25;})
    .attr("y", function(d) { return -25;})
    .attr("height", 150)
    .attr("width", 150);


var ticked = function() {
    node
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
}  

// Start up the simulation
simulation
    .nodes(data.nodes)
    .on("tick", ticked);


// Drag Functions
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

});


d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("Paleo_Plate").appendChild(xml.documentElement);
});

d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("Vegan_Plate").appendChild(xml.documentElement);   
});

d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("Zone_Plate").appendChild(xml.documentElement);
});
