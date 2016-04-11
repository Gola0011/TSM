$(function() {
    richiedi(1);
});

function richiedi(pagina) {
    $("#evento").empty();
    var offset = 8 * (pagina - 1);
    $.ajax({
        type: "POST",
        url:  "http://incaneva.it/wp-admin/admin-ajax.php",
        data: "blog=1,6,7,8&action=incaneva_events&limit=8&old=true&offset=" + offset,
        dataType: "json",
        success: function(risposta) {
            $.each(risposta.data, function (key, value) {
                var dataInizio = moment.unix(value.evcal_srow).locale('it').format('LLLL');
                $("#evento").append('<div class="col-sm-6 col-md-3" >' +
                    '   <div class="thumbnail">' +
                    '       <img src="' + value.post_thumbnail + '" class="img-responsive" alt="' + value.post_title + '">' +
                    '       <div class="caption">' +
                    '           <h3>' + value.post_title + '</h3>' +
                    '           <p>' + value.post_excerpt + '</p>' +
                    '           <footer class="text-muted"><small>' + '<i class="fa fa-calendar"></i> ' + dataInizio + '</small></footer>' +
                    '       </div>' +
                    '</div>');
            })
        },
        error: function(){
            alert("Si è verificato un errore");
        }
    })
}