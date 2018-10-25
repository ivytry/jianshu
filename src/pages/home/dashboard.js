/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
*/
FusionCharts.ready(function() {

    /**
     *  Global variables
     *  App           -> The main application object
     *  utils         -> Set of utility helpers
     *  controllers   -> Controller that contains business logic in rendering a dashboard
     *  dom           -> DOM helper methods
     *  DOCUMENT      -> The document object
     */
    var App,
        utils,
        controllers,
        dom,
        ieVersion,
        ie6,
        ie7,
        isRetina,
        isLessThan8,
        DOCUMENT = document;

    /* For browsers that don't support Array.indexOf method */

    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            for (var i = (start || 0), j = this.length; i < j; i++) {
                if (this[i] === obj) {
                    return i;
                }
            }
            return -1;
        }
    }

    /* For browsers that don't support String.trim method */

    if (typeof String.prototype.trim !== "function") {
        String.prototype.trim = function() {
            return this.replace(/^\s+|\s+$/g, '');
        }
    }

    if (!DOCUMENT.getElementsByClassName && !DOCUMENT.querySelectorAll) {
        DOCUMENT.querySelectorAll = function(r, c, i, j, a) {
            a = DOCUMENT.all, s = DOCUMENT.createStyleSheet(), c = [],
                r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
            for (i = r.length; i--;) {
                s.addRule(r[i], 'k:v');
                for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                s.removeRule(0);
            }
            return c;
        }
    }
    /**
     *  Utility methods
     */
    utils = {

        /**
         *  Add an event listener to a dom / chart object
         */
        addEventListener: function(id, eventName, callback, _isObject, _isClass) {
            var obj, i, elemArray = [],
                elemArrayLength,
                isObject = typeof _isObject === "undefined" ? false : true;

            // If the element passed is a class, add the event listener to all the elements
            if (_isClass) {
                elemArray = dom.getByClass(id);
                elemArrayLength = elemArray.length;
                for (i = 0; i < elemArrayLength; i++) {
                    if (elemArray[i].addEventListener) {
                        elemArray[i].addEventListener(eventName, callback);
                    } else if (elemArray[i].attachEvent) {
                        elemArray[i].attachEvent("on" + eventName, callback);
                    }
                }
                return;
            }
            if (!isObject) {
                obj = dom.getById(id);
            } else {
                obj = id;
            }

            if (obj.addEventListener) {
                obj.addEventListener(eventName, callback);
            } else if (obj.attachEvent) {
                obj.attachEvent("on" + eventName, callback);
            }
        },

        /**
         *  Prevent event callback for an event listener to be triggered
         */
        triggerEvent: function(eventName, callback) {
            var mouseEvent;

            if (DOCUMENT.createEvent) {
                mouseEvent = DOCUMENT.createEvent("MouseEvent");

                mouseEvent.initEvent(eventName, true, true);
                callback(mouseEvent);
            } else if (DOCUMENT.createEventObject) {
                mouseEvent = DOCUMENT.createEventObject();
                callback(mouseEvent);
            }
        },

        /**
         *  Event dispatcher that executes the callback for a sepcific event listener
         */
        dispatchEvent: function(element, options) {
            var triggerer = options.trigger,
                eventName = options.eventName;

            if (element.dispatchEvent) {
                element.dispatchEvent(triggerer);
            } else if (element.fireEvent) {
                element.fireEvent("on" + eventName, triggerer);
            }
        },

        // Check if IE6
        isIE6: function() {
            ieVersion = utils.getIEVersion();
            return (ieVersion > 0 && ieVersion < 7) ? true : false;
        },

        // Check if IE7
        isIE7: function() {
            ieVersion = utils.getIEVersion();
            return (ieVersion > 0 && ieVersion == 7) ? true : false;
        },

        // Check if IE is less than version 8
        isLessThan8: function() {
            ieVersion = utils.getIEVersion();
            return (ieVersion > 0 && ieVersion <= 8) ? true : false;
        },

        // Get current version of IE
        getIEVersion: function() {
            var pattern = /MSIE (\d+\.\d+);/;

            if (pattern.test(window.navigator.userAgent)) {
                return new Number(RegExp.$1);
            }

            return 0;
        },

        // Checks whehter the display is retina or not
        isRetina: function() {
            return window.devicePixelRatio && window.devicePixelRatio > 1;
        }
    };

    /**
     *  DOM object
     */
    dom = {

        /**
         *  Equivalent to document.getElementById
         */
        getById: function(id) {
            return DOCUMENT.getElementById(id);
        },
        /**
         *  Equivalent to document.getElementsByClass
         *  Returns an array of elements matching the className
         */
        getByClass: function(className) {
            if (DOCUMENT.getElementsByClassName)
                return DOCUMENT.getElementsByClassName(className);
            else
                return DOCUMENT.querySelectorAll("." + className);

        },
    };

    /**
     *  Private Methods
     */

    /**
     *  Bind an event to a dom element
     */
    var bindDomEvent = function(obj, id, name, callback) {
        obj.events[id] = {
            id: id,
            name: name,
            callback: callback,
            element: dom.getById(id)
        };

        utils.addEventListener(id, name, callback);
    };

    /**
     *  Trigger callback of an event that was bounded for a dom element
     */
    var triggerDomEvent = function(obj, id, eventName) {
        utils.triggerEvent(eventName, function(trigger) {

            utils.dispatchEvent(obj.events[id]["element"], {
                trigger: trigger,
                eventName: eventName
            });
        });
    };

    // Assigning helper global variables
    isRetina = utils.isRetina();
    ieVersion = utils.getIEVersion();
    ie6 = utils.isIE6();
    ie7 = utils.isIE7();
    isLessThan8 = utils.isLessThan8();

    controllers = {
        collaborationDashboardController: {
            comments: collaborationData.comments,
            chartConfig: {
                // Chart configurations for the copied chart and chart that appears in comments
                miniChartConfig: {
                    "showAxisLimitGridLines": "0",
                    "showValues": "0",
                    "showLabels": "0",
                    "animation": "0",
                    "exportEnabled": "0",
                    "showHoverEffect": "0",
                    "showYAxisValues": "0",
                    "caption": "",
                    "subCaption": "",
                    "xAxisName": "",
                    "yAxisName": "",
                    "showXAxisLine": "0",
                    "showYAxisLine": "0",
                    "numDivLines": "0",
                    "enableSlicing": "0",
                    "enableRotation": "0",
                    "paletteColors": "#979797",
                    "showToolTip": "0"
                },
                // Chart configuation for the Sales Analysis chart
                salesAnalysisConfig: {
                    type: "MSCombiDY2D",
                    id: "yearlySalesSummary",
                    width: "940",
                    height: "390",
                    dataFormat: "json",
                    renderAt: "sales-chart",
                    asyncRender : 0,
                    containerBackgroundOpacity: "0",
                    dataSource: {
                        chart: {
                            numberPrefix: "$",
                            xAxisName: "",
                            pYAxisName: "Sales (US $ in thousands)",
                            sYAxisName: "Units sold (in thousands)",
                            ca_miniChartTitle: "Top 5 Categories",
                            theme: "collaboration",
                            animation: "0"
                        },
                        categories: [{
                            category: []
                        }],
                        dataset: [{
                            seriesName: "Sales",
                            renderAs: "column",
                            showValues: "0",
                            data: []
                        }, {
                            seriesName: "Units Sold",
                            renderAs: "line",
                            showValues: "0",
                            parentYAxis: "S",
                            data: []
                        }],
                        // Annotations for the Sales Analysis chart.
                        // Initially all the annotations are hidden and made visible only on hover
                        annotations: {
                            groups: [{
                                id: "sales_Jan",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-1",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.0.startx-3",
                                    "y": "$dataset.0.set.0.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.0.startx+43",
                                    "toY": "$dataset.0.set.0.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-1",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.0.startx+5",
                                    "y": "$dataset.0.set.0.starty-20",
                                    "toX": "$dataset.0.set.0.startx+25",
                                    "toY": "$dataset.0.set.0.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Feb",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-2",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.1.startx-3",
                                    "y": "$dataset.0.set.1.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.1.startx+43",
                                    "toY": "$dataset.0.set.1.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-2",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.1.startx+5",
                                    "y": "$dataset.0.set.1.starty-20",
                                    "toX": "$dataset.0.set.1.startx+25",
                                    "toY": "$dataset.0.set.1.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Mar",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-3",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.2.startx-3",
                                    "y": "$dataset.0.set.2.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.2.startx+43",
                                    "toY": "$dataset.0.set.2.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-3",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.2.startx+5",
                                    "y": "$dataset.0.set.2.starty-20",
                                    "toX": "$dataset.0.set.2.startx+25",
                                    "toY": "$dataset.0.set.2.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Apr",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-4",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.3.startx-3",
                                    "y": "$dataset.0.set.3.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.3.startx+43",
                                    "toY": "$dataset.0.set.3.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-4",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.3.startx+5",
                                    "y": "$dataset.0.set.3.starty-20",
                                    "toX": "$dataset.0.set.3.startx+25",
                                    "toY": "$dataset.0.set.3.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_May",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-5",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.4.startx-3",
                                    "y": "$dataset.0.set.4.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.4.startx+43",
                                    "toY": "$dataset.0.set.4.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-5",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.4.startx+5",
                                    "y": "$dataset.0.set.4.starty-20",
                                    "toX": "$dataset.0.set.4.startx+25",
                                    "toY": "$dataset.0.set.4.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Jun",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-6",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.5.startx-3",
                                    "y": "$dataset.0.set.5.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.5.startx+43",
                                    "toY": "$dataset.0.set.5.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-6",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.5.startx+5",
                                    "y": "$dataset.0.set.5.starty-20",
                                    "toX": "$dataset.0.set.5.startx+25",
                                    "toY": "$dataset.0.set.5.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Jul",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-7",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.6.startx-3",
                                    "y": "$dataset.0.set.6.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.6.startx+43",
                                    "toY": "$dataset.0.set.6.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-7",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.6.startx+5",
                                    "y": "$dataset.0.set.6.starty-20",
                                    "toX": "$dataset.0.set.6.startx+25",
                                    "toY": "$dataset.0.set.6.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Aug",
                                showBelow: "0",
                                items: [{
                                    "id": "comment-lable-rect-8",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.7.startx-3",
                                    "y": "$dataset.0.set.7.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.7.startx+43",
                                    "toY": "$dataset.0.set.7.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-8",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.7.startx+5",
                                    "y": "$dataset.0.set.7.starty-20",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)",
                                    "toX": "$dataset.0.set.7.startx+17",
                                    "toy": "$dataset.0.set.7.starty-8"
                                }, {
                                    "id": "comment-label-value-8",
                                    "type": "text",
                                    "fontColor": "#38454f",
                                    "fontSize": "11",
                                    "x": "$dataset.0.set.7.startx+25",
                                    "y": "$dataset.0.set.7.starty-15",
                                    "text": "3",
                                    "link": "javascript:void(0)",
                                    "font": "'AvenirLTStd-Heavy', sans-serif"
                                }, {
                                    "id": "comment-label-text-8",
                                    "type": "text",
                                    "fontColor": "#38454f",
                                    "fontSize": "11",
                                    "x": "$dataset.0.set.7.startx+59",
                                    "y": "$dataset.0.set.7.starty-15",
                                    "wrapWidth": "60",
                                    "wrapHeight": "15",
                                    "text": "Comments",
                                    "visible": "0",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-label-text-rect-8",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.7.startx+30",
                                    "y": "$dataset.0.set.7.starty - 20",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.7.startx+90",
                                    "toY": "$dataset.0.set.7.starty",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "visible": "0",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Sep",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-9",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.8.startx-3",
                                    "y": "$dataset.0.set.8.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.8.startx+43",
                                    "toY": "$dataset.0.set.8.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-9",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.8.startx+5",
                                    "y": "$dataset.0.set.8.starty-20",
                                    "toX": "$dataset.0.set.8.startx+25",
                                    "toY": "$dataset.0.set.8.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Oct",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-10",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.9.startx-3",
                                    "y": "$dataset.0.set.9.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.9.startx+43",
                                    "toY": "$dataset.0.set.9.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-10",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.9.startx+5",
                                    "y": "$dataset.0.set.9.starty-20",
                                    "toX": "$dataset.0.set.9.startx+25",
                                    "toY": "$dataset.0.set.9.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Nov",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-11",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.10.startx-3",
                                    "y": "$dataset.0.set.10.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.10.startx+43",
                                    "toY": "$dataset.0.set.10.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-11",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.10.startx+5",
                                    "y": "$dataset.0.set.10.starty-20",
                                    "toX": "$dataset.0.set.10.startx+25",
                                    "toY": "$dataset.0.set.10.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "sales_Dec",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-12",
                                    "type": "rectangle",
                                    "x": "$dataset.0.set.11.startx-3",
                                    "y": "$dataset.0.set.11.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.0.set.11.startx+43",
                                    "toY": "$dataset.0.set.11.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-12",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.0.set.11.startx+5",
                                    "y": "$dataset.0.set.11.starty-20",
                                    "toX": "$dataset.0.set.11.startx+25",
                                    "toY": "$dataset.0.set.11.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Jan",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-13",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.0.startx-14",
                                    "y": "$dataset.1.set.0.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.0.startx+26",
                                    "toY": "$dataset.1.set.0.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-13",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.0.startx-6",
                                    "y": "$dataset.1.set.0.starty-20",
                                    "toX": "$dataset.1.set.0.startx+14",
                                    "toY": "$dataset.1.set.0.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Feb",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-14",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.1.startx-14",
                                    "y": "$dataset.1.set.1.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.1.startx+26",
                                    "toY": "$dataset.1.set.1.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-14",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.1.startx-6",
                                    "y": "$dataset.1.set.1.starty-20",
                                    "toX": "$dataset.1.set.1.startx+14",
                                    "toY": "$dataset.1.set.1.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Mar",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-15",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.2.startx-14",
                                    "y": "$dataset.1.set.2.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.2.startx+26",
                                    "toY": "$dataset.1.set.2.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-15",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.2.startx-6",
                                    "y": "$dataset.1.set.2.starty-20",
                                    "toX": "$dataset.1.set.2.startx+14",
                                    "toY": "$dataset.1.set.2.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Apr",
                                showBelow: "0",
                                visible: "1",
                                items: [{
                                    "id": "comment-lable-rect-16",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.3.startx-14",
                                    "y": "$dataset.1.set.3.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.3.startx+32",
                                    "toY": "$dataset.1.set.3.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-16",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.3.startx-6",
                                    "y": "$dataset.1.set.3.starty-20",
                                    "link": "javascript:void(0)",
                                    "toX": "$dataset.1.set.3.startx+6",
                                    "toY": "$dataset.1.set.3.starty-8"
                                }, {
                                    "id": "comment-label-value-16",
                                    "type": "text",
                                    "fontColor": "#A1B86C",
                                    "fontSize": "11",
                                    "x": "$dataset.1.set.3.startx+14",
                                    "y": "$dataset.1.set.3.starty-15",
                                    "text": "3",
                                    "link": "javascript:void(0)",
                                    "font": "'AvenirLTStd-Heavy', sans-serif"
                                }, {
                                    "id": "comment-label-text-16",
                                    "type": "text",
                                    "fontColor": "#A1B86C",
                                    "fontSize": "11",
                                    "x": "$dataset.1.set.3.startx+48",
                                    "y": "$dataset.1.set.3.starty-15",
                                    "wrapWidth": "60",
                                    "wrapHeight": "15",
                                    "text": "Comments",
                                    "visible": "0",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-label-text-rect-16",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.3.startx+19",
                                    "y": "$dataset.1.set.3.starty-20",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.5.startx+79",
                                    "toY": "$dataset.1.set.5.starty",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "visible": "0",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_May",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-17",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.4.startx-14",
                                    "y": "$dataset.1.set.4.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.4.startx+26",
                                    "toY": "$dataset.1.set.4.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-17",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.4.startx-6",
                                    "y": "$dataset.1.set.4.starty-20",
                                    "toX": "$dataset.1.set.4.startx+14",
                                    "toY": "$dataset.1.set.4.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Jun",
                                visible: "0",
                                showBelow: "0",
                                items: [{
                                    "id": "comment-lable-rect-18",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.5.startx-14",
                                    "y": "$dataset.1.set.5.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.5.startx+26",
                                    "toY": "$dataset.1.set.5.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-18",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.5.startx-6",
                                    "y": "$dataset.1.set.5.starty-20",
                                    "toX": "$dataset.1.set.5.startx+14",
                                    "toY": "$dataset.1.set.5.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]

                            }, {
                                id: "unitsSold_Jul",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-19",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.6.startx-14",
                                    "y": "$dataset.1.set.6.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.6.startx+26",
                                    "toY": "$dataset.1.set.6.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-19",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.6.startx-6",
                                    "y": "$dataset.1.set.6.starty-20",
                                    "toX": "$dataset.1.set.6.startx+14",
                                    "toY": "$dataset.1.set.6.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Aug",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-20",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.7.startx-14",
                                    "y": "$dataset.1.set.7.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.7.startx+26",
                                    "toY": "$dataset.1.set.7.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-20",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.7.startx-6",
                                    "y": "$dataset.1.set.7.starty-20",
                                    "toX": "$dataset.1.set.7.startx+14",
                                    "toY": "$dataset.1.set.7.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Sep",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-21",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.8.startx-14",
                                    "y": "$dataset.1.set.8.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.8.startx+26",
                                    "toY": "$dataset.1.set.8.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-21",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.8.startx-6",
                                    "y": "$dataset.1.set.8.starty-20",
                                    "toX": "$dataset.1.set.8.startx+14",
                                    "toY": "$dataset.1.set.8.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Oct",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-22",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.9.startx-14",
                                    "y": "$dataset.1.set.9.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.9.startx+26",
                                    "toY": "$dataset.1.set.9.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-22",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.9.startx-6",
                                    "y": "$dataset.1.set.9.starty-20",
                                    "toX": "$dataset.1.set.9.startx+14",
                                    "toY": "$dataset.1.set.9.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Nov",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-23",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.10.startx-14",
                                    "y": "$dataset.1.set.10.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.10.startx+26",
                                    "toY": "$dataset.1.set.10.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-23",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.10.startx-6",
                                    "y": "$dataset.1.set.10.starty-20",
                                    "toX": "$dataset.1.set.10.startx+14",
                                    "toY": "$dataset.1.set.10.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }, {
                                id: "unitsSold_Dec",
                                showBelow: "0",
                                visible: "0",
                                items: [{
                                    "id": "comment-lable-rect-24",
                                    "type": "rectangle",
                                    "x": "$dataset.1.set.11.startx-14",
                                    "y": "$dataset.1.set.11.starty-5",
                                    "radius": "10",
                                    "toX": "$dataset.1.set.11.startx+26",
                                    "toY": "$dataset.1.set.11.starty-25",
                                    "fillColor": "#F6F6F6",
                                    "fillAlpha": "100",
                                    "link": "javascript:void(0)"
                                }, {
                                    "id": "comment-lable-img-24",
                                    "url": "",
                                    "type": "image",
                                    "x": "$dataset.1.set.11.startx-6",
                                    "y": "$dataset.1.set.11.starty-20",
                                    "toX": "$dataset.1.set.11.startx+14",
                                    "toY": "$dataset.1.set.11.starty-8",
                                    "fillColor": "#005A77",
                                    "link": "javascript:void(0)"
                                }]
                            }]
                        }
                    }
                },
                // Chart configuration for top 5 categories by sales
                topCategoriesConfig: {
                    type: "column2D",
                    id: "topCategories",
                    width: "442",
                    height: "300",
                    dataFormat: "json",
                    asyncRender : 0,
                    renderAt: "top-categories-chart",
                    containerBackgroundOpacity: "0",
                    dataSource: {
                        chart: {
                            numberPrefix: "$",
                            xAxisName: "",
                            YAxisName: "",
                            theme: "collaboration"
                        },
                        data: []
                    }
                },
                // Chart configuration for top 5 countries by sales
                topCountriesConfig: {
                    type: "column2D",
                    id: "topCountries",
                    width: "442",
                    height: "300",
                    dataFormat: "json",
                    asyncRender : 0,
                    renderAt: "top-countries-chart",
                    containerBackgroundOpacity: "0",
                    dataSource: {
                        chart: {
                            numberPrefix: "$",
                            xAxisName: "",
                            YAxisName: "",
                            theme: "collaboration"
                        },
                        data: []
                    }
                },
                // Chart configuration for tcategorywise sales - drill down from top 5 categoreies by sales
                categoryWiseSales: {
                    type: "column2D",
                    id: "individualCategorySales",
                    width: "442",
                    height: "300",
                    renderAt: "top-categories-chart",
                    dataFormat: "json",
                    asyncRender : 0,
                    containerBackgroundOpacity: "0",
                    dataSource: {
                        chart: {
                            numberPrefix: "$",
                            xAxisName: "Products",
                            YAxisName: "Sales (US $ in thousands)",
                            ca_miniChartTitle: "",
                            theme: "collaboration"
                        },
                        data: []
                    }
                },
                // Chart configuration for sales (Column chart in modal)
                salesColumnConfig: {
                    type: "column2D",
                    id: "salesColumnChart",
                    width: "598",
                    height: "380",
                    dataFormat: "json",
                    asyncRender : 0,
                    //renderAt: "modal-chart-container",
                    containerBackgroundOpacity: "0",
                    dataSource: {
                        chart: {
                            numberPrefix: "$",
                            xAxisName: "",
                            YAxisName: "",
                            animation: "0",
                            canvasBgColor: "#ffffff",
                            theme: "collaboration"
                        },
                        data: []
                    }
                },
                // Chart configuration for units sold (Line chart in modal)
                unitsSoldLineConfig: {
                    type: "line",
                    id: "unitsSoldLineChart",
                    width: "598",
                    height: "380",
                    dataFormat: "json",
                    asyncRender : 0,
                    //renderAt: "modal-chart-container",
                    containerBackgroundOpacity: "0",
                    dataSource: {
                        chart: {
                            xAxisName: "",
                            YAxisName: "",
                            animation: "0",
                            canvasBgColor: "#ffffff",
                            theme: "collaboration"
                        },
                        data: []
                    }
                }
            },
            // Function that draws the charts of the current dashboard
            drawCharts: function(db) {
                var salesAnalysisChart, topCategoriesChart, topcountriesChart, salesColumnChart,
                    unitsSoldLineChart, categoryWiseSalesChart;

                // Adding and setting the data for sales analysis chart
                salesAnalysisChart = db.addChart("sales_analysis");
                salesAnalysisChart.setConfig(
                    controllers.collaborationDashboardController.chartConfig.salesAnalysisConfig);
                salesAnalysisChart.setCategories(collaborationData.salesAnalysisCategories);
                salesAnalysisChart.setDataSetData(collaborationData.salesAnalysisData);

                // Adding and setting the data for Top 5 categories by sales chart
                /*topCategoriesChart = db.addChart("top_categories");
                topCategoriesChart.setConfig(
                    controllers.collaborationDashboardController.chartConfig.topCategoriesConfig);
                topCategoriesChart.setData(collaborationData.topCategoriesBySalesData);*/

                // Adding and configuring the categorywise sales chart (Drill down from Top 5 categories by sales chart)
                categoryWiseSalesChart = db.addChart("categorywise_sales");
                categoryWiseSalesChart.setConfig(
                    controllers.collaborationDashboardController.chartConfig.categoryWiseSales);

                // Adding and setting the data for Top countries by sales chart
                /*topcountriesChart = db.addChart("top_countries");
                topcountriesChart.setConfig(
                    controllers.collaborationDashboardController.chartConfig.topCountriesConfig);
                topcountriesChart.setData(collaborationData.topCountriesBySalesData);
*/
                // Adding and setting the data for Sales chart (Column chart in modal)
                salesColumnChart = db.addChart("sales_column");
                salesColumnChart.setConfig(controllers.collaborationDashboardController.chartConfig.salesColumnConfig);
                salesColumnChart.setData(collaborationData.salesColumnData);

                // Adding and setting the data for Units sold chart (Line chart in modal)
                unitsSoldLineChart = db.addChart("unitsSold_line");
                unitsSoldLineChart.setConfig(
                    controllers.collaborationDashboardController.chartConfig.unitsSoldLineConfig);
                unitsSoldLineChart.setData(collaborationData.unitsSoldLineData);

                // On clicking the sales analysis chart, it should open the modal containing comments
                utils.addEventListener(salesAnalysisChart.core, "dataPlotClick", function(evtObj, argObj) {
                    var chart;
                    if (argObj.datasetIndex == 0) {
                        chart = "sales";
                    } else {
                        chart = "unitsSold";
                    }
                    controllers.collaborationDashboardController.showComments(chart, argObj.categoryLabel);
                }, true);

                // On clicking of any of the annotations in Sales Analysis chart, it should open the modal
                // with the comments corresponding to that data plot
                utils.addEventListener(salesAnalysisChart.core, "annotationClick", function(evtObj, argObj) {
                    var chart, annotationXCoord = argObj.annotationOptions.x,
                        // The annotationOptions.x contains the dataset index (Sales or Units Sold) and
                        // the data index (the month)
                        monthIdIndex = annotationXCoord.lastIndexOf("."),
                        monthId = annotationXCoord.substring(monthIdIndex - 1, monthIdIndex),
                        dataSetIndex = annotationXCoord.indexOf("."),
                        dataSetId = annotationXCoord.substring(dataSetIndex + 1, dataSetIndex + 2);
                    if (dataSetId == "0")
                        chart = "sales";
                    else
                        chart = "unitsSold";
                    controllers.collaborationDashboardController.showComments(chart,
                        collaborationData.salesAnalysisCategories[parseInt(monthId)].label);
                }, true);

                // On moving the cursor over the data plot of Sales Analysis chart, it should expand the annotations
                utils.addEventListener(salesAnalysisChart.core, "dataPlotRollOver", annotationHover, true);

                // On moving the cursor out of the data plot of Sales Analysis chart, it should shrink the annotations
                utils.addEventListener(salesAnalysisChart.core, "dataPlotRollOut", annotationHoverOut, true);

                // Expand the annotations on hovering over the annotations in Sales Analysis Chart
                utils.addEventListener(salesAnalysisChart.core, "annotationRollOver", annotationHover, true);

                //Shrink the annotations on hovering over the annotations in Sales Analysis Chart
                utils.addEventListener(salesAnalysisChart.core, "annotationRollOut", annotationHoverOut, true);

                // On clicking on any of data plot in Top 5 categories chart, 
                // it should show the drilled down data of that category
                /*utils.addEventListener(topCategoriesChart.core, "dataPlotClick", function(evtObj, argObj) {
                    var //label = DataHelpers.slugize(argObj.categoryLabel),
                        caption = dom.getById("chart-subcaption"),
                        //backLink = dom.getById("back-link"),
                        dTitleDiv = dom.getById("category-chart-title");

                    // Update the title    
                    dTitleDiv.innerHTML = argObj.categoryLabel + " by monthly sales";
                    backLink.style.display = "block";
                    caption.style.display = "none";
                    // This flag will help when copy chart is clicked
                    topCategoriesChart.inDom = false;
                    // Set the data depending upon the data plot clicked
                    categoryWiseSalesChart.setData(collaborationData.productWiseSalesData["2014"][label][0].data);
                    categoryWiseSalesChart.core.setChartAttribute("ca_miniChartTitle", "Top Products in " +
                        argObj.categoryLabel);
                    viewHelpers.drillDownChart = label;
                    categoryWiseSalesChart.render();
                }, true);*/

                // On clicking the sales chart in modal, it should update the comments corresponding to that data plot
                utils.addEventListener(salesColumnChart.core, "dataPlotClick", function(evtObj, argObj) {
                    controllers.collaborationDashboardController.showComments("sales", argObj.categoryLabel);
                }, true);

                // On clicking the units sold chart in modal, 
                // it should update the comments corresponding to that data plot
                utils.addEventListener(unitsSoldLineChart.core, "dataPlotClick", function(evtObj, argObj) {
                    controllers.collaborationDashboardController.showComments("unitsSold", argObj.categoryLabel);
                }, true);



                function annotationHover(evtObj, argObj) {
                    var currentGroupX, finalY, i, groupIndex = -1,
                        annotations = evtObj.sender.annotations,
                        groupArray = FusionCharts.items.yearlySalesSummary.annotations.groups,
                        groupArrayLength = FusionCharts.items.yearlySalesSummary.annotations.groups.length,
                        dataSetName;
                    // If the function is called from the dataplot hover, it won't have the annotaiton group id
                    if (!argObj.groupId) {
                        datasetName = argObj.datasetName.toLowerCase();
                        if (datasetName === "sales")
                            argObj.groupId = datasetName + "_" + argObj.categoryLabel;
                        else {
                            argObj.groupId = "unitsSold" + "_" + argObj.categoryLabel;
                        }
                    }
                    for (i = 0; i < groupArrayLength; i++) {
                        if (groupArray[i]._id == argObj.groupId) {
                            groupIndex = i;
                            break;
                        }
                    }
                    if (groupIndex != -1 && groupArray[groupIndex].items.length != 2) {
                        // Make the text comments visible in annotation
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[4].wrapper.attr(
                            "opacity", 100);
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[3].wrapper.attr(
                            "visibility", "visible");
                        // Animate the background rectangle in annotation
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[0].wrapper.animate({
                            width: 101
                        }, 100, "easeInOut", null);
                        currentGroupX = (FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[3].
                            wrapper.attr("x"));
                        // Remove the rectangle thats hides the text "comments". This will give the sliding effect
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[4].wrapper.animate({
                            width: 0,
                            x: currentGroupX + 30
                        }, 200, "easeOut", null);
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[3].wrapper.animate({
                            opacity: 100
                        }, 200, "easeOut", null);
                        // This function will animate the rectangle that covers the text "comments" and 
                        // the background rectangle simultaneously
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].wrapper.animateWith(
                            FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[4].wrapper, null,
                            {
                                transform: "t-5,0"
                            }, 200, "easeOut");
                    } else {
                        // Dynamically position the column's annotation if it overlaps with the line's annotations
                        if (evtObj.eventType === "dataplotrollover") {
                            groupArray[groupIndex].wrapper.attr("visibility", "visible");
                            if (datasetName === "sales" && 
                                FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex + 12].
                                items.length === 5) {
                                finalY = (controllers.collaborationDashboardController.spaceManager(
                                    FusionCharts.items["yearlySalesSummary"].jsVars.instanceAPI.components.dataset[0].components.data[groupIndex].graphics.
                                    element.attrs.y,
                                    FusionCharts.items["yearlySalesSummary"].jsVars.instanceAPI.components.dataset[1].components.data[groupIndex].graphics.
                                    element.attrs.path[0][2], -5, -20, -7, -25));
                                FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[0].wrapper.
                                attr("y", finalY - 25);
                                FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[1].wrapper.
                                attr("y", finalY - 20);
                            }
                        }
                    }

                }

                function annotationHoverOut(evtObj, argObj) {
                    var currentGroupX, i, groupIndex = -1,
                        annotations = evtObj.sender.annotations,
                        groupArray = FusionCharts.items.yearlySalesSummary.annotations.groups,
                        groupArrayLength = FusionCharts.items.yearlySalesSummary.annotations.groups.length;
                    if (!argObj.groupId) {
                        if (argObj.datasetName.toLowerCase() === "sales")
                            argObj.groupId = argObj.datasetName.toLowerCase() + "_" + argObj.categoryLabel;
                        else {
                            argObj.groupId = "unitsSold" + "_" + argObj.categoryLabel;
                        }
                    }
                    for (i = 0; i < groupArrayLength; i++) {
                        if (groupArray[i]._id == argObj.groupId) {
                            groupIndex = i;
                            break;
                        }
                    }
                    if (groupIndex != -1 && groupArray[groupIndex].items.length != 2) {
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[0].wrapper.animate({
                            width: 46
                        }, 100, "easeInOut", null);
                        currentGroupX = 
                        (FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[3].
                            wrapper.attr("x"));
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[4].wrapper.animate({
                            width: 60,
                            x: currentGroupX - 25
                        }, 200, "easeOut", null);

                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].wrapper.animateWith(
                            FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[4].wrapper,
                            null, {
                                transform: "t-1,0"
                            }, 200, "easeOut");


                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[3].wrapper.animate({
                            opacity: 0
                        }, 200, "easeOut", null);
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[4].wrapper.attr(
                            "opacity", 0);
                        FusionCharts.items.yearlySalesSummary.annotations.groups[groupIndex].items[3].wrapper.attr(
                            "visibility", "hidden");
                    } else {
                        groupArray[groupIndex].wrapper.attr("visibility", "hidden");
                    }
                }

                // Render the Sales Analysis, Top 5 Categories by sales and Top 5 COuntries by sales chart
                db.renderSpecificCharts(["sales_analysis"]);
            },
            // Function used to show the comments for the specific data plot in the modal
            showComments: function(chart, month) {
                var i, modalChart, commentTextElement, chartDiv, chartSelectedMonth, chartSelectedValue,
                    currentValue, tempChart, db, miniChart, copyDataSource, copiedMiniChart, dataForCategoryChart,
                    monthComments, currentData, plotItemsLength,
                    commentBody = dom.getById("comments-body"),
                    monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    monthIndex = monthsArray.indexOf(month);

                // Remove the existing comments in the modal first
                while (commentBody.firstChild) {
                    commentBody.removeChild(commentBody.firstChild);
                }
                // Show the modal
                //viewHelpers.showModal();
                // Update the current chart and month being shown. This will be useful when adding a new comment
                eventStates.currentChart = chart;
                eventStates.currentMonth = month;
                // If local storage is present, get the comments from local storage 
                // else get it from Javascript object from data.js file
                if (typeof localStorage != "undefined" && localStorage.getItem) {
                    monthComments = (JSON.parse(localStorage.getItem("comments")))["salesAnalysis"][chart][month];
                } else {
                    monthComments = collaborationData.comments.salesAnalysis[chart][month];
                }
                // For displaying the current data plot's value above the chart
                chartSelectedValue = dom.getById("current-chart-value");

                // If the chart is sales, render a column chartr else render a line chart
                if (chart === "sales") {
                    App.activeDashboards.collaborationDashboard.db.getChart("sales_column").render();
                    // plotItems = FusionCharts.items["salesColumnChart"].jsVars.hcObj.elements.plots[0].items;
                    plotItems = FusionCharts.items["salesColumnChart"].jsVars.instanceAPI.components.dataset[0].components.data;
                    currentValue = 
                    FusionCharts.formatNumber(
                        (FusionCharts.items["salesColumnChart"].getJSONData()).data[monthIndex].value, {
                        numberPrefix: "$"
                    });
                    // Highlight the current selected data plot and make the opacity as 0.2 to other dataplots
                    plotItemsLength = plotItems.length;
                    for (i = 0; i < plotItemsLength; i++) {
                        plotItems[i].graphics.element.attr("fill-opacity", 0.2);
                        plotItems[i].config.setRolloutAttr["fill-opacity"] = 0.2;
                        plotItems[i].config.setRolloverAttr["fill-opacity"] = 0.2;
                    }
                    plotItems[monthIndex].graphics.element.attr("fill-opacity", 1);
                    plotItems[monthIndex].config.setRolloutAttr["fill-opacity"] = 1;
                    plotItems[monthIndex].config.setRolloverAttr["fill-opacity"] = 1;
                    //dom.getById("modal-chart-title").innerHTML = "Sales";
                    chartSelectedValue.style.color = "#0f5a78";
                } else {
                    App.activeDashboards.collaborationDashboard.db.getChart("unitsSold_line").render();
                    plotItems = FusionCharts.items["unitsSoldLineChart"].jsVars.instanceAPI.components.dataset[0].components.data;
                    currentValue = FusionCharts.formatNumber(
                        (FusionCharts.items["unitsSoldLineChart"].getJSONData()).data[monthIndex].value);
                    currentData = (FusionCharts.items["unitsSoldLineChart"].getJSONData());
                    // Highlight the current selected data plot by giving larger radius and color
                    currentData.data[monthIndex].anchorradius = "15";
                    currentData.data[monthIndex].anchorBgColor = "#a1b86c";
                    currentData.data[monthIndex].anchorBorderColor = "#ffffff";
                    currentData.data[monthIndex].anchorBorderThickness = "3";
                    FusionCharts.items["unitsSoldLineChart"].setJSONData(currentData);
                    //dom.getById("modal-chart-title").innerHTML = "Units Sold";
                    chartSelectedValue.style.color = "#A1B86C";
                }
                chartSelectedValue.innerHTML = currentValue;
                if (monthComments) {
                    commentLength = monthComments.length;
                    for (i = 0; i < commentLength; i++) {
                        if (monthComments[i].chartId) {
                            // If the chart is not in the FusionCharts collection, then create anew chart and render
                            // Useful when the user has refreshed the page
                            if (!FusionCharts.items[monthComments[i].chartId]) {
                                db = App.activeDashboards.collaborationDashboard.db;
                                tempChart = FusionCharts.items[monthComments[i].parentChart];
                                miniChart = FusionCharts(tempChart.id);
                                copyDataSource = miniChart.args.dataSource;
                                copiedMiniChart = miniChart.clone({
                                    id: monthComments[i].chartId,
                                    height: 100,
                                    width: 280,
                                    renderAt: "copied-chart",
                                    containerBackgroundOpacity: "0",
                                    dataSource: copyDataSource
                                }, false);

                                copiedMiniChart.setChartAttribute(
                                    controllers.collaborationDashboardController.chartConfig.miniChartConfig);
                                if (monthComments[i].category !== "") {
                                    copiedMiniChart.setChartAttribute("ca_miniChartTitle", "Top Products in " +
                                        monthComments[i].category);
                                    dataForCategoryChart = copiedMiniChart.getJSONData();
                                    dataForCategoryChart.data = collaborationData.productWiseSalesData["2014"][
                                        monthComments[i].category
                                    ][0].data;
                                    copiedMiniChart.setJSONData(dataForCategoryChart);
                                } else {
                                    copiedMiniChart.setChartAttribute("ca_miniChartTitle", monthComments[i].chartTitle);
                                }
                            }
                        }
                    }
                }
                // Change the modal title above the chart
                commentTextElement = dom.getById("comments-title-text");
                commentTextElement.innerHTML = month + " 2014";
                chartSelectedMonth = dom.getById("current-chart-month");
                chartSelectedMonth.innerHTML = month;
            },

            /* Given the starting Y position of Column chart's annotations and Line Chart's annotations,
               and the minimum and maximum Y value for Column Y 
               [in this case the column chart's annotaions' rectangle's Y]
               and the minimum and maximum value of Line Y
               this method will determine whehter the columnY and LineY overlap. 
               If overlapping each other, it will return LineY+upper bound , 
               which can be directly assignes to columnY to remove overlapping */
            spaceManager: function(columnY, LineY, columnYLowerBound, columnYUpperBound,
                lineYLowerBound, lineYUpperBound) {
                if ((LineY + lineYLowerBound <= columnY + columnYLowerBound && LineY +
                        lineYLowerBound >= columnY + columnYUpperBound) ||
                    (LineY + lineYLowerBound + columnYUpperBound <= columnY + columnYLowerBound &&
                        LineY + lineYLowerBound + columnYUpperBound >= columnY + columnYUpperBound) ||
                    (columnY + columnYLowerBound >= LineY && columnY + columnYUpperBound <= LineY)) {
                    return LineY + lineYUpperBound;
                } else
                    return columnY;
            },
            // Updates the annotation on a given chart's month
            updateAnnotation: function(chart, month, commentLength) {
                var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                    chartIndex, datasetIndex, url, diffX, startY, annotationGroupItem, currentAnnotationGroup,
                    groupLenth, i;
                // Determine the type of chart and assign the values
                if (chart === "sales") {
                    chartIndex = 0;
                    url = viewHelpers.getCommentIconBar();
                    color = "#0f5a78";
                    diffX = 5;
                } else {
                    chartIndex = 1;
                    url = viewHelpers.getCommentIconLine();
                    color = "#A1B86C";
                    diffX = -6;
                }
                datasetIndex = months.indexOf(month);
                startY = "$dataset." + chartIndex + ".set." + datasetIndex + ".starty";
                // Manage the space if it is a sales chart
                if (chartIndex === 0)
                    startY = (controllers.collaborationDashboardController.spaceManager(
                        FusionCharts.items["yearlySalesSummary"].jsVars.instanceAPI.components.dataset[0].components.data[datasetIndex].graphics.element.
                        attrs.y,
                        FusionCharts.items["yearlySalesSummary"].jsVars.instanceAPI.components.dataset[1].components.data[datasetIndex].graphics.element.
                        attrs.path[0][2], -5, -20, -7, -25)).toString();
                // Template annotation to be updated
                annotationGroupItem = {
                    id: chart + "_" + month,
                    showBelow: "0",
                    items: [{
                        "id": "rect1-" + (new Date().getTime()).toString(),
                        "type": "rectangle",
                        "x": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (-8 + diffX).toString(),
                        "y": startY + "-5",
                        "radius": "10",
                        "toX": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (38 + diffX).toString(),
                        "toY": startY + " - 25",
                        "fillColor": "#F6F6F6",
                        "fillAlpha": "100"
                    }, {
                        "id": "img-" + (new Date().getTime()).toString(),
                        "url": url,
                        "type": "image",
                        "x": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + diffX.toString(),
                        "y": startY + " - 20",
                        "toX": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (12 + diffX).toString(),
                        "toY": startY + " - 8",
                        "link": "javascript:void(0)"
                    }, {
                        "id": "txt1-" + (new Date().getTime()).toString(),
                        "type": "text",
                        "fontColor": color,
                        "fontSize": "11",
                        "x": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (20 + diffX).toString(),
                        "y": startY + " - 15",
                        "text": commentLength,
                        "link": "javascript:void(0)",
                        "font": "'AvenirLTStd-Heavy', sans-serif"
                    }, {
                        "id": "txt2-" + (new Date().getTime()).toString(),
                        "type": "text",
                        "fontColor": color,
                        "fontSize": "11",
                        "x": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (54 + diffX).toString(),
                        "y": startY + " - 15",
                        "wrapWidth": "60",
                        "wrapHeight": "15",
                        "visible": "0",
                        "text": "Comments",
                        "link": "javascript:void(0)"
                    }, {
                        "id": "rect2-" + (new Date().getTime()).toString(),
                        "type": "rectangle",
                        "x": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (25 + diffX).toString(),
                        "y": startY + " - 20",
                        "radius": "10",
                        "toX": "$dataset." + chartIndex + ".set." + datasetIndex + ".startx+" + (85 + diffX).toString(),
                        "toY": startY,
                        "fillColor": "#F6F6F6",
                        "fillAlpha": "100",
                        "visible": "0",
                        "link": "javascript:void(0)"
                    }]
                };
                // Get the current annotation from the chart and update it
                currentAnnotationGroup = controllers.collaborationDashboardController.chartConfig.salesAnalysisConfig.
                dataSource.annotations.groups;
                groupLenth = currentAnnotationGroup.length;
                for (i = 0; i < groupLenth; i++) {
                    if (currentAnnotationGroup[i].id == chart + "_" + month) {
                        currentAnnotationGroup[i] = annotationGroupItem;
                        break;
                    }
                }
                // Update the local storage
                if (typeof localStorage != "undefined" && localStorage.setItem)
                    localStorage.setItem("annotations", JSON.stringify(
                        controllers.collaborationDashboardController.chartConfig.salesAnalysisConfig.
                        dataSource.annotations));
            },
            // On hover of any of the charts in comments modal, the value above them should update
            hoverCopyChart: function(evtObj, argObj) {
                var i, siblingList = evtObj.sender.options.containerElement.parentNode.children,
                    plotItems = FusionCharts.items[evtObj.sender.id].jsVars.instanceAPI.components.dataset[0].components.data,
                    plotItemsLength = plotItems.length;
                siblingList[1].children[1].innerHTML = evtObj.sender.getJSONData().data[argObj.dataIndex].label;
                siblingList[2].children[1].innerHTML = FusionCharts.formatNumber(argObj.value, {
                    numberPrefix: "$"
                });
                for (i = 0; i < plotItemsLength; i++) {
                    plotItems[i].graphics.element.attr("fill", "#979797");
                }
                plotItems[argObj.dataIndex].graphics.element.attr("fill", "#0f5a78");
            }
        }
    };

    /**
     *  The Dashboard class
     */
    function Dashboard(id) {

        var chart,
            self = this;

        // Unique ID of the dashboard
        self.id = id;

        // Events for a dashboard
        self.events = {};

        // Charts that belong for this dashboard
        self.charts = {};

        // Render dashboard
        self.render = function() {
            for (var key in self.charts) {
                chart = self.charts[key];
                chart.inDom = true;
                chart.core.setJSONData(chart.dataSource);
                chart.core.render();
            }
        };
        self.renderSpecificCharts = function(chartIdArray) {
                var i = 0,
                    chartIdArrayLength = chartIdArray.length;
                for (i = 0; i < chartIdArrayLength; i++) {
                    chart = self.charts[chartIdArray[i]];
                    chart.inDom = true;
                    chart.core.setJSONData(chart.dataSource);
                    chart.core.render();
                }
            }
            // Add chart to the dashboard
        self.addChart = function(id) {
            if (!self.charts[id]) {
                self.charts[id] = new ChartComponent(id);
            }
            return self.charts[id];
        };

        // Get chart by ID
        self.getChart = function(id) {
            if (self.charts[id]) {
                return self.charts[id];
            } else {
                console.error("Cannot find chart with id `" + id + "`");
            }
        }

        // Bind dom event id. This can be used to identify all events for a specific dashboard
        self.bind = function(id, name, callback) {
            bindDomEvent(self.events, id, name, callback);
        };

        // Trigger event callback
        self.trigger = function(id, eventName) {
            triggerDomEvent(self, id, eventName);
        };

    }

    /**
     *  Chart Component class
     */

    function ChartComponent(id) {

        var self = this;

        // Unique ID for the chart
        self.id = id;

        // Configuration object of the chart
        self.config = null;

        // Events for a chart
        self.events = {};

        // The fusioncharts object
        self.core = null;

        // Chart datasource
        self.dataSource = null;

        // Flag to identify whether the chart is rendered for the first time or not
        self.isNew = true;

        // Flag to identify whether the chart is rendered in the dom or not
        self.inDom = false;
        // Set configuration for the chart
        self.setConfig = function(config) {
            self.config = config;
            self.dataSource = config.dataSource;

            if (self.isNew) {
                self.core = new FusionCharts(self.config);
                self.isNew = false;
            } else {
                self.core.setJSONData(self.dataSource);
            }
        };

        // Bind event for a chart
        self.bind = function(eventName, callback) {
            self.events[eventName] = {
                callback: callback
            };

            utils.addEventListener(self.core, eventName, callback, true);
        };

        // Trigger callback for a chart event
        self.trigger = function(id, options) {
            if (self.events[id]) {
                self.events[id]["callback"](options);
            } else {
                console.error("Event " + id + " is not defined");
            }
        };

        // Set chart datasource categories
        self.setCategories = function(categories) {
            if (self.dataSource.categories) {
                self.dataSource.categories[0].category = categories;
            } else {
                console.error("Categories property does not exist in the chart datasource");
            }
        };

        // Set chart datasource's data(useful in single series charts)
        self.setData = function(data) {
            self.dataSource.data = data;
        };

        // Set data of a dataset(useful in multi-series charts)
        self.setDataSetData = function(data) {
            for (var i = 0; i < self.dataSource.dataset.length; i++) {
                self.dataSource.dataset[i].data = data[i].data;
            }
        };

        // Set dataset object for chart datasource
        self.setDataSet = function(dataset) {
            self.datasource.dataset = dataset;
        };

        // Set chart datasource
        self.setDataSource = function(dataSource) {
            self.dataSource = dataSource;
        };

        // Update a chart; this re-renders the chart
        self.update = function(callback) {
            callback();
            self.core.setJSONData(self.dataSource);
        };

        self.render = function() {
            self.core.setJSONData(self.dataSource);
            self.core.render();
            self.inDom = true;
        }
        return self;

    }

    /**
     *  The main application object
     */
    App = {

        /**
         *  List of all active dashboards
         */

        activeDashboards: {},

        /**
         *  List of all the dashboards in the application
         */
        dashboards: {},

        /**
         *  All global event for the application
         */
        events: {},

        /**
         * App initalization
         */
        init: function(callback) {
            callback(this);
        },

        /**
         *  Add dashboard to the application
         */
        addDashboard: function(id, callback) {
            this.dashboards[id] = {};
            this.dashboards[id]["db"] = new Dashboard(id);
            this.dashboards[id]["callback"] = callback;
        },

        /**
         * Show a dashboard. This will render / redraw the dashboard
         */
        showDashboard: function(id) {
            var db;

            if (this.dashboards[id]) {
                db = this.dashboards[id];
                db.callback(db["db"]);
            } else {
                console.error("Cannot find dashboard with id `" + id + "`");
            }

            this.activeDashboards[id] = db;
        },
        getDashboard: function(id) {
            return this.dashboards[id];
        },
        /**
         *  Bind dom event
         */
        bind: function(id, name, callback) {
            bindDomEvent(this, id, name, callback);
        },

        /**
         *  Trigger dom event
         */
        trigger: function(id, eventName) {
            triggerDomEvent(this, id, eventName);
        }
    };

    // Main Application Invocation
    App.init(function(app) {
        // Draw the initial charts
        app.addDashboard("collaborationDashboard", controllers.collaborationDashboardController.drawCharts);
        // If the localStorage is available, set the items in local storage or 
        // update the javascript object from the localStorage
        if (typeof localStorage !== "undefined" && localStorage.getItem) {
            if (!localStorage.getItem("comments"))
                localStorage.setItem("comments", JSON.stringify(collaborationData.comments));
            else {
                collaborationData.comments = JSON.parse(localStorage.getItem("comments"));
            }
            if (!localStorage.getItem("annotations")) {
                localStorage.setItem("annotations", JSON.stringify(
                    controllers.collaborationDashboardController.chartConfig.salesAnalysisConfig.
                    dataSource.annotations));
            } else {
                controllers.collaborationDashboardController.chartConfig.salesAnalysisConfig.dataSource.annotations =
                    JSON.parse(localStorage.getItem("annotations"));
            }
            if (localStorage.getItem("showNotificationBubble") === "false") {
                dom.getById("notification-bubble").style.display = "none";
            }
        }

        app.showDashboard("collaborationDashboard");

    });

});