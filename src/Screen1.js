import React from "react";
import * as d3 from "d3";



bubblemap2 = {
    const svg = d3.create("svg")
        .attr("width", width)
        .attr("height", height);
  
   svg.selectAll("path")
        .data(world.features)
        .join("path")
        .attr("fill","#000000")
        .attr("stroke", "#dedede")
        .attr("d", path)
        .attr("class", "countries");
    
    svg.selectAll('circle')
        .data(mapdata2
          .filter(d => d.position)
          .sort((a, b) => d3.descending(a.population, b.population)))
        .join("circle")
        .attr("transform", d => `translate(${d.position})`)
        .attr("r", d => radius2(d.population))
        .attr('fill', (d) => color(d.cluster))
        .attr("fill-opacity", 0.5)
        .attr("stroke", "#fff")
        .attr("stroke-width", 0.5)
        .on("mouseover", function(e,d) {
                      d3.select(this)
                         .attr('stroke-width', '1.7')
                         .attr("stroke", "black");
                      tooltip
                        .html(`<b><center>${d.language}</center></b><p></p><b>Country:</b> ${d.country}<br><b>Degree:</b> ${d.degree}<br><b>Population:</b> ${d.population}`);
                      let tooltipWidth = tooltip.node().offsetWidth;
                      let tooltipHeight = tooltip.node().offsetHeight;
                      tooltip
                        .style("left", e.pageX - tooltipWidth/2 +'px')
                        .style("top", e.pageY-tooltipHeight - 10+'px')
                        .style('visibility', 'visible');
        })
       .on("mousemove", function() {
        tooltip
          .style("top", d3.event.pageY - 10 + "px")
          .style("left", d3.event.pageX + 10 + "px");
      })
      .on("mouseout", function() {
        // change the selection style
        d3.select(this).attr('stroke-width', '0')
          .attr("stroke", "#fff")
          .attr("stroke-width", 0.5);
        tooltip.style("visibility", "hidden");
      });
    
    svg.call(clusterlegend2)
    
    svg.call(radiuslegend2);
   
    return svg.node();
  }

  data1 = FileAttachment("data1.json").json()

  mapdata2 = Object.entries(data1).map(d=>{
    const countryArrayIndex = world.features.findIndex(dat => dat.id === d[1].Country);
    return {country:d[1].Country,
            degree:countryArrayIndex !== -0 ? d[1].Degree : NaN,
            language:countryArrayIndex !== -0 ? d[1].Name : NaN ,
            //cases:countryArrayIndex !== -0 ? d[1].total_cases : NaN,
            //deaths:countryArrayIndex !== -0 ? d[1].total_deaths : NaN,
            //cases_per_million:countryArrayIndex !== -0 ? d[1].total_cases_per_million : NaN,
           // deaths_per_million:countryArrayIndex !== -0 ? d[1].total_deaths_per_million : NaN,
            population:countryArrayIndex !== -0 ? d[1].Population : NaN,
            position: [d[1].Longitude,d[1].Latitude] || [0,0], //path.centroid(world.features[countryArrayIndex]) || [0,0],
            cluster:d[1].Degree}
  });

  dataGroup2 = d3.groups(data1, d => d.Degree)

  clusterlegend2 = svg => {
    const clusterlegend2 = svg.selectAll(".legend")
          .data(dataGroup2)
          .enter();
     
    clusterlegend2
      .append('text')
      .text(d => d[0])
      .attr('x', legendOrigin[0] + labelHeight * 1.2 -40)
      .attr('y', (d,i) => legendOrigin[1] + labelHeight + labelHeight * 1.2 *i +220)
      .style('font-family', 'Helvetica')
      .style('font-size', `${labelHeight-3}px`)
      .attr("opacity", 0.7);
    
    clusterlegend2
      .append('circle')
      .attr('cx', legendOrigin[0] -32)
      .attr('cy', (d,i) => legendOrigin[1] + labelHeight * 1.25 * i +232)
      .attr('r', 8)
      .attr('width', labelHeight)
      .attr('height', labelHeight)
      .attr('fill', (d) => color(d[0]))
      .attr("fill-opacity",".4")
      .attr('stroke', (d) => color(d[0]))
      .style('stroke-width', '1.4px');
    
     
   svg.append("text")
      .attr('x', legendOrigin[0] + labelHeight * 1.2 -40)
      .attr('y', (d,i) => legendOrigin[1] + labelHeight + labelHeight * 1.2 *i +195)
      .attr("text-anchor", "middle")  
      .style("font-size", "15px") 
      .attr("font-family", "Helvetica")
      .attr('font-weight', 'bold')
      .text("Clusters")
      .attr("opacity", 0.6); 
    
      
    return clusterlegend2;
  }

  radius2 = d3.scaleSqrt([0, d3.max(data1, d => d.Population)], [0, 50]);

  radiuslegend2 = svg => {
    const radiuslegend2 = svg.append("g")
        .attr("fill", "#777")
        .attr("transform", "translate(750,450)")
        .attr("text-anchor", "middle")
        .style("font", "10px sans-serif")
      .selectAll("g")
        .data(radius2.ticks(4).slice(1))
      .join("g");
  
    radiuslegend2.append('circle')
        .attr("fill", "none")
        .attr("stroke", "#ccc")
        .attr("cy", d => -radius2(d))
        .attr("r", radius2);
  
    radiuslegend2.append("text")
        .attr("y", d => -2 * radius2(d))
        .attr("dy", "1.3em")
        .text(radius2.tickFormat(4, "s"));
     
    return radiuslegend2;
  }