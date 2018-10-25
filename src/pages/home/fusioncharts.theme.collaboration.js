/*
 FusionCharts JavaScript Library
 Copyright FusionCharts Technologies LLP
 License Information at <http://www.fusioncharts.com/license>
*/

/**
 * This file create a theme file for the dashboard. The cosmetics for the
 * different charts are defined here.
 *
 * More information on theming can be found at
 * http://docs.fusioncharts.com/tutorial-configuring-your-chart-theme-manager.html
 */
FusionCharts.register('theme', {
    name: 'collaboration',
    theme: {
        base: {
            chart: {
                baseFont: "'AvenirLTStd-Light', sans-serif",
                baseFontSize: "11",
                baseFontColor: "#666666",
                bgColor: "#F6F6F6",
                bgAlpha: "0",
                canvasBorderThickness: "0",
                canvasBgColor: "#F6F6F6",
                showBorder: "0",
                showShadow: "0",
                yAxisNameFontSize: "13",
                labelFontSize: "13"
            }
        },
        MSCombiDY2D: {
            chart: {
                caption: "",
                divLineDashed: "1",
                divLineDashLen: "2",
                formatNumberScale: 1,
                legendBgColor: "#F6F6F6",
                legendBorderThickness: 0,
                legendShadow: 0,
                paletteColors: "#0f5a78, #A1B86C, #005072, #feb000, #5b8ab0, #29bac7, #e36966, #d4d6bc",
                plotHoverEffect: "1",
                plotSpacePercent: "50",
                pYAxisNameFontColor: "#474F55",
                pYAxisNameFontSize: "13",
                showAlternateHGridColor: "0",
                showHoverEffect: "1",
                showPlotBorder: "0",
                showToolTipShadow: "0",
                showValues: "0",
                showXAxisLine: "1",
                sYAxisNameFontColor: "#474F55",
                sYAxisNameFontSize: "13",
                toolTipBgColor: "#333333",
                toolTipBorderRadius: "2",
                toolTipColor: "#EEEEEE",
                toolTipFontSize: "11",
                useEllipsesWhenOverflow: 1,
                usePlotGradientColor: "0",
                xAxisNameFontSize: "11",
                xAxisLineColor: "#979797",
                xAxisLineThickness: "1",
                lineThickness: "3",
                anchorRadius: "5",
                anchorBorderThickness: "2",
                anchorTrackingRadius: "15",
                yAxisNameFont: "'AvenirLTStd-Medium', sans-serif"
            }
        },
        column2D: {
            chart: {
                caption: "",
                divLineDashed: "1",
                divLineDashLen: "2",
                paletteColors: "#0f5a78",
                showAlternateHGridColor: "0",
                showPlotBorder: "0",
                showXAxisLine: "1",
                showValues: 0,
                usePlotGradientColor: "0",
                xAxisNameFontColor: "#333333",
                xAxisNameFontSize: "11",
                xAxisLineColor: "#979797",
                xAxisLineThickness: "1",
                yAxisLineColor: "#979797",
                yAxisNameFont: "'AvenirLTStd-Medium', sans-serif",
                yAxisNameFontColor: "#474f55"
            }
        },
        line: {
            chart: {
                paletteColors: "#A1B86C",
                showAlternateHGridColor: "0",
                showValues: "0",
                numVDivLines: "10",
                vDivLineAlpha: "10",
                divLineAlpha: "10",
                anchorRadius: "5",
                anchorTrackingRadius: "15",
                anchorBorderThickness: "2",
                anchorBgAlpha: "100",
                anchorBgColor: "#ffffff",
                anchorBorderColor: "#a1b86c",
                lineThickness: "3"
            }
        }
    }
});