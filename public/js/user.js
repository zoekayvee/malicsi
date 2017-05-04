$(document).ready(function(){
     $('.edit-trigger').click(function(){
        $('#edit-modal').modal('show');
            
     });

     $('.delete-trigger').click(function(){
        $('#delete-modal').modal('show');    
     });

     $('.add-trigger').click(function(){
     	$('#add-modal').modal('show');
     });



});