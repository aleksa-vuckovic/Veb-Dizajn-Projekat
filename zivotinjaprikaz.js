var zivotinja;
var tip;
var english;
$(document).ready(function() {
    tip = localStorage.getItem("tip");
    zivotinja = JSON.parse(localStorage.getItem("zivotinja"));
    english = isEnglish();
    popuniTip();
    popuniInfo();
    popuniGaleriju();
    popuniVideo();
    srediVideo();
})
function popuniTip() {
    $("#main").addClass(tip);
    $('a[href = "' + tip +'.html"]').addClass("active");
    var tekst;
    if (tip == "macke") tekst = english ? "Cats" : "Mačke";
    else if (tip == "psi") tekst = english ? "Dogs" : "Psi";
    else tekst = english ? "Birds" : "Ptice";
    $("#banner").html(tekst);
    $("#prethodna").attr("href", tip + ".html").html(tekst);
}
function popuniInfo() {
    $("#ime").html(zivotinja.ime);
    $("#tezina").html(zivotinja.tezina);
    $("#starost").html(zivotinja.starost);
    $("#slika").attr("src", zivotinja.slika);
    $("#opis").html(zivotinja.opis);
    $("#trenutna").html(zivotinja.ime);
    $("#koga").html(zivotinja.ime);
}
function napraviItem(src, yes) {
    return  $("<div></div>").addClass("carousel-item" + (yes ? " active" : "")).append(
        $("<img>").attr("src", src).addClass("d-block w-100")
    );
}
function popuniGaleriju() {
    let slike = zivotinja.galerija;
    let start = true;
    slike.forEach(x => {
        $("#galerijainner").append(napraviItem(x, start))
        start = false;
    });
}
function napraviVideoItem(src, yes) {
    return $("<div></div>").addClass("carousel-item" + (yes ? " active" : "")).append(
        $("<video></video>").addClass("d-block w-100").attr("loop", "true").append(
            $("<source></source>").attr("src", src)
        )
    )
}
function popuniVideo() {
    let video = zivotinja.video;
    let start = true;
    video.forEach(x => {
        $("#videoinner").append(napraviVideoItem(x, start));
        start = false;
    })
}
function srediVideo() {
    var niz = document.getElementsByTagName("video");
    for (let i = 0; i < niz.length; i++) {
        let x = niz[i];
        x.muted = true;
        x.autoplay = true;
    }
}