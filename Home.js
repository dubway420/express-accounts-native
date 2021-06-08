import React , {Component} from "react"
// import './App.css';
import extractData from './extractors'
import { createWorker } from 'tesseract.js';
import {placeholder, currencies, categories} from './constants' 
import fire from "./fire";

class Home extends Component{
  constructor(props){
    super(props) 
    this.state={
        file: null
        
    }

    this.handleChange = this.handleChange.bind(this)

  }
  
  
  setProgress(m) {


    if (m.progress !== 0 && m.progress !== 0.5 && m.progress !== 1){
 
     var prog = "Progress: " + Math.round(m.progress*100) + "%"
     this.setState({progress: prog})
    }
   }
 
   worker = createWorker({
     logger: m => this.setProgress(m),
   });



  doOCR = async () => {
    await this.worker.load();
    await this.worker.loadLanguage('eng');
    await this.worker.initialize('eng');
    const { data: { text } } = await this.worker.recognize(this.state.file);

    console.log(text)

    var extracted = extractData(String(text))

    this.setState({money: (currencies[extracted.money.currency].symbol + extracted.money.value),
                   category: extracted.category})

    if (extracted.date){
      this.setState({progress: "Date: " + extracted.date.day + "/" + extracted.date.month + "/" + extracted.date.year});
    }
    else {
      this.setState({progress: "Cannot detect date"});
    }

  };

  handleChange(event) {
    
    this.setState({money: placeholder});
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      
    })

    // // Create an object of formData
    // const formData = new FormData();

    // // Update the formData object
    // formData.append(
    //   "myFile",
    //   this.state.selectedFile,
    //   this.state.selectedFile.name
    // );

    this.doOCR()

  }

  setText(input){
    
    console.log("out:" + input)

    if (!input) {
      return "Please select a receipt"   
    } 
    else { 
      return input
    }

  }
  
  logOut() {
    
    fire.auth().signOut();

  }

  render() {



    return(
    
      <div>
        
        <p>{this.setText(this.state.money)}</p>
        <p>{this.state.progress}</p>
        <p>{this.state.category}</p>
        <input type="file" onChange={this.handleChange}/>
        <img src={this.state.file} className='logo' alt=""/>
        <button className="btn" onClick={this.logOut}>Log Out</button>
        
      </div>
    

    )

  }



}

export default Home;