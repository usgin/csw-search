// this is where your application code goes

var app;
Ext.onReady(function() {
    app = new gxp.Viewer({
        portalConfig: {
            layout: "border",
            region: "center",
            proxy: "/proxy/?url=",
            
            // by configuring items here, we don't need to configure portalItems
            // and save a wrapping container
            items: [{
                id: "centerpanel",
                xtype: "panel",
                layout: "fit",
                region: "center",
                border: false,
                items: ["mymap"],
                margins: "5 0 5 5",
            }, {
            	id: "eastpanel",
            	xtype: "panel",
            	region: "east",
            	layout: "border",
            	title: "Hide this panel&nbsp;&nbsp;",
            	headerStyle: "text-align: right; border: 1px solid #D0D0D0; border-top-color: white;",
            	split: true,
            	collapsible: true,
                width: 495,
                hideBorders: true,
                margins: "5 5 5 0",
                items: [
                    {
                    	id: "table-of-contents",
                    	region: "north",
                        title: "Map Contents",
                        layout: "fit",
                        collapsible: true,
                        height: 200,
                        split: true,
                        margins: "5 0 0 0"
                    }, {
                    	id: "csw-search-wrapper",
                    	region: "center",
                    	layout: "fit",
                    	title: "Search the USGIN Catalog",                    	
                    }
                    
                ]
            }, {
            	id: "beta-panel",
            	region: "north",
            	cls: "beta-header",
            	html: "<div><a href='https://github.com/usgin/csw-search/issues'>Issue Tracker</a></div><div class='beta-title'>BETA VERSION -- WORK IN PROGRESS</div>",
            	bodyStyle: "background-color: red;"
            }],
            bbar: {id: "mybbar"}
        },
        
        // configuration of all tool plugins for this application
        tools: [{
            ptype: "gxp_layertree",
            outputConfig: {
                id: "tree",
                border: true,
                tbar: [] // we will add buttons to "tree.bbar" later
            },
            outputTarget: "table-of-contents"
        }, {
        	ptype: "csw_search",
        	outputConfig: {        	
        		cswUrl: "http://catalog.usgin.org/geoportal/csw/discovery"
        	},
        	outputTarget: "csw-search-wrapper"
        }, {
            ptype: "gxp_addlayers",
            actionTarget: "tree.tbar"
        }, {
            ptype: "gxp_removelayer",
            actionTarget: ["tree.tbar", "tree.contextMenu"]
        }, {
            ptype: "gxp_zoomtoextent",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_zoom",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_navigationhistory",
            actionTarget: "map.tbar"
        }, {
            ptype: "gxp_googlegeocoder",
            outputTarget: "geocoder",
            outputConfig: {
                emptyText: "Search for a location ...",
                width: 400
            }	
        }],
        
        // layer sources
        sources: {           
            google: {
            	ptype: "gxp_googlesource"
            }
        },
        
        // map and layers
        map: {
            id: "mymap", // id needed to reference map in portalConfig above
            projection: "EPSG:102113",
            units: "m",
            maxResolution: 156543.0339,
            maxExtent: [-20037508, -20037508, 20037508, 20037508],
            center: [-10764594.758211, 4523072.3184791],
            zoom: 3,
            tbar: {id: 'geocoder'},
            layers: [{
                source: "google",
                name: "TERRAIN",
                group: "background"
            }],
            items: [{
                xtype: "gx_zoomslider",
                vertical: true,
                height: 100
            }]
        }

    });
});
