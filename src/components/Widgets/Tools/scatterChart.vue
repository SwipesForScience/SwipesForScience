<template>
  <svg id="chart">

  </svg>
</template>

<script>
  const d3 = require('d3');

  export default {
    name: 'scatterChart',
    props: {
      chartdata: {
        required: true,
        type: Array,
      },
    },
    watch: {
      chartdata() {
        // set domain again in case data changed bounds
        this.xScale.domain([0, this.chartdata.length]);
        this.yScale.domain([0, d3.max(this.chartdata)]);

        // redraw axis
        this.svg.selectAll('.x.axis').call(this.xAxis);
        this.svg.selectAll('.y.axis').call(this.yAxis);


        // add data
        this.svg
          .selectAll('.dot')
          .data(this.chartdata)
          .enter()
          .append('circle')
          .attr('class', 'dot');

        // update data
        this.svg
          .selectAll('.dot')
          .attr('cx', (d, i) => this.xScale(i))
          .attr('cy', d => this.yScale(d));

        // remove dots
        this.svg
          .selectAll('.dot')
          .data(this.chartdata)
          .exit()
          .remove();


          // d3's line generator
        const lineGenerator = d3.line()
          .x((d, i) => this.xScale(i)) // set the x values for the line generator
          .y(d => this.yScale(d)) // set the y values for the line generator
          .curve(d3.curveMonotoneX); // apply smoothing to the line

        this.line
          .datum(this.chartdata)
          .attr('d', lineGenerator);
      },
    },
    data() {
      return {
        svg: null,
        xScale: null,
        yScale: null,
        xAxis: null,
        yAxis: null,
        line: null,
      };
    },
    mounted() {
      const { svg, xScale, yScale, xAxis, yAxis, line } = this.renderAxes();
      this.svg = svg;
      this.xScale = xScale;
      this.yScale = yScale;
      this.xAxis = xAxis;
      this.yAxis = yAxis;
      this.line = line;
    },
    computed: {

    },
    methods: {
      renderAxes() {
        // define margins on the plot -- this will give room for axes labels, titles
        const margin = { top: 20, right: 20, bottom: 30, left: 60 };

        // total dimensions are 500x300
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        // value -> display
        const xScale = d3.scaleLinear().range([0, width]);
        const yScale = d3.scaleLinear().range([height, 0]);
        // in SVG, y=0 is at the top, so we switch the order

        const svg = d3
          .select('#chart')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left},${margin.top})`);

        const xAxis = d3.axisBottom(xScale); // axis object
        const yAxis = d3.axisLeft(yScale);

        // x-axis
        svg
          .append('g')
          .attr('class', 'x axis')
          // take X to bottom of SVG
          .attr('transform', `translate(0,${height})`)
          .call(xAxis)
          .append('text')
          .attr('class', 'label')
          .attr('x', width)
          .attr('y', -6)
          .attr('font-size', '1em')
          .style('text-anchor', 'end')
          .style('fill', 'gray')
          .text('epoch');

        // y-axis
        svg
          .append('g')
          .attr('class', 'y axis')
          .call(yAxis)
          .append('text')
          .attr('class', 'label')
          .attr('transform', 'rotate(-90)')
          .attr('y', 6)
          .attr('dy', '.71em')
          .attr('font-size', '1em')
          .style('text-anchor', 'end')
          .style('fill', 'gray')
          .text('crossentopy loss');

        const line = svg.append('path')
          .attr('class', 'line'); // Assign a class for styling

        return {
          svg,
          xScale,
          yScale,
          xAxis,
          yAxis,
          line,
        };
      },
    },
  };
</script>

<style>
  .dot {
    stroke: white; /*circle border*/
    fill: steelblue; /*circle color*/
    r: 5; /*circle radius*/
  }

  .line {
    fill: none;
    stroke: steelblue;
    stroke-width: 3;
  }

  .overlay {
    fill: none;
    pointer-events: all;
  }
</style>
