//____________________________________________________________________________________
//populate meta data
//______________________________________________________________________________________
function demoInfo(sample) {
    //console.log(sample);

    d3.json("samples.json").then((data) => {
        let metaData = data.metadata;
        //console.log(metaData);

        let result = metaData.filter(sampleResult => sampleResult.id == sample);

        //console.log(result);

        let resultData = result[0];
        //console.log(resultData);

        d3.select("#sample-metadata").html("")

        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);
        });
    });
}

// ___________________________________________________________________________________________________
// graphs - bar chart
//____________________________________________________________________________________________________
function buildBarChart(sample) {
    // console.log(sample);
    // let data = d3.json("samples.json")
    // console.log(data);


    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;
        // console.log(sampleData);

        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        // console.log(result);

        let resultData = result[0];
        // console.log(resultData);


        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        // console.log(yticks);
        let xValues = sample_values.slice(0, 10);
        // console.log(xValues);
        let textlabels = otu_labels.slice(0, 10);
        // console.log(textlabels);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textlabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: " TOP 10 BELLY BUTTON BACTERIA"
        };

        Plotly.newPlot("bar", [barChart], layout);
    });
}

//____________________________________________________________________________________________
// graphs - bubble chart
//____________________________________________________________________________________________
function buildBubbleChart(sample) {
    // console.log(sample);
    // let data = d3.json("samples.json")
    // console.log(data);


    d3.json("samples.json").then((data) => {
        let sampleData = data.samples;
        // console.log(sampleData);

        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

        // console.log(result);

        let resultData = result[0];
        // console.log(resultData);


        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        // console.log(otu_ids);
        // console.log(otu_labels);
        // console.log(sample_values);

        // let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        // // console.log(yticks);
        // let xValues = sample_values.slice(0, 10);
        // // console.log(xValues);
        // let textlabels = otu_labels.slice(0, 10);
        // // console.log(textlabels);

        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode:"markers",
            marker:{
                size: sample_values,
                color: otu_ids,
                colorscale:"Earth"
            }
        }

        let layout = {
            title: " BACTERIA CULTURES PER SAMPLE",
            hovermode: " closest",
            xaxis:{title:"OTU ID"}
        };

        Plotly.newPlot("bubble", [bubbleChart], layout);
    });
}







//____________________________________________________________________________________________
// initialize  dashboard
//____________________________________________________________________________________________
function initialize() {
    //let data = d3.json("samples.json")
    //console.log(data);

    var select = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        //console.log(sampleNames);

        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        let sample1 = sampleNames[0];

        demoInfo(sample1);
        buildBarChart(sample1);
        buildBubbleChart(sample1);
    });
}




// update dashboard

function optionChanged(item) {
    //console.log(item);
    demoInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);
}

initialize();
