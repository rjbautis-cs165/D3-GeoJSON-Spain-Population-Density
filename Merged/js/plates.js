var d3, document;





d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("USDA_Plate").appendChild(xml.documentElement);

    //Define SVG
    var svg = d3.select("#USDA_Plate")
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + 150 + "," + 200 + ")")
        .attr("class", "force_layout");


    d3.json("data/foods.json", function(error, data) {
        if (error) throw error;
       
        // Imported data for USDA
        var foods = {
            nodes: data.filter(function(d) { return d.type == "USDA"}),
        }


        // Append a "g" tag that represents each node. Each node "g" tag will have transformation for dragging
        var node = svg.selectAll("g")
            .data(foods.nodes)
            .enter().append("svg:g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        node.append("circle")
            .attr("r", 90)
            .attr("fill", "lightblue");
    


        // For each node, append a food image
        node.append("svg:image")
            .attr("xlink:href",  function(d) { 
                if (d.type == "USDA"){ return "images/" + d.type.toLowerCase() + "/usda_" + d.food + ".png";} 
            })
            .attr("x", function(d) { return -85;})
            .attr("y", function(d) { return -85;})
            .attr("height", 170)
            .attr("width", 170);

        var ticked = function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        }  

        // Create force simulation with collision and charge
        var simulation = d3.forceSimulation()
            .force("collision",d3.forceCollide().radius(90))
            .force("charge", d3.forceManyBody().strength(-15))
            .force("center", d3.forceCenter(width / 2 - 25, height / 2))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0))
        
        // Start up the simulation
        simulation
            .nodes(foods.nodes)
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

});


d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("Paleo_Plate").appendChild(xml.documentElement);
   
    //Define SVG
    var svg = d3.select("#Paleo_Plate")
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + 150 + "," + 200 + ")")
        .attr("class", "force_layout");


    d3.json("data/foods.json", function(error, data) {
        if (error) throw error;
       
        // Imported data for Zone
        var foods = {
            nodes: data.filter(function(d) { return d.type == "Paleo"}),
        }


        // Append a "g" tag that represents each node. Each node "g" tag will have transformation for dragging
        var node = svg.selectAll("g")
            .data(foods.nodes)
            .enter().append("svg:g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        node.append("circle")
            .attr("r", 90)
            .attr("fill", "lightblue");
    


        // For each node, append a food image
        node.append("svg:image")
            .attr("xlink:href",  function(d) { 
                if (d.type == "Paleo"){ return "images/" + d.type.toLowerCase() + "/paleo_" + d.food + ".png";} 
            })
            .attr("x", function(d) { return -85;})
            .attr("y", function(d) { return -85;})
            .attr("height", 170)
            .attr("width", 170);

        var ticked = function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        }  

        // Create force simulation with collision and charge
        var simulation = d3.forceSimulation()
            .force("collision",d3.forceCollide().radius(90))
            .force("charge", d3.forceManyBody().strength(-15))
            .force("center", d3.forceCenter(width / 2 - 25, height / 2))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0))
        
        // Start up the simulation
        simulation
            .nodes(foods.nodes)
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
});


d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("Vegan_Plate").appendChild(xml.documentElement);   

    //Define SVG
    var svg = d3.select("#Vegan_Plate")
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + 150 + "," + 200 + ")")
        .attr("class", "force_layout");


    d3.json("data/foods.json", function(error, data) {
        if (error) throw error;
       
        // Imported data for Zone
        var foods = {
            nodes: data.filter(function(d) { return d.type == "Vegan"}),
        }


        // Append a "g" tag that represents each node. Each node "g" tag will have transformation for dragging
        var node = svg.selectAll("g")
            .data(foods.nodes)
            .enter().append("svg:g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        node.append("circle")
            .attr("r", 90)
            .attr("fill", "lightblue");
    


        // For each node, append a food image
        node.append("svg:image")
            .attr("xlink:href",  function(d) { 
                if (d.type == "Vegan"){ return "images/" + d.type.toLowerCase() + "/vegan_" + d.food + ".png";} 
            })
            .attr("x", function(d) { return -85;})
            .attr("y", function(d) { return -85;})
            .attr("height", 170)
            .attr("width", 170);

        var ticked = function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        }  

        // Create force simulation with collision and charge
        var simulation = d3.forceSimulation()
            .force("collision",d3.forceCollide().radius(90))
            .force("charge", d3.forceManyBody().strength(-15))
            .force("center", d3.forceCenter(width / 2 - 25, height / 2))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0))
        
        // Start up the simulation
        simulation
            .nodes(foods.nodes)
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
});


d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("Zone_Plate").appendChild(xml.documentElement);

    //Define SVG
    var svg = d3.select("#Zone_Plate")
        .select("svg")
        .append("g")
        .attr("transform", "translate(" + 150 + "," + 200 + ")")
        .attr("class", "force_layout");


    d3.json("data/foods.json", function(error, data) {
        if (error) throw error;
       
        // Imported data for Zone
        var foods = {
            nodes: data.filter(function(d) { return d.type == "Zone"}),
        }


        // Append a "g" tag that represents each node. Each node "g" tag will have transformation for dragging
        var node = svg.selectAll("g")
            .data(foods.nodes)
            .enter().append("svg:g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));


        node.append("circle")
            .attr("r", 90)
            .attr("fill", "lightblue");
    


        // For each node, append a food image
        node.append("svg:image")
            .attr("xlink:href",  function(d) { 
                if (d.type == "Zone"){ return "images/" + d.type.toLowerCase() + "/zone_" + d.food + ".png";} 
            })
            .attr("x", function(d) { return -85;})
            .attr("y", function(d) { return -85;})
            .attr("height", 170)
            .attr("width", 170);

        var ticked = function() {
            node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        }  

        // Create force simulation with collision and charge
        var simulation = d3.forceSimulation()
            .force("collision",d3.forceCollide().radius(90))
            .force("charge", d3.forceManyBody().strength(-15))
            .force("center", d3.forceCenter(width / 2 - 25, height / 2))
            .force("y", d3.forceY(0))
            .force("x", d3.forceX(0))
        
        // Start up the simulation
        simulation
            .nodes(foods.nodes)
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
});


