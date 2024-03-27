// Get data from URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(microbes) {
  let names = microbes.names;
  let meta_data = microbes.metadata;
  let sampleSet = microbes.samples;
  let sampleValues = sampleSet.map((item) => item.sample_values);
  let otuID = sampleSet.map((item) => item.otu_ids);
  let otuLabels = sampleSet.map((item) => item.otu_labels);

  // Get the top 10 sample values and OTU ids
  let top10SampleValues = sampleSet.map((item) => item.sample_values.slice(0,10).reverse());
  // let top10SampleValues = sampleValues[0].slice(0,10).reverse();
  let top10otuIDs = sampleSet.map((item) => item.otu_ids.slice(0,10).reverse());
  let top10otuLabels = sampleSet.map((item) => item.otu_labels.slice(0,10).reverse());
  

  //let demographics = meta_data.map(row => row.id);

// Initialize visualizations

  function init() {
    let index = 0
    // Initial bar chart
    barChart = [{
        x: top10SampleValues[index],
        y: top10otuIDs[index].map(item => `OTU ${item}`),
        text: top10otuLabels[index],
        type: 'bar',
        orientation: 'h' }];
    
    let bar_layout = {
        margin: {
          l: 150,
          r: 150,
          t: 50,
          b: 50
        }
    };
    Plotly.newPlot("bar", barChart, bar_layout);

    // Initial bubble chart
    bubbleChart = [{
        x: otuID[index],
        y: sampleValues[index],
        mode: 'markers',
        text: otuLabels[index],
        type: 'scatter',
        marker: {
            size: sampleValues[index],
            color: otuID[index],
            colorscale: 'Portland'
        }
    }];
    let bub_layout = {
        xaxis: {title: "OTU ID"}
        
    };
    Plotly.newPlot("bubble", bubbleChart, bub_layout);
  
    // Initial Demographic card
    
    console.log(meta_data[index]);
  }

//   let info_card = d3.select("#sample-metadata");

init();

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  
  // Bind 'names' to dropdown menu and create option elements (from Xpert Learning Assistant)
  let options = dropdownMenu.selectAll("option")
    .data(names)
    .enter()
    .append("option");
  options.text(nom => nom).attr("value", nom => nom);

  // Add an onchange event listener to the dropdown menu (from Xpert Learning Assistant)
  dropdownMenu.on("change", optionChanged);
  
  function optionChanged() {
    let selectedValue = d3.select(this).property("value");
    console.log(selectedValue);
    
    // optionChanged(selectedValue);
    // console.log(selectedValue.text());
  };



});



// function optionChanged(passedvalue){
//     chart_values(passedvalue);
//     meta_data(passedvalue);
// };