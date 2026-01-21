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
            "Diámetro: 41 mm (sin corona), equilibrio entre presencia y comodidad",
            "Movimiento: Seiko NH38 automático, visible en el open-heart",
            "Grosor: 12.5 mm, perfil estilizado y versátil",
            "Cristal: Zafiro anti-arañazos con tratamiento antirreflectante",
            "Luminosidad: Luminova en índices y agujas, legibilidad en la oscuridad",
            "Caja: Acero inoxidable 904L, duradera y de acabado premium",
            "Corona: Enroscada, seguridad y funcionalidad",
            "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
            "Lugs: 20 mm, compatibles con correas intercambiables",
            "Correa: Acero 904L con cierre de seguridad",
            "Fondo de caja: Acero cerrado, discreto y robusto"
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
,
    {
    "id": 1769015098412,
    "name": "Royal Seikoak Black",
    "category": "Royal",
    "league": "Royal",
    "price": 204.99,
    "oldPrice": 245.988,
    "image": "/assets/productos/RC_Mods/royal-seikoak-black/1.webp",
    "images": [
        "/assets/productos/RC_Mods/royal-seikoak-black/2.webp",
        "/assets/productos/RC_Mods/royal-seikoak-black/3.webp",
        "/assets/productos/RC_Mods/royal-seikoak-black/4.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 41 mm (sin corona), equilibrio perfecto entre presencia y comodidad\nMovimiento: Seiko NH35 automático, fiable y preciso\nGrosor: 12 mm, elegante y versátil para uso diario\nCristal: Zafiro anti-arañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y agujas, lectura perfecta incluso en la oscuridad\nCaja: Acero inoxidable 904L, robusto y premium\nCorona: Enroscada, segura y fácil de accionar\nBisel: Acero 904L, resistente y elegante\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, permite cambios de correa fácilmente\nCorrea: Acero 904L con cierre de seguridad\nFondo de caja: Cristal transparente, movimiento visible",
    "features": [
        "Diámetro: 41 mm (sin corona), equilibrio perfecto entre presencia y comodidad",
        "Movimiento: Seiko NH35 automático, fiable y preciso",
        "Grosor: 12 mm, elegante y versátil para uso diario",
        "Cristal: Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad: Luminova en índices y agujas, lectura perfecta incluso en la oscuridad",
        "Caja: Acero inoxidable 904L, robusto y premium",
        "Corona: Enroscada, segura y fácil de accionar",
        "Bisel: Acero 904L, resistente y elegante",
        "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
        "Lugs: 20 mm, permite cambios de correa fácilmente",
        "Correa: Acero 904L con cierre de seguridad",
        "Fondo de caja: Cristal transparente, movimiento visible"
    ],
    "straps": [],
    "specs": {
        "Diámetro": "41 mm (sin corona), equilibrio perfecto entre presencia y comodidad",
        "Movimiento": "Seiko NH35 automático, fiable y preciso",
        "Grosor": "12 mm, elegante y versátil para uso diario",
        "Cristal": "Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y agujas, lectura perfecta incluso en la oscuridad",
        "Caja": "Acero inoxidable 904L, robusto y premium",
        "Corona": "Enroscada, segura y fácil de accionar",
        "Bisel": "Acero 904L, resistente y elegante",
        "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
        "Lugs": "20 mm, permite cambios de correa fácilmente",
        "Correa": "Acero 904L con cierre de seguridad",
        "Fondo de caja": "Cristal transparente, movimiento visible"
    }
}
,
    {
    "id": 1769015309818,
    "name": "Royal Seikoak Chrono Black",
    "category": "Royal",
    "league": "Royal",
    "price": 199.99,
    "oldPrice": 239.988,
    "image": "/assets/productos/RC_Mods/royal-seikoak-chrono-black/1.webp",
    "images": [
        "/assets/productos/RC_Mods/royal-seikoak-chrono-black/2.webp",
        "/assets/productos/RC_Mods/royal-seikoak-chrono-black/3.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 41 mm (sin incluir la corona), equilibrio perfecto entre presencia y comodidad\nMovimiento: Seiko VK63 híbrido (automático + cuarzo), fiable y preciso\nGrosor: 12 mm, estilizado y cómodo para uso diario\nCristal: Zafiro anti-arañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y agujas, visibilidad en todo momento\nCaja: Acero inoxidable 316L cepillado, robusta y premium\nCorona: Enroscada, segura y funcional\nBisel: Acero inoxidable 306L\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, compatibilidad con correas intercambiables\nCorrea: Acero inoxidable 316L con cierre de seguridad tipo mariposa\nFondo de caja: Acero cerrado, protección y resistencia",
    "features": [
        "Diámetro: 41 mm (sin incluir la corona), equilibrio perfecto entre presencia y comodidad",
        "Movimiento: Seiko VK63 híbrido (automático + cuarzo), fiable y preciso",
        "Grosor: 12 mm, estilizado y cómodo para uso diario",
        "Cristal: Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad: Luminova en índices y agujas, visibilidad en todo momento",
        "Caja: Acero inoxidable 316L cepillado, robusta y premium",
        "Corona: Enroscada, segura y funcional",
        "Bisel: Acero inoxidable 306L",
        "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
        "Lugs: 20 mm, compatibilidad con correas intercambiables",
        "Correa: Acero inoxidable 316L con cierre de seguridad tipo mariposa",
        "Fondo de caja: Acero cerrado, protección y resistencia"
    ],
    "straps": [],
    "specs": {
        "Diámetro": "41 mm (sin incluir la corona), equilibrio perfecto entre presencia y comodidad",
        "Movimiento": "Seiko VK63 híbrido (automático + cuarzo), fiable y preciso",
        "Grosor": "12 mm, estilizado y cómodo para uso diario",
        "Cristal": "Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y agujas, visibilidad en todo momento",
        "Caja": "Acero inoxidable 316L cepillado, robusta y premium",
        "Corona": "Enroscada, segura y funcional",
        "Bisel": "Acero inoxidable 306L",
        "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
        "Lugs": "20 mm, compatibilidad con correas intercambiables",
        "Correa": "Acero inoxidable 316L con cierre de seguridad tipo mariposa",
        "Fondo de caja": "Acero cerrado, protección y resistencia"
    }
}
,
    {
    "id": 1769015405870,
    "name": "Seikojust Sky Dweller Black",
    "category": "Seikojust",
    "league": "Seikojust",
    "price": 189.99,
    "oldPrice": 227.988,
    "image": "/assets/productos/RC_Mods/seikojust-sky-dweller-black/1.webp",
    "images": [
        "/assets/productos/RC_Mods/seikojust-sky-dweller-black/2.webp",
        "/assets/productos/RC_Mods/seikojust-sky-dweller-black/3.webp",
        "/assets/productos/RC_Mods/seikojust-sky-dweller-black/4.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 36 mm o 39 mm (sin corona), versatilidad para todo estilo\nMovimiento: Automático Seiko NH35, precisión reconocida mundialmente\nGrosor: 12 mm, equilibrio entre presencia y comodidad\nCristal: Zafiro anti-arañazos con tratamiento antirreflejos\nLuminosidad: Luminova en agujas e índices, legibilidad en cualquier situación\nCaja: Acero inoxidable 904L, lujo y durabilidad premium\nCorona: Enroscada, fiabilidad y seguridad máxima\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, versátiles para intercambiar correas\nFondo de caja: Cristal transparente (movimiento a la vista)",
    "features": [
        "Diámetro: 36 mm o 39 mm (sin corona), versatilidad para todo estilo",
        "Movimiento: Automático Seiko NH35, precisión reconocida mundialmente",
        "Grosor: 12 mm, equilibrio entre presencia y comodidad",
        "Cristal: Zafiro anti-arañazos con tratamiento antirreflejos",
        "Luminosidad: Luminova en agujas e índices, legibilidad en cualquier situación",
        "Caja: Acero inoxidable 904L, lujo y durabilidad premium",
        "Corona: Enroscada, fiabilidad y seguridad máxima",
        "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
        "Lugs: 20 mm, versátiles para intercambiar correas",
        "Fondo de caja: Cristal transparente (movimiento a la vista)"
    ],
    "straps": [],
    "specs": {
        "Diámetro": "36 mm o 39 mm (sin corona), versatilidad para todo estilo",
        "Movimiento": "Automático Seiko NH35, precisión reconocida mundialmente",
        "Grosor": "12 mm, equilibrio entre presencia y comodidad",
        "Cristal": "Zafiro anti-arañazos con tratamiento antirreflejos",
        "Luminosidad": "Luminova en agujas e índices, legibilidad en cualquier situación",
        "Caja": "Acero inoxidable 904L, lujo y durabilidad premium",
        "Corona": "Enroscada, fiabilidad y seguridad máxima",
        "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
        "Lugs": "20 mm, versátiles para intercambiar correas",
        "Fondo de caja": "Cristal transparente (movimiento a la vista)"
    }
}
];

export default products;