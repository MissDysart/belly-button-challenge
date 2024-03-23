// Get data from URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// // Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Slice the top 10 OTU in 'sample_values' (already in descending order)
// Slice the first 10 objects for plotting
// let samples = data.samples
// console.log(samples)
//let topOTUs = OTUid.slice(0, 10);


// Initialize visualizations
// Default Bar Chart
// function init() {
//     data = [{
//       x: [1, 2, 3, 4, 5],
//       y: [1, 2, 4, 8, 16],
//       type: 'bar',
//       orientation: 'h' }];
  
//     Plotly.newPlot("bar", data);
//   }