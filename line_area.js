// var getScriptPromisify = (src) => {
// 	return new Promise(resolve => {
// 	  $.getScript(src, resolve)
// 	})
//   }
  
(function () {
  
	//Chart Block in HTML
	const prepared = document.createElement('template')
	prepared.innerHTML = `
	
	<style>
	html,body
	{
		height: 100%;
		margin: 0;
	}
	
	#root{
	   background-color: white;
	}

	#placeholder {
	   padding-top: 1em;
	   text-align: center;
	   font_size: 1.5em;
	   color: black;
	}

	#chatdiv {
	   width: 100%;
	   height: 98%;

	   flex-diction: column;
	   display: -webkit-box;
	   display: -ms-box;
	   display: -ms-flexbox;
	   display: -webkit-flet;
	   display: flex;
	   
	}
	 </style>
	 <div id="root" style="width: 100%; height: 100px;">
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

	  onCustomWidgetAfterUpdate() {
		console.log("onCustomWidgetAfterUpdate")
		const div = document.createElement('div')
		div.innerHTML = '<div id="chartdiv" style = "width: 100%; height: 400px;"></div>'
		this._shadowRoot.appendChild(div)
	
	new Promise(resolve => {
		let script = document.createElement('script')
		script.src = 'https://cdn.amcharts.com/lib/4/core.js'
		script.onload = () => {
				resolve(script)
				console.log('loaded core.js')
		}
		this._shadowRoot.appendChild(script)
	
	// })
//   }
		let delay = 100;
		let timer = null;
		let script1 = document.createElement('script')
		timer = setTimeout(function() {
			script1.src = 'https://cdn.amcharts.com/lib/4/charts.js'
			script1.onload = () => {
				resolve(script1)
				console.log('loaded charts.js')
		 }
		}, delay);
		this._shadowRoot.appendChild(script1)
	})

	new Promise(resolve => {
		let script = document.createElement('script')
		script.src = 'https://cdn.amcharts.com/lib/4/themes/animated.js'
		script.onload = () => {
				resolve(script)
				console.log('loaded animated.js')
		}
		this._shadowRoot.appendChild(script)
	})

}


	  //render() method to plot chart - resultSet1 holds data from SAC table/chart.
	  async render(resultset) {

		this._placeholder = this._root.querySelector('#placeholder')
		if(this._placeholder){
			this._root.removeChild(this._placeholder)
			this._placeholder = null
		}

		var mychartdiv =  this._shadowRoot.getElementById('chartdiv')

		am4core.ready(function() {	var finaldata = [];
			for( var i = 0 ; i < 50; i=i+1){
				finaldata.push({ date: resultset[i].date.id, value: resultset[i]["@MeasureDimension"].rawValue});
			}
			for( i = 1 ; i < 50; i=i+1){
				finaldata.push({ date2: resultset[i].date.id, value2: resultset[i]["@MeasureDimension"].rawValue});
			}
	
			// for(var i = 0 ; i < resultset.length; i++){
			// 	finaldata.push({ date: resultset[i].date.id, value: resultset[i]["@MeasureDimension"].rawValue});
			// }
	
			console.log(resultset);
		   	console.log("finaldata");
			console.log(finaldata);
	
			
			// Themes begin
			// am4core.useTheme(am4themes_animated);
			// Themes end
			
			
			var chart = am4core.create(mychartdiv, am4charts.XYChart);
	  
			// for(var i = 0 ; i < resultset.length; i++){
				// finaldata.push({ date: resultset[i].Ship_Date.id, value: resultset[i]["@MeasureDimension"].rawValue});
			// }
			
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
			var valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
	  
			// Create series
			var series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.valueY = "value";
			series.dataFields.dateX = "date";
			series.xAxis = dateAxis;
			series.yAxis = valueAxis;
			series.tooltipText = "{value}"
	  
			series.tooltip.pointerOrientation = "vertical";

			var series2 = chart.series.push(new am4charts.LineSeries());
			series2.dataFields.valueY = "value2";
			series2.dataFields.dateX = "date2";
			series2.xAxis = dateAxis;
			series2.yAxis = valueAxis2;
			series2.stroke = am4core.color("blue");
			series2.tooltipText = "{value2}"
	  
			series2.tooltip.pointerOrientation = "vertical";
	  
			chart.cursor = new am4charts.XYCursor();
			chart.cursor.snapToSeries = series;
			
			chart.cursor.snapToSeries = series2;
			chart.cursor.xAxis = dateAxis;
	  

		});
	
		





		// await getScriptPromisify('https://cdn.amcharts.com/lib/4/core.js');
		// await getScriptPromisify('https://cdn.amcharts.com/lib/4/themes/animated.js');
		// await getScriptPromisify('https://cdn.amcharts.com/lib/4/charts.js');

	
  
	  }
	
	
  }
  customElements.define('com-sap-sample-linearea-prepared', SamplePrepared)
})()
