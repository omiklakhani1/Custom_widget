var getScriptPromisify = (src) => {
    return new Promise(resolve => {
      $.getScript(src, resolve)
    })
  }
  
  (function () {
  
    //Chart Block in HTML
    const prepared = document.createElement('template')
    prepared.innerHTML = `
        <div id="root" style="width: 100%; height: 500px;">
        </div>
      `
    //Main JS Class holds methods to be called
    class SamplePrepared2 extends HTMLElement {
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
        this.render()
      }
  
      //render() method to plot chart - resultSet1 holds data from SAC table/chart.
      async render() {
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/index.js');
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/map.js');
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/geodata/worldLow.js');       
        await getScriptPromisify('https://cdn.amcharts.com/lib/5/themes/Animated.js');

    
{/* <div id="chartdiv"></div> */}
  
        // Themes begin
        var root = am5.Root.new(this._root);


        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.setThemes([
          am5themes_Animated.new(root)
        ]);
        
        
        // Create the map chart
        // https://www.amcharts.com/docs/v5/charts/map-chart/
        var chart = root.container.children.push(am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "rotateY",
          projection: am5map.geoOrthographic(),
          paddingBottom: 20,
          paddingTop: 20,
          paddingLeft: 20,
          paddingRight: 20
        }));
        
        
        // Create main polygon series for countries
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
        var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow 
        }));
        
        polygonSeries.mapPolygons.template.setAll({
          tooltipText: "{name}",
          toggleKey: "active",
          interactive: true
        });
        
        polygonSeries.mapPolygons.template.states.create("hover", {
          fill: root.interfaceColors.get("primaryButtonHover")
        });
        
        polygonSeries.mapPolygons.template.states.create("active", {
          fill: root.interfaceColors.get("primaryButtonHover")
        });
        
        
        // Create series for background fill
        // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
        var backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
        backgroundSeries.mapPolygons.template.setAll({
          fill: root.interfaceColors.get("alternativeBackground"),
          fillOpacity: 0.1,
          strokeOpacity: 0
        });
        backgroundSeries.data.push({
          geometry: am5map.getGeoRectangle(90, 180, -90, -180)
        });
        
        
        // Set up events
        var previousPolygon;
        
        polygonSeries.mapPolygons.template.on("active", function (active, target) {
          if (previousPolygon && previousPolygon != target) {
            previousPolygon.set("active", false);
          }
          if (target.get("active")) {
            var centroid = target.geoCentroid();
            if (centroid) {
              chart.animate({ key: "rotationX", to: -centroid.longitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
              chart.animate({ key: "rotationY", to: -centroid.latitude, duration: 1500, easing: am5.ease.inOut(am5.ease.cubic) });
            }
          }
        
          previousPolygon = target;
        });
        
        
        // Make stuff animate on load
        chart.appear(1000, 100);
      }
    }
    customElements.define('com-sap-sample-RotateGlobe-prepared', SamplePrepared2)
  })()