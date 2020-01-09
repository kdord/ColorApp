import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Palette.css';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500
    };
    this.changeLevel = this.changeLevel.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({ level: newLevel });
  }

  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color.hex} name={color.name} />
    ));
    return (
      <div className='Palette'>
        <div className='slider'>
          <Slider
            className='lider'
            defaultValue={level}
            min={100}
            max={900}
            step={100}
            onAfterChange={this.changeLevel}
            // trackStyle={{ backgroundColor: 'transparent' }}
            // handleStyle={{
            //   backgroundColor: 'green',
            //   outline: 'none',
            //   border: '2px solid green',
            //   boxShadow: 'none',
            //   width: '13px',
            //   height: '13px',
            //   marginLeft: '-7px',
            //   marginTop: '-3px'
            // }}
            // railStyle={{ height: 8 }}
          />
        </div>
        {/* Navbar goes here */}
        <div className='Palette-colors'>{colorBoxes}</div>
      </div>
      // footer
    );
  }
}
