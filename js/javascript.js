var categoriaCorrente = "";
var modalArray = "";

$(function() {
    richiedi(1, categoriaCorrente);
});

function apriModal(eventoCliccato) {
    $("#myModalLabel").text(modalArray.data[eventoCliccato].post_title);
    $("#imgmodal").attr("src", modalArray.data[eventoCliccato].post_thumbnail);
    $("#testomodal").html(modalArray.data[eventoCliccato].post_content);
    var dataEvento = moment.unix(modalArray.data[eventoCliccato].evcal_srow).locale('it').format('LLLL');
    $("#footermodal").html(" " + dataEvento);
}

$('.tastoMenu').click(function () {
    $('.menu').animate({"left":"0px"}, 500);
});

$('.menu a').click(function () {
    $('.menu').animate({"left":"-300px"}, 500)
})

function richiedi(pagina, categoria) {
    $("#loader").addClass("loader");

    $("#evento").empty();
    var offset = 8 * (pagina - 1);
    categoriaCorrente = categoria;
    $.ajax({
        type: "POST",
        url:  "http://incaneva.it/wp-admin/admin-ajax.php",
        data: "blog=1,6,7,8&action=incaneva_events&limit=8&old=true&offset=" + offset + categoria,
        dataType: "json",
        success: function(risposta) {
            $("#loader").removeClass("loader");

            modalArray = risposta;
            $(".immagine1").attr("src", risposta.data[0].post_thumbnail);
            $(".titolo1").text(risposta.data[0].post_title);
            $(".descrizione1").text(risposta.data[0].post_excerpt);
            $(".immagine2").attr("src", risposta.data[1].post_thumbnail);
            $(".titolo2").text(risposta.data[1].post_title);
            $(".descrizione2").text(risposta.data[1].post_excerpt);
            $(".immagine3").attr("src", risposta.data[2].post_thumbnail);
            $(".titolo3").text(risposta.data[2].post_title);
            $(".descrizione3").text(risposta.data[2].post_excerpt);
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
                    '       <img onclick="apriModal(' + key + ')" data-toggle="modal" data-target="#myModal" src="' + value.post_thumbnail + '" class="img-responsive  manina" alt="' + value.post_title + '">' +
                    '       <div style="height: 200px">' +
                    '           <h3 onclick="apriModal(' + key + ')" data-toggle="modal" data-target="#myModal" class="manina">' + value.post_title + '</h3>' +
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