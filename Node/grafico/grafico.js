function generateChartPage(players, pageIndex, totalPages) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gráfico de Overall dos Jogadores - Página ${pageIndex + 1}</title>
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <style>
            .bar {
                fill: steelblue;
            }
            .bar:hover {
                fill: orange;
            }
            .axis-label {
                font: 10px sans-serif;
            }
        </style>
    </head>
    <body>
        <h1>Gráfico de Overall dos Jogadores - Página ${pageIndex + 1}</h1>
        <svg width="600" height="400"></svg>
        <script>
            const jogadores = ${JSON.stringify(players)};
            const margin = {top: 20, right: 30, bottom: 40, left: 40};
            const width = 600 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;
  
            const svg = d3.select("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
            const x = d3.scaleBand()
                .domain(jogadores.map(d => d.nome))
                .range([0, width])
                .padding(0.1);
  
            const y = d3.scaleLinear()
                .domain([0, d3.max(jogadores, d => d.overall)])
                .nice()
                .range([height, 0]);
  
            svg.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "rotate(-45)")
                .style("text-anchor", "end");
  
            svg.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(y));
  
            svg.selectAll(".bar")
                .data(jogadores)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.nome))
                .attr("y", d => y(d.overall))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.overall));
        </script>
        <div>
            ${pageIndex > 0 ? `<a href="/chart?page=${pageIndex}">Anterior</a>` : ''}
            ${pageIndex < totalPages - 1 ? `<a href="/chart?page=${pageIndex + 2}">Próxima</a>` : ''}
        </div>
    </body>
    </html>
    `;
  }

  module.exports = generateChartPage;