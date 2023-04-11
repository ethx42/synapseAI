const { transcribeHandler, completionHandler } = require('../controllers');

const transcribeRoute = transcribeHandler;
const completionRoute = completionHandler

module.exports = {
  transcribeRoute,
  completionRoute
};
