
export const operatorList=[
    {
        name:"add",
        label:"Add(+)",
        value:"add", 
        symbol:"+",
        action:(op1,op2)=>{
            return op1+op2;
        }
    },
    {
        name:"subtract",
        label:"Subtract(-)",
        value:"subtract",
        symbol:"-",
        action:(op1,op2)=>{
            return op1-op2;
        }
    },
    {
        name:"divide",
        label:"Divide(/)",
        value:"divide",
        symbol:"/",
        action:(op1,op2)=>{
            return (op1/op2).toFixed(2);
        }
    },
    {
        name:"modulus",
        label:"Modulus(%)",
        value:"modulus",
        symbol:"%",
        action:(op1,op2)=>{
            return op1%op2;
        }
    },
    {
        name:"multiply",
        label:"Multiply(*)",
        value:"multiply",
        symbol:"*",
        action:(op1,op2)=>{
            return op1*op2;
        }
    },
    {
        name:"exponentiation",
        label:"Exponentiation(^)",
        value:"exponentiation",
        symbol:"^",
        action:(op1,op2)=>{
            return op1**op2;
        }
    }
]

const RANDOM_NUMBER_MIN_LIMIT=1;

const getRandomNumber=(RANDOM_NUMBER_MAX_LIMIT)=>{
    return Math.floor((Math.random() * RANDOM_NUMBER_MAX_LIMIT) + RANDOM_NUMBER_MIN_LIMIT);
}

const getRandomOperator=(operators)=>{
    return operators[Math.floor((Math.random() * operators.length))];
}

export const generateRandomQuestion=(questions,operators,maxRange)=>{
    let currentData=[...questions];
    let newQuestionObj={
        questionNo:currentData.length+1,
        operand1:getRandomNumber(maxRange),
        operand2:getRandomNumber(maxRange),
        operator:getRandomOperator(operators),
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
