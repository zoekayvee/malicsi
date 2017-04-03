$(document).ready(function(){
    $('#feeds-trigger').click(function(){
        var offset = 20; //Offset of 20px
        $('html, body').animate({
            scrollTop: $("#feeds-panel").offset().top + offset
        }, 500);
    });

});

var ctx = document.getElementById("leadchart");
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["CAS", "CAFS", "CFNR", "CEAT", "CHE", "CVM"],
        datasets: [{
            label: 'Scores',
            data: [1,2,8,4,10,6,7],
            backgroundColor: [
                'rgba(222, 27, 27, 1)',
                'rgba(233, 229, 129, 1)',
                'rgba(222, 27, 27, 1)',
                'rgba(233, 229, 129, 1)',
                'rgba(222, 27, 27, 0.7)',
                'rgba(233, 229, 129, 1)',
            ],
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
