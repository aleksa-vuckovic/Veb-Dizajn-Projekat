var zivotinje = [];
var prikaz = [];
var tip;
var english;
$(document).ready(function() {
    zivotinje = generisiZivotinje();
    tip = generisiTip();
    english = isEnglish();
    $("#primeni").click(primeni);
    primeni();
})
function primeni() {
    filtriraj();
    sortiraj();
    osvezi();
}
function filtriraj() {
    let ime = $("#ime").val();
    let min = parseInt($("#od").val());
    let max = parseInt($("#do").val());
    prikaz = zivotinje.filter(x => {
        return x.starost >= min && x.starost <= max && new RegExp(".*" + ime + ".*", 'i').test(x.ime);
    })
}
function osvezi() {
    $("#lista").html("");
    var flag = true;
    prikaz.forEach(x => {
        $("#lista").append(napraviZivotinju(x, flag ? "bg-babyyellow" : "bg-light", english));
        flag = !flag;
    })
}
function sortiraj() {
    let i = parseInt($("#selekt").val());
    if (i == 0) prikaz.sort(function (ziv1, ziv2) {
        return ziv1.ime.localeCompare(ziv2.ime);
    })
    else if (i == 1) prikaz.sort(function(ziv1, ziv2) {
        return ziv2.ime.localeCompare(ziv1.ime)
    })
    else if (i == 2) prikaz.sort(function(ziv1, ziv2) {
        return ziv1.starost - ziv2.starost
    })
    else prikaz.sort(function(ziv1, ziv2) {
        return ziv2.starost - ziv1.starost
    })
}
function napraviZivotinju(info, bg, english) {
    return $("<div></div>").addClass("row zivotinja p-2 align-items-end border-bottom " + bg).append(
        $("<div></div>").addClass("col-sm-12 col-md-6 col-lg-3").append(
            $("<img>").attr("src", info.slika).addClass("rounded")
        )
    ).append(
        $("<div></div>").addClass("col-sm-12 col-md-6 col-lg-9").append(
            $("<table></table>").append(
                $("<tr></tr>").append($("<td></td>").html(english ? "Name:" : "Ime:")).append($("<td></td>").html(info.ime))
            ).append(
                $("<tr></tr>").append($("<td></td>").html(english ? "Weight: &nbsp;" : "Težina:")).append($("<td></td>").html(info.tezina))
            ).append(
                $("<tr></tr>").append($("<td></td>").html(english ? "Age:" : "Broj godina: &nbsp;")).append($("<td></td>").html(info.starost.toString()))
            ).append(
                $("<tr></tr>").append(
                    $("<td></td>").attr("colspan", "2").append(
                        $("<a></a>").attr("href", "#").html(english ? "More..." : "Saznaj više...").click(function() {saznajKlik(info)})
                    )
                )
            )
        )
    )
}
function saznajKlik(info) {
    localStorage.setItem("zivotinja", JSON.stringify(info));
    localStorage.setItem("tip", tip);
    window.location.href = "zivotinja.html";
}