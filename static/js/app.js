// Get data from URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(microbes) {
  let subjects = microbes.names;
  let meta_data = microbes.metadata;
  let sampleSet = microbes.samples;
  //let sampleValues = sampleSet.map((item) => item.sample_values);
  //let otuID = sampleSet.map((item) => item.otu_ids);
  //let otuLabels = sampleSet.map((item) => item.otu_labels);

  // Get the top 10 sample values and OTU ids
  //let top10SampleValues = sampleSet.map(item => item.sample_values.slice(0,10).reverse());
  // let top10SampleValues = sampleValues[0].slice(0,10).reverse();
  let top10otuIDs = sampleSet.map(item => item.otu_ids.slice(0,10).reverse());
  let top10otuLabels = sampleSet.map(item => item.otu_labels.slice(0,10).reverse());

// Initialize visualizations

  function init() {
    
    let otuID = sampleSet.filter(sample => sample.id == "940").map(item => item.otu_ids);
    let sampleValues = sampleSet.filter(sample => sample.id == "940").map(item => item.sample_values);
    let otuLabels = sampleSet.filter(sample => sample.id == "940").map(item => item.otu_labels);
    
    // Initial bar chart
    let barChart = [{
        x: sampleSet.map(item => item.sample_values.slice(0,10).reverse())[0],
        y: top10otuIDs[0].map(item => `OTU ${item}`),
        text: top10otuLabels[0],
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
    let bubbleChart = [{
        x: otuID[0],
        y: sampleValues[0],
        mode: 'markers',
        text: otuLabels[0],
        type: 'scatter',
        marker: {
            size: sampleValues[0],
            color: otuID[0],
            colorscale: 'Portland'
        }
    }];
    let bub_layout = {
        xaxis: {title: "OTU ID"}
        
    };
    Plotly.newPlot("bubble", bubbleChart, bub_layout);
  
    // Initial Demographic card (help from Xpert Learning Assistant)
    let metaDataInfo = d3.select("#sample-metadata");
    let filteredMetaData = meta_data.filter(sample => sample.id == "940")[0];
    Object.entries(filteredMetaData).forEach(([key, v]) => {
      metaDataInfo.append("p").text(`${key}: ${v}`);
    });
    
    
    
  } // end of init() function

//   let info_card = d3.select("#sample-metadata");

// init();

  // Define optionChanged function
  // function optionChanged() {
  //   let selectedSubject = d3.select(this).property("value");
  //   console.log(selectedSubject);
  //   updateCharts(selectedSubject);    
  // };

  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  
  // Bind 'names' to dropdown menu and create option elements (from Xpert Learning Assistant)
  let options = dropdownMenu.selectAll("option")
    .data(subjects)
    .enter()
    .append("option");
  options.text(sub => sub).attr("value", sub => sub);

  // Define optionChanged function
  function optionChanged() {
    let selectedSubject = d3.select(this).property("value");
    console.log(selectedSubject);
    updateCharts(selectedSubject);    
  };

  // Add an onchange event listener to the dropdown menu (from Xpert Learning Assistant)
  dropdownMenu.on("change", optionChanged);

  function updateCharts(selectedSubject) {
    let otuID = sampleSet.filter(sample => sample.id == selectedSubject).map(item => item.otu_ids);
    let sampleValues = sampleSet.filter(sample => sample.id == selectedSubject).map(item => item.sample_values);
    let otuLabels = sampleSet.filter(sample => sample.id == selectedSubject).map(item => item.otu_labels);
    
    // let newBarChart = 

    let newBubbleChart = [{
      x: otuID[0],
      y: sampleValues[0],
      mode: 'markers',
      text: otuLabels[0],
      type: 'scatter',
      marker: {
          size: sampleValues[0],
          color: otuID[0],
          colorscale: 'Portland'
      }
    }];

  //   // update charts
  //   Plotly.restyle("bar", barChart, bar_layout);
    Plotly.newPlot("bubble", newBubbleChart);
  }
  

init();



});



// function optionChanged(passedvalue){
//     chart_values(passedvalue);
//     meta_data(passedvalue);
// };

// Idea to loop for keys and values in meta_data:
// for (i=0; i < meta_data.length; i++) {
//   let metaLabels = Object.keys(meta_data[i]);
//   let metaValues = Object.values(meta_data[i]);
//   console.log(metaLabels, metaValues);
// }