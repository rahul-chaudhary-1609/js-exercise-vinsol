import React from "react";
import './style.css';

class Answer extends React.Component {

  constructor(props){
    super(props);
    this.state={}
  }

  handleRestartClick=(e)=>{
      this.props.handleRestartClick(e);
  }

    render() {
      return (
          <>
              <div style={{display:this.props.state.isFinished?"":"none"}}>
                    {this.props.state.questions.map((question)=>{
                      return (
                        <div className="result-question-box" style={{border:question.isCorrect?"1px solid rgba(0,255,0,0.5)":"1px solid rgba(255,0,0,0.5)"}}>
                          <div>
                            <span style={{fontSize:"1rem", marginLeft:"0px", textDecoration:"underline", fontWeight:"bold"}}>Question No. {question.questionNo}</span>
                          </div>
                          <div className="result-question">
                            <div>
                              <span>{question.operand1}</span>
                            </div>
                            <div>
                              <span>{question.operator?.symbol}</span>
                            </div>
                            <div>
                              <span>{question.operand2}</span>
                            </div>
                            <div>
                              <span>=</span>
                            </div>
                            <div>
                              <span>?</span>
                            </div>
                          </div>
                          <div>
                            <table>
                            <tr>
                                <td>Your Answer</td>
                                <td>:</td>
                                <td><span>{question.obtainedAnswer!==""?question.obtainedAnswer:"N/A"}</span></td>
                              </tr>
                              <tr>
                                <td>Correct Answer</td>
                                <td>:</td>
                                <td><span>{question.actualAnswer}</span></td>
                              </tr>                              
                            </table>
                          </div>
                        </div>
                      )
                    })}
                    <div className="final-score-div">
                        <div><span>Final Score: {this.props.state.currentScore}</span></div>
                        <div><button className="start-quiz-button" onClick={this.handleRestartClick}>Restart</button></div>
                    </div>
              </div>
        </>);            
    }
}

export default Answer