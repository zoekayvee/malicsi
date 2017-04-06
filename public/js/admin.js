$(document).ready(function(){
     $('.edit-trigger').click(function(){
        $('#edit-modal').modal('show');    
     });

     $('#cancel').click(function(){
        $('#edit-modal').modal('hide');    
     });

     $('#delete').click(function(){
        $('#delete-modal').modal('show');    
     });

});