$(document).ready(function(){
     $('#create').click(function(){
        $('#event-modal').modal('show');    
     });
});
$(document).ready(function(){
     $('#updateButton').click(function(){
        $('#update-modal').modal('show');    
     });
});

$(document).ready(function(){
     $('.ui.button.delete').click(function(){
        $('#delete-modal').modal('show');    
     });
});

$(document).ready(function(){
     $('#submit-create').click(function(){
        $('#event-modal').modal('hide');    
     });
});

