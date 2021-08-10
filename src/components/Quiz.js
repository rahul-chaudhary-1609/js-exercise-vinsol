import React from "react";
import './style.css';
import {generateRandomQuestion, saveResponse,evaluateScore,resetQuestion,operatorList} from "../utils/operations";
import Question from "./Question";
import Answer from "./Answer";
import Select from 'react-select';

class Quiz extends React.Component {

  constructor(props){
    super(props);
    this.state={
      questions:[],
      questionNo:"",
      operand1:"",
      operand2:"",
      operator:null,
      obtainedAnswer:"",
      isStarted:false,
      currentScore:0,
      isFinished:false,
      questionCount:20,
      maxRange:10,
      operators:[],
    }
  }

  handleStartQuizClick=(e)=>{
    e.preventDefault()
    let questions=resetQuestion(this.state.questions);
    questions=generateRandomQuestion(questions,this.state.operators.length!=0?this.state.operators: operatorList,this.state.maxRange);
    this.setState(
        {
          questions,
          questionNo:questions[questions.length-1]?.questionNo,
          operand1:questions[questions.length-1]?.operand1,
          operand2:questions[questions.length-1]?.operand2,
          operator:questions[questions.length-1]?.operator,
          isStarted:true,
        }
    )
  }

  handleAnswerChange=(e)=>{
    this.setState({
      obtainedAnswer:e.target.value,
    })
  }

  handleSkipClick=(e)=>{
    e.preventDefault()
    let questions=generateRandomQuestion(this.state.questions,this.state.operators.length!=0?this.state.operators: operatorList,this.state.maxRange);
    this.setState(
        {
          questions,
          questionNo:questions[questions.length-1]?.questionNo,
          operand1:questions[questions.length-1]?.operand1,
          operand2:questions[questions.length-1]?.operand2,
          operator:questions[questions.length-1]?.operator,
          obtainedAnswer:"",
        }
    )
  }

  handleNextClick=(e)=>{
    e.preventDefault()
    let questions=saveResponse(this.state.questions,this.state.questions.length-1,this.state.obtainedAnswer)
    let score=evaluateScore(questions);
    this.setState(
        {
          questions,
          currentScore:score,
        }
    )
    this.handleSkipClick(e);
  }

  handleFinishClick=(e)=>{
    e.preventDefault();
    let questions=saveResponse(this.state.questions,this.state.questions.length-1,this.state.obtainedAnswer)
    let score=evaluateScore(questions);
    this.setState({
      questions,
      isFinished:true,
      currentScore:score,
    })
  }

  handleRestartClick=(e)=>{
    let questions=resetQuestion(this.state.questions);
      this.setState({
        questions,
        questionNo:"",
        operand1:"",
        operand2:"",
        operator:null,
        obtainedAnswer:"",
        isStarted:false,
        currentScore:0,
        isFinished:false,
        questionCount:20,
        maxRange:10,
        operators:[],
      })
  }

    render() {
      return<>
                <div style={{display:this.state.isStarted?"none":""}}>
                  <form onSubmit={this.handleStartQuizClick}>
                    <div className="start-quiz-div">
                      <div>
                        <table>
                          <tr>
                            <td>How many question</td>
                            <td>:</td>
                            <td><input 
                                type="number"
                                min="2"
                                value={this.state.questionCount}
                                onChange={(e)=>this.setState({questionCount:e.target.value})}
                              /></td>
                          </tr>
                          <tr>
                            <td>Max operand range</td>
                            <td>:</td>
                            <td><input 
                                type="number" 
                                min="10" 
                                value={this.state.maxRange}
                                onChange={(e)=>this.setState({maxRange:e.target.value})}
                              /></td>
                          </tr>
                          <tr>
                            <td>Select operators</td>
                            <td>:</td>
                            <td><Select
                                className="select-operator"
                                value={this.state.operators}
                                onChange={(e)=>this.setState({operators:e})}
                                options={operatorList}
                                isMulti
                                placeholder="Select oprators"
                              /></td>
                          </tr>
                        </table>
                      </div>
                      <div>
                        <button  className="start-quiz-button" type="submit">Start Quiz</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div style={{display:this.state.isStarted?"":"none"}}>
                  <Question {...{
                      state:this.state,
                      handleAnswerChange:this.handleAnswerChange,
                      handleFinishClick:this.handleFinishClick,
                      handleNextClick:this.handleNextClick,
                      handleRestartClick:this.handleRestartClick,
                      handleSkipClick:this.handleSkipClick,
                      handleStartQuizClick:this.handleStartQuizClick,
                  }}/>
                  <Answer {...{
                      state:this.state,
                      handleRestartClick:this.handleRestartClick,
                  }}/>
                </div>
             </> ;
    }
}

export default Quiz