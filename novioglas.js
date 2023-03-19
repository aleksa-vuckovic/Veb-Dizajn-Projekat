var korisnikid;
var english;
$(document).ready(function() {
    $("#okaci").click(okaci);
    korisnikid = localStorage.getItem("korisnikid");
    english = isEnglish();
})
function okaci() {
    ocisti();
    if (korisnikid == null) {
        $("#formaGreska").html(english ? "You must be logged in to post an ad." : "Morate biti ulogovani da biste okačili oglas.")
        return;
    }
    let naziv = $("#formaNaziv").val();
    let opis = $("#formaOpis").val();
    let tel = $("#formaTelefon").val();
    let slika = $("#formaSlika").val();
    if (naziv == "" || opis == "" || tel == "") {
        $("#formaGreska").html(english ? "The title, description and phone number are mandatory!" : "Naslov, opis i kontakt su obavezna polja!");
        return;
    }
    if (slika == "") slika = "../slike/default.png";
    var id = parseInt(localStorage.getItem("oglasid")) + 1;
    localStorage.setItem("oglasid", id);
    id = "oglas" + id;
    var novi = {
        naziv :  naziv,
        opis: opis,
        telefon : tel,
        slika : slika,
        id : id,
        korisnikid : korisnikid
    }
    let oglasi = JSON.parse(localStorage.getItem("oglasi"));
    oglasi.push(novi);
    localStorage.setItem("oglasi", JSON.stringify(oglasi));
    alert(english ? "Success! Your ad has been added to our website!" : "Oglas je uspešno postavljen!");
    ocistiSve();
}
function ocistiSve() {
    ocisti();
    $("input").val("");
    $("#formaOpis").val("");
}
function ocisti() {
    $("#formaGreska").html("");
}