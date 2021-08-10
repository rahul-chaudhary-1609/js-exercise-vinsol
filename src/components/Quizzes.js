import React from "react";
import './style.css';
import Quiz from "./Quiz";
class Quizzes extends React.Component {

  constructor(props){
    super(props);
    this.state={}
  }

    render() {
      return <div className="flex-item main-container">
            <div className="flex-item left-container">
                
                  <Quiz/>
              
            </div>
            <div className="flex-item right-container">
            
                    <Quiz/>
          </div>
      </div>;
    }
}

export default Quizzes