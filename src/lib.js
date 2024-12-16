import fs from 'fs'

export const chooseRandom = (array = [], numItems) => {
  if (array.length <= 1) {
    return array;
  }
  while(numItems < 1 && numItems > array.length){
    numItems = Math.floor(Math.random() * array.length);
  }
  const randomNums = new Set();
  const selectedQuestions = [];
  while(selectedQuestions.length < numItems){
    const randomNum = Math.floor(Math.random() * array.length);
    if(!randomNums.has(randomNum)){
     randomNums.add(randomNum);
     selectedQuestions.push(array[randomNum]);
    }
  }
return selectedQuestions;

} 

export const createPrompt = (config = {}) => {
  const { numQuestions = 1, numChoices = 2 } = config;
  const prompts = [];

  // Create prompts according to numQuestions and numChoices
  for (let i = 0; i < numQuestions; i++) {
    // Add question prompt
    prompts.push({
      type: 'input',
      name: `question-${i + 1}`,
      message: `Enter question ${i + 1}`
    });

    // Add choices for each question
    for (let j = 0; j < numChoices; j++) {
      prompts.push({
        type: 'input',
        name: `question-${i + 1}-choice-${j + 1}`,
        message: `Enter answer choice ${j + 1} for question ${i + 1}`
      });
    }
  }

  // Return the constructed prompts array
  return prompts;
}

export const createQuestions = (records = {}) => {
  let questions = [];
  for (const key in records) {
    // is question Example, 'question-1': 'Do you think you\'re ready for this?.
    let isQuestion = key.split("-").length === 2;
    // is choise, example question-1-choice-1.
    let isChoice = key.split("-").length > 2;

    if(isQuestion){
      console.log(`is question ${key}`)
      questions.push( {
        type: 'list',
        name: key,
        message: records[key],
        choices: []
      });
    }

    if(isChoice){
      let questionKey = key.split('-')[0]+'-'+key.split('-')[1] // question-1-choice-1
      questions.forEach((question, index) => {
        if(question.name === questionKey){
          question.choices.push(records[key]);
        }
      });
    }
  }

  questions.forEach((value, index) => {
    console.log(`Index: ${index}, Key: ${value.name}, choice: ${value.choices},  ${value.message}`);
  });
  return questions; 
}

export const readFile = path =>
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => (err ? reject(err) : resolve(data)))
  })

export const writeFile = (path, data) =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, err =>
      err ? reject(err) : resolve('File saved successfully')
    )
  })
