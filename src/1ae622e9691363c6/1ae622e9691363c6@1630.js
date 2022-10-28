import define1 from "./8d271c22db968ab0@160.js";
import define2 from "./a33468b95d0b15b0@808.js";

function _1(md){return(
md`# 2. Clustering method`
)}

function _2(md){return(
md`Once we analyzed the data in detail, we organized selected countries in four different clusters based on their patterns during the pandemic. We've made the following visualizations to show the similarities between them.
`
)}

function _3(md){return(
md` --------------------`
)}

function _4(md){return(
md `## Data Visualization`
)}

function _5(md){return(
md` With a world map we can show which countries belong to each cluster and understand how they were configured. It is also an efficient way to show which countries were selected to do the analysis and the ones we omitted due to lack of data. We added interactivity to make a cleaner visualization and to display more variables, like deaths or population.
`
)}

function _6(md){return(
md`### COVID CASES IN THE WORLD FOR SELECTED COUNTRIES`
)}

function _bubblemap(d3,width,height,world_no_antarctica,path,mapdata,radius,color,tooltip,clusterlegend,radiuslegend)
{
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height);

 svg.selectAll("path")
      .data(world_no_antarctica.geometries)
      .join("path")
      .attr("fill","#ebedeb")
      .attr("stroke", "#dedede")
      .attr("d", path)
      .attr("class", "countries");
  
  svg.selectAll('circle')
      .data(mapdata
        .filter(d => d.position)
        .sort((a, b) => d3.descending(a.cases, b.cases)))
      .join("circle")
      .attr("transform", d => `translate(${d.position})`)
      .attr("r", d => radius(d.cases))
      .attr('fill', (d) => color(d.cluster))
      .attr("fill-opacity", 0.5)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function(e,d) {
                    d3.select(this)
                       .attr('stroke-width', '1.7')
                       .attr("stroke", "black");
                    tooltip
                      .html(`<b><center>${d.name}</center></b><p></p><b>Cases:</b> ${d.cases}<br><b>Deaths:</b> ${d.deaths}<br><b>Cases per million:</b> ${d.cases_per_million}<br><b>Deaths per million:</b> ${d.deaths_per_million}<br><b>Population:</b> ${d.population}`);
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
  
  svg.call(clusterlegend)
  
  svg.call(radiuslegend);
 
  return svg.node();
}


function _8(md){return(
md` --------------------`
)}

function _9(md){return(
md` This plot helps us to detect outliers in each cluster and to validate if the clusters make sense. As we can see, all of them are together except for three countries, with a large population.
`
)}

function _10(md){return(
md`### COVID CASES PER COUNTRY FOR EACH CLUSTER`
)}

function* _chart(d3,width,height,xAxis,x,margin,cluster_num,y,beeswarmData,radius,padding,size,color,tooltip)
{
  
  const svg = d3.create('svg')
    .attr('viewBox', [0, 0, width, height]);
  
  svg.append('g').call(xAxis);
  
  svg.selectAll('.line-decade')
    .data(x.ticks())
    .join('line')
    .attr('class', 'line-decade')
    .attr('x1', d => x(d))
    .attr('x2', d => x(d))
    .attr('y1', 10)
    .attr('y2', height - margin.top)
    .attr('stroke-width', .4)
    .attr('stroke', 'lightgray');
  
  svg.selectAll('.label-cluster')
    .data(cluster_num)
    .join('text')
    .attr('class', 'label-cluster')
    .attr('x', 0)
    .attr('y', d => y(d))
    .attr('text-align', 'right')
    .attr('alignment-baseline', 'right')
    .text(d => d)
    .style('font-family', 'Helvetica')
    .style('font-size', '14px');
  
 
  const simulation = d3.forceSimulation(beeswarmData)
    .force('x', d3.forceX((d) => x(d.total_cases)).strength(5))
    .force('y', d3.forceY((d) => y(d.cluster_num)))
    .force('collide', d3.forceCollide(radius + padding))
    .stop();
  
  svg.selectAll('circle')
    .data(beeswarmData)
    .join('circle')
    .attr('cx', (d) => x(d.total_cases))
    .attr('cy', (d) => y(d.cluster_num))
    .attr('r', (d) => size(d.population)*3.5)
    .attr('fill', (d) => color(d.cluster_num))
    .attr('opacity', .5)
    .attr("stroke", "#fff")
    .attr("stroke-width", 0.5)
    .on("mouseover", function(e,d) {
                    d3.select(this)
                       .attr('stroke-width', '1.7')
                       .attr("stroke", "black");
                    tooltip
                      .html(`<b><center>${d.country}</center></b><p></p><b>Cases:</b> ${d.total_cases}<br><b>Deaths:</b> ${d.total_deaths}<br><b>Cases per million:</b> ${d.total_cases_per_million}<br><b>Deaths per million:</b> ${d.total_deaths_per_million}<br><b>Population:</b> ${d.population}`);
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
 
  for(let i = 0; i < 1000000; i++) {
    simulation.tick();      

    svg.selectAll('circle')
      .data(beeswarmData)
      .attr('cx', (d) => d.x)
      .attr('cy', (d) => d.y);

    yield svg.node();
  }
}


function _12(md){return(
md` --------------------`
)}

function _13(md){return(
md`A scatterplot is an effective solution to show patterns. To illustrate the countries of each cluster that have similarities between them, we selected six different dimensions and we compared them with covid cases per million. We can see that in all of them the colors (clusters) are mostly together.

`
)}

function _14(md){return(
md`### COVID CASES PER MILLION COMPARED WITH DIFFERENT DIMENSIONS`
)}

function _keylv(html,keys)
{
  const form = html`<form>${Object.assign(html`<select name=select>${keys.map(key => Object.assign(html))}
<option value="human_development_index">Human Development Index</option>
<option value="human_development_index">Human Development Index</option>
<option value="gdp_per_capita">GDP per capita</option>
<option value="hospital_beds_per_thousand">Hospital beds per thousand</option>
<option value="median_age">Median age</option>
<option value="aged_70_older">Older than 70</option>
<option value="cardiovasc_death_rate">Cardiovascular death rate</option>

</select>`, {value: "human_development_index"})} <i style="font-size:smaller;">Select a dimension</i>`;
  form.select.onchange = () => (form.value = form.select.value, form.dispatchEvent(new CustomEvent("input")));
  form.select.onchange();
  return form;
}


function _scatterplot(d3,width2,height2,xAxis2,yAxis2,grid,data,x2,keylv,y2,r,color,tooltip,margin2)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width2, height2]);

  svg.append("g")
      .call(xAxis2);

  svg.append("g")
      .call(yAxis2);

  svg.append("g")
      .call(grid);

  svg.selectAll("circle")
      .data(data)
      .join("circle")
      .attr("cx", d => x2(d[keylv]))
      .attr("cy", d => y2(d.total_cases_per_million))
      .attr("r", d => r(d.population))
      .attr("fill", d => color(d.cluster_num))
      .attr("opacity", .6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 0.5)
      .on("mouseover", function(e,d) {
                    d3.select(this)
                       .attr('stroke-width', '1.7')
                       .attr("stroke", "black");
                    tooltip
                      .html(`<b><center>${d.location}</center></b><p></p><b>Cases per million:</b> ${d.total_cases_per_million}<br><b>${keylv}: </b>${d[keylv]}<br><b>Population:</b> ${d.population}`);
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

  svg.append("text")
    .text([keylv])
    .attr("dx", width2 -180)
    .attr("dy", height2 - margin2.top + margin2.bottom - 20)
    .attr("font-family", "Helvetica")
    .attr("font-size", 10)
    .attr("opacity", .5)
  
  svg.append("text")
    .text("Cases per million")
    .attr("x2" -20, -margin2.top + 40)
    .attr("dy", margin2.top - 25)
    .style("text-anchor", "start")
    .attr("y2", 10)
    .attr("font-family", "Helvetica")
    .attr("font-size", 10)
    .attr("opacity", .5)
  
  /*
  svg.append("g")
      .attr("font-family", "Helvetica")
      .attr("font-size", 5)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("dy", "0.35em")
      .attr("x", d => x(d.gdp_per_capita) + 7)
      .attr("y", d => y(d.total_cases_per_million))
      .text(d => d.location);
  */
  return svg.node();
}


function _17(md){return(
md` --------------------`
)}

function _18(md){return(
md`## Improvements`
)}

function _19(md){return(
md` We found some difficulties in programming these visualizations, mostly due to our proficiency with D3 and the timeframe of the project. These are the most important things that should have been changed or improved with more available time:

- **World map:** The bubbles for Singapore and Malta are shown in the left top corner because in the json file *world* (where there are all the features of the countries), little countries like these two are not in the array.
- **Beeswarm plot:** Maybe it would be more visible if the bubbles were separated and they didn't overlap between them. Also, a legend would help to understand that the radius of the circles represent the population of the country. Lastly, (this is a minor issue) there's a gray line on the left that shouldn't be there.
- **Scatterplot:** There is a problem with the displayed text from the different variables. On the x axis and on the popup it is shown as the variable name from the data and not well written with spaces and capital letters.
`
)}

function _20(md){return(
md` --------------------`
)}

function _21(md){return(
md `## Conclusions`
)}

function _22(md){return(
md `We think that these visualizations give the necessary information to understand the characteristics of the countries and their information patterns, from the four clusters. Luckily, they were not complicated visualizations and contained minor issues. As mentioned, there are some minor problems that should be corrected.
`
)}

function _23(md){return(
md` --------------------`
)}

function _24(md){return(
md`## World map: Appendix`
)}

function _OWiDdata(FileAttachment){return(
FileAttachment("CountryClustered@1.csv").csv()
)}

function _mapdata(OWiDdata,world,path){return(
Object.entries(OWiDdata).map(d=>{
  const countryArrayIndex = world.features.findIndex(dat => dat.id === d[1].iso_code);
  return {name:d[1].location,
          cases:countryArrayIndex !== -0 ? d[1].total_cases : NaN,
          deaths:countryArrayIndex !== -0 ? d[1].total_deaths : NaN,
          cases_per_million:countryArrayIndex !== -0 ? d[1].total_cases_per_million : NaN,
          deaths_per_million:countryArrayIndex !== -0 ? d[1].total_deaths_per_million : NaN,
          population:countryArrayIndex !== -0 ? d[1].population : NaN,
          position: path.centroid(world.features[countryArrayIndex]) || [0,0],
          cluster:d[1].cluster_num}
})
)}

function _dataGroup(d3,OWiDdata){return(
d3.groups(OWiDdata, d => d.cluster_num)
)}

function _world(FileAttachment){return(
FileAttachment("world-110m.geo.json").json()
)}

function _world_no_antarctica(world){return(
{
    type: "FeatureCollection",
    geometries: world.features.filter(d=> d.properties.name !== "Antarctica")
  }
)}

function _worldTopojson(FileAttachment){return(
FileAttachment("land-50m.json").json()
)}

function _projection(d3){return(
d3.geoNaturalEarth1()
)}

function _path(d3,projection){return(
d3.geoPath(projection)
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

function _outline(){return(
{type: "Sphere"}
)}

function _radiuslegend(radius){return(
svg => {
  const radiuslegend = svg.append("g")
      .attr("fill", "#777")
      .attr("transform", "translate(750,450)")
      .attr("text-anchor", "middle")
      .style("font", "10px sans-serif")
    .selectAll("g")
      .data(radius.ticks(4).slice(1))
    .join("g");

  radiuslegend.append('circle')
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("cy", d => -radius(d))
      .attr("r", radius);

  radiuslegend.append("text")
      .attr("y", d => -2 * radius(d))
      .attr("dy", "1.3em")
      .text(radius.tickFormat(4, "s"));
   
  return radiuslegend;
}
)}

function _clusterlegend(dataGroup,legendOrigin,labelHeight,color){return(
svg => {
  const clusterlegend = svg.selectAll(".legend")
        .data(dataGroup)
        .enter();
   
  clusterlegend
    .append('text')
    .text(d => d[0])
    .attr('x', legendOrigin[0] + labelHeight * 1.2 -40)
    .attr('y', (d,i) => legendOrigin[1] + labelHeight + labelHeight * 1.2 *i +220)
    .style('font-family', 'Helvetica')
    .style('font-size', `${labelHeight-3}px`)
    .attr("opacity", 0.7);
  
  clusterlegend
    .append('circle')
    .attr('cx', legendOrigin[0] -32)
    .attr('cy', (d,i) => legendOrigin[1] + labelHeight * 1.25 * i +232)
    .attr('r', 8)
    .attr('width', labelHeight)
    .attr('height', labelHeight)
    .attr('fill', (d) => color(d[0]))
    .attr("fill-opacity",".4")
    .attr('stroke', (d) => color(d[0]))
    //.style('stroke-width', '1.4px');
  
   
 svg.append("text")
    .attr('x', legendOrigin[0] + labelHeight * 1.2 -40)
    .attr('y', (d,i) => legendOrigin[1] + labelHeight + labelHeight * 1.2 *i +195)
    .attr("text-anchor", "middle")  
    .style("font-size", "15px") 
    .attr("font-family", "Helvetica")
    .attr('font-weight', 'bold')
    .text("Clusters")
    .attr("opacity", 0.6); 
  
    
  return clusterlegend;
}
)}

function _labelHeight(){return(
18
)}

function _legendOrigin(){return(
[100,50]
)}

function _radius(d3,OWiDdata){return(
d3.scaleSqrt([0, d3.max(OWiDdata, d => d.total_cases)], [0, 50])
)}

function _format(d3){return(
d3.format(",.0f")
)}

function _d3(require){return(
require("d3@6")
)}

function _width(){return(
1000
)}

function _height(){return(
500
)}

function _margin(){return(
{
  left: 120,
  right: 120,
  top: 100,
  bottom: 0
}
)}

function _tooltip(d3){return(
d3
    .select("body")
    .append("div")
    .attr("class", "svg-tooltip")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style('padding', '10px')
    .style('background', 'rgba(0,0,0,0.6)')
    .style('border-radius', '6px')
    .style('color', '#fff')
)}

function _styles(html){return(
html`
  <style>

  .svg-tooltip {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple   Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: whitesmoke;
    border-radius: .1rem;
    border: 1px solid black;
    color: black;
    display: block;
    font-size: 14px;
    max-width: 320px;
    padding: .2rem .4rem;
    position: absolute;
    text-overflow: ellipsis;
    white-space: pre;
    z-index: 300;
    visibility: hidden;
  }
</style>`
)}

function _50(md){return(
md` --------------------`
)}

function _51(md){return(
md`## Beeswarm plot: Appendix`
)}

async function _beeswarmData(d3,FileAttachment)
{
  return d3.csvParse(
    await FileAttachment('CountryClustered@1.csv').text(),
    d => ({
      total_cases: d.total_cases,
      cluster_num: d.cluster_num,
      country: d.location,
      total_deaths: d.total_deaths,
      total_cases_per_million: d.total_cases_per_million,
      total_deaths_per_million: d.total_deaths_per_million,
      population: +d.population
    })
  );
}


function _color(d3,cluster_num){return(
d3.scaleOrdinal()
  .domain(cluster_num)
  .range(d3.schemeTableau10)
)}

function _y(d3,cluster_num,height,margin){return(
d3.scaleBand()
  .domain(cluster_num)
  .range([height + margin.bottom, margin.top])
)}

function _xAxis(height,margin,d3,x){return(
g => g
  .attr('transform', `translate(0,${height - margin.top})`)
  .call(d3.axisBottom(x))
)}

function _x(d3,margin,width){return(
d3.scaleLinear()
  .domain([0,16000000])
  .nice()
  .range([margin.left, width - margin.right])
)}

function _size(d3,popExtent){return(
d3.scaleLinear()
  .domain(popExtent)
  .nice()
  .range([3, 20])
)}

function _popExtent(beeswarmData,d3)
{
  const bounds = beeswarmData.map((d) => d.population).sort(d3.ascending);
  return [bounds[0], bounds[bounds.length - 1]];
}


function _dataExtent(beeswarmData,d3)
{
  const bounds = beeswarmData.map((d) => d.total_cases).sort(d3.ascending);
  return [bounds[0], bounds[bounds.length - 1]];
}


function _cluster_num(){return(
['1', '2', '3', '4']
)}

function _padding(){return(
1.5
)}

function _62(md){return(
md` --------------------`
)}

function _63(md){return(
md`## Scatterplot: Appendix`
)}

async function _data(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("CountryClustered@1.csv").text(), d3.autoType)
)}

function _selectedData(data){return(
data.map(d => ({
  location:d.location,
  population: d.population,
  total_cases:d.total_cases,
  total_deaths:d.total_deaths,
  total_cases_per_million:d.total_cases_per_million,
  total_deaths_per_million:d.total_deaths_per_million,
  "Median age": d.median_age,
  "Older than 70":d.aged_70_older,
  "GDP per capita": d.gdp_per_capita,
  "Cardiovascular death rate":d.cardiovasc_death_rate,
  "Hospital beds per thousand":d.hospital_beds_per_thousand,
  "Human Development Index":d.human_development_index
 })).sort((a,b) => b.population - a.population)
)}

function _keys(selectedData){return(
Object.keys(selectedData[0]).slice(6,12)
)}

function _x2(d3,data,keylv,margin2,width2){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d[keylv])).nice()
    .range([margin2.left, width2 - margin2.right])
)}

function _y2(d3,data,height2,margin2){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d.total_cases_per_million)).nice()
    .range([height2 - margin2.bottom, margin2.top])
)}

function _xAxis2(height2,margin2,d3,x2,width,width2,data){return(
g => g
    .attr("transform", `translate(0,${height2 - margin2.bottom})`)
    .call(d3.axisBottom(x2).ticks(width / 80))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x2", width2)
        .attr("y2", margin2.bottom - 4)
        .attr("fill", "currentColor")
        .attr("text-anchor", "end")
        .text(data.x2))
)}

function _yAxis2(margin2,d3,y2,data){return(
g => g
    .attr("transform", `translate(${margin2.left},0)`)
    .call(d3.axisLeft(y2))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x2", -margin2.left)
        .attr("y2", 10)
        .attr("fill", "currentColor")
        .attr("text-anchor", "start")
        .text(data.y2))
)}

function _grid(x2,margin2,height2,y2,width2){return(
g => g
    .attr("stroke", "currentColor")
    .attr("stroke-opacity", .05)
    .call(g => g.append("g")
      .selectAll("line")
      .data(x2.ticks())
      .join("line")
        .attr("x1", d => .2 + x2(d))
        .attr("x2", d => .2 + x2(d))
        .attr("y1", margin2.top)
        .attr("y2", height2 - margin2.bottom))
    .call(g => g.append("g")
      .selectAll("line")
      .data(y2.ticks(5))
      .join("line")
        .attr("y1", d => 0.4 + y2(d))
        .attr("y2", d => 0.4 + y2(d))
        .attr("x1", margin2.left)
        .attr("x2", width2 - margin2.right))
)}

function _73(d3,data){return(
d3.max(data, d => d.total_cases_per_million)
)}

function _74(d3,data){return(
d3.min(data, d => d.total_cases_per_million)
)}

function _r(d3,data){return(
d3.scaleSqrt()
    .domain(d3.extent(data, d => d.population))
    .range([1, 20])
)}

function _height2(){return(
350
)}

function _width2(){return(
700
)}

function _margin2(){return(
{top: 35, right: 60, bottom: 45, left: 80}
)}

function _bubblemap2(d3,world,path,mapdata2,radius2,color,tooltip,clusterlegend2,radiuslegend2)
{
  const svg = d3.create("svg")
      .attr("width", 1000)
      .attr("height", 500);

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


function _data1(FileAttachment){return(
FileAttachment("data9.json").json()
)}

function _mapdata2(data1,world,path){return(
Object.entries(data1).map(d=>{
  const countryArrayIndex = world.features.findIndex(dat => dat.id === d[1].CCode);
  //const arrpos = NaN;
  return {country:d[1].Country,
          degree: d[1].Degree,// : NaN,
          language:d[1].Language, //: NaN ,
          //cases:countryArrayIndex !== -0 ? d[1].total_cases : NaN,
          //deaths:countryArrayIndex !== -0 ? d[1].total_deaths : NaN,
          //cases_per_million:countryArrayIndex !== -0 ? d[1].total_cases_per_million : NaN,
         // deaths_per_million:countryArrayIndex !== -0 ? d[1].total_deaths_per_million : NaN,
          population:countryArrayIndex !== -0 ? d[1].Population : NaN,
          position: path.centroid(world.features[countryArrayIndex]) || [0,0], //[d[1].Longitude, d[1].Latitude], 
          cluster:d[1].Degree}
})
)}

function _dataGroup2(d3,data1){return(
d3.groups(data1, d => d.Degree)
)}

function _clusterlegend2(dataGroup2,legendOrigin,labelHeight,color){return(
svg => {
  const clusterlegend2 = svg.selectAll(".legend")
        .data(dataGroup2)
        .enter();
  
 
  clusterlegend2
    .append('text')
    .text(d => d[0])
    .attr('x', legendOrigin[0] + labelHeight * 1.2 -40)
    .attr('y', (d,i) => legendOrigin[1] + labelHeight + labelHeight * 1.2 *i +220)
    .style('font', 'Times New Roman')
    //.attr("stroke", "#fff")
    .attr('fill', "#fff")
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
    .attr('fill-opacity',".4")
    .attr('stroke', (d) => color(d[0]))
    .style('stroke-width', '1.4px');
    
  
   
 svg.append("text")
    .attr('x', legendOrigin[0] + labelHeight * 1.2 -40)
    .attr('y', (d,i) => legendOrigin[1] + labelHeight + labelHeight * 1.2 *i +195)
    .attr('text-anchor', "middle")  
    .style('font-size', "15px") 
    .attr('font', "Times New Roman")
    .attr('font-weight', 'bold')
    //.attr("stroke", "#fff")
    .attr('fill', "#fff")
    .text("Level of Risk")
    .attr("opacity", 0.6); 
  
    
  return clusterlegend2;
}
)}

function _radius2(d3,data1){return(
d3.scaleSqrt([0, d3.max(data1, d => d.Population)], [0, 50])
)}

function _radiuslegend2(radius2){return(
svg => {
  const radiuslegend2 = svg.append("g")
      .attr("fill", "#ffdd40")
      .attr("transform", "translate(750,450)")
      .attr("text-anchor", "middle")
      .style("font", "10px Times New Roman")
    .selectAll("g")
      .data(radius2.ticks(4).slice(1))
    .join("g");

  radiuslegend2.append('circle')
      .attr("fill", "none")
      .attr("stroke", "#ffdd40")
      .attr("cy", d => -radius2(d))
      .attr("r", radius2);

  radiuslegend2.append("text")
      .attr("y", d => -2 * radius2(d))
      .attr("dy", "1.3em")
      .text(radius2.tickFormat(4, "s"));
   
  return radiuslegend2;
}
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["CountryClustered@1.csv", {url: new URL("./files/fc2c06f0952f1669b7cc87db4e589926fc422f268c16a09fc2ba98f14ad0ca72f1baa33241cb0935df9e0dfde1a412d35f17c11ee399f20fffb4648926fe47a8.csv", import.meta.url), mimeType: "text/csv", toString}],
    ["world-110m.geo.json", {url: new URL("./files/f3fd67b739213db23653aa05dbc7420f340139cb2b4d52afb58c57a6b13631204ff6c3c031f3936e77add84bcef4a6fabb3a98b1f20534f563fde0de51b49762.json", import.meta.url), mimeType: "application/json", toString}],
    ["land-50m.json", {url: new URL("./files/7b6ff41e373e01d7b5b95773e297d40625bd9ccc1936a023a066a7edd8da5eaadec4ab7a565303539e41e001f2e6730f3ee1e259fae4f19dc59e8d6b2f2ec22b.json", import.meta.url), mimeType: "application/json", toString}],
    ["data9.json", {url: new URL("./files/0e86629ffb2a98193d7a73dd93d9cd3940f44eeec15272b6f19cf3c57bafb7d915917228da8ac53051bdb6938f55e7a6ef26c2eec5c0e50b6418f758ff6d3aec.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer()).define(["md"], _3);
  main.variable(observer()).define(["md"], _4);
  main.variable(observer()).define(["md"], _5);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("bubblemap")).define("bubblemap", ["d3","width","height","world_no_antarctica","path","mapdata","radius","color","tooltip","clusterlegend","radiuslegend"], _bubblemap);
  main.variable(observer()).define(["md"], _8);
  main.variable(observer()).define(["md"], _9);
  main.variable(observer()).define(["md"], _10);
  main.variable(observer("chart")).define("chart", ["d3","width","height","xAxis","x","margin","cluster_num","y","beeswarmData","radius","padding","size","color","tooltip"], _chart);
  main.variable(observer()).define(["md"], _12);
  main.variable(observer()).define(["md"], _13);
  main.variable(observer()).define(["md"], _14);
  main.variable(observer("viewof keylv")).define("viewof keylv", ["html","keys"], _keylv);
  main.variable(observer("keylv")).define("keylv", ["Generators", "viewof keylv"], (G, _) => G.input(_));
  main.variable(observer("scatterplot")).define("scatterplot", ["d3","width2","height2","xAxis2","yAxis2","grid","data","x2","keylv","y2","r","color","tooltip","margin2"], _scatterplot);
  main.variable(observer()).define(["md"], _17);
  main.variable(observer()).define(["md"], _18);
  main.variable(observer()).define(["md"], _19);
  main.variable(observer()).define(["md"], _20);
  main.variable(observer()).define(["md"], _21);
  main.variable(observer()).define(["md"], _22);
  main.variable(observer()).define(["md"], _23);
  main.variable(observer()).define(["md"], _24);
  main.variable(observer("OWiDdata")).define("OWiDdata", ["FileAttachment"], _OWiDdata);
  main.variable(observer("mapdata")).define("mapdata", ["OWiDdata","world","path"], _mapdata);
  main.variable(observer("dataGroup")).define("dataGroup", ["d3","OWiDdata"], _dataGroup);
  main.variable(observer("world")).define("world", ["FileAttachment"], _world);
  main.variable(observer("world_no_antarctica")).define("world_no_antarctica", ["world"], _world_no_antarctica);
  main.variable(observer("worldTopojson")).define("worldTopojson", ["FileAttachment"], _worldTopojson);
  main.variable(observer("projection")).define("projection", ["d3"], _projection);
  main.variable(observer("path")).define("path", ["d3","projection"], _path);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer("outline")).define("outline", _outline);
  main.variable(observer("radiuslegend")).define("radiuslegend", ["radius"], _radiuslegend);
  main.variable(observer("clusterlegend")).define("clusterlegend", ["dataGroup","legendOrigin","labelHeight","color"], _clusterlegend);
  main.variable(observer("labelHeight")).define("labelHeight", _labelHeight);
  main.variable(observer("legendOrigin")).define("legendOrigin", _legendOrigin);
  main.variable(observer("radius")).define("radius", ["d3","OWiDdata"], _radius);
  main.variable(observer("format")).define("format", ["d3"], _format);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  main.variable(observer("width")).define("width", _width);
  main.variable(observer("height")).define("height", _height);
  main.variable(observer("margin")).define("margin", _margin);
  const child1 = runtime.module(define1);
  main.import("form", child1);
  const child2 = runtime.module(define2);
  main.import("legend", child2);
  main.variable(observer("tooltip")).define("tooltip", ["d3"], _tooltip);
  main.variable(observer("styles")).define("styles", ["html"], _styles);
  main.variable(observer()).define(["md"], _50);
  main.variable(observer()).define(["md"], _51);
  main.variable(observer("beeswarmData")).define("beeswarmData", ["d3","FileAttachment"], _beeswarmData);
  main.variable(observer("color")).define("color", ["d3","cluster_num"], _color);
  main.variable(observer("y")).define("y", ["d3","cluster_num","height","margin"], _y);
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x"], _xAxis);
  main.variable(observer("x")).define("x", ["d3","margin","width"], _x);
  main.variable(observer("size")).define("size", ["d3","popExtent"], _size);
  main.variable(observer("popExtent")).define("popExtent", ["beeswarmData","d3"], _popExtent);
  main.variable(observer("dataExtent")).define("dataExtent", ["beeswarmData","d3"], _dataExtent);
  main.variable(observer("cluster_num")).define("cluster_num", _cluster_num);
  main.variable(observer("padding")).define("padding", _padding);
  main.variable(observer()).define(["md"], _62);
  main.variable(observer()).define(["md"], _63);
  main.variable(observer("data")).define("data", ["d3","FileAttachment"], _data);
  main.variable(observer("selectedData")).define("selectedData", ["data"], _selectedData);
  main.variable(observer("keys")).define("keys", ["selectedData"], _keys);
  main.variable(observer("x2")).define("x2", ["d3","data","keylv","margin2","width2"], _x2);
  main.variable(observer("y2")).define("y2", ["d3","data","height2","margin2"], _y2);
  main.variable(observer("xAxis2")).define("xAxis2", ["height2","margin2","d3","x2","width","width2","data"], _xAxis2);
  main.variable(observer("yAxis2")).define("yAxis2", ["margin2","d3","y2","data"], _yAxis2);
  main.variable(observer("grid")).define("grid", ["x2","margin2","height2","y2","width2"], _grid);
  const child3 = runtime.module(define1);
  main.import("form", child3);
  main.variable(observer()).define(["d3","data"], _73);
  main.variable(observer()).define(["d3","data"], _74);
  main.variable(observer("r")).define("r", ["d3","data"], _r);
  main.variable(observer("height2")).define("height2", _height2);
  main.variable(observer("width2")).define("width2", _width2);
  main.variable(observer("margin2")).define("margin2", _margin2);
  main.variable(observer("bubblemap2")).define("bubblemap2", ["d3","world","path","mapdata2","radius2","color","tooltip","clusterlegend2","radiuslegend2"], _bubblemap2);
  main.variable(observer("data1")).define("data1", ["FileAttachment"], _data1);
  main.variable(observer("mapdata2")).define("mapdata2", ["data1","world","path"], _mapdata2);
  main.variable(observer("dataGroup2")).define("dataGroup2", ["d3","data1"], _dataGroup2);
  main.variable(observer("clusterlegend2")).define("clusterlegend2", ["dataGroup2","legendOrigin","labelHeight","color"], _clusterlegend2);
  main.variable(observer("radius2")).define("radius2", ["d3","data1"], _radius2);
  main.variable(observer("radiuslegend2")).define("radiuslegend2", ["radius2"], _radiuslegend2);
  return main;
}
