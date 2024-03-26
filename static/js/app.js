// Get data from URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(data) {
  let names = data.names;
  let meta_data = data.metadata;
  let sampleSet = data.samples;
  // Get the top 10 sample values and OTU ids
  let top10SampleValues = sampleSet.map((item) => item.sample_values.slice(0,10).reverse());
  let top10otuIDs = sampleSet.map((item) => item.otu_ids.slice(0,10).reverse());
  let top10otuLabels = sampleSet.map((item) => item.otu_labels.slice(0,10).reverse());
  

  //let demographics = meta_data.map(row => row.id);

// Initialize visualizations

  function init() {
    barChart = [{
        x: top10SampleValues[0],
        y: top10otuIDs[0].map(item => `OTU ${item}`),
        text: top10otuLabels[0],
        type: 'bar',
        orientation: 'h' }];
    
    let layout = {
        margin: {
          l: 150,
          r: 150,
          t: 50,
          b: 50
        }
    };

    Plotly.newPlot("bar", barChart, layout);

    bubbleChart = [{
        x: sampleSet.map((item) => item.otu_ids),
        y: sampleSet.map((item) => item.sample_values),
        mode: 'markers',
        marker: {
            size: sampleSet.map((item) => item.otu_ids)
        }
    }];
    Plotly.newPlot("bubble", bubbleChart);
  }

//   let info_card = d3.select("#sample-metadata");

init();

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  
  // Bind 'names' to dropdown menu and create option elements in index.html (from Xpert Learning Assistant)
  let options = dropdownMenu.selectAll("option")
    .data(names)
    .enter()
    .append("option");
  options.text(m => m).attr("value", m=>m);

  // Add an onchange event listener to the dropdown menu (from Xpert Learning Assistant)
  dropdownMenu.on("change", function() {
    let selectedValue = d3.select(this).property("value");
    console.log(selectedValue);
    // optionChanged(selectedValue);
    // console.log(selectedValue.text());
  });



});



// function optionChanged(passedvalue){
//     chart_values(passedvalue);
//     meta_data(passedvalue);
// };