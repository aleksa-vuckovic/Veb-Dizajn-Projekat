var korisnikid;
var oglasid;
var komentari;
var korisnici;
$(document).ready(function() {
    oglasid = localStorage.getItem("oglas.komentari");
    korisnikid = localStorage.getItem("korisnikid");
    komentari = JSON.parse(localStorage.getItem("komentari"));
    korisnici = JSON.parse(localStorage.getItem("korisnici"));
    if (korisnikid == null) $("#novikomentar").hide();
    else $("#trenutniKorisnik").html(korisnikid);
    oglas = nadjiOglas(oglasid);
    popuni(oglas);
    let mojiKomentari = nadjiKomentare(oglasid);
    dodajKomentare(mojiKomentari);
    $("#posalji").click(posaljiKomentar);
})
function nadjiOglas(oglasid) {
    let oglasi = JSON.parse(localStorage.getItem("oglasi"));
    for (let i = 0; i < oglasi.length; i++) {
        if (oglasi[i].id == oglasid) return oglasi[i];
    }
}
function popuni(oglas) {
    $("#slika").attr("src", oglas.slika);
    $("#naziv").html(oglas.naziv);
    $("#paragraf").html(oglas.opis + "<hr>" + "Telefon: " + oglas.telefon);
}
function nadjiKomentare(oglasid) {
    return komentari.filter(function(kom) {
        return kom.oglasid == oglasid;
    })
}
function dodajKomentare(mojiKomentari) {
    $("#komentari").append($("<h4></h4>").html("Komentari"));
    mojiKomentari.forEach(x => {
        $("#komentari").append(napraviKomentar(x));
    })
}
function posaljiKomentar() {
    var tekst = $("#tekst").val();
    if (tekst == "") return;
    komentar = {
        oglasid : oglasid,
        korisnikid : korisnikid,
        tekst : tekst
    };
    komentari.push(komentar);
    localStorage.setItem("komentari", JSON.stringify(komentari));
    $("#komentari").append(napraviKomentar(komentar));
    $("#tekst").val("");
}
function nadjiKorisnika(korisnikid) {
    for (let i = 0; i < korisnici.length; i++) {
        if (korisnici[i].id == korisnikid) return korisnici[i];
    }
}
function napraviKomentar(komentar) {
    let korisnik = nadjiKorisnika(komentar.korisnikid);
    return $("<div></div>").addClass("col-10 komentar border border-1 m-3").append(
        $("<div></div>").addClass("border-bottom").append(
            $("<img>").attr("src", korisnik.slika).attr("height", "100px").css({"vertical-align" : "baseline"}).addClass("rounded")
        ).append(
            $("<h4></h4>").html(komentar.korisnikid).css({"display" : "inline"}).css({"padding" : "5px"})
        ).css({"padding" : "5px"})
    ).append(
        $("<div></div>").addClass("p-2 ps-3 pb-0").append(
            $("<p></p>").html(komentar.tekst)
        )
    ).css({
        "border-radius" : "20px",
        "background-color" : "white"
    })
}