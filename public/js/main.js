$(document).ready(function(){
    $('#delBtn').on('click', function(e){
        $targets = $(e.target);
        const id = $targets.attr('data-id');
        console.log(id);
    });
    $.ajax({
        type: 'DELETE',
        url: '/article/delete/'+id,
        success: function(res) {
            alert('Deleted the Article');
            window.location.href="/articles"
        },
        error: function(err){
            console.log(err)
        }
    })
});