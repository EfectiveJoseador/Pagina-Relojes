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
        "price": 139.90,
        "oldPrice": 169.90,
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
        "price": 139.90,
        "oldPrice": 169.90,
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
        "category": "Royal Seikoak",
        "league": "Royal Seikoak",
        "price": 129.90,
        "oldPrice": 169.90,
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
        "category": "Royal Seikoak",
        "league": "Royal Seikoak",
        "price": 119.90,
        "oldPrice": 149.90,
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
        "price": 129.90,
        "oldPrice": 169.90,
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
    ,
    {
        "id": 1769256457096,
        "name": "Seikojust Black Roman",
        "category": "Seikojust",
        "league": "Seikojust",
        "price": 129.9,
        "oldPrice": 169.9,
        "image": "/assets/productos/RC_Mods/seikojust-black-roman-stock/1.webp",
        "images": [
            "/assets/productos/RC_Mods/seikojust-black-roman-stock/2.webp",
            "/assets/productos/RC_Mods/seikojust-black-roman-stock/3.webp",
            "/assets/productos/RC_Mods/seikojust-black-roman-stock/4.webp"
        ],
        "description": "Especificaciones Técnicas:\nDiámetro: 36 mm o 39 mm (sin corona), adaptable para distintos tamaños de muñeca\nMovimiento: Seiko NH35 automático, fiable y preciso con reserva de marcha aproximada de 41 horas\nGrosor: 12 mm, cómodo para uso diario\nCristal: zafiro con tratamiento antirreflejos, resistente a rayaduras y con gran claridad\nLuminosidad: Luminova en agujas para lectura óptima en la oscuridad\nCaja: acero inoxidable 904L pulido y cepillado, robusto y elegante\nCorona: enroscada para mayor protección contra agua y polvo\nBisel: acero inoxidable pulido, clásico y atemporal\nCorrea: acero inoxidable 904L, con cierre desplegable seguro y cómodo",
        "features": [
            "Diámetro: 36 mm o 39 mm (sin corona), adaptable para distintos tamaños de muñeca",
            "Movimiento: Seiko NH35 automático, fiable y preciso con reserva de marcha aproximada de 41 horas",
            "Grosor: 12 mm, cómodo para uso diario",
            "Cristal: zafiro con tratamiento antirreflejos, resistente a rayaduras y con gran claridad",
            "Luminosidad: Luminova en agujas para lectura óptima en la oscuridad",
            "Caja: acero inoxidable 904L pulido y cepillado, robusto y elegante",
            "Corona: enroscada para mayor protección contra agua y polvo",
            "Bisel: acero inoxidable pulido, clásico y atemporal",
            "Correa: acero inoxidable 904L, con cierre desplegable seguro y cómodo"
        ],
        "straps": [],
        "specs": {
            "Diámetro": "36 mm o 39 mm (sin corona), adaptable para distintos tamaños de muñeca",
            "Movimiento": "Seiko NH35 automático, fiable y preciso con reserva de marcha aproximada de 41 horas",
            "Grosor": "12 mm, cómodo para uso diario",
            "Cristal": "zafiro con tratamiento antirreflejos, resistente a rayaduras y con gran claridad",
            "Luminosidad": "Luminova en agujas para lectura óptima en la oscuridad",
            "Caja": "acero inoxidable 904L pulido y cepillado, robusto y elegante",
            "Corona": "enroscada para mayor protección contra agua y polvo",
            "Bisel": "acero inoxidable pulido, clásico y atemporal",
            "Correa": "acero inoxidable 904L, con cierre desplegable seguro y cómodo"
        }
    }
,
    {
    "id": 1769256641581,
    "name": "GMTeiko Pepsi",
    "category": "GMTeiko",
    "league": "GMTeiko",
    "price": 139.9,
    "oldPrice": 169.9,
    "image": "/assets/productos/RC_Mods/gmteiko-pepsi/1.webp",
    "images": [
        "/assets/productos/RC_Mods/gmteiko-pepsi/2.webp",
        "/assets/productos/RC_Mods/gmteiko-pepsi/3.webp",
        "/assets/productos/RC_Mods/gmteiko-pepsi/4.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 40 mm (sin corona), equilibrio perfecto entre presencia y comodidad\nMovimiento: Seiko NH34 automático, fiable y preciso\nGrosor: 12.5 mm, elegante y cómodo para uso diario\nCristal: Zafiro anti-arañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y agujas, lectura perfecta incluso en la oscuridad\nCaja: Acero inoxidable 904L, robusto y premium\nCorona: Enroscada, segura y fácil de accionar\nBisel: Cerámico bicolor rojo y azul, duradero y sofisticado\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, permite cambios de correa fácilmente\nCorrea: en acero 904L con cierre de seguridad\nFondo de caja: Cristal transparente, movimiento visible",
    "features": [
        "Diámetro: 40 mm (sin corona), equilibrio perfecto entre presencia y comodidad",
        "Movimiento: Seiko NH34 automático, fiable y preciso",
        "Grosor: 12.5 mm, elegante y cómodo para uso diario",
        "Cristal: Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad: Luminova en índices y agujas, lectura perfecta incluso en la oscuridad",
        "Caja: Acero inoxidable 904L, robusto y premium",
        "Corona: Enroscada, segura y fácil de accionar",
        "Bisel: Cerámico bicolor rojo y azul, duradero y sofisticado",
        "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
        "Lugs: 20 mm, permite cambios de correa fácilmente",
        "Correa: en acero 904L con cierre de seguridad",
        "Fondo de caja: Cristal transparente, movimiento visible"
    ],
    "straps": [
        "Jubilee",
        "Oyster"
    ],
    "specs": {
        "Diámetro": "40 mm (sin corona), equilibrio perfecto entre presencia y comodidad",
        "Movimiento": "Seiko NH34 automático, fiable y preciso",
        "Grosor": "12.5 mm, elegante y cómodo para uso diario",
        "Cristal": "Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y agujas, lectura perfecta incluso en la oscuridad",
        "Caja": "Acero inoxidable 904L, robusto y premium",
        "Corona": "Enroscada, segura y fácil de accionar",
        "Bisel": "Cerámico bicolor rojo y azul, duradero y sofisticado",
        "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
        "Lugs": "20 mm, permite cambios de correa fácilmente",
        "Correa": "en acero 904L con cierre de seguridad",
        "Fondo de caja": "Cristal transparente, movimiento visible"
    }
}
,
    {
    "id": 1769256695697,
    "name": "Yatcheiko Master Rubber",
    "category": "Yatcheiko",
    "league": "Yatcheiko",
    "price": 129.9,
    "oldPrice": 169.9,
    "image": "/assets/productos/RC_Mods/yatcheiko-master-rubber/1.webp",
    "images": [
        "/assets/productos/RC_Mods/yatcheiko-master-rubber/2.webp",
        "/assets/productos/RC_Mods/yatcheiko-master-rubber/3.webp",
        "/assets/productos/RC_Mods/yatcheiko-master-rubber/4.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 40 mm, tamaño equilibrado y versátil\nMovimiento: Seiko NH35 automático, fiable y preciso\nCristal: Zafiro antiarañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y manecillas, legibilidad en la oscuridad\nCaja: Acero inoxidable 904L plateado, resistente y lujosa\nCorona: Enroscada, mayor protección y seguridad\nBisel: Cerámico negro, duradero y sofisticado\nCorrea: Oysterflex de caucho premium con cierre de seguridad, cómoda y deportiva\nFondo de caja: Cristal transparente mostrando el movimiento o acero cerrado para un estilo más clásico",
    "features": [
        "Diámetro: 40 mm, tamaño equilibrado y versátil",
        "Movimiento: Seiko NH35 automático, fiable y preciso",
        "Cristal: Zafiro antiarañazos con tratamiento antirreflectante",
        "Luminosidad: Luminova en índices y manecillas, legibilidad en la oscuridad",
        "Caja: Acero inoxidable 904L plateado, resistente y lujosa",
        "Corona: Enroscada, mayor protección y seguridad",
        "Bisel: Cerámico negro, duradero y sofisticado",
        "Correa: Oysterflex de caucho premium con cierre de seguridad, cómoda y deportiva",
        "Fondo de caja: Cristal transparente mostrando el movimiento o acero cerrado para un estilo más clásico"
    ],
    "straps": [],
    "specs": {
        "Diámetro": "40 mm, tamaño equilibrado y versátil",
        "Movimiento": "Seiko NH35 automático, fiable y preciso",
        "Cristal": "Zafiro antiarañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y manecillas, legibilidad en la oscuridad",
        "Caja": "Acero inoxidable 904L plateado, resistente y lujosa",
        "Corona": "Enroscada, mayor protección y seguridad",
        "Bisel": "Cerámico negro, duradero y sofisticado",
        "Correa": "Oysterflex de caucho premium con cierre de seguridad, cómoda y deportiva",
        "Fondo de caja": "Cristal transparente mostrando el movimiento o acero cerrado para un estilo más clásico"
    }
}
,
    {
    "id": 1769256731352,
    "name": "Royal Seikoak Ice Blue",
    "category": "Royal Seikoak",
    "league": "Royal Seikoak",
    "price": 129.9,
    "oldPrice": 169.9,
    "image": "/assets/productos/RC_Mods/royal-seikoak-ice-blue/1.webp",
    "images": [
        "/assets/productos/RC_Mods/royal-seikoak-ice-blue/2.webp",
        "/assets/productos/RC_Mods/royal-seikoak-ice-blue/3.webp",
        "/assets/productos/RC_Mods/royal-seikoak-ice-blue/4.webp",
        "/assets/productos/RC_Mods/royal-seikoak-ice-blue/5.webp",
        "/assets/productos/RC_Mods/royal-seikoak-ice-blue/6.webp",
        "/assets/productos/RC_Mods/royal-seikoak-ice-blue/7.webp"
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
    "id": 1769256833281,
    "name": "Yatcheiko Master Rose Gold Two Tone",
    "category": "Yatcheiko",
    "league": "Yatcheiko",
    "price": 129.9,
    "oldPrice": 169.9,
    "image": "/assets/productos/RC_Mods/yatcheiko-master-rose-gold-two-tone/1.webp",
    "images": [
        "/assets/productos/RC_Mods/yatcheiko-master-rose-gold-two-tone/2.webp",
        "/assets/productos/RC_Mods/yatcheiko-master-rose-gold-two-tone/3.webp",
        "/assets/productos/RC_Mods/yatcheiko-master-rose-gold-two-tone/4.webp",
        "/assets/productos/RC_Mods/yatcheiko-master-rose-gold-two-tone/5.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 40 mm, proporciones equilibradas y elegantes\nMovimiento: Seiko NH35 automático, fiabilidad y precisión garantizadas\nCristal: Zafiro antiarañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y manecillas, visibilidad total en la oscuridad\nCaja: Acero inoxidable 904L con acabados en oro rosa, robustez y distinción\nCorona: Enroscada, seguridad y estilo asegurados\nBisel: Cerámico en tono rose gold, resistente y refinado\nFondo de caja: Cristal transparente mostrando el movimiento.",
    "features": [
        "Diámetro: 40 mm, proporciones equilibradas y elegantes",
        "Movimiento: Seiko NH35 automático, fiabilidad y precisión garantizadas",
        "Cristal: Zafiro antiarañazos con tratamiento antirreflectante",
        "Luminosidad: Luminova en índices y manecillas, visibilidad total en la oscuridad",
        "Caja: Acero inoxidable 904L con acabados en oro rosa, robustez y distinción",
        "Corona: Enroscada, seguridad y estilo asegurados",
        "Bisel: Cerámico en tono rose gold, resistente y refinado",
        "Fondo de caja: Cristal transparente mostrando el movimiento."
    ],
    "straps": [],
    "specs": {
        "Diámetro": "40 mm, proporciones equilibradas y elegantes",
        "Movimiento": "Seiko NH35 automático, fiabilidad y precisión garantizadas",
        "Cristal": "Zafiro antiarañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y manecillas, visibilidad total en la oscuridad",
        "Caja": "Acero inoxidable 904L con acabados en oro rosa, robustez y distinción",
        "Corona": "Enroscada, seguridad y estilo asegurados",
        "Bisel": "Cerámico en tono rose gold, resistente y refinado",
        "Fondo de caja": "Cristal transparente mostrando el movimiento."
    }
}
,
    {
    "id": 1769256882503,
    "name": "GMTeiko Sprite",
    "category": "GMTeiko",
    "league": "GMTeiko",
    "price": 139.9,
    "oldPrice": 169.9,
    "image": "/assets/productos/RC_Mods/gmteiko-sprite/1.webp",
    "images": [
        "/assets/productos/RC_Mods/gmteiko-sprite/2.webp",
        "/assets/productos/RC_Mods/gmteiko-sprite/3.webp",
        "/assets/productos/RC_Mods/gmteiko-sprite/4.webp",
        "/assets/productos/RC_Mods/gmteiko-sprite/5.webp",
        "/assets/productos/RC_Mods/gmteiko-sprite/6.webp"
    ],
    "description": "Especificaciones Técnicas:\nDiámetro: 40 mm (sin corona), perfecto equilibrio entre comodidad y presencia\nMovimiento: Seiko NH34 automático, precisión garantizada\nGrosor: 12.5 mm, estilizado y versátil\nCristal: Zafiro anti-arañazos con tratamiento antirreflectante\nLuminosidad: Luminova en índices y agujas, visibilidad en todo momento\nCaja: Acero inoxidable 904L, robusta y premium\nCorona: Enroscada, segura y funcional\nBisel: Cerámico verde y negro, vibrante y distintivo\nTamaño de muñeca: Ajustable entre 14,5 cm y 22 cm\nLugs: 20 mm, compatibles con correas intercambiables\nCorrea: Acero 904L con cierre de seguridad\nFondo de caja: Cristal transparente, movimiento visible",
    "features": [
        "Diámetro: 40 mm (sin corona), perfecto equilibrio entre comodidad y presencia",
        "Movimiento: Seiko NH34 automático, precisión garantizada",
        "Grosor: 12.5 mm, estilizado y versátil",
        "Cristal: Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad: Luminova en índices y agujas, visibilidad en todo momento",
        "Caja: Acero inoxidable 904L, robusta y premium",
        "Corona: Enroscada, segura y funcional",
        "Bisel: Cerámico verde y negro, vibrante y distintivo",
        "Tamaño de muñeca: Ajustable entre 14,5 cm y 22 cm",
        "Lugs: 20 mm, compatibles con correas intercambiables",
        "Correa: Acero 904L con cierre de seguridad",
        "Fondo de caja: Cristal transparente, movimiento visible"
    ],
    "straps": [
        "Jubilee",
        "Oyster"
    ],
    "specs": {
        "Diámetro": "40 mm (sin corona), perfecto equilibrio entre comodidad y presencia",
        "Movimiento": "Seiko NH34 automático, precisión garantizada",
        "Grosor": "12.5 mm, estilizado y versátil",
        "Cristal": "Zafiro anti-arañazos con tratamiento antirreflectante",
        "Luminosidad": "Luminova en índices y agujas, visibilidad en todo momento",
        "Caja": "Acero inoxidable 904L, robusta y premium",
        "Corona": "Enroscada, segura y funcional",
        "Bisel": "Cerámico verde y negro, vibrante y distintivo",
        "Tamaño de muñeca": "Ajustable entre 14,5 cm y 22 cm",
        "Lugs": "20 mm, compatibles con correas intercambiables",
        "Correa": "Acero 904L con cierre de seguridad",
        "Fondo de caja": "Cristal transparente, movimiento visible"
    }
}
];

export default products;