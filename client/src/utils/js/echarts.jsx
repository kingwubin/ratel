import React, { Component } from 'react';
import echarts from 'echarts';
import PropTypes from 'prop-types';
import uuidv1 from 'uuid/v1';
import 'echarts-liquidfill/dist/echarts-liquidfill.min';

class Echarts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: uuidv1(),
    };
  }

  componentDidMount() {
    const { data } = this.props;
    const { id } = this.state;
    this.myChart = echarts.init(document.getElementById(id));
    this.myChart.setOption(data);
  }

  componentDidUpdate() {
    const { data } = this.props;
    if (this.myChart) {
      this.myChart.setOption(data);
    }
  }

  render() {
    const { style } = this.props;
    const { id } = this.state;
    return (
      <div id={id} style={style} />
    );
  }
}

Echarts.propTypes = {
  data: PropTypes.object, // eslint-disable-line
  style: PropTypes.object, // eslint-disable-line
};

export default Echarts;
