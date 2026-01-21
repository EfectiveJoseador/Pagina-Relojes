const products = [
    // MANTENER ESTE FORMATO PARA LOS NUEVOS RELOJES
    // Ejemplo descomentado para referencia:
    /*
    {
        id: 1,
        name: "Rolex Submariner Date",
        category: "diver", // Categorías disponibles: diver, elegant, sport, skeleton
        price: 14500.00,
        oldPrice: 15900.00,
        image: "/assets/images/relojes/submariner_1.webp",
        images: [
            "/assets/images/relojes/submariner_2.webp",
            "/assets/images/relojes/submariner_3.webp"
        ],
        description: "El arquetipo del reloj de buceo. El bisel giratorio unidireccional es clave para la funcionalidad del reloj.",
        features: [
            "Caja Oyster, 41 mm, acero Oystersteel", 
            "Movimiento Perpetual, mecánico, de cuerda automática",
            "Hermético hasta 300 metros"
        ],
        new: true, // Si es novedad
        bestseller: true // Si es destacado
    }
    */
    {
        "id": 1769009148938,
        "name": "GMTeiko Bruce Wayne",
        "category": "GMTeiko",
        "league": "GMTeiko",
        "price": 219.99,
        "oldPrice": 263.988,
        "image": "/assets/productos/RC_Mods/gmteiko-bruce-wayne/1.webp",
        "images": [
            "/assets/productos/RC_Mods/gmteiko-bruce-wayne/2.webp",
            "/assets/productos/RC_Mods/gmteiko-bruce-wayne/3.webp",
            "/assets/productos/RC_Mods/gmteiko-bruce-wayne/4.webp",
            "/assets/productos/RC_Mods/gmteiko-bruce-wayne/5.webp"
        ],
        "description": "Especificaciones Técnicas:\nDiámetro: 40 mm (sin corona), perfecto equilibrio entre presencia y comodidad\nMovimiento: Seiko NH34 automático, preciso y fiable\nGrosor: 13,5 mm, elegante y cómodo para el día a día\nCristal: Zafiro anti-arañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y agujas, legible en la oscuridad\nCaja: Acero inoxidable 904L, robusto y premium\nCorona: Enroscada, segura y fácil de accionar\nBisel: Cerámico negro y gris, sofisticado y duradero\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, permite cambiar la correa fácilmente\nCorrea: En acero 904L con cierre de seguridad\nFondo de caja: Cristal transparente, mostrando el movimiento",
        "features": [
            "Diámetro: 40 mm (sin corona), perfecto equilibrio entre presencia y comodidad",
            "Movimiento: Seiko NH34 automático, preciso y fiable",
            "Grosor: 13,5 mm, elegante y cómodo para el día a día",
            "Cristal: Zafiro anti-arañazos con tratamiento antirreflectante",
            "Luminosidad: Luminova en índices y agujas, legible en la oscuridad",
            "Caja: Acero inoxidable 904L, robusto y premium",
            "Corona: Enroscada, segura y fácil de accionar",
            "Bisel: Cerámico negro y gris, sofisticado y duradero",
            "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
            "Lugs: 20 mm, permite cambiar la correa fácilmente",
            "Correa: En acero 904L con cierre de seguridad",
            "Fondo de caja: Cristal transparente, mostrando el movimiento"
        ],
        "straps": ["Jubilee", "Oyster"],
        "specs": {
            "Diámetro": "40 mm (sin corona), perfecto equilibrio entre presencia y comodidad",
            "Movimiento": "Seiko NH34 automático, preciso y fiable",
            "Grosor": "13,5 mm, elegante y cómodo para el día a día",
            "Cristal": "Zafiro anti-arañazos con tratamiento antirreflectante",
            "Luminosidad": "Luminova en índices y agujas, legible en la oscuridad",
            "Caja": "Acero inoxidable 904L, robusto y premium",
            "Corona": "Enroscada, segura y fácil de accionar",
            "Bisel": "Cerámico negro y gris, sofisticado y duradero",
            "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
            "Lugs": "20 mm, permite cambiar la correa fácilmente",
            "Correa": "En acero 904L con cierre de seguridad",
            "Fondo de caja": "Cristal transparente, mostrando el movimiento"
        }
    }
,
    {
    "id": 1769014318337,
    "name": "Nauteiko Openheart Silver Black",
    "category": "Nauteiko",
    "league": "Nauteiko",
    "price": 209.99,
    "oldPrice": 251.988,
    "image": "/assets/productos/RC_Mods/nauteiko-openheart-silver-black/1.webp",
    "images": [
        "/assets/productos/RC_Mods/nauteiko-openheart-silver-black/2.webp",
        "/assets/productos/RC_Mods/nauteiko-openheart-silver-black/3.webp",
        "/assets/productos/RC_Mods/nauteiko-openheart-silver-black/4.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 41 mm (sin corona), equilibrio entre presencia y comodidad\nMovimiento: Seiko NH38 automático, visible en el open-heart\nGrosor: 12.5 mm, perfil estilizado y versátil\nCristal: Zafiro anti-arañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y agujas, legibilidad en la oscuridad\nCaja: Acero inoxidable 904L, duradera y de acabado premium\nCorona: Enroscada, seguridad y funcionalidad\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, compatibles con correas intercambiables\nCorrea: Acero 904L con cierre de seguridad\nFondo de caja: Acero cerrado, discreto y robusto",
    "features": [
        "41 mm (sin corona), equilibrio entre presencia y comodidad",
        "Seiko NH38 automático, visible en el open-heart",
        "12.5 mm, perfil estilizado y versátil",
        "Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminova en índices y agujas, legibilidad en la oscuridad",
        "Acero inoxidable 904L, duradera y de acabado premium",
        "Enroscada, seguridad y funcionalidad",
        "Ajustable entre 14,5 cm y 22 cm",
        "20 mm, compatibles con correas intercambiables",
        "Acero 904L con cierre de seguridad",
        "Acero cerrado, discreto y robusto"
    ],
    "straps": [],
    "specs": {
        "Diámetro": "41 mm (sin corona), equilibrio entre presencia y comodidad",
        "Movimiento": "Seiko NH38 automático, visible en el open-heart",
        "Grosor": "12.5 mm, perfil estilizado y versátil",
        "Cristal": "Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y agujas, legibilidad en la oscuridad",
        "Caja": "Acero inoxidable 904L, duradera y de acabado premium",
        "Corona": "Enroscada, seguridad y funcionalidad",
        "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
        "Lugs": "20 mm, compatibles con correas intercambiables",
        "Correa": "Acero 904L con cierre de seguridad",
        "Fondo de caja": "Acero cerrado, discreto y robusto"
    }
}
];



export default products;