// Get data from URL
const url = "https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json";

// Fetch the JSON data
d3.json(url).then(function(microbes) {
  let subjects = microbes.names;
  let meta_data = microbes.metadata;
  let sampleSet = microbes.samples;

  // Initialize visualizations
  function init() {
    let filteredSampleSet = sampleSet.filter(sample => sample.id == "940")
    
    // Initial bar chart
    let barChart = [{
      x: filteredSampleSet.map(item => item.sample_values.slice(0,10).reverse())[0],
      y: filteredSampleSet.map(item => item.otu_ids.slice(0,10).reverse())[0].map(item => `OTU ${item}`),
      text: filteredSampleSet.map(item => item.otu_labels.slice(0,10).reverse())[0],
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
        x: filteredSampleSet.map(item => item.otu_ids)[0],
        y: filteredSampleSet.map(item => item.sample_values)[0],
        mode: 'markers',
        text: filteredSampleSet.map(item => item.otu_labels)[0],
        type: 'scatter',
        marker: {
            size: filteredSampleSet.map(item => item.sample_values)[0],
            color: filteredSampleSet.map(item => item.otu_ids)[0],
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

  // Configure the dropdown menu
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
    updateCharts(selectedSubject);    
  };

  // Add an onchange event listener to the dropdown menu (from Xpert Learning Assistant)
  dropdownMenu.on("change", optionChanged);

  // update charts (with help from Xpert Learning Assistant)
  function updateCharts(selectedSubject) {
    let filteredSampleSet = sampleSet.filter(sample => sample.id == selectedSubject)
        
    // update bar chart
    Plotly.restyle("bar", {
      x: [filteredSampleSet.map(item => item.sample_values.slice(0, 10).reverse())[0]],
      y: [filteredSampleSet.map(item => item.otu_ids.slice(0, 10).reverse())[0].map(item => `OTU ${item}`)],
      text: [filteredSampleSet.map(item => item.otu_labels.slice(0, 10).reverse())[0]]
    });
    // update bubble chart
    Plotly.restyle("bubble", {
      x: [filteredSampleSet.map(item => item.otu_ids)[0]],
      y: [filteredSampleSet.map(item => item.sample_values)[0]],
      text: [filteredSampleSet.map(item => item.otu_labels)[0]],
    });
    Plotly.restyle("bubble", "marker.size", [filteredSampleSet.map(item => item.sample_values)[0]]);
    Plotly.restyle("bubble", "marker.color", [filteredSampleSet.map(item => item.otu_ids)[0]]);
    
    let metaDataInfo = d3.select("#sample-metadata");
    let filteredMetaData = meta_data.filter(sample => sample.id == selectedSubject)[0];
    metaDataInfo.selectAll("p").remove();
    Object.entries(filteredMetaData).forEach(([key, v]) => {
      metaDataInfo.append("p").text(`${key}: ${v}`);
    });
  }

init();
});
