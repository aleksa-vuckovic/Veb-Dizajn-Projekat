function inicijalizujStorage() {
    //nalozi
    let t = localStorage.getItem("korisnici");
    if (t == null) {
        t = [
            {
                mejl : "admin@gmail.com",
                id: "admin",
                lozinka: "admin",
                slika: "../slike/profil1.jpg"
            },
            {
                mejl : "maja@gmail.com",
                id: "Maja",
                lozinka: "maja",
                slika: "../slike/profil2.jpg"
            },
            {
                mejl : "petar@gmail.com",
                id: "Petar",
                lozinka: "petar",
                slika: "../slike/profil3.jpg"
            }
        ];
        localStorage.setItem("korisnici", JSON.stringify(t));
        localStorage.setItem("korisnikid", "admin");
    }
    //oglasi i komentari
    t = localStorage.getItem("oglasi");
    if (t == null) {
        t = [
            {
                naziv : "Zlatni retriver Miša",
                opis : "Miša je poslednji put viđen na Tašmajdanu 31.5.2022. u večernjim časovima. Nosio je crvenu ogrlicu sa svojim imenom. Mali je i bezopasan. Molimo vas da nam, ukoliko vidite nekog psa koji liči na Miću, što pre javite ili ostavite komentar.",
                telefon : "0621807888",
                slika: "../slike/pas1.jpg",
                id : "oglas0",
                korisnikid: "admin"
            },
            {
                naziv: "Pas Mićko",
                opis : "Mićko je krupan i veseo, a odaziva se i na Džeki. Poslednji put je viđen 9.6. na zemunskom keju.",
                telefon : "069-18-222-34",
                slika: "../slike/pas4.jpg",
                id: "oglas1",
                korisnikid: "Maja"
            },
            {
                naziv: "Britanka Triksi",
                opis: "Triksi je britanska kratkodlaka mačka, svetlo-žutog krzna. Izgubila se negde u blizini Elektrotehničkog fakulteta. Sve vrste informacija su dobrodošle!!",
                telefon: "069-18-222-34",
                slika: "../slike/macka6.jpg",
                id: "oglas2",
                korisnikid: "Maja"
            },
            {
                naziv: "HITNO",
                opis: "IZGUBLJEN JE LABRADOR MATEJA, OSVAJAČ DESETINA GRAND PRIX TAKMIČENJA U RAZNIM KATEGORIJAMA, UKLJUĆUJUĆI I ZA NAJLEPŠEG PSA. PRONALAZAČU SLEDI NOVČANA NAGRADA OD 10000 DINARA. HITNO HITNO HITNO!!!!!!!!!!",
                telefon: "066-24222222",
                slika: "../slike/labrador.jpg",
                id: "oglas3",
                korisnikid: "Petar"
            }
        ];
        localStorage.setItem("oglasi", JSON.stringify(t));
        localStorage.setItem("oglasid", "3");
        t = [
            {
                oglasid: "oglas0",
                korisnikid: "admin",
                tekst: "Jooj što je sladaaak!!"
            },
            {
                oglasid: "oglas3",
                korisnikid: "Maja",
                tekst: "Hmmmm... Mislim da sam videla ovog psa pre neki dan dok sam zalivala cveće na terasi. Prošao je ulicom i lajao besomučno."
            },
            {
                oglasid: "oglas2",
                korisnikid: "Petar",
                tekst: "Nadam se da ćete je brzo pronaći."
            }
        ];
        localStorage.setItem("komentari", JSON.stringify(t));
    }
}