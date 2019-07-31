import React, {Component} from 'react'


import P5Wrapper from 'react-p5-wrapper'
class PFive extends Component{
    sketch =(p)=>{
        let i
        let up=true
        let rotation
        p.setup=()=>{
            p.createCanvas(600,400)
            i=0
        }
        p.myCustomRedrawAccordingToNewPropsHandler = (props)=>{
            if(props.rotation){
                rotation = props.i*Math.PI/180
            }
        }
        p.draw = ()=>{
            p.background((i));
            if(i<=0){
                up=true
            }
            else if(i>=256){
                up=false
            }
            if (up==true){
                i++
            }
            else{
                i--
            }
            //console.log(i)
            
        }
    }
    render(){
        return(
            <P5Wrapper sketch={this.sketch}/>
        ) 
    }
}
export default PFive