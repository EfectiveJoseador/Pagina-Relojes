const products = [
    {
        id: 101,
        name: "Alavés 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Alaves2526L/1.webp"
    },
    {
        id: 102,
        name: "Albacete 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Albacete2526L/1.webp"
    },
    {
        id: 103,
        name: "Athletic Club 25/26 Tercera (Niño)",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/AthelticKids2526T/1.webp",
        kids: true
    },
    {
        id: 104,
        name: "Athletic Club 01/03 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Athletic0103FR/1.webp",
        retro: true
    },
    {
        id: 105,
        name: "Athletic Club 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Athletic2526L/1.webp"
    },
    {
        id: 106,
        name: "Atlético Madrid 02/03 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Atletico0203LR/1.webp",
        retro: true
    },
    {
        id: 107,
        name: "Atlético Madrid 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Atletico2526F/1.webp"
    },
    {
        id: 108,
        name: "Atlético Madrid 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Atletico2526L/1.webp"
    },
    {
        id: 109,
        name: "Atlético Madrid 95/96 Tercera Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Atletico9596TR/1.webp",
        retro: true
    },
    {
        id: 110,
        name: "Atlético Madrid 25/26 Visitante (Niño)",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/AtleticoKids2526F/1.webp",
        kids: true
    },
    {
        id: 111,
        name: "FC Barcelona 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Barcelona2526F/1.webp"
    },
    {
        id: 112,
        name: "FC Barcelona 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Barcelona2526L/1.webp"
    },
    {
        id: 113,
        name: "FC Barcelona 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Barcelona2526T/1.webp"
    },
    {
        id: 114,
        name: "FC Barcelona 96/97 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Barcelona9697LR/1.webp",
        retro: true
    },
    {
        id: 115,
        name: "Real Betis 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Betis2526L/1.webp"
    },
    {
        id: 116,
        name: "Celta de Vigo 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Celta2526L/1.webp"
    },
    {
        id: 117,
        name: "Elche 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Elche2526F/1.webp"
    },
    {
        id: 119,
        name: "Espanyol 99/00 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Espanyol9920LR/1.webp",
        retro: true
    },
    {
        id: 120,
        name: "Getafe 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Getafe2526L/1.webp"
    },
    {
        id: 121,
        name: "Girona 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Girona2526L/1.webp"
    },
    {
        id: 122,
        name: "Granada 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Granada2526L/1.webp"
    },
    {
        id: 123,
        name: "Las Palmas 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/LasPalmas2526F/1.webp"
    },
    {
        id: 124,
        name: "Las Palmas 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/LasPalmas2526L/1.webp"
    },
    {
        id: 125,
        name: "Leganés 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Leganes2526L/1.webp"
    },
    {
        id: 126,
        name: "Levante 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Levante2526L/1.webp"
    },
    {
        id: 127,
        name: "Málaga CF 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Malaga2526L/1.webp"
    },
    {
        id: 128,
        name: "Málaga CF 25/26 Local (Niño)",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/MalagaKids2526L/1.webp",
        kids: true
    },
    {
        id: 129,
        name: "Mallorca 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Mallorca2526L/1.webp"
    },
    {
        id: 130,
        name: "Osasuna 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Osasuna2526L/1.webp"
    },
    {
        id: 131,
        name: "Real Oviedo 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Oviedo2526L/1.webp"
    },
    {
        id: 133,
        name: "Real Madrid 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/RealMadrid2526F/1.webp"
    },
    {
        id: 134,
        name: "Real Madrid 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/RealMadrid2526L/1.webp"
    },
    {
        id: 135,
        name: "Real Madrid 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/RealMadrid2526T/1.webp"
    },
    {
        id: 136,
        name: "Real Sociedad 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/RealSociedad2526L/1.webp"
    },
    {
        id: 137,
        name: "Sevilla 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Sevilla2526F/1.webp"
    },
    {
        id: 138,
        name: "Sevilla 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Sevilla2526L/1.webp"
    },
    {
        id: 139,
        name: "Sevilla 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Sevilla2526T/1.webp"
    },
    {
        id: 140,
        name: "Valencia 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Valencia2526L/1.webp"
    },
    {
        id: 141,
        name: "Valladolid 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Valladolid2526L/1.webp"
    },
    {
        id: 142,
        name: "Villarreal 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/La Liga/Villarreal2526L/1.webp"
    },
    {
        id: 201,
        name: "Arsenal 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/Arsenal2525L/1.webp"
    },
    {
        id: 202,
        name: "Arsenal 25/26 Visitante",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/Arsenal2526F/1.webp"
    },
    {
        id: 203,
        name: "Aston Villa 25/26 Visitante",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/AstonVilla2526L/1.webp"
    },
    {
        id: 204,
        name: "Chelsea 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/Chealsea2526L/1.webp"
    },
    {
        id: 205,
        name: "Crystal Palace 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/CrystalPalace2526L/1.webp"
    },
    {
        id: 206,
        name: "Manchester City 25/26 Visitante",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/ManCity2526F/1.webp"
    },
    {
        id: 207,
        name: "Manchester United 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/ManUnited2526L/1.webp"
    },
    {
        id: 208,
        name: "Newcastle 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/Newcastle2526L/1.webp"
    },
    {
        id: 209,
        name: "Manchester United 25/26 Visitante (Niño)",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Premier League/UnitedKids2526F/1.webp",
        kids: true
    },
    {
        id: 301,
        name: "Lazio 25/26 Visitante",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Serie A/Lazio2526F/1.webp"
    },
    {
        id: 302,
        name: "AC Milan 97/98 Local Retro",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Serie A/Milan9798LR/1.webp",
        retro: true
    },
    {
        id: 303,
        name: "Napoli 25/26 Local",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Serie A/Napoli2526L/1.webp"
    },
    {
        id: 304,
        name: "AS Roma 25/26 Local (Niño)",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Serie A/RomaKids2526L/1.webp",
        kids: true
    },
    {
        id: 401,
        name: "Bayern Munich 25/26 Local",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Bundesliga/Munich2526L/1.webp"
    },
    {
        id: 402,
        name: "Schalke 04 25/26 Local",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Bundesliga/Schalke2526L/1.webp"
    },
    {
        id: 501,
        name: "Marseille 25/26 Visitante (Niño)",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Ligue 1/MarseillaKids2526F/1.webp",
        kids: true
    },
    {
        id: 502,
        name: "Monaco 25/26 Visitante",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Ligue 1/Monaco2526F/1.webp"
    },
    {
        id: 503,
        name: "PSG 25/26 Local",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Ligue 1/Paris2526L/1.webp"
    },
    {
        id: 504,
        name: "PSG 25/26 Tercera",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Ligue 1/PSG2526T/1.webp"
    },
    {
        id: 601,
        name: "España 08/09 Local Retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Internacional/España0809LR/1.webp",
        retro: true
    },
    {
        id: 602,
        name: "España 24/25 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Internacional/España2425L/1.webp"
    },
    {
        id: 603,
        name: "Francia 98/99 Local Retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Internacional/Francia9899LR/1.webp",
        retro: true
    },
    {
        id: 604,
        name: "Holanda 98/99 Local Retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Internacional/Holanda9899LR/1.webp",
        retro: true
    },
    {
        id: 551,
        name: "Flamengo 25/26 Tercera",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Brasileirão Série A/Flamengo2526T/1.webp"
    },
    {
        id: 561,
        name: "Al-Nassr 25/26 Local",
        category: "futbol",
        league: "ligaarabe",
        image: "/assets/productos/Liga Arabe/Al-Nassr2526L/1.webp"
    },
    {
        id: 571,
        name: "Boca Juniors 01/02 Local Retro",
        category: "futbol",
        league: "saf",
        image: "/assets/productos/SAF (Argentina)/Boca0102LR/1.webp",
        retro: true
    },
    {
        id: 572,
        name: "River Plate 25/26 Local",
        category: "futbol",
        league: "saf",
        image: "/assets/productos/SAF (Argentina)/River2526L/1.webp"
    },
    {
        id: 573,
        name: "River Plate 25/26 Local (Niño)",
        category: "futbol",
        league: "saf",
        image: "/assets/productos/SAF (Argentina)/RiverKids2526L/1.webp",
        kids: true
    },
    {
        id: 701,
        name: "Lakers 25/26 Local",
        category: "nba",
        league: "nba",
        image: "/assets/productos/NBA/Lakers1/1.webp"
    },
    {
        id: 702,
        name: "Oklahoma City Thunder",
        category: "nba",
        league: "nba",
        image: "/assets/productos/NBA/Oklahoma/1.webp"
    },
    {
        id: 703,
        name: "Philadelphia 76ers",
        category: "nba",
        league: "nba",
        image: "/assets/productos/NBA/Phila1/1.webp"
    },
    {
        id: 937715,
        name: "Japón 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219491642/1.webp",
        images: [
            "/assets/productos/Yupoo/219491642/2.webp"
        ],
        tipo: "local",
        temporada: "2026"
    },
    {
        id: 978161,
        name: "Palmeiras 25/26 Visitante",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/210081096/1.webp",
        images: [
            "/assets/productos/Yupoo/210081096/2.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 362332,
        name: "Alaves 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/216419940/1.webp",
        images: [
            "/assets/productos/Yupoo/216419940/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 948475,
        name: "Real Murcia 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/216806487/1.webp",
        images: [
            "/assets/productos/Yupoo/216806487/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 892563,
        name: "Osasuna 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/211234491/1.webp",
        images: [
            "/assets/productos/Yupoo/211234491/2.webp",
            "/assets/productos/Yupoo/211234491/3.webp",
            "/assets/productos/Yupoo/211234491/4.webp",
            "/assets/productos/Yupoo/211234491/5.webp",
            "/assets/productos/Yupoo/211234491/6.webp",
            "/assets/productos/Yupoo/211234491/7.webp",
            "/assets/productos/Yupoo/211234491/8.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 388938,
        name: "Real Betis 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/211234641/1.webp",
        images: [
            "/assets/productos/Yupoo/211234641/2.webp",
            "/assets/productos/Yupoo/211234641/3.webp",
            "/assets/productos/Yupoo/211234641/4.webp",
            "/assets/productos/Yupoo/211234641/5.webp",
            "/assets/productos/Yupoo/211234641/6.webp",
            "/assets/productos/Yupoo/211234641/7.webp",
            "/assets/productos/Yupoo/211234641/8.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 105061,
        name: "Valladolid 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207563358/1.webp",
        images: [
            "/assets/productos/Yupoo/207563358/2.webp",
            "/assets/productos/Yupoo/207563358/3.webp",
            "/assets/productos/Yupoo/207563358/4.webp",
            "/assets/productos/Yupoo/207563358/5.webp",
            "/assets/productos/Yupoo/207563358/6.webp",
            "/assets/productos/Yupoo/207563358/7.webp",
            "/assets/productos/Yupoo/207563358/8.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 945475,
        name: "Real Betis 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207560329/1.webp",
        images: [
            "/assets/productos/Yupoo/207560329/2.webp",
            "/assets/productos/Yupoo/207560329/3.webp",
            "/assets/productos/Yupoo/207560329/4.webp",
            "/assets/productos/Yupoo/207560329/5.webp",
            "/assets/productos/Yupoo/207560329/6.webp",
            "/assets/productos/Yupoo/207560329/7.webp",
            "/assets/productos/Yupoo/207560329/8.webp",
            "/assets/productos/Yupoo/207560329/9.webp",
            "/assets/productos/Yupoo/207560329/10.webp",
            "/assets/productos/Yupoo/207560329/11.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 520253,
        name: "Deportivo La Coruna 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207558615/1.webp",
        images: [
            "/assets/productos/Yupoo/207558615/2.webp",
            "/assets/productos/Yupoo/207558615/3.webp",
            "/assets/productos/Yupoo/207558615/4.webp",
            "/assets/productos/Yupoo/207558615/5.webp",
            "/assets/productos/Yupoo/207558615/6.webp",
            "/assets/productos/Yupoo/207558615/7.webp",
            "/assets/productos/Yupoo/207558615/8.webp",
            "/assets/productos/Yupoo/207558615/9.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 811678,
        name: "Deportivo La Coruna 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207558748/1.webp",
        images: [
            "/assets/productos/Yupoo/207558748/2.webp",
            "/assets/productos/Yupoo/207558748/3.webp",
            "/assets/productos/Yupoo/207558748/4.webp",
            "/assets/productos/Yupoo/207558748/5.webp",
            "/assets/productos/Yupoo/207558748/6.webp",
            "/assets/productos/Yupoo/207558748/7.webp",
            "/assets/productos/Yupoo/207558748/8.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 199666,
        name: "Celta 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207557734/1.webp",
        images: [
            "/assets/productos/Yupoo/207557734/2.webp",
            "/assets/productos/Yupoo/207557734/3.webp",
            "/assets/productos/Yupoo/207557734/4.webp",
            "/assets/productos/Yupoo/207557734/5.webp",
            "/assets/productos/Yupoo/207557734/6.webp",
            "/assets/productos/Yupoo/207557734/7.webp",
            "/assets/productos/Yupoo/207557734/8.webp",
            "/assets/productos/Yupoo/207557734/9.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 987640,
        name: "Celta 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/203698925/1.webp",
        images: [
            "/assets/productos/Yupoo/203698925/2.webp",
            "/assets/productos/Yupoo/203698925/3.webp",
            "/assets/productos/Yupoo/203698925/4.webp",
            "/assets/productos/Yupoo/203698925/5.webp",
            "/assets/productos/Yupoo/203698925/6.webp",
            "/assets/productos/Yupoo/203698925/7.webp",
            "/assets/productos/Yupoo/203698925/8.webp",
            "/assets/productos/Yupoo/203698925/9.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 951872,
        name: "Real Madrid 90/92 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/201351646/1.webp",
        images: [
            "/assets/productos/Yupoo/201351646/2.webp",
            "/assets/productos/Yupoo/201351646/3.webp",
            "/assets/productos/Yupoo/201351646/4.webp",
            "/assets/productos/Yupoo/201351646/5.webp",
            "/assets/productos/Yupoo/201351646/6.webp",
            "/assets/productos/Yupoo/201351646/7.webp",
            "/assets/productos/Yupoo/201351646/8.webp"
        ],
        tipo: "local",
        retro: true
    },
    {
        id: 385774,
        name: "Girona 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/201350059/1.webp",
        images: [
            "/assets/productos/Yupoo/201350059/2.webp",
            "/assets/productos/Yupoo/201350059/3.webp",
            "/assets/productos/Yupoo/201350059/4.webp",
            "/assets/productos/Yupoo/201350059/5.webp",
            "/assets/productos/Yupoo/201350059/6.webp",
            "/assets/productos/Yupoo/201350059/7.webp",
            "/assets/productos/Yupoo/201350059/8.webp",
            "/assets/productos/Yupoo/201350059/9.webp",
            "/assets/productos/Yupoo/201350059/10.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 126754,
        name: "Cadiz 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/200370927/1.webp",
        images: [
            "/assets/productos/Yupoo/200370927/2.webp",
            "/assets/productos/Yupoo/200370927/3.webp",
            "/assets/productos/Yupoo/200370927/4.webp",
            "/assets/productos/Yupoo/200370927/5.webp",
            "/assets/productos/Yupoo/200370927/6.webp",
            "/assets/productos/Yupoo/200370927/7.webp",
            "/assets/productos/Yupoo/200370927/8.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 489081,
        name: "Zaragoza 04/05 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/199217731/1.webp",
        images: [
            "/assets/productos/Yupoo/199217731/2.webp",
            "/assets/productos/Yupoo/199217731/3.webp",
            "/assets/productos/Yupoo/199217731/4.webp",
            "/assets/productos/Yupoo/199217731/5.webp",
            "/assets/productos/Yupoo/199217731/6.webp",
            "/assets/productos/Yupoo/199217731/7.webp",
            "/assets/productos/Yupoo/199217731/8.webp"
        ],
        tipo: "local",
        retro: true
    },
    {
        id: 891737,
        name: "Real Madrid 25/26 Portero Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/197579658/1.webp",
        images: [
            "/assets/productos/Yupoo/197579658/2.webp",
            "/assets/productos/Yupoo/197579658/3.webp",
            "/assets/productos/Yupoo/197579658/4.webp",
            "/assets/productos/Yupoo/197579658/5.webp",
            "/assets/productos/Yupoo/197579658/6.webp",
            "/assets/productos/Yupoo/197579658/7.webp",
            "/assets/productos/Yupoo/197579658/8.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 737878,
        name: "Zaragoza 97/98 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/197575643/1.webp",
        images: [
            "/assets/productos/Yupoo/197575643/2.webp",
            "/assets/productos/Yupoo/197575643/3.webp",
            "/assets/productos/Yupoo/197575643/4.webp",
            "/assets/productos/Yupoo/197575643/5.webp",
            "/assets/productos/Yupoo/197575643/6.webp",
            "/assets/productos/Yupoo/197575643/7.webp",
            "/assets/productos/Yupoo/197575643/8.webp"
        ],
        temporada: "97/98",
        tipo: "local",
        retro: true
    },
    {
        id: 745212,
        name: "Getafe 09/10 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/192258362/1.webp",
        images: [
            "/assets/productos/Yupoo/192258362/2.webp",
            "/assets/productos/Yupoo/192258362/3.webp",
            "/assets/productos/Yupoo/192258362/4.webp",
            "/assets/productos/Yupoo/192258362/5.webp",
            "/assets/productos/Yupoo/192258362/6.webp",
            "/assets/productos/Yupoo/192258362/7.webp",
            "/assets/productos/Yupoo/192258362/8.webp"
        ],
        temporada: "09/10",
        tipo: "local",
        retro: true
    },
    {
        id: 144708,
        name: "Málaga CF 97/98 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/187757557/1.webp",
        images: [
            "/assets/productos/Yupoo/187757557/2.webp",
            "/assets/productos/Yupoo/187757557/3.webp",
            "/assets/productos/Yupoo/187757557/4.webp",
            "/assets/productos/Yupoo/187757557/5.webp",
            "/assets/productos/Yupoo/187757557/6.webp",
            "/assets/productos/Yupoo/187757557/7.webp",
            "/assets/productos/Yupoo/187757557/8.webp"
        ],
        tipo: "local",
        retro: true
    },
    {
        id: 294032,
        name: "Italia 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219491302/1.webp",
        images: [
            "/assets/productos/Yupoo/219491302/2.webp"
        ],
        tipo: "local",
        temporada: "2026"
    },
    {
        id: 737806,
        name: "Inglaterra 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219490998/1.webp",
        images: [
            "/assets/productos/Yupoo/219490998/2.webp"
        ],
        tipo: "local",
        temporada: "2026"
    },
    {
        id: 120417,
        name: "Alemania 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219463186/1.webp",
        images: [
            "/assets/productos/Yupoo/219463186/2.webp"
        ],
        tipo: "local",
        temporada: "2026"
    },
    {
        id: 905466,
        name: "Venezuela 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/218139532/1.webp",
        images: [
            "/assets/productos/Yupoo/218139532/2.webp"
        ],
        tipo: "local"
    },
    {
        id: 882796,
        name: "España 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/218139402/1.webp",
        images: [
            "/assets/productos/Yupoo/218139402/2.webp"
        ],
        tipo: "local",
        temporada: "2026"
    },
    {
        id: 431137,
        name: "Costa Rica 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/218138743/1.webp",
        images: [
            "/assets/productos/Yupoo/218138743/2.webp"
        ],
        tipo: "local"
    },
    {
        id: 238510,
        name: "Atlético Mineiro 25/26 Tercera",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/216807613/1.webp",
        images: [
            "/assets/productos/Yupoo/216807613/2.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 671227,
        name: "Al-Hilal 25/26 Local",
        category: "futbol",
        league: "ligaarabe",
        image: "/assets/productos/Yupoo/216806586/1.webp",
        images: [
            "/assets/productos/Yupoo/216806586/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 729212,
        name: "Al-Hilal 25/26 Local",
        category: "futbol",
        league: "ligaarabe",
        image: "/assets/productos/Yupoo/216806631/1.webp",
        images: [
            "/assets/productos/Yupoo/216806631/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 984139,
        name: "Al-Hilal 25/26 Tercera",
        category: "futbol",
        league: "ligaarabe",
        image: "/assets/productos/Yupoo/216806537/1.webp",
        images: [
            "/assets/productos/Yupoo/216806537/2.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 144601,
        name: "Flamengo 25/26",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/216806071/1.webp",
        images: [
            "/assets/productos/Yupoo/216806071/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 666279,
        name: "Flamengo 25/26 Especial",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/216806004/1.webp",
        images: [
            "/assets/productos/Yupoo/216806004/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 791626,
        name: "México 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216441726/1.webp",
        images: [
            "/assets/productos/Yupoo/216441726/2.webp"
        ],
        tipo: "local",
        temporada: "2026"
    },
    {
        id: 405261,
        name: "Alemania 2026 Visitante",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216441793/1.webp",
        images: [
            "/assets/productos/Yupoo/216441793/2.webp"
        ],
        tipo: "visitante",
        temporada: "2026"
    },
    {
        id: 613571,
        name: "Portugal 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216441953/1.webp",
        images: [
            "/assets/productos/Yupoo/216441953/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 851677,
        name: "Al Ahli 26/27 Visitante",
        category: "futbol",
        league: "ligaarabe",
        image: "/assets/productos/Yupoo/216423857/1.webp",
        images: [
            "/assets/productos/Yupoo/216423857/2.webp"
        ],
        temporada: "26/27",
        tipo: "visitante"
    },
    {
        id: 382204,
        name: "Al Ahli 26/27 Local",
        category: "futbol",
        league: "ligaarabe",
        image: "/assets/productos/Yupoo/216423781/1.webp",
        images: [
            "/assets/productos/Yupoo/216423781/2.webp"
        ],
        temporada: "26/27",
        tipo: "local"
    },
    {
        id: 523301,
        name: "Inter Milan 25/26 Tercera",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/216420875/1.webp",
        images: [
            "/assets/productos/Yupoo/216420875/2.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 968048,
        name: "Chelsea 25/26 Tercera",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/216420668/1.webp",
        images: [
            "/assets/productos/Yupoo/216420668/2.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 407027,
        name: "Atlético Mineiro 25/26",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/213836929/1.webp",
        images: [
            "/assets/productos/Yupoo/213836929/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 851556,
        name: "Santos 25/26 Visitante",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/213836761/1.webp",
        images: [
            "/assets/productos/Yupoo/213836761/2.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 382182,
        name: "Santa Cruz 25/26 Visitante",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/213836701/1.webp",
        images: [
            "/assets/productos/Yupoo/213836701/2.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 162492,
        name: "Inter Milan 25/26 Local",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/212532108/1.webp",
        images: [
            "/assets/productos/Yupoo/212532108/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 637422,
        name: "West Ham United 25/26 Tercera",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/211519379/1.webp",
        images: [
            "/assets/productos/Yupoo/211519379/2.webp",
            "/assets/productos/Yupoo/211519379/3.webp",
            "/assets/productos/Yupoo/211519379/4.webp",
            "/assets/productos/Yupoo/211519379/5.webp",
            "/assets/productos/Yupoo/211519379/6.webp",
            "/assets/productos/Yupoo/211519379/7.webp",
            "/assets/productos/Yupoo/211519379/8.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 580856,
        name: "Wolves 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/211519500/1.webp",
        images: [
            "/assets/productos/Yupoo/211519500/2.webp",
            "/assets/productos/Yupoo/211519500/3.webp",
            "/assets/productos/Yupoo/211519500/4.webp",
            "/assets/productos/Yupoo/211519500/5.webp",
            "/assets/productos/Yupoo/211519500/6.webp",
            "/assets/productos/Yupoo/211519500/7.webp",
            "/assets/productos/Yupoo/211519500/8.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 638151,
        name: "PSG 00/01 Local Retro",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/211235324/1.webp",
        images: [
            "/assets/productos/Yupoo/211235324/2.webp",
            "/assets/productos/Yupoo/211235324/3.webp",
            "/assets/productos/Yupoo/211235324/4.webp",
            "/assets/productos/Yupoo/211235324/5.webp",
            "/assets/productos/Yupoo/211235324/6.webp"
        ],
        temporada: "00/01",
        tipo: "local",
        retro: true
    },
    {
        id: 829143,
        name: "Alemania 2008 Local Retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/211517757/1.webp",
        images: [
            "/assets/productos/Yupoo/211517757/2.webp",
            "/assets/productos/Yupoo/211517757/3.webp",
            "/assets/productos/Yupoo/211517757/4.webp",
            "/assets/productos/Yupoo/211517757/5.webp",
            "/assets/productos/Yupoo/211517757/6.webp"
        ],
        temporada: "2008",
        tipo: "local",
        retro: true
    },
    {
        id: 861810,
        name: "Holanda 2004 Local Retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/211235265/1.webp",
        images: [
            "/assets/productos/Yupoo/211235265/2.webp",
            "/assets/productos/Yupoo/211235265/3.webp",
            "/assets/productos/Yupoo/211235265/4.webp",
            "/assets/productos/Yupoo/211235265/5.webp",
            "/assets/productos/Yupoo/211235265/6.webp"
        ],
        temporada: "2004",
        tipo: "local",
        retro: true
    },
    {
        id: 740108,
        name: "Holanda 2004 Visitante Retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/211235213/1.webp",
        images: [
            "/assets/productos/Yupoo/211235213/2.webp",
            "/assets/productos/Yupoo/211235213/3.webp",
            "/assets/productos/Yupoo/211235213/4.webp",
            "/assets/productos/Yupoo/211235213/5.webp",
            "/assets/productos/Yupoo/211235213/6.webp",
            "/assets/productos/Yupoo/211235213/7.webp"
        ],
        temporada: "2004",
        tipo: "visitante",
        retro: true
    },
    {
        id: 431236,
        name: "Sao Paulo 25/26 Tercera",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/211234781/1.webp",
        images: [
            "/assets/productos/Yupoo/211234781/2.webp",
            "/assets/productos/Yupoo/211234781/3.webp",
            "/assets/productos/Yupoo/211234781/4.webp",
            "/assets/productos/Yupoo/211234781/5.webp",
            "/assets/productos/Yupoo/211234781/6.webp",
            "/assets/productos/Yupoo/211234781/7.webp",
            "/assets/productos/Yupoo/211234781/8.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 549694,
        name: "Sporting Lisboa 25/26",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/208905010/1.webp",
        images: [
            "/assets/productos/Yupoo/208905010/2.webp",
            "/assets/productos/Yupoo/208905010/3.webp",
            "/assets/productos/Yupoo/208905010/4.webp",
            "/assets/productos/Yupoo/208905010/5.webp",
            "/assets/productos/Yupoo/208905010/6.webp",
            "/assets/productos/Yupoo/208905010/7.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 535164,
        name: "Sporting Lisboa 25/26 Portero Cuarta",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/216420441/1.webp",
        images: [
            "/assets/productos/Yupoo/216420441/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 351327,
        name: "Sporting Lisboa 25/26 Tercera",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/216420176/1.webp",
        images: [
            "/assets/productos/Yupoo/216420176/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 316255,
        name: "Sporting Lisboa 25/26 Edición Conmemorativa",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/216420592/1.webp",
        images: [
            "/assets/productos/Yupoo/216420592/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 755900,
        name: "Colombia 2026 Visitante",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219490648/1.webp",
        images: [
            "/assets/productos/Yupoo/219490648/2.webp"
        ],
        temporada: "2026",
        tipo: "visitante"
    },
    {
        id: 475090,
        name: "Bélgica 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219490303/1.webp",
        images: [
            "/assets/productos/Yupoo/219490303/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 122777,
        name: "Portugal 2026 Visitante",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219464146/1.webp",
        images: [
            "/assets/productos/Yupoo/219464146/2.webp"
        ],
        temporada: "2026",
        tipo: "visitante"
    },
    {
        id: 443462,
        name: "Norway 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219490239/1.webp",
        images: [
            "/assets/productos/Yupoo/219490239/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 935379,
        name: "Wales 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219464881/1.webp",
        images: [
            "/assets/productos/Yupoo/219464881/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 938860,
        name: "Portugal 2026",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219464642/1.webp",
        images: [
            "/assets/productos/Yupoo/219464642/2.webp"
        ],
        temporada: "2026"
    },
    {
        id: 159689,
        name: "Argentina 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219462514/1.webp",
        images: [
            "/assets/productos/Yupoo/219462514/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 623155,
        name: "Argentina 2026 Portero",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219462414/1.webp",
        images: [
            "/assets/productos/Yupoo/219462414/2.webp"
        ],
        temporada: "2026",
        tipo: "portero"
    },
    {
        id: 792005,
        name: "Sweden 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/218139468/1.webp",
        images: [
            "/assets/productos/Yupoo/218139468/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 381663,
        name: "Peru 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/218139206/1.webp",
        images: [
            "/assets/productos/Yupoo/218139206/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 433188,
        name: "Brasil 2025 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216806220/1.webp",
        images: [
            "/assets/productos/Yupoo/216806220/2.webp"
        ],
        temporada: "2025",
        tipo: "local"
    },
    {
        id: 448046,
        name: "Flamengo 25/26 Portero Tercera",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/216805953/1.webp",
        images: [
            "/assets/productos/Yupoo/216805953/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 571063,
        name: "Chile 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216442420/1.webp",
        images: [
            "/assets/productos/Yupoo/216442420/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 711830,
        name: "Portugal 2026 Visitante",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216442463/1.webp",
        images: [
            "/assets/productos/Yupoo/216442463/2.webp"
        ],
        temporada: "2026",
        tipo: "visitante"
    },
    {
        id: 320201,
        name: "Colombia 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216442560/2.webp",
        images: [
            "/assets/productos/Yupoo/216442560/1.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 670833,
        name: "México 2026 Visitante",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216442511/1.webp",
        images: [
            "/assets/productos/Yupoo/216442511/2.webp"
        ],
        temporada: "2026",
        tipo: "visitante"
    },
    {
        id: 417471,
        name: "Italia 2026 Visitante",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/216441659/1.webp",
        images: [
            "/assets/productos/Yupoo/216441659/2.webp"
        ],
        temporada: "2026",
        tipo: "visitante"
    },
    {
        id: 993378,
        name: "Celta 01/03 Tercera Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207564422/1.webp",
        images: [
            "/assets/productos/Yupoo/207564422/2.webp",
            "/assets/productos/Yupoo/207564422/3.webp",
            "/assets/productos/Yupoo/207564422/4.webp",
            "/assets/productos/Yupoo/207564422/5.webp",
            "/assets/productos/Yupoo/207564422/6.webp",
            "/assets/productos/Yupoo/207564422/7.webp",
            "/assets/productos/Yupoo/207564422/8.webp"
        ],
        tipo: "tercera",
        retro: true
    },
    {
        id: 553992,
        name: "Real Oviedo 90/91 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207564621/1.webp",
        images: [
            "/assets/productos/Yupoo/207564621/2.webp",
            "/assets/productos/Yupoo/207564621/3.webp",
            "/assets/productos/Yupoo/207564621/4.webp",
            "/assets/productos/Yupoo/207564621/5.webp",
            "/assets/productos/Yupoo/207564621/6.webp",
            "/assets/productos/Yupoo/207564621/7.webp",
            "/assets/productos/Yupoo/207564621/8.webp"
        ],
        temporada: "90/91",
        tipo: "local",
        retro: true
    },
    {
        id: 484880,
        name: "Atletico Madrid 02/03 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207563853/1.webp",
        images: [
            "/assets/productos/Yupoo/207563853/2.webp",
            "/assets/productos/Yupoo/207563853/3.webp",
            "/assets/productos/Yupoo/207563853/4.webp",
            "/assets/productos/Yupoo/207563853/5.webp",
            "/assets/productos/Yupoo/207563853/6.webp",
            "/assets/productos/Yupoo/207563853/7.webp",
            "/assets/productos/Yupoo/207563853/8.webp"
        ],
        temporada: "02/03",
        tipo: "visitante",
        retro: true
    },
    {
        id: 113368,
        name: "Atletico Madrid 10/11 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207564138/1.webp",
        images: [
            "/assets/productos/Yupoo/207564138/2.webp",
            "/assets/productos/Yupoo/207564138/3.webp",
            "/assets/productos/Yupoo/207564138/4.webp",
            "/assets/productos/Yupoo/207564138/5.webp",
            "/assets/productos/Yupoo/207564138/6.webp",
            "/assets/productos/Yupoo/207564138/7.webp",
            "/assets/productos/Yupoo/207564138/8.webp",
            "/assets/productos/Yupoo/207564138/9.webp"
        ],
        temporada: "10/11",
        tipo: "visitante",
        retro: true
    },
    {
        id: 497909,
        name: "Newcastle United 25/26 Visitante",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/207559992/1.webp",
        images: [
            "/assets/productos/Yupoo/207559992/2.webp",
            "/assets/productos/Yupoo/207559992/3.webp",
            "/assets/productos/Yupoo/207559992/4.webp",
            "/assets/productos/Yupoo/207559992/5.webp",
            "/assets/productos/Yupoo/207559992/6.webp",
            "/assets/productos/Yupoo/207559992/7.webp",
            "/assets/productos/Yupoo/207559992/8.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 540044,
        name: "Schalke 04 25/26 Tercera",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Yupoo/207561041/1.webp",
        images: [
            "/assets/productos/Yupoo/207561041/2.webp",
            "/assets/productos/Yupoo/207561041/3.webp",
            "/assets/productos/Yupoo/207561041/4.webp",
            "/assets/productos/Yupoo/207561041/5.webp",
            "/assets/productos/Yupoo/207561041/6.webp",
            "/assets/productos/Yupoo/207561041/7.webp",
            "/assets/productos/Yupoo/207561041/8.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 985030,
        name: "Brighton 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/207557639/1.webp",
        images: [
            "/assets/productos/Yupoo/207557639/2.webp",
            "/assets/productos/Yupoo/207557639/3.webp",
            "/assets/productos/Yupoo/207557639/4.webp",
            "/assets/productos/Yupoo/207557639/5.webp",
            "/assets/productos/Yupoo/207557639/6.webp",
            "/assets/productos/Yupoo/207557639/7.webp",
            "/assets/productos/Yupoo/207557639/8.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 744047,
        name: "Sporting Gijon 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207450991/1.webp",
        images: [
            "/assets/productos/Yupoo/207450991/2.webp",
            "/assets/productos/Yupoo/207450991/3.webp",
            "/assets/productos/Yupoo/207450991/4.webp",
            "/assets/productos/Yupoo/207450991/5.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 255670,
        name: "Rayo Vallecano 97/98 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207451208/1.webp",
        images: [
            "/assets/productos/Yupoo/207451208/2.webp",
            "/assets/productos/Yupoo/207451208/3.webp",
            "/assets/productos/Yupoo/207451208/4.webp",
            "/assets/productos/Yupoo/207451208/5.webp",
            "/assets/productos/Yupoo/207451208/6.webp",
            "/assets/productos/Yupoo/207451208/7.webp",
            "/assets/productos/Yupoo/207451208/8.webp"
        ],
        temporada: "97/98",
        tipo: "visitante",
        retro: true
    },
    {
        id: 178706,
        name: "Rayo Vallecano 97/98 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/207451307/1.webp",
        images: [
            "/assets/productos/Yupoo/207451307/2.webp",
            "/assets/productos/Yupoo/207451307/3.webp",
            "/assets/productos/Yupoo/207451307/4.webp",
            "/assets/productos/Yupoo/207451307/5.webp"
        ],
        temporada: "97/98",
        tipo: "local",
        retro: true
    },
    {
        id: 155990,
        name: "Monaco 25/26 Local",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/204720362/1.webp",
        images: [
            "/assets/productos/Yupoo/204720362/2.webp",
            "/assets/productos/Yupoo/204720362/3.webp",
            "/assets/productos/Yupoo/204720362/4.webp",
            "/assets/productos/Yupoo/204720362/5.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 776038,
        name: "Monaco 25/26 Tercera",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/204720483/1.webp",
        images: [
            "/assets/productos/Yupoo/204720483/2.webp",
            "/assets/productos/Yupoo/204720483/3.webp",
            "/assets/productos/Yupoo/204720483/4.webp",
            "/assets/productos/Yupoo/204720483/5.webp",
            "/assets/productos/Yupoo/204720483/6.webp",
            "/assets/productos/Yupoo/204720483/7.webp",
            "/assets/productos/Yupoo/204720483/8.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 803718,
        name: "Monaco 25/26 Visitante",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/204720187/1.webp",
        images: [
            "/assets/productos/Yupoo/204720187/2.webp",
            "/assets/productos/Yupoo/204720187/3.webp",
            "/assets/productos/Yupoo/204720187/4.webp",
            "/assets/productos/Yupoo/204720187/5.webp",
            "/assets/productos/Yupoo/204720187/6.webp",
            "/assets/productos/Yupoo/204720187/7.webp",
            "/assets/productos/Yupoo/204720187/8.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 210794,
        name: "Everton 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/204718775/1.webp",
        images: [
            "/assets/productos/Yupoo/204718775/2.webp",
            "/assets/productos/Yupoo/204718775/3.webp",
            "/assets/productos/Yupoo/204718775/4.webp",
            "/assets/productos/Yupoo/204718775/5.webp",
            "/assets/productos/Yupoo/204718775/6.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 762229,
        name: "AS Roma 25/26 Local",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/203703113/1.webp",
        images: [
            "/assets/productos/Yupoo/203703113/2.webp",
            "/assets/productos/Yupoo/203703113/3.webp",
            "/assets/productos/Yupoo/203703113/4.webp",
            "/assets/productos/Yupoo/203703113/5.webp",
            "/assets/productos/Yupoo/203703113/6.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 676633,
        name: "RCD Mallorca 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/203701729/1.webp",
        images: [
            "/assets/productos/Yupoo/203701729/2.webp",
            "/assets/productos/Yupoo/203701729/3.webp",
            "/assets/productos/Yupoo/203701729/4.webp",
            "/assets/productos/Yupoo/203701729/5.webp",
            "/assets/productos/Yupoo/203701729/6.webp",
            "/assets/productos/Yupoo/203701729/7.webp",
            "/assets/productos/Yupoo/203701729/8.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 869699,
        name: "Marseille 25/26 Visitante",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/203701585/1.webp",
        images: [
            "/assets/productos/Yupoo/203701585/2.webp",
            "/assets/productos/Yupoo/203701585/3.webp",
            "/assets/productos/Yupoo/203701585/4.webp",
            "/assets/productos/Yupoo/203701585/5.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 747923,
        name: "Marseille 25/26 Local",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/203701618/1.webp",
        images: [
            "/assets/productos/Yupoo/203701618/2.webp",
            "/assets/productos/Yupoo/203701618/3.webp",
            "/assets/productos/Yupoo/203701618/4.webp",
            "/assets/productos/Yupoo/203701618/5.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 464510,
        name: "Internacional 25/26 Visitante",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/203701302/1.webp",
        images: [
            "/assets/productos/Yupoo/203701302/2.webp",
            "/assets/productos/Yupoo/203701302/3.webp",
            "/assets/productos/Yupoo/203701302/4.webp",
            "/assets/productos/Yupoo/203701302/5.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 881988,
        name: "Sporting Lisboa 25/26 Local",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/202779885/1.webp",
        images: [
            "/assets/productos/Yupoo/202779885/2.webp",
            "/assets/productos/Yupoo/202779885/3.webp",
            "/assets/productos/Yupoo/202779885/4.webp",
            "/assets/productos/Yupoo/202779885/5.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 959227,
        name: "Athletic Bilbao 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/203698766/1.webp",
        images: [
            "/assets/productos/Yupoo/203698766/2.webp",
            "/assets/productos/Yupoo/203698766/3.webp",
            "/assets/productos/Yupoo/203698766/4.webp",
            "/assets/productos/Yupoo/203698766/5.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 883948,
        name: "Inter Milan 25/26 Visitante",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/202779358/1.webp",
        images: [
            "/assets/productos/Yupoo/202779358/2.webp",
            "/assets/productos/Yupoo/202779358/3.webp",
            "/assets/productos/Yupoo/202779358/4.webp",
            "/assets/productos/Yupoo/202779358/5.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 511048,
        name: "Dortmund 25/26 Local",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Yupoo/202779313/1.webp",
        images: [
            "/assets/productos/Yupoo/202779313/2.webp",
            "/assets/productos/Yupoo/202779313/3.webp",
            "/assets/productos/Yupoo/202779313/4.webp",
            "/assets/productos/Yupoo/202779313/5.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 218012,
        name: "Benfica 25/26 Entrenamiento Negra",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/202779248/1.webp",
        images: [
            "/assets/productos/Yupoo/202779248/2.webp",
            "/assets/productos/Yupoo/202779248/3.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 240084,
        name: "Aston Villa 25/26 Local",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/202778698/1.webp",
        images: [
            "/assets/productos/Yupoo/202778698/2.webp",
            "/assets/productos/Yupoo/202778698/3.webp",
            "/assets/productos/Yupoo/202778698/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 899447,
        name: "Ajax 25/26 Local",
        category: "futbol",
        league: "Eredivise",
        image: "/assets/productos/Yupoo/202778041/1.webp",
        images: [
            "/assets/productos/Yupoo/202778041/2.webp",
            "/assets/productos/Yupoo/202778041/3.webp",
            "/assets/productos/Yupoo/202778041/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 385548,
        name: "AC Milan 25/26 Tercera",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/202777830/1.webp",
        images: [
            "/assets/productos/Yupoo/202777830/2.webp",
            "/assets/productos/Yupoo/202777830/3.webp",
            "/assets/productos/Yupoo/202777830/4.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 850115,
        name: "Bayern Munich 17/18 Local Retro",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Yupoo/202776893/1.webp",
        images: [
            "/assets/productos/Yupoo/202776893/2.webp",
            "/assets/productos/Yupoo/202776893/3.webp"
        ],
        temporada: "17/18",
        tipo: "local",
        retro: true
    },
    {
        id: 608983,
        name: "Manchester City 19/20 Local Retro",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/202656896/1.webp",
        images: [
            "/assets/productos/Yupoo/202656896/2.webp",
            "/assets/productos/Yupoo/202656896/3.webp",
            "/assets/productos/Yupoo/202656896/4.webp"
        ],
        temporada: "19/20",
        tipo: "local",
        retro: true
    },
    {
        id: 529738,
        name: "Manchester United 19/20 Visitante Retro",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/202657093/1.webp",
        images: [
            "/assets/productos/Yupoo/202657093/2.webp",
            "/assets/productos/Yupoo/202657093/3.webp",
            "/assets/productos/Yupoo/202657093/4.webp"
        ],
        temporada: "19/20",
        tipo: "visitante",
        retro: true
    },
    {
        id: 457426,
        name: "Porto 25/26 Local",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/201350547/1.webp",
        images: [
            "/assets/productos/Yupoo/201350547/2.webp",
            "/assets/productos/Yupoo/201350547/3.webp",
            "/assets/productos/Yupoo/201350547/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 903135,
        name: "Porto 25/26 Visitante",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/201350489/1.webp",
        images: [
            "/assets/productos/Yupoo/201350489/2.webp",
            "/assets/productos/Yupoo/201350489/3.webp",
            "/assets/productos/Yupoo/201350489/4.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 705945,
        name: "Benfica 25/26 Especial",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/201349762/1.webp",
        images: [
            "/assets/productos/Yupoo/201349762/2.webp",
            "/assets/productos/Yupoo/201349762/3.webp",
            "/assets/productos/Yupoo/201349762/4.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 102616,
        name: "Benfica 25/26 Visitante",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/201349635/1.webp",
        images: [
            "/assets/productos/Yupoo/201349635/2.webp",
            "/assets/productos/Yupoo/201349635/3.webp",
            "/assets/productos/Yupoo/201349635/4.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 479020,
        name: "Benfica 25/26 Tercera",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/200370613/1.webp",
        images: [
            "/assets/productos/Yupoo/200370613/2.webp",
            "/assets/productos/Yupoo/200370613/3.webp",
            "/assets/productos/Yupoo/200370613/4.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 255538,
        name: "Porto 99/00 Local Retro",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/200365393/1.webp",
        images: [
            "/assets/productos/Yupoo/200365393/2.webp",
            "/assets/productos/Yupoo/200365393/3.webp",
            "/assets/productos/Yupoo/200365393/4.webp"
        ],
        temporada: "99/00",
        tipo: "local",
        retro: true
    },
    {
        id: 592754,
        name: "Manchester United 25/26 Tercera",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/199227576/1.webp",
        images: [
            "/assets/productos/Yupoo/199227576/2.webp",
            "/assets/productos/Yupoo/199227576/3.webp",
            "/assets/productos/Yupoo/199227576/4.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 489628,
        name: "Boca Juniors 25/26 Local",
        category: "futbol",
        league: "saf",
        image: "/assets/productos/Yupoo/197577020/1.webp",
        images: [
            "/assets/productos/Yupoo/197577020/2.webp",
            "/assets/productos/Yupoo/197577020/3.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 100332,
        name: "Real Madrid 14/15 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/197575196/1.webp",
        images: [
            "/assets/productos/Yupoo/197575196/2.webp",
            "/assets/productos/Yupoo/197575196/3.webp",
            "/assets/productos/Yupoo/197575196/4.webp"
        ],
        temporada: "14/15",
        tipo: "local",
        retro: true
    },
    {
        id: 302194,
        name: "São Paulo 25/26 Visitante",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/197477146/1.webp",
        images: [
            "/assets/productos/Yupoo/197477146/2.webp",
            "/assets/productos/Yupoo/197477146/3.webp",
            "/assets/productos/Yupoo/197477146/4.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 875632,
        name: "Miami 25/26 Visitante",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/193931028/1.webp",
        images: [
            "/assets/productos/Yupoo/193931028/2.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 286288,
        name: "Boca Juniors 25/26",
        category: "futbol",
        league: "saf",
        image: "/assets/productos/Yupoo/193927751/1.webp",
        images: [
            "/assets/productos/Yupoo/193927751/2.webp",
            "/assets/productos/Yupoo/193927751/3.webp",
            "/assets/productos/Yupoo/193927751/4.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 279168,
        name: "Manchester City 13/14 Local Retro",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/193883573/1.webp",
        images: [
            "/assets/productos/Yupoo/193883573/2.webp",
            "/assets/productos/Yupoo/193883573/3.webp",
            "/assets/productos/Yupoo/193883573/4.webp"
        ],
        temporada: "13/14",
        tipo: "local",
        retro: true
    },
    {
        id: 625429,
        name: "Brazil Juese 2025",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/193882594/1.webp",
        images: [
            "/assets/productos/Yupoo/193882594/2.webp",
            "/assets/productos/Yupoo/193882594/3.webp",
            "/assets/productos/Yupoo/193882594/4.webp"
        ],
        temporada: "2025"
    },
    {
        id: 115407,
        name: "Mexico Dorada 2025",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/192260006/1.webp",
        images: [
            "/assets/productos/Yupoo/192260006/2.webp",
            "/assets/productos/Yupoo/192260006/3.webp",
            "/assets/productos/Yupoo/192260006/4.webp"
        ],
        temporada: "2025"
    },
    {
        id: 655802,
        name: "Brasil 2025",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/192260092/1.webp",
        images: [
            "/assets/productos/Yupoo/192260092/2.webp",
            "/assets/productos/Yupoo/192260092/3.webp",
            "/assets/productos/Yupoo/192260092/4.webp"
        ],
        temporada: "2025"
    },
    {
        id: 435415,
        name: "Internacional 25/26 Local",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/192259967/1.webp",
        images: [
            "/assets/productos/Yupoo/192259967/2.webp",
            "/assets/productos/Yupoo/192259967/3.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 224087,
        name: "AS Roma 00/01 Local Retro",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/192257942/1.webp",
        images: [
            "/assets/productos/Yupoo/192257942/2.webp",
            "/assets/productos/Yupoo/192257942/3.webp",
            "/assets/productos/Yupoo/192257942/4.webp"
        ],
        temporada: "00/01",
        tipo: "local",
        retro: true
    },
    {
        id: 833095,
        name: "AS Roma 92/94 Local Retro",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/192257870/1.webp",
        images: [
            "/assets/productos/Yupoo/192257870/2.webp",
            "/assets/productos/Yupoo/192257870/3.webp",
            "/assets/productos/Yupoo/192257870/4.webp"
        ],
        tipo: "local",
        retro: true
    },
    {
        id: 635969,
        name: "AS Roma 95/96 Local Retro",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/192257826/1.webp",
        images: [
            "/assets/productos/Yupoo/192257826/2.webp",
            "/assets/productos/Yupoo/192257826/3.webp",
            "/assets/productos/Yupoo/192257826/4.webp"
        ],
        temporada: "95/96",
        tipo: "local",
        retro: true
    },
    {
        id: 945452,
        name: "River Plate 13/14 Local Retro",
        category: "futbol",
        league: "saf",
        image: "/assets/productos/Yupoo/192252827/1.webp",
        images: [
            "/assets/productos/Yupoo/192252827/2.webp",
            "/assets/productos/Yupoo/192252827/3.webp",
            "/assets/productos/Yupoo/192252827/4.webp"
        ],
        temporada: "13/14",
        tipo: "local",
        retro: true
    },
    {
        id: 588525,
        name: "Real Madrid 86/88 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/189209051/1.webp",
        images: [
            "/assets/productos/Yupoo/189209051/2.webp",
            "/assets/productos/Yupoo/189209051/3.webp"
        ],
        tipo: "visitante",
        retro: true
    },
    {
        id: 766126,
        name: "Real Madrid 98/00 Tercera Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/167010565/1.webp",
        images: [
            "/assets/productos/Yupoo/167010565/2.webp",
            "/assets/productos/Yupoo/167010565/3.webp",
            "/assets/productos/Yupoo/167010565/4.webp"
        ],
        tipo: "tercera",
        retro: true
    },
    {
        id: 523343,
        name: "Real Madrid 17/18 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/117031712/1.webp",
        images: [
            "/assets/productos/Yupoo/117031712/2.webp",
            "/assets/productos/Yupoo/117031712/3.webp",
            "/assets/productos/Yupoo/117031712/4.webp"
        ],
        temporada: "17/18",
        tipo: "local",
        retro: true
    },
    {
        id: 348972,
        name: "Real Madrid 2000 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/114619503/1.webp",
        images: [
            "/assets/productos/Yupoo/114619503/2.webp",
            "/assets/productos/Yupoo/114619503/3.webp",
            "/assets/productos/Yupoo/114619503/4.webp"
        ],
        temporada: "2000",
        tipo: "local",
        retro: true
    },
    {
        id: 167625,
        name: "Real Madrid 88/89 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/169073222/1.webp",
        images: [
            "/assets/productos/Yupoo/169073222/2.webp",
            "/assets/productos/Yupoo/169073222/3.webp"
        ],
        tipo: "local",
        retro: true
    },
    {
        id: 419589,
        name: "FC Barcelona 2007 Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/69556791/1.webp",
        images: [
            "/assets/productos/Yupoo/69556791/2.webp",
            "/assets/productos/Yupoo/69556791/3.webp"
        ],
        temporada: "2007",
        retro: true
    },
    {
        id: 938026,
        name: "FC Barcelona 16/17 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/138944331/1.webp",
        images: [
            "/assets/productos/Yupoo/138944331/2.webp",
            "/assets/productos/Yupoo/138944331/3.webp",
            "/assets/productos/Yupoo/138944331/4.webp"
        ],
        temporada: "16/17",
        tipo: "visitante",
        retro: true
    },
    {
        id: 769552,
        name: "FC Barcelona 17/18 Tercera Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/192251388/1.webp",
        images: [
            "/assets/productos/Yupoo/192251388/2.webp",
            "/assets/productos/Yupoo/192251388/3.webp",
            "/assets/productos/Yupoo/192251388/4.webp"
        ],
        temporada: "17/18",
        tipo: "tercera",
        retro: true
    },
    {
        id: 820529,
        name: "FC Barcelona 09/10 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/138944262/1.webp",
        images: [
            "/assets/productos/Yupoo/138944262/2.webp",
            "/assets/productos/Yupoo/138944262/3.webp"
        ],
        temporada: "09/10",
        tipo: "local",
        retro: true
    },
    {
        id: 736040,
        name: "FC Barcelona 13/14 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/146962779/1.webp",
        images: [
            "/assets/productos/Yupoo/146962779/2.webp",
            "/assets/productos/Yupoo/146962779/3.webp"
        ],
        temporada: "13/14",
        tipo: "local",
        retro: true
    },
    {
        id: 497972,
        name: "FC Barcelona 08/09 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/134230348/1.webp",
        images: [
            "/assets/productos/Yupoo/134230348/2.webp",
            "/assets/productos/Yupoo/134230348/3.webp"
        ],
        temporada: "08/09",
        tipo: "local",
        retro: true
    },
    {
        id: 421151,
        name: "Málaga CF 12/13 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/215727648/1.webp",
        images: [
            "/assets/productos/Yupoo/215727648/2.webp"
        ],
        temporada: "12/13",
        tipo: "local",
        retro: true
    },
    {
        id: 351350,
        name: "Burgos 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/213790918/1.webp",
        images: [
            "/assets/productos/Yupoo/213790918/2.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 567203,
        name: "Burgos 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/213790880/1.webp",
        images: [
            "/assets/productos/Yupoo/213790880/2.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 921620,
        name: "Real Betis 88/89 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/213865644/1.webp",
        images: [
            "/assets/productos/Yupoo/213865644/2.webp"
        ],
        temporada: "88/89",
        tipo: "local",
        retro: true
    },
    {
        id: 379818,
        name: "Athletic Bilbao 86/87 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/214131342/1.webp",
        images: [
            "/assets/productos/Yupoo/214131342/2.webp"
        ],
        temporada: "86/87",
        tipo: "local",
        retro: true
    },
    {
        id: 506078,
        name: "Athletic Bilbao 96/97 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/214136150/1.webp",
        images: [
            "/assets/productos/Yupoo/214136150/2.webp"
        ],
        tipo: "visitante",
        retro: true
    },
    {
        id: 570007,
        name: "Real Madrid 12/13 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212822016/1.webp",
        images: [
            "/assets/productos/Yupoo/212822016/2.webp"
        ],
        temporada: "12/13",
        tipo: "visitante",
        retro: true
    },
    {
        id: 835385,
        name: "Atletico Madrid 16/17 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/214403910/1.webp",
        images: [
            "/assets/productos/Yupoo/214403910/2.webp"
        ],
        temporada: "16/17",
        tipo: "local",
        retro: true
    },
    {
        id: 228891,
        name: "Atletico Madrid 82/83 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/214401832/1.webp",
        images: [
            "/assets/productos/Yupoo/214401832/2.webp"
        ],
        temporada: "82/83",
        tipo: "local",
        retro: true
    },
    {
        id: 483007,
        name: "FC Barcelona 25/26 Cuarta",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/213273196/1.webp",
        images: [
            "/assets/productos/Yupoo/213273196/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 887491,
        name: "FC Barcelona 14/15 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212822675/1.webp",
        images: [
            "/assets/productos/Yupoo/212822675/2.webp"
        ],
        temporada: "14/15",
        tipo: "local",
        retro: true
    },
    {
        id: 552798,
        name: "Real Madrid 14/15 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212822679/1.webp",
        images: [
            "/assets/productos/Yupoo/212822679/2.webp"
        ],
        temporada: "14/15",
        tipo: "local",
        retro: true
    },
    {
        id: 900814,
        name: "Real Madrid 17/18 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212821987/1.webp",
        images: [
            "/assets/productos/Yupoo/212821987/2.webp"
        ],
        temporada: "17/18",
        tipo: "visitante",
        retro: true
    },
    {
        id: 992598,
        name: "Real Madrid 13/14 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212822009/1.webp",
        images: [
            "/assets/productos/Yupoo/212822009/2.webp"
        ],
        temporada: "13/14",
        tipo: "visitante",
        retro: true
    },
    {
        id: 422613,
        name: "Real Madrid 11/12 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212821912/1.webp",
        images: [
            "/assets/productos/Yupoo/212821912/2.webp"
        ],
        temporada: "11/12",
        tipo: "visitante",
        retro: true
    },
    {
        id: 487998,
        name: "Zaragoza 95/96 Visitante Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212487006/1.webp",
        images: [
            "/assets/productos/Yupoo/212487006/2.webp"
        ],
        temporada: "95/96",
        tipo: "visitante",
        retro: true
    },
    {
        id: 798155,
        name: "FC Barcelona 17/18 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212389897/1.webp",
        images: [
            "/assets/productos/Yupoo/212389897/2.webp"
        ],
        temporada: "17/18",
        tipo: "local",
        retro: true
    },
    {
        id: 804311,
        name: "FC Barcelona 12/13 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/212390713/1.webp",
        images: [
            "/assets/productos/Yupoo/212390713/2.webp"
        ],
        temporada: "12/13",
        tipo: "local",
        retro: true
    },
    {
        id: 501778,
        name: "Rayo Vallecano 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/209571129/1.webp",
        images: [
            "/assets/productos/Yupoo/209571129/2.webp",
            "/assets/productos/Yupoo/209571129/3.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 553431,
        name: "Rayo Vallecano 25/26 Tercera",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/209571144/1.webp",
        images: [
            "/assets/productos/Yupoo/209571144/2.webp",
            "/assets/productos/Yupoo/209571144/3.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 593027,
        name: "Zaragoza 25/26 Visitante",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/209571071/1.webp",
        images: [
            "/assets/productos/Yupoo/209571071/2.webp",
            "/assets/productos/Yupoo/209571071/3.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 386584,
        name: "Zaragoza 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/210323914/1.webp",
        images: [
            "/assets/productos/Yupoo/210323914/2.webp",
            "/assets/productos/Yupoo/210323914/3.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 716949,
        name: "Napoli 25/26",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/216807171/1.webp",
        images: [
            "/assets/productos/Yupoo/216807171/2.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 276794,
        name: "Feyenoord 25/26 Local",
        category: "futbol",
        league: "Eredivise",
        image: "/assets/productos/Yupoo/201349993/1.webp",
        images: [
            "/assets/productos/Yupoo/201349993/2.webp",
            "/assets/productos/Yupoo/201349993/3.webp",
            "/assets/productos/Yupoo/201349993/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 728985,
        name: "Croacia 2026 Local",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/219700516/1.webp",
        images: [
            "/assets/productos/Yupoo/219700516/2.webp"
        ],
        temporada: "2026",
        tipo: "local"
    },
    {
        id: 384796,
        name: "Tottenham Hotspur 87/89 Local Retro",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/215724075/1.webp",
        images: [
            "/assets/productos/Yupoo/215724075/2.webp"
        ],
        tipo: "local",
        retro: true,
        temporada: "87/89"
    },
    {
        id: 154366,
        name: "Como 25/26 Local",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/211234031/1.webp",
        images: [
            "/assets/productos/Yupoo/211234031/2.webp",
            "/assets/productos/Yupoo/211234031/3.webp",
            "/assets/productos/Yupoo/211234031/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 894216,
        name: "Miami 25/26 Tercera",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/192250021/1.webp",
        images: [
            "/assets/productos/Yupoo/192250021/2.webp",
            "/assets/productos/Yupoo/192250021/3.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 308311,
        name: "Miami 25/26 Local",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/187746737/1.webp",
        images: [
            "/assets/productos/Yupoo/187746737/2.webp",
            "/assets/productos/Yupoo/187746737/3.webp",
            "/assets/productos/Yupoo/187746737/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 570882,
        name: "Marseille 25/26 Tercera",
        category: "futbol",
        league: "ligue1",
        image: "/assets/productos/Yupoo/211234336/1.webp",
        images: [
            "/assets/productos/Yupoo/211234336/2.webp",
            "/assets/productos/Yupoo/211234336/3.webp"
        ],
        temporada: "25/26",
        tipo: "tercera"
    },
    {
        id: 229242,
        name: "Palmeiras 25/26 Local",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/187764069/1.webp",
        images: [
            "/assets/productos/Yupoo/187764069/2.webp",
            "/assets/productos/Yupoo/187764069/3.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 128909,
        name: "Flamengo 25/26 Local",
        category: "futbol",
        league: "brasileirao",
        image: "/assets/productos/Yupoo/187670662/1.webp",
        images: [
            "/assets/productos/Yupoo/187670662/2.webp",
            "/assets/productos/Yupoo/187670662/3.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 703398,
        name: "FC Barcelona 25/26 Especial",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/193879799/1.webp",
        images: [
            "/assets/productos/Yupoo/193879799/2.webp",
            "/assets/productos/Yupoo/193879799/3.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 203152,
        name: "Miami 25/26 Local (Niño)",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/189206799/1.webp",
        images: [
            "/assets/productos/Yupoo/189206799/2.webp",
            "/assets/productos/Yupoo/189206799/3.webp"
        ],
        temporada: "25/26",
        tipo: "local",
        kids: true
    },
    {
        id: 866849,
        name: "Miami 25/26 Visitante (Niño)",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/187758478/1.webp",
        images: [
            "/assets/productos/Yupoo/187758478/2.webp",
            "/assets/productos/Yupoo/187758478/3.webp"
        ],
        temporada: "25/26",
        tipo: "visitante",
        kids: true
    },
    {
        id: 974000,
        name: "Miami 24/25 Especial",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/178962329/1.webp",
        images: [
            "/assets/productos/Yupoo/178962329/2.webp"
        ],
        temporada: "24/25"
    },
    {
        id: 896413,
        name: "Benfica 25/26 Entrenamiento",
        category: "futbol",
        league: "Primeira Liga",
        image: "/assets/productos/Yupoo/188021703/1.webp",
        images: [
            "/assets/productos/Yupoo/188021703/2.webp",
            "/assets/productos/Yupoo/188021703/3.webp",
            "/assets/productos/Yupoo/188021703/4.webp"
        ],
        temporada: "25/26",
        tipo: "entrenamiento"
    },
    {
        id: 378241,
        name: "Elche 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/214401561/1.webp",
        images: [
            "/assets/productos/Yupoo/214401561/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 821734,
        name: "Rayo Vallecano 25/26 Local",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/821734/1.webp",
        images: [
            "/assets/productos/Yupoo/821734/2.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 884672,
        name: "Rayo Vallecano 94/95 Local Retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/884672/1.webp",
        images: [
            "/assets/productos/Yupoo/884672/2.webp"
        ],
        temporada: "94/95",
        tipo: "local",
        retro: true
    },
    {
        id: 333660,
        name: "AS Roma 98/99 Visitante Retro",
        slug: "as-roma-9899-visitante-retro",
        category: "futbol",
        league: "seriea",
        image: "/assets/productos/Yupoo/333660/1.webp",
        images: [
            "/assets/productos/Yupoo/333660/2.webp"
        ],
        temporada: "98/99",
        tipo: "visitante",
        retro: true
    },
    {
        id: 771897,
        name: "Tenerife 95/96 Visitante Retro",
        slug: "tenerife-9596-visitante-retro",
        category: "futbol",
        league: "laliga",
        image: "/assets/productos/Yupoo/771897/1.webp",
        images: [
            "/assets/productos/Yupoo/771897/2.webp"
        ],
        temporada: "95/96",
        tipo: "visitante",
        retro: true
    },
    {
        id: 253296,
        name: "Los Angeles 25/26 Visitante",
        slug: "los-angeles-2526-visitante",
        category: "futbol",
        league: "MLS",
        image: "/assets/productos/Yupoo/253296/1.webp",
        images: [
            "/assets/productos/Yupoo/253296/2.webp",
            "/assets/productos/Yupoo/253296/3.webp",
            "/assets/productos/Yupoo/253296/4.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 449990,
        name: "Monterrey 25/26 Local",
        slug: "monterrey-2526-local",
        category: "futbol",
        league: "Liga MX",
        image: "/assets/productos/Yupoo/449990/1.webp",
        images: [
            "/assets/productos/Yupoo/449990/2.webp",
            "/assets/productos/Yupoo/449990/3.webp",
            "/assets/productos/Yupoo/449990/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 510415,
        name: "Chivas 25/26 Local",
        slug: "chivas-2526-local",
        category: "futbol",
        league: "Liga MX",
        image: "/assets/productos/Yupoo/510415/1.webp",
        images: [
            "/assets/productos/Yupoo/510415/2.webp",
            "/assets/productos/Yupoo/510415/3.webp",
            "/assets/productos/Yupoo/510415/4.webp"
        ],
        temporada: "25/26",
        tipo: "local"
    },
    {
        id: 329742,
        name: "Schalke 04 25/26 Visitante",
        slug: "schalke-04-2526-visitante",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Yupoo/329742/1.webp",
        images: [
            "/assets/productos/Yupoo/329742/2.webp",
            "/assets/productos/Yupoo/329742/3.webp",
            "/assets/productos/Yupoo/329742/4.webp"
        ],
        temporada: "25/26",
        tipo: "visitante"
    },
    {
        id: 927903,
        name: "Bayern Munich 25/26 125 Aniversario",
        slug: "bayern-munich-2526-125-aniversario",
        category: "futbol",
        league: "bundesliga",
        image: "/assets/productos/Yupoo/927903/1.webp",
        images: [
            "/assets/productos/Yupoo/927903/2.webp",
            "/assets/productos/Yupoo/927903/3.webp",
            "/assets/productos/Yupoo/927903/4.webp"
        ],
        temporada: "25/26"
    },
    {
        id: 309182,
        name: "Brasil 2004/06 Local Retro",
        slug: "brasil-200406-local-retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/309182/1.webp",
        images: [
            "/assets/productos/Yupoo/309182/2.webp"
        ],
        temporada: "2004/06",
        tipo: "local",
        retro: true
    },
    {
        id: 261613,
        name: "Brasil 2002 Visitante Retro",
        slug: "brasil-2002-visitante-retro",
        category: "futbol",
        league: "selecciones",
        image: "/assets/productos/Yupoo/261613/1.webp",
        images: [
            "/assets/productos/Yupoo/261613/2.webp"
        ],
        temporada: "2002",
        tipo: "visitante",
        retro: true
    },
    {
        id: 646982,
        name: "Crystal Palace 96/98 Local Retro",
        slug: "crystal-palace-9698-local-retro",
        category: "futbol",
        league: "premier",
        image: "/assets/productos/Yupoo/646982/1.webp",
        images: [
            "/assets/productos/Yupoo/646982/2.webp"
        ],
        temporada: "96/98",
        tipo: "local",
        retro: true
    }
];

export default products;
