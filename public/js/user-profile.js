$(document).ready(function(){
    $('#start-date-pick').calendar();
    $('#end-date-pick').calendar();

     $('#create').click(function(){
        $('#event-modal').modal('show');
     });

     $('#updateButton').click(function(){
        $('#update-modal').modal('show');
     });

     $('#cancel-update').click(function(){
        $('#update-modal').modal('hide');
     });

     $('.ui.button.delete').click(function(){
        $('#delete-modal').modal('show');
     });

     $('#submit-create').click(function(){
        $('#event-modal').modal('hide');
     });

     $('#cancel-create').click(function(){
        $('#event-modal').modal('hide');
     });
});
