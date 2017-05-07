$(document).ready(function() {	
	$('#datetime').calendar();
	$('#date_').calendar({
	  type: 'date'
	});
	$('#time_').calendar({
	  type: 'time'
	});
	$('#date-end').calendar({
	  type: 'date',
	  endCalendar: $('#rangeend')
	});
	$('#date-start').calendar({
	  type: 'date',
	  startCalendar: $('#rangestart')
	});
});