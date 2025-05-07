const express = require('express');
const router = express.Router();
const {
  callStoredProcedure,
  callStoredFunction,
  callStoredFunctionJason,
  callinsertShowtime,
  callupdateShowtime,
  calldeleteShowtime
} = require('../controllers/functionController');

router.get('/call-function', (req, res) => {
  const procName = req.query.proc; 
  const params = req.query.params ? JSON.parse(req.query.params) : []; 
  const func = req.query.func;

  if (func == 'False') {
    callStoredProcedure(procName, params, res);
  } else if (func == 'True') {
    callStoredFunction(procName, params, res);
  } else if (func == 'Jason') {
    callStoredFunctionJason(procName, params, res);
  } else if (func == 'INSERT') {
    callinsertShowtime(procName, params, res);
  } else if (func == 'UPDATE') {
    callupdateShowtime(procName, params, res);
  } else if (func == 'DELETE') {
    calldeleteShowtime(procName, params, res);
  }
});

module.exports = router; 