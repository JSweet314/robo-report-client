import React from 'react';
import PropTypes from 'prop-types';
import { mapFCCDataToTypeOfCall } from '../../helpers';
import { VictoryPie } from 'victory';
import './style.css';

const PieChart = ({ fccData }) => {
  const pieData = mapFCCDataToTypeOfCall(fccData);
  return (
    <div className='pie-chart'>
      <VictoryPie
        labelRadius={100}
        width={550}
        innerRadius={20}
        colorScale={
          ["mediumslateblue", "lightblue", "DeepSkyBlue ", "cyan", "navy"]
        }
        data={pieData}
        padAngle={3}
        startAngle={90}
        endAngle={450}
        style={
          { 
            labels: { 
              fill: "black", 
              fontSize: 18, 
              fontWeight: "bold"
            }
          }
        }
      />
    </div>
  );
};

PieChart.propTypes = {
  fccData: PropTypes.array.isRequired
};

export default PieChart;