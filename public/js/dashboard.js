var teams = [];

$(document).ready(function(){
    $(this).scroll(function() {
        var scroll = $(this).scrollTop();
        console.log(scroll);
        if (scroll > 0 ) {
            $('#page-navigation').addClass('nav-scrolled');
        }
        else {
            $('#page-navigation').removeClass('nav-scrolled');
        }
    });

    $('#feeds-trigger').click(function(){
        var offset = 65; //Offset of 20px
        $('html, body').animate({
            scrollTop: $("#feeds-panel").offset().top - offset
        }, 500);
    });



    $.get('/overallranking/1', function(data){
        console.log(data);
        teams = data;
        loadGraph(teams);
    });

});


function loadGraph(teams) {

var ctx = document.getElementById("leadchart");

var teams_label = [];
var teams_data = []

console.log(teams);

for(var i=0; i<teams.length; i++) {
    teams_label[i] = teams[i].team_name;
    teams_data[i] = teams[i].wins;
    console.log(teams_data[i]);
}


var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: teams_label,
        datasets: [{
            label: 'Scores',
            data: teams_data,
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

}
