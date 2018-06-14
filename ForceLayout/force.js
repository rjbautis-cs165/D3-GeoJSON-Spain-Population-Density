
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


var radius = 15; 

var nodes_data =  [
    {"name": "Lillian", "sex": "F"},
    {"name": "Gordon", "sex": "M"},
    {"name": "Sylvester", "sex": "M"},
    {"name": "Mary", "sex": "F"},
    {"name": "Helen", "sex": "F"},
    {"name": "Jamie", "sex": "M"},
    {"name": "Jessie", "sex": "F"},
    ]

//Sample links data 
//type: A for Ally, E for Enemy
var links_data = [
	{"source": "Sylvester", "target": "Gordon", "type":"A" },
    {"source": "Gordon", "target": "Lillian", "type":"A" },
    {"source": "Sylvester", "target": "Mary", "type":"A"},
    {"source": "Sylvester", "target": "Jamie", "type":"A"},
    {"source": "Sylvester", "target": "Jessie", "type":"A"},
    {"source": "Sylvester", "target": "Helen", "type":"A"},
    {"source": "Helen", "target": "Gordon", "type":"A"},

    
]



//set up the simulation and add forces  
var simulation = d3.forceSimulation()
					.nodes(nodes_data);
                              
var link_force =  d3.forceLink(links_data)
                        .id(function(d) { console.log(d); return d.name; });            
         
var charge_force = d3.forceManyBody()
    .strength(-15); 
    
var center_force = d3.forceCenter(width / 2, height / 2);  
                

simulation
    .force("charge_force", charge_force)
    .force("center_force", center_force)
    .force("links",link_force)
    .force("collision", d3.forceCollide().radius(function(d) {
//        console.log(d);
        return 5;
    }))
 ;

        
//add tick instructions: 
simulation.on("tick", tickActions );


//draw circles for the nodes 
var node = svg.append("g")
        .attr("class", "nodes") 
        .selectAll("circle")
        .data(nodes_data)
        .enter()
        .append("circle")
        .attr("r", radius) 
        .attr("fill", "red");

d3.select(".example")
    .append("g");
 
//add drag capabilities  
var drag_handler = d3.drag()
	.on("start", drag_start)
	.on("drag", drag_drag)
	.on("end", drag_end);	
	
drag_handler(node);


/** Functions **/

//Function to choose what color circle we have
//Let's return blue for males and red for females
function circleColour(d){
	if(d.sex =="M"){
		return "blue";
	} else {
		return "pink";
	}
}

//Function to choose the line colour and thickness 
//If the link type is "A" return green 
//If the link type is "E" return red 
function linkColour(d){
	if(d.type == "A"){
		return "green";
	} else {
		return "red";
	}
}

//Drag functions 
//d is the node 
function drag_start(d) {
 if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

//make sure you can't drag the circle outside the box
function drag_drag(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function drag_end(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

function tickActions() {
    //update circle positions each tick of the simulation 
       node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
    
} 