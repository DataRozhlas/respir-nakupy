(function() {
    const cols = ['#a6cee3','#1f78b4','#b2df8a','#33a02c','#fb9a99','#e31a1c','#fdbf6f','#ff7f00','#cab2d6','#6a3d9a','#ffff99','#b15928','#bebada','#fb8072','#80b1d3','#fdb462']

    const syms = {
        'FFP1': 'diamond',
        'FFP2': 'triangle',
        'FFP3': 'circle'
    }

    fetch('./data.json')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const srs = []
            const colors = {}
            Object.keys(data).forEach( (resort, i) => {
                Object.keys(data[resort]).forEach(typ => {
                    srs.push({
                        name: resort + ' - ' + typ,
                        marker: {
                            symbol: syms[typ]
                        },
                        color: cols[i],
                        data: data[resort][typ].map(val => [ Date.parse(val[0]), val[1] ])
                    })

                })
            })

            Highcharts.chart('resp_nakupy', {
                chart: {
                    type: 'scatter',
                    zoomType: 'xy'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Nákupy respirátorů'
                },
                subtitle: {
                    text: 'data: <a target="_blank" href="https://www.hlidacstatu.cz/texty/divoky-trh-s-respiratory/">Hlídač státu</a> a jednotlivé resorty',
                    useHTML: true
                },
                xAxis: {
                    type: 'datetime',
                    endOnTick: true,
                    showLastLabel: true,
                    startOnTick: true,
                    labels:{
                        formatter: function(){
                            return Highcharts.dateFormat('%d. %m.', this.value)
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'jednotková cena, s DPH'
                    }
                },
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom',
                    backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                },
                plotOptions: {
                    scatter: {
                        marker: {
                            radius: 5,
                            states: {
                                hover: {
                                    enabled: true,
                                    lineColor: 'rgb(100,100,100)'
                                }
                            }
                        },
                        states: {
                            hover: {
                                marker: {
                                    enabled: false
                                }
                            }
                        },
                        tooltip: {
                            headerFormat: '<b>{series.name}</b><br>',
                            pointFormat: '{point.y} Kč',
                            xDateFormat: '%Y-%m-%d',
                            shared: true
                        }
                    }
                },
                series: srs
            });
        })
})()