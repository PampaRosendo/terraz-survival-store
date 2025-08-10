// Datos de la tienda de Project Zomboid
const shopData = {
    vehicles: [
        {
            id: 201,
            name: "Auto Deportivo",
            description: "Vehículo rápido y elegante para escapar de los zombis.",
            price: 5000,
            weight: 1200,
            image: "img/vehiculos/deportivo.png", // Ruta relativa o URL
            stats: { velocidad: 95, durabilidad: 80, consumo: 60 }
        },
        {
            id: 202,
            name: "Camioneta 4x4",
            description: "Ideal para cargar suministros y sobrevivientes.",
            price: 7000,
            weight: 1800,
            image: "img/vehiculos/camioneta.png",
            stats: { velocidad: 75, durabilidad: 95, consumo: 80 }
        }
    ],
    books: [
        {
            id: 1,
            name: "Carpentry Manual",
            icon: "📖",
            description: "Manual de carpintería. Esencial para construir barricadas y estructuras.",
            price: 45,
            weight: 0.5,
            durability: 100,
            stats: { knowledge: 95, utility: 90, rarity: 70 }
        },
        {
            id: 2,
            name: "Farming Handbook",
            icon: "📘",
            description: "Guía completa de agricultura. Aprende a cultivar alimentos.",
            price: 50,
            weight: 0.5,
            durability: 100,
            stats: { knowledge: 90, utility: 85, rarity: 65 }
        },
        {
            id: 3,
            name: "Chef Magazine",
            icon: "📒",
            description: "Revista de cocina. Mejora tus habilidades culinarias.",
            price: 25,
            weight: 0.2,
            durability: 60,
            stats: { knowledge: 70, utility: 60, rarity: 40 }
        },
        {
            id: 4,
            name: "Electronics Magazine",
            icon: "📕",
            description: "Revista de electrónica. Aprende a reparar dispositivos.",
            price: 35,
            weight: 0.3,
            durability: 70,
            stats: { knowledge: 85, utility: 80, rarity: 55 }
        },
        {
            id: 5,
            name: "First Aid Magazine",
            icon: "📗",
            description: "Revista médica. Conocimientos básicos de primeros auxilios.",
            price: 40,
            weight: 0.3,
            durability: 80,
            stats: { knowledge: 80, utility: 90, rarity: 60 }
        }
    ],
    food: [
        {
            id: 6,
            name: "Tinned Soup",
            icon: "🥫",
            description: "Sopa enlatada. Alta en nutrientes y larga duración.",
            price: 15,
            weight: 0.8,
            durability: 100,
            stats: { nutrition: 80, saturation: 70, preservation: 95 }
        },
        {
            id: 7,
            name: "Tinned Beans",
            icon: "🫘",
            description: "Frijoles enlatados. Proteína esencial para sobrevivir.",
            price: 12,
            weight: 0.7,
            durability: 100,
            stats: { nutrition: 75, saturation: 85, preservation: 95 }
        },
        {
            id: 8,
            name: "Tuna Tin",
            icon: "🐟",
            description: "Atún enlatado. Rico en proteínas y omega-3.",
            price: 20,
            weight: 0.5,
            durability: 100,
            stats: { nutrition: 90, saturation: 80, preservation: 95 }
        },
        {
            id: 9,
            name: "Bread",
            icon: "🍞",
            description: "Pan fresco. Se echa a perder rápido pero es nutritivo.",
            price: 8,
            weight: 0.6,
            durability: 30,
            stats: { nutrition: 60, saturation: 75, preservation: 25 }
        },
        {
            id: 10,
            name: "Cake",
            icon: "🍰",
            description: "Pastel dulce. Alto en calorías, perfecto para emergencias.",
            price: 25,
            weight: 1.2,
            durability: 20,
            stats: { nutrition: 85, saturation: 90, preservation: 15 }
        },
        {
            id: 11,
            name: "Butter",
            icon: "🧈",
            description: "Mantequilla. Ingrediente para cocinar, rico en grasas.",
            price: 18,
            weight: 0.4,
            durability: 40,
            stats: { nutrition: 70, saturation: 60, preservation: 35 }
        },
        {
            id: 12,
            name: "Milk",
            icon: "🥛",
            description: "Leche fresca. Rica en calcio y proteínas.",
            price: 10,
            weight: 1.0,
            durability: 25,
            stats: { nutrition: 65, saturation: 50, preservation: 20 }
        },
        {
            id: 13,
            name: "Cheese",
            icon: "🧀",
            description: "Queso curado. Larga duración y alto valor nutricional.",
            price: 30,
            weight: 0.8,
            durability: 60,
            stats: { nutrition: 80, saturation: 85, preservation: 55 }
        },
        {
            id: 14,
            name: "Tomato",
            icon: "🍅",
            description: "Tomate fresco. Ingrediente básico para cocinar.",
            price: 5,
            weight: 0.3,
            durability: 15,
            stats: { nutrition: 40, saturation: 30, preservation: 10 }
        },
        {
            id: 15,
            name: "Potato",
            icon: "🥔",
            description: "Papa. Versátil y nutritiva, se puede cocinar de varias formas.",
            price: 4,
            weight: 0.5,
            durability: 35,
            stats: { nutrition: 55, saturation: 70, preservation: 30 }
        },
        {
            id: 16,
            name: "Carrot",
            icon: "🥕",
            description: "Zanahoria. Rica en vitamina A, buena para la vista.",
            price: 6,
            weight: 0.4,
            durability: 25,
            stats: { nutrition: 45, saturation: 40, preservation: 20 }
        },
        {
            id: 17,
            name: "Cabbage",
            icon: "🥬",
            description: "Repollo. Verdura resistente, base para muchas comidas.",
            price: 8,
            weight: 1.5,
            durability: 40,
            stats: { nutrition: 50, saturation: 65, preservation: 35 }
        },
        {
            id: 18,
            name: "Tomato Seed",
            icon: "🌱",
            description: "Semillas de tomate. Planta tu propio huerto.",
            price: 12,
            weight: 0.1,
            durability: 100,
            stats: { growth: 80, yield: 70, season: 60 }
        },
        {
            id: 19,
            name: "Carrot Seed",
            icon: "🌱",
            description: "Semillas de zanahoria. Cosecha nutritiva garantizada.",
            price: 10,
            weight: 0.1,
            durability: 100,
            stats: { growth: 75, yield: 80, season: 70 }
        },
        {
            id: 20,
            name: "Cabbage Seed",
            icon: "🌱",
            description: "Semillas de repollo. Crecimiento rápido y buena cosecha.",
            price: 15,
            weight: 0.1,
            durability: 100,
            stats: { growth: 70, yield: 90, season: 80 }
        }
    ],
    tools: [
        {
            id: 21,
            name: "Crowbar",
            icon: "🔧",
            description: "Palanca de acero. Útil como arma y herramienta.",
            price: 120,
            weight: 2.1,
            durability: 95,
            stats: { efficiency: 90, durability: 95, versatility: 85 }
        },
        {
            id: 22,
            name: "Axe",
            icon: "🪓",
            description: "Hacha de leñador. Esencial para cortar madera.",
            price: 150,
            weight: 2.5,
            durability: 85,
            stats: { efficiency: 95, durability: 85, versatility: 70 }
        },
        {
            id: 23,
            name: "Hammer",
            icon: "🔨",
            description: "Martillo de carpintero. Básico para construcción.",
            price: 45,
            weight: 1.2,
            durability: 90,
            stats: { efficiency: 80, durability: 90, versatility: 75 }
        },
        {
            id: 24,
            name: "Screwdriver",
            icon: "🪛",
            description: "Destornillador. Necesario para electrónicos y reparaciones.",
            price: 25,
            weight: 0.3,
            durability: 80,
            stats: { efficiency: 85, durability: 80, versatility: 60 }
        },
        {
            id: 25,
            name: "Wrench",
            icon: "🔧",
            description: "Llave inglesa. Para trabajos mecánicos.",
            price: 35,
            weight: 0.8,
            durability: 85,
            stats: { efficiency: 80, durability: 85, versatility: 65 }
        },
        {
            id: 26,
            name: "Pipe Wrench",
            icon: "🔧",
            description: "Llave de tubo. Ideal para plomería y trabajos pesados.",
            price: 60,
            weight: 1.5,
            durability: 90,
            stats: { efficiency: 85, durability: 90, versatility: 55 }
        },
        {
            id: 27,
            name: "Scissors",
            icon: "✂️",
            description: "Tijeras. Útiles para cortar tela y materiales ligeros.",
            price: 20,
            weight: 0.2,
            durability: 70,
            stats: { efficiency: 75, durability: 70, versatility: 80 }
        },
        {
            id: 28,
            name: "Kitchen Knife",
            icon: "�",
            description: "Cuchillo de cocina. Para preparar alimentos y defensa.",
            price: 35,
            weight: 0.3,
            durability: 60,
            stats: { efficiency: 85, durability: 60, versatility: 90 }
        },
        {
            id: 29,
            name: "Saw",
            icon: "🪚",
            description: "Sierra manual. Para cortes precisos de madera.",
            price: 80,
            weight: 1.8,
            durability: 75,
            stats: { efficiency: 90, durability: 75, versatility: 65 }
        },
        {
            id: 30,
            name: "Flashlight",
            icon: "🔦",
            description: "Linterna. Esencial para explorar en la oscuridad.",
            price: 40,
            weight: 0.5,
            durability: 80,
            stats: { brightness: 85, battery: 70, range: 75 }
        },
        {
            id: 31,
            name: "Cooking Pot",
            icon: "🍲",
            description: "Olla de cocina. Para preparar comidas nutritivas.",
            price: 55,
            weight: 2.0,
            durability: 85,
            stats: { capacity: 80, efficiency: 85, durability: 85 }
        },
        {
            id: 32,
            name: "Large Pot",
            icon: "🥘",
            description: "Olla grande. Para cocinar grandes cantidades.",
            price: 85,
            weight: 3.5,
            durability: 90,
            stats: { capacity: 95, efficiency: 80, durability: 90 }
        },
        {
            id: 33,
            name: "Bowl",
            icon: "🥣",
            description: "Tazón. Para comer y servir alimentos.",
            price: 15,
            weight: 0.4,
            durability: 60,
            stats: { capacity: 60, utility: 70, durability: 60 }
        },
        {
            id: 34,
            name: "Shovel",
            icon: "🪣",
            description: "Pala. Para cavar y trabajos de jardinería.",
            price: 70,
            weight: 2.2,
            durability: 80,
            stats: { efficiency: 85, durability: 80, versatility: 70 }
        },
        {
            id: 35,
            name: "Hoe",
            icon: "🪓",
            description: "Azada. Herramienta agrícola para preparar tierra.",
            price: 50,
            weight: 1.8,
            durability: 75,
            stats: { efficiency: 80, durability: 75, farming: 90 }
        },
        {
            id: 36,
            name: "Gardening Can",
            icon: "🪣",
            description: "Regadera. Para mantener las plantas hidratadas.",
            price: 30,
            weight: 1.0,
            durability: 70,
            stats: { capacity: 75, efficiency: 80, durability: 70 }
        },
        {
            id: 37,
            name: "Thread",
            icon: "🧵",
            description: "Hilo. Para reparar ropa y crear objetos.",
            price: 8,
            weight: 0.1,
            durability: 50,
            stats: { quantity: 100, strength: 60, versatility: 85 }
        },
        {
            id: 38,
            name: "Paperclip",
            icon: "📎",
            description: "Clip. Útil para hacer ganzúas y reparaciones menores.",
            price: 2,
            weight: 0.01,
            durability: 30,
            stats: { utility: 50, versatility: 70, durability: 30 }
        },
        {
            id: 39,
            name: "Duct Tape",
            icon: "🔧",
            description: "Cinta adhesiva. El sueño de todo superviviente.",
            price: 45,
            weight: 0.6,
            durability: 80,
            stats: { adhesion: 95, versatility: 100, durability: 80 }
        }
    ],
    materials: [
        {
            id: 40,
            name: "Wood Plank",
            icon: "🪵",
            description: "Tablón de madera. Material básico para construcción.",
            price: 8,
            weight: 2.0,
            durability: 80,
            stats: { strength: 70, versatility: 85, availability: 90 }
        },
        {
            id: 41,
            name: "Metal Sheet",
            icon: "🔩",
            description: "Lámina de metal. Para refuerzos y barricadas resistentes.",
            price: 25,
            weight: 5.0,
            durability: 95,
            stats: { strength: 95, versatility: 70, availability: 60 }
        },
        {
            id: 42,
            name: "Nails",
            icon: "🔩",
            description: "Clavos. Esenciales para construcción y reparaciones.",
            price: 15,
            weight: 0.5,
            durability: 90,
            stats: { utility: 95, quantity: 100, availability: 85 }
        },
        {
            id: 43,
            name: "Sheet Rope",
            icon: "🪢",
            description: "Cuerda de sábanas. Para escapar por ventanas.",
            price: 20,
            weight: 1.5,
            durability: 60,
            stats: { strength: 65, length: 80, utility: 90 }
        },
        {
            id: 44,
            name: "Twine",
            icon: "🧵",
            description: "Cordel. Útil para trampas y amarres.",
            price: 10,
            weight: 0.3,
            durability: 50,
            stats: { strength: 50, length: 90, utility: 80 }
        },
        {
            id: 45,
            name: "Engine Part",
            icon: "⚙️",
            description: "Pieza de motor. Para reparar vehículos.",
            price: 150,
            weight: 8.0,
            durability: 85,
            stats: { quality: 80, compatibility: 70, rarity: 85 }
        },
        {
            id: 46,
            name: "Battery",
            icon: "🔋",
            description: "Batería. Energía para dispositivos electrónicos.",
            price: 35,
            weight: 2.5,
            durability: 70,
            stats: { capacity: 85, longevity: 70, availability: 75 }
        },
        {
            id: 47,
            name: "Tire",
            icon: "🛞",
            description: "Neumático. Componente vital para vehículos.",
            price: 80,
            weight: 15.0,
            durability: 80,
            stats: { durability: 80, grip: 85, availability: 65 }
        },
        {
            id: 48,
            name: "Hood",
            icon: "🚗",
            description: "Capó de coche. Parte del motor del vehículo.",
            price: 200,
            weight: 25.0,
            durability: 85,
            stats: { protection: 90, compatibility: 60, rarity: 80 }
        },
        {
            id: 49,
            name: "Rebar",
            icon: "🔧",
            description: "Varilla de refuerzo. Material de construcción resistente.",
            price: 30,
            weight: 3.5,
            durability: 95,
            stats: { strength: 95, length: 80, availability: 70 }
        }
    ],
    medical: [
        {
            id: 50,
            name: "Bandage",
            icon: "🩹",
            description: "Vendaje básico. Para tratar heridas menores.",
            price: 10,
            weight: 0.1,
            durability: 100,
            stats: { healing: 60, sterility: 70, quantity: 85 }
        },
        {
            id: 51,
            name: "Sterilized Rag",
            icon: "🧽",
            description: "Trapo esterilizado. Vendaje improvisado pero efectivo.",
            price: 8,
            weight: 0.2,
            durability: 80,
            stats: { healing: 50, sterility: 80, quantity: 90 }
        },
        {
            id: 52,
            name: "Painkillers",
            icon: "💊",
            description: "Analgésicos. Reduce el dolor y permite seguir funcionando.",
            price: 25,
            weight: 0.1,
            durability: 95,
            stats: { effectiveness: 85, duration: 70, side_effects: 30 }
        },
        {
            id: 53,
            name: "Disinfected Bandage",
            icon: "🏥",
            description: "Vendaje desinfectado. Tratamiento médico profesional.",
            price: 20,
            weight: 0.1,
            durability: 100,
            stats: { healing: 90, sterility: 95, quantity: 70 }
        },
        {
            id: 54,
            name: "Alcohol",
            icon: "🍺",
            description: "Alcohol. Desinfectante y... relajante.",
            price: 15,
            weight: 0.8,
            durability: 90,
            stats: { disinfection: 85, mood: 60, availability: 80 }
        }
    ],
    containers: [
        {
            id: 55,
            name: "Backpack",
            icon: "🎒",
            description: "Mochila estándar. Aumenta tu capacidad de carga.",
            price: 45,
            weight: 1.5,
            durability: 80,
            stats: { capacity: 75, durability: 80, comfort: 70 }
        },
        {
            id: 56,
            name: "Military Backpack",
            icon: "🎖️",
            description: "Mochila militar. Gran capacidad y muy resistente.",
            price: 120,
            weight: 2.5,
            durability: 95,
            stats: { capacity: 95, durability: 95, comfort: 60 }
        },
        {
            id: 57,
            name: "ALICE Pack",
            icon: "🏕️",
            description: "Mochila ALICE. Diseño militar modular.",
            price: 100,
            weight: 2.8,
            durability: 90,
            stats: { capacity: 90, durability: 90, modularity: 85 }
        },
        {
            id: 58,
            name: "Ammo Box",
            icon: "📦",
            description: "Caja de municiones. Para organizar proyectiles.",
            price: 35,
            weight: 1.0,
            durability: 85,
            stats: { capacity: 60, organization: 95, protection: 90 }
        },
        {
            id: 59,
            name: "Belt",
            icon: "👔",
            description: "Cinturón. Permite llevar herramientas fácilmente.",
            price: 20,
            weight: 0.5,
            durability: 75,
            stats: { capacity: 40, accessibility: 95, comfort: 80 }
        },
        {
            id: 60,
            name: "Ammo Strap",
            icon: "🎗️",
            description: "Bandolera. Para cargar munición de forma rápida.",
            price: 30,
            weight: 0.8,
            durability: 80,
            stats: { capacity: 50, speed: 90, comfort: 70 }
        }
    ],
    clothing: [
        {
            id: 61,
            name: "Winter Coat",
            icon: "🧥",
            description: "Abrigo de invierno. Protección contra el frío extremo.",
            price: 80,
            weight: 2.5,
            durability: 75,
            stats: { warmth: 95, durability: 75, mobility: 60 }
        },
        {
            id: 62,
            name: "Padded Pants",
            icon: "👖",
            description: "Pantalones acolchados. Protección para las piernas.",
            price: 60,
            weight: 1.8,
            durability: 80,
            stats: { protection: 80, durability: 80, mobility: 70 }
        },
        {
            id: 63,
            name: "Scarf",
            icon: "🧣",
            description: "Bufanda. Protege el cuello del frío.",
            price: 25,
            weight: 0.3,
            durability: 60,
            stats: { warmth: 60, comfort: 85, style: 70 }
        },
        {
            id: 64,
            name: "Hat",
            icon: "🎩",
            description: "Sombrero. Protege la cabeza del sol y frío.",
            price: 20,
            weight: 0.2,
            durability: 70,
            stats: { protection: 50, warmth: 60, style: 80 }
        },
        {
            id: 65,
            name: "Balaclava",
            icon: "🎭",
            description: "Pasamontañas. Protección facial completa.",
            price: 35,
            weight: 0.3,
            durability: 75,
            stats: { concealment: 90, warmth: 80, protection: 70 }
        },
        {
            id: 66,
            name: "Bandana",
            icon: "🔴",
            description: "Bandana. Protege del polvo y identifica grupos.",
            price: 15,
            weight: 0.1,
            durability: 50,
            stats: { protection: 40, style: 85, utility: 60 }
        },
        {
            id: 67,
            name: "Gloves",
            icon: "🧤",
            description: "Guantes. Protegen las manos del frío y cortes.",
            price: 30,
            weight: 0.4,
            durability: 65,
            stats: { protection: 70, warmth: 75, dexterity: 60 }
        }
    ],
    weapons: [
        {
            id: 68,
            name: "Baseball Bat",
            icon: "⚾",
            description: "Bate de béisbol. Arma contundente confiable.",
            price: 85,
            weight: 1.8,
            durability: 85,
            stats: { damage: 75, speed: 60, durability: 85 }
        },
        {
            id: 69,
            name: "Lead Pipe",
            icon: "🔧",
            description: "Tubo de plomo. Pesado pero devastador.",
            price: 60,
            weight: 2.5,
            durability: 90,
            stats: { damage: 85, speed: 40, durability: 90 }
        },
        {
            id: 70,
            name: "Kitchen Knife",
            icon: "🔪",
            description: "Cuchillo de cocina. Rápido y silencioso.",
            price: 35,
            weight: 0.3,
            durability: 60,
            stats: { damage: 65, speed: 90, durability: 60 }
        },
        {
            id: 71,
            name: "Spear",
            icon: "🗡️",
            description: "Lanza improvisada. Alcance y poder de penetración.",
            price: 45,
            weight: 1.2,
            durability: 70,
            stats: { damage: 80, speed: 65, durability: 70 }
        },
        {
            id: 72,
            name: "Pistol 9mm",
            icon: "🔫",
            description: "Pistola 9mm. Arma de fuego básica y confiable.",
            price: 350,
            weight: 1.0,
            durability: 85,
            stats: { damage: 90, accuracy: 75, range: 80 }
        },
        {
            id: 73,
            name: "Revolver .38",
            icon: "🔫",
            description: "Revólver .38. Potente y resistente.",
            price: 400,
            weight: 1.2,
            durability: 95,
            stats: { damage: 95, accuracy: 80, range: 75 }
        },
        {
            id: 74,
            name: "Shotgun",
            icon: "🔫",
            description: "Escopeta. Devastadora a corta distancia.",
            price: 500,
            weight: 3.5,
            durability: 90,
            stats: { damage: 100, accuracy: 60, range: 50 }
        },
        {
            id: 75,
            name: "Crossbow",
            icon: "🏹",
            description: "Ballesta. Silenciosa y precisa.",
            price: 300,
            weight: 2.8,
            durability: 80,
            stats: { damage: 85, accuracy: 90, range: 85 }
        }
    ],
    ammo: [
        {
            id: 76,
            name: "Ammo 9mm",
            icon: "🟡",
            description: "Munición 9mm. Compatible con pistolas estándar.",
            price: 2,
            weight: 0.01,
            durability: 100,
            stats: { damage: 80, penetration: 70, availability: 85 }
        },
        {
            id: 77,
            name: "Ammo .38",
            icon: "🟠",
            description: "Munición .38. Para revólveres de alta potencia.",
            price: 3,
            weight: 0.02,
            durability: 100,
            stats: { damage: 90, penetration: 80, availability: 70 }
        },
        {
            id: 78,
            name: "Shotgun Shells",
            icon: "🔴",
            description: "Cartuchos de escopeta. Máximo poder destructivo.",
            price: 5,
            weight: 0.05,
            durability: 100,
            stats: { damage: 100, spread: 90, availability: 60 }
        },
        {
            id: 79,
            name: "Red Dot Sight",
            icon: "🔴",
            description: "Mira punto rojo. Mejora la precisión.",
            price: 150,
            weight: 0.3,
            durability: 85,
            stats: { accuracy: 85, speed: 80, visibility: 90 }
        },
        {
            id: 80,
            name: "Laser Sight",
            icon: "🔴",
            description: "Mira láser. Precisión extrema.",
            price: 200,
            weight: 0.2,
            durability: 80,
            stats: { accuracy: 95, intimidation: 70, battery: 60 }
        },
        {
            id: 81,
            name: "Scope 2x",
            icon: "🔍",
            description: "Mira telescópica 2x. Para disparos a media distancia.",
            price: 120,
            weight: 0.5,
            durability: 85,
            stats: { accuracy: 80, range: 85, magnification: 70 }
        },
        {
            id: 82,
            name: "Scope 4x",
            icon: "🔭",
            description: "Mira telescópica 4x. Precisión de francotirador.",
            price: 250,
            weight: 0.8,
            durability: 90,
            stats: { accuracy: 95, range: 95, magnification: 90 }
        },
        {
            id: 83,
            name: "Recoil Pad",
            icon: "🟫",
            description: "Almohadilla antirretroceso. Reduce el impacto del disparo.",
            price: 80,
            weight: 0.4,
            durability: 85,
            stats: { comfort: 85, accuracy: 75, durability: 85 }
        },
        {
            id: 84,
            name: "Flashlight Attachment",
            icon: "🔦",
            description: "Linterna para arma. Ilumina objetivos en la oscuridad.",
            price: 100,
            weight: 0.3,
            durability: 80,
            stats: { visibility: 95, battery: 70, intimidation: 60 }
        }
    ],
    brita_weapons: [
        {
            id: 85,
            name: "Beretta M9A3",
            icon: "🔫",
            description: "Pistola Beretta M9A3. Arma militar estándar.",
            price: 650,
            weight: 1.1,
            durability: 90,
            stats: { damage: 85, accuracy: 85, range: 80 }
        },
        {
            id: 86,
            name: "Glock 17",
            icon: "🔫",
            description: "Glock 17. Pistola confiable y precisa.",
            price: 600,
            weight: 0.9,
            durability: 95,
            stats: { damage: 80, accuracy: 90, range: 75 }
        },
        {
            id: 87,
            name: "Springfield XD54",
            icon: "🔫",
            description: "Springfield XD54. Pistola de alto rendimiento.",
            price: 700,
            weight: 1.0,
            durability: 85,
            stats: { damage: 88, accuracy: 87, range: 78 }
        },
        {
            id: 88,
            name: "Benelli M4 Super 90",
            icon: "🔫",
            description: "Escopeta semiautomática Benelli M4. Devastadora.",
            price: 1200,
            weight: 3.8,
            durability: 95,
            stats: { damage: 95, accuracy: 75, range: 55 }
        },
        {
            id: 89,
            name: "Mossberg 500",
            icon: "🔫",
            description: "Escopeta Mossberg 500. Clásica y confiable.",
            price: 800,
            weight: 3.2,
            durability: 90,
            stats: { damage: 90, accuracy: 70, range: 50 }
        },
        {
            id: 90,
            name: "HK MP5 SD2",
            icon: "🔫",
            description: "Subfusil HK MP5 SD2. Silenciado y letal.",
            price: 1500,
            weight: 2.8,
            durability: 92,
            stats: { damage: 75, accuracy: 85, range: 70 }
        },
        {
            id: 91,
            name: "TTI MPX",
            icon: "🔫",
            description: "Subfusil TTI MPX. Diseño moderno y eficaz.",
            price: 1800,
            weight: 2.5,
            durability: 88,
            stats: { damage: 78, accuracy: 88, range: 75 }
        },
        {
            id: 92,
            name: "IMI UZI",
            icon: "🔫",
            description: "Subfusil UZI. Compacto y letal.",
            price: 1200,
            weight: 3.5,
            durability: 85,
            stats: { damage: 72, accuracy: 80, range: 65 }
        },
        {
            id: 93,
            name: "M240",
            icon: "🔫",
            description: "Ametralladora M240. Poder de fuego devastador.",
            price: 3500,
            weight: 12.0,
            durability: 95,
            stats: { damage: 95, accuracy: 70, range: 90 }
        },
        {
            id: 94,
            name: "M249 E2",
            icon: "🔫",
            description: "Ametralladora ligera M249 E2. Supresión total.",
            price: 4000,
            weight: 10.0,
            durability: 90,
            stats: { damage: 85, accuracy: 75, range: 85 }
        },
        {
            id: 95,
            name: "AAC Honey Badger",
            icon: "🔫",
            description: "Rifle de asalto AAC Honey Badger. Silencioso y mortal.",
            price: 2500,
            weight: 3.2,
            durability: 88,
            stats: { damage: 80, accuracy: 90, range: 80 }
        },
        {
            id: 96,
            name: "Colt M16A3",
            icon: "🔫",
            description: "Rifle de asalto M16A3. Estándar militar americano.",
            price: 2200,
            weight: 3.8,
            durability: 92,
            stats: { damage: 85, accuracy: 85, range: 85 }
        },
        {
            id: 97,
            name: "AKM",
            icon: "🔫",
            description: "Rifle de asalto AKM. Resistente y poderoso.",
            price: 2000,
            weight: 4.2,
            durability: 95,
            stats: { damage: 90, accuracy: 75, range: 80 }
        },
        {
            id: 98,
            name: "HK416",
            icon: "🔫",
            description: "Rifle de asalto HK416. Precisión alemana.",
            price: 2800,
            weight: 3.6,
            durability: 90,
            stats: { damage: 88, accuracy: 92, range: 88 }
        },
        {
            id: 99,
            name: "SCAR-L",
            icon: "🔫",
            description: "Rifle de asalto SCAR-L. Versátil y moderno.",
            price: 3000,
            weight: 3.5,
            durability: 88,
            stats: { damage: 85, accuracy: 90, range: 90 }
        },
        {
            id: 100,
            name: "Dragunov SVDS",
            icon: "🔫",
            description: "Rifle de francotirador Dragunov SVDS. Precisión letal.",
            price: 3500,
            weight: 4.8,
            durability: 92,
            stats: { damage: 100, accuracy: 95, range: 100 }
        },
        {
            id: 101,
            name: "Barrett M82A1",
            icon: "🔫",
            description: "Rifle antimaterial Barrett M82A1. Poder absoluto.",
            price: 5000,
            weight: 12.9,
            durability: 95,
            stats: { damage: 120, accuracy: 85, range: 120 }
        },
        {
            id: 102,
            name: "RPG-7",
            icon: "🚀",
            description: "Lanzagranadas RPG-7. Destrucción masiva.",
            price: 8000,
            weight: 6.3,
            durability: 85,
            stats: { damage: 150, accuracy: 60, range: 70 }
        },
        {
            id: 103,
            name: "M134 Minigun",
            icon: "🔫",
            description: "Minigun M134. Lluvia de balas imparable.",
            price: 15000,
            weight: 18.0,
            durability: 90,
            stats: { damage: 90, accuracy: 70, range: 80 }
        },
        {
            id: 104,
            name: "Crossbow Mod",
            icon: "🏹",
            description: "Ballesta modificada. Silenciosa y letal.",
            price: 500,
            weight: 3.2,
            durability: 85,
            stats: { damage: 85, accuracy: 95, range: 90 }
        },
        {
            id: 105,
            name: "Thompson 1928",
            icon: "🔫",
            description: "Subfusil Thompson 1928. Clásico de la era dorada.",
            price: 1500,
            weight: 4.9,
            durability: 88,
            stats: { damage: 80, accuracy: 75, range: 65 }
        }
    ],
    brita_accessories: [
        {
            id: 106,
            name: "Suppressor Pistol",
            icon: "🔇",
            description: "Silenciador para pistolas. Sigilo total.",
            price: 300,
            weight: 0.3,
            durability: 85,
            stats: { stealth: 95, accuracy: 80, durability: 85 }
        },
        {
            id: 107,
            name: "Suppressor Rifle",
            icon: "🔇",
            description: "Silenciador para rifles. Operaciones encubiertas.",
            price: 450,
            weight: 0.5,
            durability: 90,
            stats: { stealth: 90, accuracy: 85, durability: 90 }
        },
        {
            id: 108,
            name: "Suppressor Shotgun",
            icon: "🔇",
            description: "Silenciador para escopetas. Muerte silenciosa.",
            price: 400,
            weight: 0.6,
            durability: 85,
            stats: { stealth: 85, accuracy: 75, durability: 85 }
        },
        {
            id: 109,
            name: "Suppressor BMG",
            icon: "🔇",
            description: "Silenciador calibre .50. Para rifles pesados.",
            price: 800,
            weight: 1.2,
            durability: 95,
            stats: { stealth: 80, accuracy: 90, durability: 95 }
        },
        {
            id: 110,
            name: "RedDot Scope VictOptics",
            icon: "🔴",
            description: "Mira punto rojo VictOptics. Precisión táctica.",
            price: 250,
            weight: 0.4,
            durability: 90,
            stats: { accuracy: 90, speed: 85, visibility: 95 }
        },
        {
            id: 111,
            name: "EOTech 553 Sight",
            icon: "🟢",
            description: "Mira holográfica EOTech 553. Tecnología avanzada.",
            price: 400,
            weight: 0.5,
            durability: 95,
            stats: { accuracy: 95, speed: 90, visibility: 90 }
        },
        {
            id: 112,
            name: "Aimpoint Micro T2",
            icon: "🔴",
            description: "Mira Aimpoint Micro T2. Compacta y precisa.",
            price: 350,
            weight: 0.3,
            durability: 95,
            stats: { accuracy: 92, speed: 95, battery: 100 }
        },
        {
            id: 113,
            name: "Laser Sight Green",
            icon: "🟢",
            description: "Mira láser verde. Visible en todas las condiciones.",
            price: 300,
            weight: 0.2,
            durability: 85,
            stats: { accuracy: 95, visibility: 100, intimidation: 80 }
        },
        {
            id: 114,
            name: "WeaponLight SureFireM952V",
            icon: "🔦",
            description: "Linterna táctica SureFire M952V. Iluminación profesional.",
            price: 200,
            weight: 0.4,
            durability: 90,
            stats: { visibility: 100, battery: 80, durability: 90 }
        },
        {
            id: 115,
            name: "Bayonet AK",
            icon: "🗡️",
            description: "Bayoneta para AK. Combate cuerpo a cuerpo.",
            price: 80,
            weight: 0.6,
            durability: 85,
            stats: { damage: 70, speed: 80, versatility: 85 }
        },
        {
            id: 116,
            name: "Bayonet M4",
            icon: "🗡️",
            description: "Bayoneta para M4. Última línea de defensa.",
            price: 90,
            weight: 0.5,
            durability: 90,
            stats: { damage: 75, speed: 85, versatility: 80 }
        },
        {
            id: 117,
            name: "Angled Fore Grip",
            icon: "🔧",
            description: "Empuñadura angular. Mejor control del arma.",
            price: 120,
            weight: 0.3,
            durability: 90,
            stats: { control: 90, accuracy: 85, comfort: 80 }
        },
        {
            id: 118,
            name: "Vertical Grip",
            icon: "🔧",
            description: "Empuñadura vertical. Control total del retroceso.",
            price: 100,
            weight: 0.4,
            durability: 85,
            stats: { control: 95, accuracy: 80, comfort: 85 }
        },
        {
            id: 119,
            name: "Ammo Sling",
            icon: "🎗️",
            description: "Bandolera de munición. Recarga rápida.",
            price: 60,
            weight: 0.8,
            durability: 80,
            stats: { capacity: 85, speed: 90, comfort: 70 }
        },
        {
            id: 120,
            name: "M203 Grenade Launcher",
            icon: "🚀",
            description: "Lanzagranadas M203. Poder explosivo adicional.",
            price: 2000,
            weight: 1.4,
            durability: 90,
            stats: { damage: 120, range: 80, versatility: 70 }
        }
    ],
    brita_armor: [
        {
            id: 121,
            name: "Military Helmet MICH2000",
            icon: "🪖",
            description: "Casco militar MICH2000. Protección balística avanzada.",
            price: 400,
            weight: 1.5,
            durability: 95,
            stats: { protection: 90, comfort: 70, visibility: 80 }
        },
        {
            id: 122,
            name: "Police Helmet",
            icon: "👮",
            description: "Casco policial. Protección civil confiable.",
            price: 250,
            weight: 1.2,
            durability: 85,
            stats: { protection: 80, comfort: 80, visibility: 85 }
        },
        {
            id: 123,
            name: "Ballistic Vest Level 3",
            icon: "🦺",
            description: "Chaleco antibalas Nivel 3. Protección contra rifles.",
            price: 800,
            weight: 3.5,
            durability: 95,
            stats: { protection: 95, mobility: 60, comfort: 50 }
        },
        {
            id: 124,
            name: "Tactical Vest",
            icon: "🎖️",
            description: "Chaleco táctico. Balance entre protección y movilidad.",
            price: 350,
            weight: 2.0,
            durability: 85,
            stats: { protection: 70, mobility: 85, storage: 90 }
        },
        {
            id: 125,
            name: "Heavy Armor Suit",
            icon: "🛡️",
            description: "Traje de armadura pesada. Protección máxima.",
            price: 1500,
            weight: 8.0,
            durability: 100,
            stats: { protection: 100, mobility: 30, intimidation: 95 }
        },
        {
            id: 126,
            name: "Camo Suit Woodland",
            icon: "🌲",
            description: "Traje de camuflaje bosque. Sigilo en vegetación.",
            price: 200,
            weight: 1.5,
            durability: 70,
            stats: { stealth: 90, protection: 40, mobility: 85 }
        },
        {
            id: 127,
            name: "Camo Suit Desert",
            icon: "🏜️",
            description: "Traje de camuflaje desierto. Sigilo en terreno árido.",
            price: 200,
            weight: 1.5,
            durability: 70,
            stats: { stealth: 90, protection: 40, mobility: 85 }
        },
        {
            id: 128,
            name: "Tactical Backpack",
            icon: "🎒",
            description: "Mochila táctica. Capacidad militar profesional.",
            price: 180,
            weight: 2.0,
            durability: 90,
            stats: { capacity: 90, durability: 90, organization: 95 }
        },
        {
            id: 129,
            name: "Headset TAC",
            icon: "🎧",
            description: "Auriculares tácticos. Comunicación y protección auditiva.",
            price: 150,
            weight: 0.5,
            durability: 85,
            stats: { communication: 95, hearing: 80, comfort: 85 }
        },
        {
            id: 130,
            name: "Night Vision Goggles",
            icon: "🕶️",
            description: "Gafas de visión nocturna. Ve en la oscuridad total.",
            price: 1200,
            weight: 0.8,
            durability: 85,
            stats: { night_vision: 100, battery: 60, comfort: 70 }
        },
        {
            id: 131,
            name: "Combat Gloves",
            icon: "🧤",
            description: "Guantes de combate. Protección y destreza.",
            price: 80,
            weight: 0.3,
            durability: 80,
            stats: { protection: 70, dexterity: 85, grip: 90 }
        },
        {
            id: 132,
            name: "Combat Boots",
            icon: "🥾",
            description: "Botas de combate. Resistencia y movilidad.",
            price: 150,
            weight: 1.8,
            durability: 90,
            stats: { protection: 80, mobility: 85, durability: 90 }
        },
        {
            id: 133,
            name: "Hazmat Suit",
            icon: "☣️",
            description: "Traje hazmat. Protección contra agentes químicos.",
            price: 300,
            weight: 2.5,
            durability: 75,
            stats: { chemical_protection: 100, mobility: 40, visibility: 60 }
        }
    ]
};

// Configuración de categorías y sus íconos
const categoryConfig = {
    vehicles: { name: 'Vehículos', icon: '🚗' },
    books: { name: 'Libros', icon: '📚' },
    food: { name: 'Comidas', icon: '🥫' },
    tools: { name: 'Herramientas', icon: '🔧' },
    materials: { name: 'Materiales', icon: '📦' },
    medical: { name: 'Medicina', icon: '�' },
    containers: { name: 'Contenedores', icon: '🎒' },
    clothing: { name: 'Ropa', icon: '👕' },
    weapons: { name: 'Armas', icon: '🔫' },
    ammo: { name: 'Munición', icon: '�' },
    brita_weapons: { name: 'Brita Armas', icon: '⚔️' },
    brita_accessories: { name: 'Brita Acc.', icon: '🔧' },
    brita_armor: { name: 'Brita Armor', icon: '🛡️' }
};

// Sistema de la tienda
// Remove this entire duplicated/invalid block, as it is not part of the valid shopData structure.

// Estado del jugador
let playerState = {
    money: 1500,
    weight: 15.2,
    maxWeight: 50.0,
    inventory: [],
    totalSpent: 0
};

// Variables globales
let currentCategory = 'weapons';
let cart = []; // Sistema de carrito para Discord webhook

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        alert('Debes iniciar sesión para acceder a la tienda');
        window.location.href = '/';
        return;
    }
    
    // Sincronizar dinero con los juegos
    const savedMoney = localStorage.getItem('playerMoney');
    if (savedMoney) {
        playerState.money = parseInt(savedMoney);
    }
    
    initializeShop();
    loadUserInfo();
    setupEventListeners();
});

function initializeShop() {
    displayProducts(currentCategory);
    updatePlayerStats();
    updateInventoryDisplay();
}

function loadUserInfo() {
    // Obtener información del usuario del localStorage o token
    const userEmail = localStorage.getItem('userEmail') || 'superviviente@terraz.com';
    document.getElementById('welcome-user').textContent = `Bienvenido, ${userEmail}`;
}

function setupEventListeners() {
    // Botones de categorías
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            switchCategory(category);
        });
    });

    // Botón de juegos
    document.getElementById('games-btn').addEventListener('click', function() {
        window.location.href = '/games.html';
    });

    // Botón de logout
    document.getElementById('logout-btn-shop').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userEmail');
            window.location.href = '/';
        }
    });

    // Modal
    const modal = document.getElementById('purchase-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Escuchar actualizaciones de dinero desde los juegos
    window.addEventListener('message', function(event) {
        if (event.data.type === 'updateMoney') {
            playerState.money = event.data.money;
            updatePlayerStats();
            displayProducts(currentCategory);
        }
    });
}

function switchCategory(category) {
    currentCategory = category;
    
    // Actualizar botones
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Mostrar productos
    displayProducts(category);
}

function displayProducts(category) {
    const grid = document.getElementById('products-grid');
    const products = shopData[category] || [];
    
    grid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            ${product.image ? `<img src="${product.image}" alt="${product.name}" class="product-img" style="width:100%;max-height:140px;object-fit:contain;margin-bottom:8px;">` : `<span class="product-icon">${product.icon || '🚗'}</span>`}
            <div class="product-name">${product.name}</div>
            <div class="product-description">${product.description}</div>
            <div class="product-stats">
                ${Object.entries(product.stats || {}).map(([key, value]) => `
                    <div class="product-stat">
                        <span class="stat-name">${key}:</span>
                        <div class="stat-bar">
                            <div class="bar">
                                <div class="bar-fill" style="width: ${value}%"></div>
                            </div>
                            <span>${value}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="product-price">
                <span class="price">$${product.price}</span>
                <button class="buy-btn" onclick="buyProduct(${product.id})" 
                        ${playerState.money < product.price ? 'disabled' : ''}>
                    ${playerState.money < product.price ? 'Sin dinero' : 'Comprar'}
                </button>
                <button class="cart-btn" onclick="addToCart(${product.id})" 
                        style="background: #2196F3; margin-left: 5px;">
                    🛒 Carrito
                </button>
            </div>
        </div>
    `).join('');
}

function buyProduct(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    if (playerState.money < product.price) {
        showNotification('No tienes suficiente dinero!', 'error');
        return;
    }
    
    if (playerState.weight + product.weight > playerState.maxWeight) {
        showNotification('No puedes cargar más peso!', 'error');
        return;
    }
    
    // Realizar compra
    playerState.money -= product.price;
    playerState.weight += product.weight;
    playerState.totalSpent += product.price;
    
    // Agregar al inventario
    const existingItem = playerState.inventory.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        playerState.inventory.push({
            ...product,
            quantity: 1
        });
    }
    
    // Actualizar UI
    updatePlayerStats();
    updateInventoryDisplay();
    displayProducts(currentCategory);
    
    // Animación y notificación
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    productCard.classList.add('purchased');
    setTimeout(() => productCard.classList.remove('purchased'), 500);
    
    showNotification(`¡${product.name} comprado exitosamente!`, 'success');
}

function findProductById(id) {
    for (const category in shopData) {
        const product = shopData[category].find(p => p.id === id);
        if (product) return product;
    }
    return null;
}

function updatePlayerStats() {
    document.getElementById('player-money').textContent = playerState.money;
    document.getElementById('inventory-slots').textContent = 
        `${playerState.inventory.reduce((sum, item) => sum + item.quantity, 0)}/20`;
    document.getElementById('player-weight').textContent = `${playerState.weight.toFixed(1)}kg`;
    document.getElementById('total-spent').textContent = playerState.totalSpent;
    
    // Guardar dinero en localStorage para sincronización
    localStorage.setItem('playerMoney', playerState.money.toString());
}

function updateInventoryDisplay() {
    const grid = document.getElementById('inventory-grid');
    
    if (playerState.inventory.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #8b4513; padding: 20px;">Tu inventario está vacío. ¡Compra algunos suministros!</div>';
        return;
    }
    
    grid.innerHTML = playerState.inventory.map(item => `
        <div class="inventory-item">
            <span class="inventory-item-icon">${item.icon}</span>
            <div class="inventory-item-name">${item.name}</div>
            <div class="inventory-item-quantity">Cantidad: ${item.quantity}</div>
        </div>
    `).join('');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #8b0000 0%, #dc143c 100%)';
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Ocultar y remover después de 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Función para simular eventos aleatorios (opcional)
function randomEvent() {
    const events = [
        { message: "¡Horda de zombis se acerca! Los precios de armas suben 20%", effect: () => {
            Object.values(shopData.weapons).forEach(weapon => weapon.price = Math.floor(weapon.price * 1.2));
            displayProducts(currentCategory);
        }},
        { message: "¡Comerciante generoso! 10% de descuento en medicina", effect: () => {
            Object.values(shopData.medical).forEach(med => med.price = Math.floor(med.price * 0.9));
            displayProducts(currentCategory);
        }},
        { message: "¡Encontraste $50 en un zombie!", effect: () => {
            playerState.money += 50;
            updatePlayerStats();
        }}
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    showNotification(event.message, 'success');
    event.effect();
}

// Simular eventos aleatorios cada 2 minutos
setInterval(randomEvent, 120000);

// ================================
// SISTEMA DE CARRITO PARA DISCORD
// ================================

// Agregar producto al carrito
function addToCart(productId) {
    const product = findProductById(productId);
    if (!product) return;
    
    // Verificar si ya existe en el carrito
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`➕ ${product.name} agregado al carrito (${existingItem.quantity})`, 'success');
    } else {
        cart.push({
            ...product,
            quantity: 1,
            category: currentCategory
        });
        showNotification(`🛒 ${product.name} agregado al carrito`, 'success');
    }
    
    updateCartDisplay();
    updateCartCounter();
}

// Remover item del carrito
function removeFromCart(index) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    showNotification(`🗑️ ${removedItem.name} removido del carrito`, 'warning');
    updateCartDisplay();
    updateCartCounter();
}

// Actualizar contador del carrito
function updateCartCounter() {
    const counter = document.getElementById('cart-counter');
    if (counter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Mostrar/ocultar carrito
function toggleCart() {
    const panel = document.getElementById('cart-panel');
    panel.style.display = (panel.style.display === 'flex' || panel.style.display === '') ? 'none' : 'flex';
}

// ================================
// SISTEMA DE DISCORD WEBHOOK
// ================================

// URL base del API
const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api' 
    : '/api';

// Webhook de Discord
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1402499129178984531/kF8JsLH4bJ427510eMdZrtpibKWas_QFc7mJ3PfrItgJMlw2H6DIt41gl-fHmQZ7sC_r";

// Función para procesar compra final y enviar a Discord
async function processPurchase() {
    try {
        // Verificar que hay items en el carrito
        if (cart.length === 0) {
            showNotification('❌ Tu carrito está vacío', 'error');
            return;
        }

        // Solo permitir tickets de vehículos
        const onlyVehicles = cart.every(item => item.category === 'vehicles');
        if (!onlyVehicles) {
            showNotification('❌ Solo puedes pedir vehículos en este ticket. Elimina otros productos del carrito.', 'error');
            return;
        }

        // Obtener usuario logueado
        const username = localStorage.getItem('username') || prompt('Ingresa tu usuario para completar el pedido:');
        if (!username) {
            showNotification('❌ Usuario requerido para completar el pedido', 'error');
            return;
        }

        // Calcular total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Verificar fondos
        if (playerState.money < total) {
            showNotification(`❌ Fondos insuficientes. Necesitas $${total - playerState.money} más`, 'error');
            return;
        }

        // Preparar datos del ticket
        const purchaseData = {
            customerUsername: username,
            items: cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                category: item.category || 'unknown'
            })),
            total: total
        };

        // Mostrar loading
        showNotification('🔄 Procesando compra...', 'info');

        // Enviar compra al backend (que enviará a Discord)
        const response = await fetch(`${API_BASE_URL}/shop/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(purchaseData)
        });

        const result = await response.json();

        if (result.success) {
            // Compra exitosa
            playerState.money -= total;
            updatePlayerStats();
            
            // Limpiar carrito
            cart.length = 0;
            updateCartDisplay();
            
            // Mostrar éxito
            showNotification(`🎉 ${result.message}`, 'success');
            showNotification(`📋 ID de pedido: ${result.orderId}`, 'info');
            
            if (result.discordSent) {
                showNotification('📨 Ticket enviado a Discord automáticamente', 'success');
            }
            
            if (result.warning) {
                showNotification(`⚠️ ${result.warning}`, 'warning');
            }
            
        } else {
            throw new Error(result.error || 'Error procesando compra');
        }

    } catch (error) {
        console.error('Error en compra:', error);
        showNotification(`❌ Error: ${error.message}`, 'error');
    }
}

// Función para mostrar notificaciones mejoradas
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Estilos inline para las notificaciones
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        max-width: 400px;
        animation: slideIn 0.3s ease;
        margin-bottom: 10px;
    `;
    
    // Colores según tipo
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    
    document.body.appendChild(notification);
    
    // Auto-remove después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Agregar botón de compra al carrito
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems || !cartTotal) return;
    
    // Limpiar contenido actual
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Tu carrito está vacío</p>';
        cartTotal.innerHTML = '<strong>Total: $0</strong>';
        return;
    }
    
    // Mostrar items del carrito
    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartItems.innerHTML += `
            <div class="cart-item">
                <span>${item.name} x${item.quantity}</span>
                <span>$${itemTotal}</span>
                <button onclick="removeFromCart(${index})" class="remove-btn">🗑️</button>
            </div>
        `;
    });
    
    // Mostrar total y botón de compra
    cartTotal.innerHTML = `
        <strong>Total: $${total}</strong>
        <button onclick="processPurchase()" class="purchase-btn" style="
            background: #4CAF50;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 10px;
            width: 100%;
            font-weight: bold;
        ">
            🛒 Finalizar Compra y Enviar a Discord
        </button>
    `;
}

// Enviar carrito a Discord
async function sendCartToDiscord(cartItems, total) {
    const itemsList = cartItems.map(item => `• ${item.name} x${item.quantity} ($${item.price * item.quantity})`).join('\n');
    const content = `🛒 **Nueva compra en Terraz Survival Store**\n\n${itemsList}\n\n**Total:** $${total}`;
    await fetch(DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
    });
}

// Lógica para el botón de compra
if (document.getElementById('buy-btn')) {
    document.getElementById('buy-btn').onclick = async function() {
        const cartItems = getCartItems(); // Debe devolver [{name, price, quantity}]
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await sendCartToDiscord(cartItems, total);
        alert('¡Compra enviada a Discord!');
        clearCart();
        toggleCart();
    };
}
