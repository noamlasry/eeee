import React, { Component } from "react";
import './middleNav.css';
import {ButtonToolbar, Button} from "react-bootstrap";
import { Storage } from "@aws-amplify/storage";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';



class MiddleNav extends Component {
  state = {     
    files: [],
    lists:[ { }  ],
    temp:[{}]


  }
  async componentDidMount() {
    const files = await Storage.list('')
    this.setState({ files })
    
   let i;
   for(i =0; i<files.length; i++)
   {
     const audioUrl = await Storage.get(files[i].key);
     const objectKey = files[i].key;
     this.state.lists.push({url:audioUrl,title:objectKey});
   }
     
      this.state.lists.shift();
      this.state.lists.shift();

      console.log(this.state.lists);
     
  }
 
    render(){
      
      return(
        <div className="middlenav">
            <h2 className="label">Audio Player</h2>
            <AudioPlayer
    autoPlay
    src="https://www.youtube.com/watch?v=Oioo0IdoEls"
    onPlay={e => console.log("onPlay")}
    // other props here
  />
              <ButtonToolbar className="btnTool">
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
              </ButtonToolbar>
              <ButtonToolbar>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
                <Button className="btn" variant="outline-primary">Audio tag</Button>
              </ButtonToolbar>
              <ButtonToolbar className="btnQuality">
                <h5>Quality:</h5>
                <Button variant="outline-dark" >Good</Button>
                <Button variant="outline-dark">Bad</Button>
              </ButtonToolbar>
              <ButtonToolbar className="btnSub">
                <Button size="lg" variant="outline-success" >Submit</Button>
                <Button size="lg" variant="outline-danger">cancel</Button>
              </ButtonToolbar>
        </div>
      )
 };
 
}

export default MiddleNav;