const express = require("express");
const app = express();
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
      mode = [num];
      maxFreq = freq[num];
    } else if (freq[num] === maxFreq) {
      mode.push(num);
    }
  }
  return mode;
}

app.get("/mean", (req, res, next) => {
  const nums = req.query.nums.split(",").map(Number);
  const mean = calculateMean(nums);
  console.log(mean);
  res.json({ mean: mean });
});

app.get("/median", (req, res, next) => {
  const nums = req.query.nums.split(",").map(Number);
  const median = calculateMedian(nums);
  console.log(median);
  res.json({ median: median });
});

app.get("/mode", (req, res, next) => {
  const nums = req.query.nums.split(",").map(Number);
  const mode = calculateMode(nums);
  console.log(mode);
  res.json({ mode: mode });
});

app.listen(3000, () => {
  console.log("App on port 3000");
});
