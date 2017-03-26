google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawBarColors);

function drawBarColors() {
      var data = google.visualization.arrayToDataTable([
        ['Teams', 'Score'],
        ['CAS', 34],
        ['CAFS', 30],
        ['CDC', 24],
        ['CEAT', 14],
        ['CVM', 17],
      ]);

      var options = {
        title: 'Palarong UPLB',
        chartArea: {width: '70%'},
        colors: ['#fac8c1'],
        hAxis: {
          title: 'Total Score',
          minValue: 0
        },
        vAxis: {
          title: 'Teams'
        }
      };
      var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }
