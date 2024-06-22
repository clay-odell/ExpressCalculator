const express = require("express");
const app = express();
const expressError = require("./expressError");
const ExpressError = require("./expressError");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function calculateMean(nums) {
  const sum = nums.reduce((a, b) => a + b, 0);
  return sum / nums.length;
}
function calculateMedian(nums) {
  nums = [...nums].sort((a, b) => a - b);
  const half = Math.floor(nums.length / 2);
  return nums.length % 2 ? nums[half] : (nums[half - 1] + nums[half]) / 2;
}
function calculateMode(nums) {
  let freq = {};
  for (let num of nums) {
    if (freq[num]) {
      freq[num]++;
    } else {
      freq[num] = 1;
    }
  }
  let mode = [];
  let maxFreq = 0;
  for (let num in freq) {
    if (freq[num] > maxFreq) {
      mode = [Number(num)];
      maxFreq = freq[num];
    } else if (freq[num] === maxFreq) {
      mode.push(Number(num));
    }
  }
  return mode;
}

app.get("/mean", (req, res, next) => {
  try {
    const nums = req.query.nums.split(",").map((val) => {
      const num = Number(val);
      if (isNaN(num)) {
        throw new ExpressError(`${val} is not a number`, 400);
      }
      return num;
    });
    const mean = calculateMean(nums);
    res.json({ mean: mean });
  } catch (err) {
    next(err);
  }
});

app.get("/median", (req, res, next) => {
  if (!req.query.nums) {
    throw new ExpressError("Numerical input is required", 400);
  }
  const nums = req.query.nums.split(",").map(val => {
    const num = Number(val);
    if(isNaN(num)) {
        throw new ExpressError(`${val} is not a number`, 400);
    }
    return num;
  });
  
  const median = calculateMedian(nums);
  res.json({ median: median });
});

app.get("/mode", (req, res, next) => {
  const nums = req.query.nums.split(",").map(Number);
  const mode = calculateMode(nums);
  res.json({ mode: mode });
});

app.use((err, req, res, next) => {
  if (err instanceof ExpressError) {
    res.status(err.status).send(err.message);
  } else {
    res.status(500).send("Something went wrong");
  }
});

app.listen(3000, () => {
  console.log("App on port 3000");
});

module.exports = app;
