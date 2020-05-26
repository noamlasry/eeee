import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

export default class Progress extends Component {
  static propTypes = {
    percent: PropTypes.number,
    strokeColor: PropTypes.string,
    strokeWidth: PropTypes.number
  };

  static defaultProps = {
    percent: 0,
    strokeColor: '#A9F08C',
    strokeWidth: 107
  };

  constructor() {
    super();
    this.state ={
      progressParamater:0
    };
    this.progressContainer = React.createRef();
  }
 

  onClick = ({ clientX }) => {
    const { onClick } = this.props;
    const progressRef = this.progressContainer.current;
 
    const progress = (clientX - progressRef.getBoundingClientRect().left) / progressRef.clientWidth;
    onClick(progress);
  };

  onKeyDown = ({ keyCode }) => {
    const { percent, onClick } = this.props;
    switch (keyCode) {
      case 37:
      case 40:
        onClick(Math.max(percent - 0.05, 0));
        break;
      case 38:
      case 39:
        onClick(Math.min(percent + 0.05, 0.9999));
        break;
      default:
        break;
    }
  };

 handleClick = () => {
   console.log("dd");
  document.getElementById("myDIV").style.opacity = "0.1";
 };
  render() {
   
    const { percent, strokeWidth } = this.props;
    
    return (
      <div>
         
      <div
        ref={this.progressContainer}
        role="progressbar"
        tabIndex="-1"
        className="progress"
        style={{ height: `${strokeWidth}px` }}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
        id="myDIV"
      >
        <div className="progress-inner" style={{ width: `${percent * 100}%`, backgroundColor: 'black' }}/>
    
      </div>
      </div>
    );
  }
}