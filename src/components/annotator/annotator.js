import React from 'react';
import styled from 'styled-components';
import Waveform from './Waveform';
import { getAudioBuffer, getContext } from './utils';
import { color } from '../../styles/theme';

const WaveformWrapper = styled.div`
  height: 20%;
  width: 100%;
`;

class Annotator extends React.PureComponent {
  state = {
    src:'',
    buffer: null,
    context: null,
    height: 150,
    markerStyle: {
      color: color.tertiary,
      width: 4
    },
    position: 0,
    responsive: true,
    showPosition: true,
    waveStyle: {
      animate: true,
      color:'#1ac3e7',
      plot: 'bar',
      pointWidth: 1
    },
    width: 900
  };


  componentWillReceiveProps(nextProps){
    this.setState({src:nextProps.src});
    this.getFile(nextProps.src);

  };

  componentWillMount() {
    this.setState({src:this.props.src});
    const context = getContext();
    this.setState({
      context
    });
    
  }

  getFile = async (path = 'audio/test.mp3') => {
    const buffer = await getAudioBuffer(path, this.state.context);
    this.setState({ buffer });
  };
  componentDidMount(){
    this.getFile(this.props.src);
  }

  handleFile = event => {
   
   
    this.getFile(this.state.src);
  };

  setValue = (val, prop, sub) => {
    if (sub) {
      this.setState(state => ({
        ...state,
        [sub]: {
          ...state[sub],
          [prop]: val
        }
      }));
    } else {
      this.setState({ [prop]: val });
    }
  };

  start = () => {
    this.setState({
      run: true
    });
  };

  stop = () => {
    this.setState({
      run: false
    });
  };

  render() {
    
    return (
   
    <div>
        <WaveformWrapper>
      
          <Waveform
         
            buffer={this.state.buffer}
            height={this.state.height}
            markerStyle={this.state.markerStyle}
            onPositionChange={pos => this.setValue(pos, 'position')}
            position={this.state.position}
            responsive={this.state.responsive}
            showPosition={this.state.showPosition}
            waveStyle={this.state.waveStyle}
            width={this.state.width}
          />
        </WaveformWrapper>
        </div>
     
    );
  }
}

export default Annotator;
