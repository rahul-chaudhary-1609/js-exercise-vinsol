import React from "react";
import './style.css';


class Question extends React.Component {

  constructor(props){
    super(props);
    this.state={}
  }

  handleStartQuizClick=(e)=>{
    this.props.handleStartQuizClick(e);
  }

  handleAnswerChange=(e)=>{
    this.props.handleAnswerChange(e);
  }

  handleSkipClick=(e)=>{
    this.props.handleSkipClick(e);
  }

  handleNextClick=(e)=>{
    this.props.handleNextClick(e);
  }

  handleFinishClick=(e)=>{
    this.props.handleFinishClick(e);
  }

  handleRestartClick=(e)=>{
    this.props.handleRestartClick(e);
  }

    render() {
      return (
      <>
            <div style={{display:this.props.state.isFinished?"none":"", flexDirection:"column",  alignItems:"center"}}>
                <div style={{display:this.props.state.isStarted?"":"none"}} className="question-box">
                    <form onSubmit={this.handleNextClick}>
                        <div style={{fontSize:"1rem",paddingLeft:"0px"}}>
                        <span >Question No. {this.props.state.questionNo}</span>
                        </div>
                        <div className="question">
                            <div>
                                <span>{this.props.state.operand1}</span>
                            </div>
                            <div>
                                <span>{this.props.state.operator?.symbol}</span>
                            </div>
                            <div>
                                <span>{this.props.state.operand2}</span>
                            </div>
                            <div>
                                <span>=</span>
                            </div>
                        <div>
                            <input onChange={this.handleAnswerChange} required value={this.props.state.obtainedAnswer} type="text"/>
                        </div>
                        </div>
                        <div className="action">
                            <div>
                            <button style={{display:this.props.state.questions.length<this.props.state.questionCount?"":"none",backgroundColor:"rgba(0,0,0,0.5)"}} onClick={this.handleSkipClick}>Skip</button>
                            </div>
                            <div>
                            <button type="submit" style={{display:this.props.state.questions.length<this.props.state.questionCount?"":"none",backgroundColor:"#089673"}}>Save & Next</button>
                            <button style={{display:this.props.state.questions.length<this.props.state.questionCount?"none":"", backgroundColor:"#089673"}} onClick={this.handleFinishClick}>Finish</button>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="current-score-div">
                    <span style={{display:this.props.state.isStarted?"":"none"}}>Current Score: {this.props.state.currentScore}</span>
                    <button className="start-quiz-button" onClick={this.handleRestartClick}>Restart</button>
                </div>
            </div>
    </> );
    }
}

export default Question