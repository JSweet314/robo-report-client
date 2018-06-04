/* eslint-disable id-blacklist */

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } 
  from 'victory';
import { mapFCCDataToStateNumbers } from '../../helpers';
import './style.css';

const BarChart = ({ fccData }) => {
  const barData = mapFCCDataToStateNumbers(fccData);
  const states = barData.map(point => point.state);
  return (
    <div className='bar-chart'>
      <VictoryChart>
        <VictoryLabel
          text={`No. of Reports Filed Yesterday By State`} 
          dx={140}
          dy={25}
          style={{ fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 10 }}
        />
        <VictoryAxis
          crossAxis={false}
          tickValues={states}
          style={{
            ticks: {
              padding: 5,
              margin: 0,
              size: 2,
              stroke: 'black',
              strokeOpacity: 1
            },
            tickLabels: {
              angle: -90,
              fontSize: '5px',
              fontFamily: 'inherit',
              fillOpacity: 1,
              padding: 0,
              margin: 0
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            ticks: {
              padding: 0,
              margin: 0,
              size: 2,
              stroke: 'black',
              strokeOpacity: 1
            },
            tickLabels: {
              fontSize: '8px',
              fontFamily: 'inherit',
              fillOpacity: 1
            }
          }}
          padding={5}
          margin={5}
        />
        <VictoryBar 
          labelComponent={
            <VictoryTooltip 
              padding={0}
              margin={0}
              dy={-5}
              pointerLength={5}
              style={{fontSize: 10}}
            />
          }
          style={{ data: { fill: "blue", width: 5 } }}
          data={barData} 
          x='state'
          y='numberOfReports'
          alignment='start'
          margin={0}
          padding={0}
        />
      </VictoryChart>
    </div>
  );
};

BarChart.propTypes = {
  fccData: PropTypes.array.isRequired
};

export default BarChart;