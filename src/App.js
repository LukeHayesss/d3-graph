import { useEffect, useRef, useState } from 'react';
import './App.css';
import * as d3 from 'd3';

function App() {
const initialData = [
  {
    name: "Car",
    value: 10,
  },
  {
    name: "Food",
    value: 3,
  },
  {
    name: "Telephone",
    value: 9,
  },
  {
    name: "Electricity",
    value: 7,
  },
  {
    name: "Cinema",
    value: 7,
  },
];

const width = 500;
const height = 150;
const padding = 20;
const maxValue = 20;

const [chartData, setChartData] = useState(initialData);
const svgRef = useRef();

//setup data generator and SVG canvas//

const newData = () => chartData.map(
  function (d) {
    d.value = Math.floor (
      Math.random() * (maxValue + 1)
    )
    return d
  }
)
//x scales//
useEffect (
  () => {
    const xScale = d3.scalePoint()
    .domain(chartData.map((d) => d.name))
    .range([(0 + padding), (width - padding)])

//y scales //
const yScale = d3.scaleLinear()
.domain([0, d3.max(chartData, function (d) {return d.value})])
.range([(height - padding), (0 + padding)])

//setup lines//
const line = d3.line()
.x((d) => xScale(d.name))
.y((d) => yScale(d.value))
.curve(d3.curveMonotoneX)

//draw line//
d3.select(svgRef.current)
.select('path')
.attr('d', (value) => line(chartData))
.attr('fill', 'none')
.attr('stroke', 'white')

//setup functions for x and y lines//
const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)

//draw x and y axis//
d3.select('#xaxis').remove()
d3.select(svgRef.current)
.append('g')
.attr('transform', `translate(0, ${height - padding})`)
.attr('id', 'xaxis')
.call(xAxis)

d3.select('#yaxis').remove()
d3.select(svgRef.current)
.append('g')
.attr('transform', `translate(${padding}, 0)`)
.attr('id', 'yaxis')
.call(yAxis)

}, [chartData]
)

return (
  <div className='App'>
    <header className='App-header'>
      <svg id='chart' ref={svgRef} viewBox='0 0 500 150'>
        <path d='' fill='none' stroke='white' strokeWidth='5'/>
        </svg>

        <p>
          <button type='button' onClick={() => setChartData(newData())}>
            Click to refresh expenses data
          </button>
        </p>
    </header>
  </div>
);
}

export default App;
