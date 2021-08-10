
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
            return (op1/op2).toFixed(2);
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

export const generateRandomQuestion=(questions)=>{
    let currentData=[...questions];
    let newQuestionObj={
        questionNo:currentData.length+1,
        operand1:getRandomNumber(),
        operand2:getRandomNumber(),
        operator:getRandomOperator(),
        actualAnswer:"",
        obtainedAnswer:"",
        isCorrect:false,
        score:0,
    }

    newQuestionObj.actualAnswer=newQuestionObj.operator.action(newQuestionObj.operand1,newQuestionObj.operand2);

    questions.push(newQuestionObj);   

    return questions;
}

export const saveResponse=(questions,index,answer)=>{
    questions[index].obtainedAnswer=answer
    if(questions[index].obtainedAnswer==questions[index].actualAnswer){
        questions[index].isCorrect=true;
    }

    return questions;
}

export const evaluateScore=(questions)=>{
    let score=0;
    questions.forEach((question)=>{
        if(question.isCorrect) score++;
    })
    return score;
}

export const resetQuestion=(questions)=>{
    questions=[];

    return questions;
}

export const showData=(questions)=>{
    console.log("data",questions)
}