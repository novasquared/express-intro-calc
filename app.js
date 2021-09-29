"use strict";
/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError } = require("./expressError");

const {
  findMean, 
  findMedian, 
  findMode
} = require("./stats");

const {convertStrNums} = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";


/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get("/mean", function(req, res) {
  console.log(req);
  console.log(res);
  let numString = req.query.nums.split(",");
  console.log(numString);
  let nums = convertStrNums(numString);
  let result = findMean(nums);
  return res.json({
    "operation": "mean", 
    "result": result
  });
});

/** Finds median of nums in qs: returns {operation: "median", result } */

app.get("/median", function(req, res) {
  let numString = req.query.nums.split(",");
  let nums = convertStrNums(numString);
  let result = findMedian(nums);
  return res.json({
    "operation": "mean", 
    "result": result
  });
});

/** Finds mode of nums in qs: returns {operation: "mean", result } */

app.get("/mode", function(req, res) {
  let numString = req.query.nums.split(",");
  let nums = convertStrNums(numString);
  let result = findMode(nums);
  return res.json({
    "operation": "mean", 
    "result": result
  });
})


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;