/* eslint-disable id-blacklist */

import React from 'react';
import PropTypes from 'prop-types';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip } 
  from 'victory';
import { mapFCCDataToStateNumbers } from '../../helpers';
import './style.css';
import moment from 'moment';

const BarChart = ({ fccData }) => {
  const barData = mapFCCDataToStateNumbers(fccData);
  const states = barData.map(point => point.state);
  const indepTicks = states.map((state, index) => index);
  const date = moment().subtract(1, 'day').format('MMM D, YYYY');
  return (
    <div className='stateReport-barchart'>
      <VictoryChart>
        <VictoryLabel
          text={`Number of Reports by State for ${date}`} 
          dx={150}
          dy={25}
          style={{fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 10}}
        />
        <VictoryAxis
          label='States'
          tickValues={indepTicks}
          tickFormat={states}
          style={{
            ticks: {
              padding: 10,
              size: 2,
              stroke: 'black',
              strokeOpacity: 1
            },
            tickLabels: {
              fontSize: '5px',
              fontFamily: 'inherit',
              fillOpacity: 1,
              padding: -5,
              margin: -5
            }
          }}
        />
        <VictoryAxis
          dependentAxis
          label='# of Reports'
          style={{
            ticks: {
              padding: 10,
              size: 2,
              stroke: 'black',
              strokeOpacity: 1
            },
            tickLabels: {
              fontSize: '8px',
              fontFamily: 'inherit',
              fillOpacity: 1,
              padding: -5,
              margin: -5
            },
            labels: {
              padding: -5,
              margin: -5
            }
          }}
        />
        <VictoryBar 
          labelComponent={
            <VictoryTooltip 
              padding={0}
              margin={0}
              dy={-5}
              pointerLength={5}
              style={{fontSize: 5}}
            />
          }
          style={{ data: { fill: "blue", width: 5 } }}
          data={barData} 
          x='state'
          y='numberOfReports'
        />
      </VictoryChart>
    </div>
  );
};

BarChart.propTypes = {
  fccData: PropTypes.array.isRequired
};

export default BarChart;