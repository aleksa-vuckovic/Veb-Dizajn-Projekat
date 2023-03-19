var korisnikid;
var korisnici;
var oglasi;
var komentari;
var english;
$(document).ready(function() {
    korisnici = JSON.parse(localStorage.getItem("korisnici"));
    oglasi = JSON.parse(localStorage.getItem("oglasi"));
    komentari = JSON.parse(localStorage.getItem("komentari"));
    english = isEnglish();
    $("#prijavi").click(prijava);
    $("#regbtn").click(function() {$("#prijava").hide(); $("#registracija").show();})
    $("#registruj").click(registracija);
    $("#odjavi").click(odjava);
    korisnikid = localStorage.getItem("korisnikid");
    osvezi();
})
function osvezi() {
    ocistiSve();
    sakrij();
    if (korisnikid == null) {
        $("#prijava").show();
        $("#registracija").hide();
        $("#uspesnaRegistracija").hide();
        $("#log").show();
    }
    else {prikaziProfil(); prikaziOglase(); prikaziKomentare();}
}
function sakrij() {
    $("#log").hide();
    $("#profil").hide();
    $("#oglasiNaslov").hide();
    $("#oglasi").hide();
    $("#komentariNaslov").hide();
    $("#komentari").hide();
}
function prijava() {
    ocisti();
    let id = $("#prijavaId").val();
    let korisnik = nadjiKorisnika(id);
    if (korisnik == null) {
        $("#prijavaIdGreska").html(english ? "Username not found." : "Uneseno korisničko ime ne odogovara nijednom korisniku");
        return;
    }
    if (korisnik.lozinka != $("#prijavaLozinka").val()) {
        $("#prijavaLozinkaGreska").html(english ? "Password is incorrect." : "Lozinka nije ispravna.");
        return;
    }
    localStorage.setItem("korisnikid", korisnik.id);
    korisnikid = korisnik.id;
    osvezi();
}
function nadjiKorisnika(id) {
    for (let i = 0; i < korisnici.length; i++) {
        if (korisnici[i].id == id) return korisnici[i];
    }
    return null;
}
function registracija() {
    ocisti();
    let mejl = $("#registracijaMejl").val();
    if (!dobarMejl(mejl)) {
        $("#registracijaMejlGreska").html(english ? "E-mail address format must be 'example@something.com'" : "Mejl mora biti u formatu 'example@something.com'");
        return;
    }
    let id = $("#registracijaId").val();
    if (nadjiKorisnika(id) != null) {
        $("#registracijaIdGreska").html(english ? "Username already taken." : "Korisničko ime je zauzeto.");
        return;
    }
    if (id == "") {
        $("#registracijaIdGreska").html(english ? "Username is a mandatory field." : "Unesite korisničko ime.");
        return;
    }
    let lozinka = $("#registracijaLozinka").val();
    if (lozinka == "") {
        $("#registracijaLozinkaGreska").html(english ? "Password is a mandatory field." : "Unesite lozinku.");
        return;
    }
    let slika = $("#registracijaSlika").val();
    if (slika == "") slika = "slike/default.png";
    let novi = {
        mejl: mejl,
        id: id,
        lozinka: lozinka,
        slika: slika
    }
    korisnici.push(novi);
    localStorage.setItem("korisnici", JSON.stringify(korisnici));
    $("#registracija").hide();
    $("#uspesnaRegistracija").show();
}
function odjava() {
    localStorage.removeItem("korisnikid");
    korisnikid = null;
    osvezi();
}
function dobarMejl(mejl) {
    return /^(\w|\.)+@[a-z]+\.com$/.test(mejl);
}
function ocisti() {//cisti samo polja za greske
    $("#prijavaIdGreska").html("");
    $("#prijavaLozinkaGreska").html("");
    $("#registracijaMejlGreska").html("");
    $("#registracijaIdGreska").html("");
    $("#registracijaLozinkaGreska").html("");
}
function ocistiSve() {//cisti sva polja
    ocisti();
    $("#prijavaId").val("");
    $("#prijavaLozinka").val("");
    $("#registracijaMejl").val("");
    $("#registracijaId").val("");
    $("#registracijaLozinka").val("");
}
function prikaziProfil() {
    let korisnik = nadjiKorisnika(korisnikid);
    $("#profilId").html(korisnik.id);
    $("#profilMejl").html(korisnik.mejl);
    $("#profilSlika").attr("src", korisnik.slika);
    $("#profil").show();
}
function prikaziOglase() {
    $("#oglasi").html("");
    let mojiOglasi = oglasi.filter(x => {
        return x.korisnikid == korisnikid;
    })
    if (mojiOglasi.length > 0) $("#nemaOglasa").hide();
    else $("#nemaOglasa").show();
    mojiOglasi.forEach(x => {
        $("#oglasi").append(oglasKartica(x, true, english));
    })
    $("#oglasiNaslov").show();
    $("#oglasi").show();
}
function prikaziKomentare() {
    $("#komentari").html("");
    mojiKomentari = komentari.filter(x => {
        return x.korisnikid == korisnikid;
    })
    if (mojiKomentari.length > 0) $("#nemaKomentara").hide();
    else $("#nemaKomentara").show();
    mojiKomentari.forEach(x => {
        $("#komentari").append(napraviKomentar(x));
    })
    $("#komentariNaslov").show();
    $("#komentari").show();
}
function napraviKomentar(kom) {
    let id = kom.oglasid;
    let oglas = nadjiOglas(id);
    return $("<div></div>").addClass("col-10 komentar border border-1 m-3").append(
        $("<div></div>").addClass("border-bottom p-2").append(
            $("<img></img>").attr("height", "100px").attr("src", oglas.slika).css({"vertical-align" : "baseline"}).addClass("rounded")
        ).append(
            $("<h5></h5>").html((english ? "Posted on: '" : "Komentar na oglas: '") + oglas.naziv + "'").css({"display" : "inline"}).css({"padding" : "10px"})
        )
    ).append(
        $("<div></div>").addClass("p-2 ps-3 pb-0").append(
            $("<p></p>").html(kom.tekst)
        )
    ).click(function() {
        localStorage.setItem("oglas.komentari", oglas.id);
        window.location.href = "komentari.html";
    }).css({
        "border-radius" : "20px",
        "background-color" : "white"
    }).css("cursor", "pointer")
}
function nadjiOglas(id) {
    for (let i = 0; i < oglasi.length; i++) {
        if (oglasi[i].id == id) return oglasi[i];
    }
}
function ukloniOglas(oglas) {
    if (!confirm((english ? "Are you sure you want to remove the ad '" : "Da li ste sigurni da želite da uklonite oglas '") + oglas.naziv +"'?")) return;
    oglasi = oglasi.filter(x => {
        return x.id != oglas.id
    })
    localStorage.setItem("oglasi", JSON.stringify(oglasi));
    komentari = komentari.filter(x => {
        return x.oglasid != oglas.id
    })
    localStorage.setItem("komentari", JSON.stringify(komentari));
    osvezi();
}