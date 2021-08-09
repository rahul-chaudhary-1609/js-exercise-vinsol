export let questions=[];
const operators=[
    {
        name:"add", 
        symbol:"+",
        action:(op1,op2)=>{
            return op1+op2;
        }
    },
    {
        name:"subtract",
        symbol:"-",
        action:(op1,op2)=>{
            return op1-op2;
        }
    },
    {
        name:"divide",
        symbol:"/",
        action:(op1,op2)=>{
            return op1/op2;
        }
    },
    {
        name:"multiply",
        symbol:"*",
        action:(op1,op2)=>{
            return op1*op2;
        }
    }
]

const RANDOM_NUMBER_MIN_LIMIT=1;
const RANDOM_NUMBER_MAX_LIMIT=10;

const getRandomNumber=()=>{
    return Math.floor((Math.random() * RANDOM_NUMBER_MAX_LIMIT) + RANDOM_NUMBER_MIN_LIMIT);
}

const getRandomOperator=()=>{
    return operators[Math.floor((Math.random() * operators.length))];
}

export const generateRandomQuestion=()=>{
    let currentData=[...questions];
    let newQuestionObj={
        Question_no:currentData.length+1,
        operand1:getRandomNumber(),
        operand2:getRandomNumber(),
        operator:getRandomOperator(),
        actual_answer:"",
        obtained_answer:"",
        isCorrect:false,
        score:0,
    }

    newQuestionObj.actual_answer=newQuestionObj.operator.action(newQuestionObj.operand1,newQuestionObj.operand2);

    questions.push(newQuestionObj);   
}

export const saveResponse=(index,answer)=>{
    questions[index].obtained_answer=answer
    if(questions[index].obtained_answer==questions[index].actual_answer){
        questions[index].isCorrect=true;
    }
}

export const evaluateScore=()=>{
    let score=0;
    questions.forEach((question)=>{
        if(question.isCorrect) score++;
    })
    return score;
}

export const showData=()=>{
    console.log("data",questions)
}