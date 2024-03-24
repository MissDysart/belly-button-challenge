// Get data from URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
  let names = data.names;
  let meta_data = data.metadata;
  let samples = data.samples;
//   for (let i = 0; i < length.data; i++) {
//     console.log(samples[i]);
//   }
    // let otuID = samples.id.map(index => index);
    // console.log(otuID);

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Bind 'names' to dropdown menu and create option elements in index.html
  let options = dropdownMenu.selectAll("option")
    .data(names)
    .enter()
    .append("option");
  options.text(n => n).attr("value", n=>n);

// Initialize visualizations

    // function init() {
    //     dataPlot = [{
    //         x: ,
    //         y: [1, 2, 4, 8, 16],
    //         type: 'bar',
    //         orientation: 'h' }];
  
    //     Plotly.newPlot("bar", data);
    // }
    // init();
});


// Slice the top 10 OTU in 'sample_values' (already in descending order)
// Slice the first 10 objects for plotting
// let samples = data.samples
// console.log(samples)
//let topOTUs = OTUid.slice(0, 10);





// function optionChanged(passedvalue){
//     chart_values(passedvalue);
//     meta_data(passedvalue);
// };