import React from "react";
import './style.css';
import {generateRandomQuestion,showData, questions, saveResponse,evaluateScore} from "../utils/operations";

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
    }
    // this.handleSaveClick = this.handleSaveClick.bind(this);
    // this.handleSkipClick = this.handleSkipClick.bind(this);
    // this.handleNextClick = this.handleNextClick.bind(this);
    // this.handleStartQuizClick = this.handleStartQuizClick.bind(this);
  }


  // componentDidMount(){
  //   //generateRandomQuestion();
  //   this.setState(
  //       {
  //         questionNo:questions[questions.length-1]?.Question_no,
  //         operand1:questions[questions.length-1]?.operand1,
  //         operand2:questions[questions.length-1]?.operand2,
  //         operator:questions[questions.length-1]?.operator,
  //       }
  //     )
  // }

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

    render() {
      return <div className="flex-item main-container">
            <div className="flex-item left-container">
              <div style={{display:this.state.isStarted?"":"none"}} className="question-box">
                <form onSubmit={this.handleSaveClick}>
                  {/* {this.state.questionNo} */}
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
                        <button disabled={!this.state.isSave} type="submit">Save</button>
                      </div>
                      <div>
                        <button disabled={!this.state.isSkip} onClick={this.handleSkipClick}>Skip</button>
                      </div>
                      <div>
                        <button disabled={!this.state.isNext} onClick={this.handleNextClick}>Next</button>
                      </div>
                  </div>

                </form>
              </div>
              <div >
                <button style={{display:this.state.isStarted?"none":""}} onClick={this.handleStartQuizClick}>Start Quiz</button>
                <span style={{display:this.state.isStarted?"":"none"}}>{this.state.currentScore}</span>
              </div>
            </div>
            <div className="flex-item right-container">
            <button onClick={showData}>Start Quiz 2</button>
            </div>
      </div>;
    }
}

export default Quiz