$(document).ready(function(){
     $('.edit-trigger').click(function(){
        $('#edit-modal').modal('show');

     $('#add-user').click(function(){
        $('#add-modal').modal('show');
     });

     $('#cancel').click(function(){
        $('#edit-modal').modal('hide');
     });

       $('.delete-trigger').click(function(){
        $('#delete-modal').modal('show');
     });

     $('#delete').click(function(){
        $('#delete-modal').modal('show');
     });

     $('.edit-trigger').click(function(){
        $('#edit-modal').modal('show');
     });

     $('#add-sport-name').keypress(function(){
         alert();
        //  var sportName = $(this).val();
        //  if(sportName == "") {
        //       $(':input[type="submit"]').prop('disabled', true);
        //  }
        //  else {
        //       $(':input[type="submit"]').prop('disabled', false);
        //  }
     });

});
