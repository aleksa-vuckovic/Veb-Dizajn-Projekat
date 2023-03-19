function oglasKartica(oglas, removable, english) {
    let len = oglas.opis.length;
    return $("<div></div>").addClass("col-6 col-md-4 col-lg-3 p-3").append(
        $("<div></div>").addClass("card").append(
            $("<img>").attr("src", oglas.slika).addClass("card-img-top").attr("alt", "Nema slike :(")
        ).append(
            $("<div></div>").addClass("card-body").append(
                $("<h5></h5>").html(oglas.naziv)
            ).append(
                $("<p></p>").addClass("card-text").html(oglas.opis.substring(0, len > 50 ? 50 : len - 1) + (len > 50 ? "..." : "") + "<hr>" + (english ? "Phone: " : "Tel: ") + oglas.telefon)
            ).append(
                removable ? $("<button></button>").addClass("btn btn-danger").html(english ? "Remove" : "Ukloni").click(function() {event.stopPropagation(); ukloniOglas(oglas);}) : ""
            )
        ).click(function() {
            localStorage.setItem("oglas.komentari", oglas.id);
            window.location.href = "komentari.html";
        }).hover(function() {
            $(this).css({
                "border-width" : "3px"
            })
        }, function() {
            $(this).css({
                "border-width" : "1px"
            })
        }).css("cursor", "pointer")
    );
}