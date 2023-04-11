const fs = require('fs');
const { OpenAIApi } = require('openai');
const configuration = require('../config');

const openAi = new OpenAIApi(configuration);

const transcribeHandler = async (req, res) => {
  const audioFile = fs.createReadStream(req.file.path);

  await openAi.createTranscription(
    audioFile,
    'whisper-1'
  ).then(resOpenAI => {
    res.status(resOpenAI.status).json({ message: resOpenAI.data.text });
  }).catch(e => {
    res.status(e.response.status).json({ error: e.response.data.error.message });
  });
};


const completionHandler = async (text) => {
  // const input = "Talk me about seafish, but first tell me what day is today."
  
  const completion = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: text}],
  });
  console.log(completion.data.choices[0].message);
}

module.exports = {
  transcribeHandler,
  completionHandler
};