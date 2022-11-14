var getScriptPromisify = (src) => {
	return new Promise(resolve => {
	  $.getScript(src, resolve)
	})
  }
  
  (function () {
  
	//Chart Block in HTML
	const prepared = document.createElement('template')
	prepared.innerHTML = `
		<div id="root" style="width: 100%; height: 100%;">
		</div>
	  `
	//Main JS Class holds methods to be called
	class SamplePrepared extends HTMLElement {
	  constructor() {
  
		//call SAC DOM Super method to get shadow DOM information
		super()
  
		//Get shadow DOM informations
		this._shadowRoot = this.attachShadow({ mode: 'open' })
		this._shadowRoot.appendChild(prepared.content.cloneNode(true))
  
		//Set HTML block in shadow DOM of SAC
		this._root = this._shadowRoot.getElementById('root')
  
		//_props object is used to hold properties infosrmation
		this._props = {}
  
		//Call render() method to plot chart
		// this.render(this._resultSet)
		// this.render(this._S1)
		// this.render(this._S2)
  
	  }
  
	  //render() method to plot chart - resultSet1 holds data from SAC table/chart.
	  async render(resultset) {
		await getScriptPromisify('https://cdn.amcharts.com/lib/4/core.js');
		await getScriptPromisify('https://cdn.amcharts.com/lib/4/themes/animated.js');
		await getScriptPromisify('https://cdn.amcharts.com/lib/4/charts.js');

		var finaldata = [];

		for(var i = 0 ; i < resultset.length; i++){
			finaldata.push({ date: resultset[i].value.id, value: resultset[i]["@MeasureDimension"].rawValue});
		}

		console.log(resultset);
       
		console.log(finaldata);

		
		// Themes begin
		am4core.useTheme(am4themes_animated);
		// Themes end
		
		
		var chart = am4core.create(this._root, am4charts.XYChart);
  
		
		// var data = [];
		// var value = 50;
		// for (var i = 0; i < 300; i++) {
		//   var date = new Date();
		//   date.setHours(0, 0, 0, 0);
		//   date.setDate(i);
		//   value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
		//   data.push({ date: date, value: value });
		// }
		chart.data = finaldata;

  
		// Create axes
		var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
		dateAxis.renderer.minGridDistance = 60;
  
		var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  
		// Create series
		var series = chart.series.push(new am4charts.LineSeries());
		series.dataFields.valueY = "value";
		series.dataFields.dateX = "date";
		series.tooltipText = "{value}"
  
		series.tooltip.pointerOrientation = "vertical";
  
		chart.cursor = new am4charts.XYCursor();
		chart.cursor.snapToSeries = series;
		chart.cursor.xAxis = dateAxis;
  
  
	  }
	}
	customElements.define('com-sap-sample-linearea-prepared', SamplePrepared)
  })()
