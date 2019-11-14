// More info about config & dependencies:
// - https://github.com/hakimel/reveal.js#configuration
// - https://github.com/hakimel/reveal.js#dependencies
Reveal.initialize({
	controls: true,
	progress: true,
	history: true,
	center: true,
	width: 1024,
	height: 768,
	transition: 'concave', // none/fade/slide/convex/concave/zoom
	dependencies: [{
		src: 'lib/js/classList.js',
		condition: function () {
			return !document.body.classList;
		}
	}, {
		src: 'plugin/markdown/marked.js',
		condition: function () {
			return !!document.querySelector('[data-markdown]');
		}
	}, {
		src: 'plugin/markdown/markdown.js',
		condition: function () {
			return !!document.querySelector('[data-markdown]');
		}
	}, {
		src: 'plugin/highlight/highlight.js',
		async: true,
		callback: function () {
			hljs.initHighlightingOnLoad();
		}
	}, {
		src: 'plugin/zoom-js/zoom.js',
		async: true
	}, {
		src: 'plugin/notes/notes.js',
		async: true
	}]
});

Reveal.addEventListener('salary', function () {
	console.log('stats called!');
	animatenum(4988, '#decimals', 0);
});
Reveal.addEventListener('competition', function () {
	animatenum(2992, '#graduates', 0);
});
Reveal.addEventListener('jobs', function () {
	console.log('stats called!');
	animatenum(14950, '#jobsgd', 0);
});


Reveal.addEventListener('guage', function () {
	console.log('guage called!');
	guage(0, 60000,36900, "£36,900", "container-speedgd");
});
Reveal.addEventListener('firmnum', function () {
	console.log('graphs');
	jobgraph();
});

Reveal.addEventListener('activity', function () {
	console.log('graphs');
	//activitygraph();
});

var animatenum = function (num, obj, dec) {
	var decimal_places = dec;
	var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
	$(obj)
		.animateNumber({
				number: num * decimal_factor,

				numberStep: function (now, tween) {
					var floored_number = Math.floor(now) / decimal_factor,
						target = $(tween.elem);

					if (decimal_places > 0) {
						// force decimal places even if they are 0
						floored_number = floored_number.toFixed(decimal_places);

						// replace '.' separator with ','
						floored_number = floored_number.toString().replace('.', ',');
					}

					target.text(floored_number);
				}
			},
			1000
		);
};

var guage = function (jmin, jmax, javerage, jext, jcontainer) {
	var gaugeOptions = {

		chart: {
			type: 'solidgauge'
		},

		title: null,

		pane: {
			center: ['50%', '85%'],
			size: '140%',
			startAngle: -90,
			endAngle: 90,
			background: {
				innerRadius: '60%',
				outerRadius: '100%',
				shape: 'arc'
			}
		},

		tooltip: {
			enabled: false
		},

		// the value axis
		yAxis: {
			stops: [
				[0.1, '#55BF3B']
			],
			lineWidth: 0,
			minorTickInterval: null,
			tickAmount: 2,
			title: {
				y: 0
			},
			labels: {
				y: 16
			}
		},

		plotOptions: {
			solidgauge: {
				dataLabels: {
					y: 5,
					borderWidth: 0,
					useHTML: true
				}
			}
		}
	};

	// The speed gauge
	var chartSpeed = Highcharts.chart(jcontainer, Highcharts.merge(gaugeOptions, {
		yAxis: {
			min: jmin,
			max: jmax,
			title: {
				text: 'Salary'
			}
		},

		credits: {
			enabled: false
		},

		series: [{
			name: 'national average',
			data: [javerage],
			dataLabels: {
				format: '<div style="text-align:center"><span style="font-size:25px;color:' +
					((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">'+jext+'</span></div>',
				
			},
			tooltip: {
				valueSuffix: ' £'
			}
		}]

	}));

};
var jobgraph = function () {
	// Create the chart
	Highcharts.chart('sectorcontainer', {

		chart: {
			type: 'column'
		},
		title: {
			text: 'Firms Creating New Jobs 2018'
		},
		subtitle: {
			text: ''
		},
		xAxis: {
			type: 'category'
		},
		yAxis: {
			title: {
				text: 'Total amount of new jobs'
			}

		},
		legend: {
			enabled: false
		},
		plotOptions: {
			series: {
				borderWidth: 0,
				dataLabels: {
					enabled: true,
					format: '{point.y:.1f}k'
				}
			}
		},
		credits: {
			enabled: false
		},

		tooltip: {
			headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
			pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
		},

		series: [{
			name: 'industry',
			colorByPoint: true,
			data: [{
				name: 'Design Firms',
				y: 72.340
			}, {
				name: 'Admin/business Firms',
				y: 73.100
			}, {
				name: 'Legal/ accounting Firms ',
				y: 75.600
			}, {
				name: 'Building/ construction Firms ',
				y: 76.300
			} , {
				name: 'CS/Technology',
				y: 68.300
			}]
		}]
	});


};

var activitygraph = function () {

	Highcharts.chart('activitygraph', {

			chart: {
				type: 'solidgauge',
				marginTop: 50
			},

			title: {
				text: 'Activity',
				style: {
					fontSize: '24px'
				}
			},

			tooltip: {
				borderWidth: 0,
				backgroundColor: 'none',
				shadow: false,
				style: {
					fontSize: '16px'
				},
				pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
				positioner: function (labelWidth) {
					return {
						x: 200 - labelWidth / 2,
						y: 180
					};
				}
			},

			pane: {
				startAngle: 0,
				endAngle: 360,
				background: [{ // Track for Move
					outerRadius: '112%',
					innerRadius: '88%',
					backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
						.setOpacity(0.3)
						.get(),
					borderWidth: 0
				}, { // Track for Exercise
					outerRadius: '87%',
					innerRadius: '63%',
					backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
						.setOpacity(0.3)
						.get(),
					borderWidth: 0
				}]
			},

			yAxis: {
				min: 0,
				max: 100,
				lineWidth: 0,
				tickPositions: []
			},

			plotOptions: {
				solidgauge: {
					dataLabels: {
						enabled: false
					},
					linecap: 'round',
					stickyTracking: false,
					rounded: true
				}
			},

			series: [{
				name: 'Move',
				data: [{
					color: Highcharts.getOptions().colors[0],
					radius: '112%',
					innerRadius: '88%',
					y: 80
				}]
			}, {
				name: 'Exercise',
				data: [{
					color: Highcharts.getOptions().colors[1],
					radius: '57%',
					innerRadius: '63%',
					y: 65
				}]
			}]
		},

		/**
		 * In the chart load callback, add icons on top of the circular shapes
		 */
		function callback() {

			// Move icon
			this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
				.attr({
					'stroke': '#303030',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					'stroke-width': 2,
					'zIndex': 10
				})
				.translate(190, 26)
				.add(this.series[2].group);

			// Exercise icon
			this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
					'M', 8, -8, 'L', 16, 0, 8, 8
				])
				.attr({
					'stroke': '#ffffff',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					'stroke-width': 2,
					'zIndex': 10
				})
				.translate(190, 61)
				.add(this.series[2].group);

			// Stand icon
			this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
				.attr({
					'stroke': '#303030',
					'stroke-linecap': 'round',
					'stroke-linejoin': 'round',
					'stroke-width': 2,
					'zIndex': 10
				})
				.translate(190, 96)
				.add(this.series[2].group);
		});

};