import React, { Component } from 'react';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

class PieArea extends Component {
  state = {
    legendData: [],
    legendBlock: false,
  };

  componentDidMount() {}

  componentDidUpdate(preProps) {}

  componentWillUnmount() {}

  render() {
    const data = [
      { name: 'Group A', value: 400 },
      { name: 'Group B', value: 300 },
      { name: 'Group C', value: 300 },
      { name: 'Group D', value: 200 },
      { name: 'Group E', value: 278 },
      { name: 'Group F', value: 189 },
    ];
    return (
      <ResponsiveContainer minHeight={300}>
        <PieChart width={300} height={300}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    )
  }
}

export default PieArea;
