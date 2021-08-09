import React from "react";
import './style.css';
import {generateRandomQuestion,showData, questions, saveResponse,evaluateScore,resetQuestion} from "../utils/operations";

class Quiz extends React.Component {

  constructor(props){
    super(props);
    this.state={
      questionNo:"",
      operand1:"",
      operand2:"",
      operator:null,
      obtained_answer:"",
      isNext:false,
      isStarted:false,
      isSave:false,
      isSkip:true,
      currentScore:0,
      isFinished:false,
    }
  }

  handleStartQuizClick=(e)=>{
    e.preventDefault()
    generateRandomQuestion();
    this.setState(
        {
          questionNo:questions[questions.length-1]?.Question_no,
          operand1:questions[questions.length-1]?.operand1,
          operand2:questions[questions.length-1]?.operand2,
          operator:questions[questions.length-1]?.operator,
          isStarted:true,
        }
    )
  }

  handleAnswerChange=(e)=>{
    let isSave=false;
    if(e.target.value.trim()!==""){
      isSave=true
    }else{
      isSave=false;
    }
    this.setState({
      obtained_answer:e.target.value,
      isSave
    })
  }

  handleSaveClick=(e)=>{
    e.preventDefault()
    saveResponse(questions.length-1,this.state.obtained_answer)
    this.setState({
      isNext:true,
    })
  }

  handleSkipClick=(e)=>{
    e.preventDefault()
    this.setState({
      isNext:true,
    })
  }

  handleNextClick=(e)=>{
    e.preventDefault()
    let score=evaluateScore();
    generateRandomQuestion();
    this.setState(
        {
          questionNo:questions[questions.length-1]?.Question_no,
          operand1:questions[questions.length-1]?.operand1,
          operand2:questions[questions.length-1]?.operand2,
          operator:questions[questions.length-1]?.operator,
          isNext:false,
          currentScore:score,
          obtained_answer:"",
        }
    )
  }

  handleFinishClick=(e)=>{
    e.preventDefault();
    let score=evaluateScore();
    this.setState({
      isFinished:true,
      currentScore:score,
    })
  }

  handleRestartClick=(e)=>{
      resetQuestion();
      this.setState({
        questionNo:"",
        operand1:"",
        operand2:"",
        operator:null,
        obtained_answer:"",
        isNext:false,
        isStarted:false,
        isSave:false,
        isSkip:true,
        currentScore:0,
        isFinished:false,
      })
  }

    render() {
      return <div className="flex-item main-container">
            <div className="flex-item left-container">
              <div style={{display:this.state.isFinished?"none":"", flexDirection:"column",  alignItems:"center"}}>
                <div style={{display:this.state.isStarted?"":"none"}} className="question-box">
                  <form onSubmit={this.handleSaveClick}>
                    <div style={{fontSize:"1rem",paddingLeft:"0px"}}>
                      <span >Question No. {this.state.questionNo}</span>
                    </div>
                    <div className="question">
                      <div>
                        <span>{this.state.operand1}</span>
                      </div>
                      <div>
                        <span>{this.state.operator?.symbol}</span>
                      </div>
                      <div>
                        <span>{this.state.operand2}</span>
                      </div>
                      <div>
                        <span>=</span>
                      </div>
                      <div>
                        <input onChange={this.handleAnswerChange} required value={this.state.obtained_answer} type="text"/>
                      </div>
                    </div>
                    <div className="action">
                        <div>
                          <button disabled={!this.state.isSave} style={{backgroundColor:"rgba(0,0,255)"}} type="submit">Save</button>
                        </div>
                        <div>
                          <button disabled={!this.state.isSkip} style={{backgroundColor:"rgba(0,0,0,0.5)"}} onClick={this.handleSkipClick}>Skip</button>
                        </div>
                        <div>
                          <button disabled={!this.state.isNext} style={{display:questions.length<5?"":"none",backgroundColor:"#089673"}} onClick={this.handleNextClick}>Next</button>
                          <button style={{display:questions.length<5?"none":"", backgroundColor:"#089673"}} onClick={this.handleFinishClick}>Finish</button>
                        </div>
                    </div>

                  </form>
                </div>
                <div >
                  <button style={{display:this.state.isStarted?"none":""}} className="start-quiz" onClick={this.handleStartQuizClick}>Start Quiz</button>
                  <span style={{display:this.state.isStarted?"":"none"}}>Current Score: {this.state.currentScore}</span>
                </div>
              </div>
              <div style={{display:this.state.isFinished?"":"none"}}>
                    {questions.map((question)=>{
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
                                <td><span>{question.obtained_answer!==""?question.obtained_answer:"N/A"}</span></td>
                              </tr>
                              <tr>
                                <td>Correct Answer</td>
                                <td>:</td>
                                <td><span>{question.actual_answer}</span></td>
                              </tr>                              
                            </table>
                          </div>
                        </div>
                      )
                    })}

                   <span>Final Score: {this.state.currentScore}</span>
                    <button className="start-quiz" onClick={this.handleRestartClick}>Restart</button>
              </div>
            </div>
            <div className="flex-item right-container">
            <button className="start-quiz" onClick={showData}>Start Quiz</button>
            </div>
      </div>;
    }
}

export default Quiz