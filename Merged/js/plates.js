var d3, document;



d3.xml("plate.svg").mimeType("image/svg+xml").get(function(error, xml) {
    if (error) throw error;
    document.getElementById("USDA_Plate").appendChild(xml.documentElement);
    
    d3.select("#USDA_Plate")
        .append("text")
        .text("hi there")
        .style("text-anchor", "middle");
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


