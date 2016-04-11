var categoriaCorrente = "";

$(function() {
    richiedi(1, categoriaCorrente);
});

function richiedi(pagina, categoria) {
    $("#evento").empty();
    var offset = 8 * (pagina - 1);
    categoriaCorrente = categoria;
    $.ajax({
        type: "POST",
        url:  "http://incaneva.it/wp-admin/admin-ajax.php",
        data: "blog=1,6,7,8&action=incaneva_events&limit=8&old=true&offset=" + offset + categoria,
        dataType: "json",
        success: function(risposta) {
            $.each(risposta.data, function (key, value) {
                var colore = "panel-default";
                switch (value.event_type[value.event_type.length - 1]) {
                case "storia-cultura":
                    colore = "panel-danger";
                    break;
                case "passioni":
                    colore = "panel-info";
                    break;
                case "natura":
                    colore = "panel-success";
                    break;
                case "sport":
                    colore = "panel-primary";
                    break;
                case "enogastronomia":
                    colore = "panel-warning";
                    break;
                default:
                    colore = "panel-default";
                    break;
                }
                var dataInizio = moment.unix(value.evcal_srow).locale('it').format('LLLL');
                $("#evento").append('<div class="col-sm-6 col-md-3">' +
                    '<div class="panel ' + colore + '">' +
                    '   <div class="panel-heading text-center">' + value.event_type[value.event_type.length - 1] + '</div>' +
                    '   <div class="panel-body">' +
                    '       <img src="' + value.post_thumbnail + '" class="img-responsive" alt="' + value.post_title + '">' +
                    '       <div style="height: 200px">' +
                    '           <h3>' + value.post_title + '</h3>' +
                    '           <p>' + value.post_excerpt + '</p>' +
                    '       </div>' +
                    '       <footer class="text-muted"><small>' + '<i class="fa fa-calendar"></i> ' + dataInizio + '</small></footer>' +
                    '   </div>' +
                    '</div>');
            })
        },
        error: function(){
            alert("Si è verificato un errore");
        }
    })
}