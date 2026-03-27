export interface Star {
  id: string;
  name?: string;
  x: number;
  y: number;
  magnitude: number; // 1 to 5, where 1 is brightest
}

export interface Constellation {
  id: string;
  name: string;
  description: string;
  stars: Star[];
  lines: [number, number][]; // Indices of stars to connect
}

export const CONSTELLATIONS: Constellation[] = [
  {
    id: "orion",
    name: "Orion",
    description: "The Hunter, one of the most recognizable constellations. It contains the bright stars Betelgeuse and Rigel.",
    stars: [
      { id: "o1", name: "Betelgeuse", x: 35, y: 20, magnitude: 1 },
      { id: "o2", name: "Bellatrix", x: 65, y: 25, magnitude: 2 },
      { id: "o3", name: "Alnitak", x: 45, y: 48, magnitude: 2 },
      { id: "o4", name: "Alnilam", x: 50, y: 50, magnitude: 2 },
      { id: "o5", name: "Mintaka", x: 55, y: 52, magnitude: 2 },
      { id: "o6", name: "Saiph", x: 40, y: 80, magnitude: 2 },
      { id: "o7", name: "Rigel", x: 60, y: 75, magnitude: 1 },
      { id: "o8", name: "Meissa", x: 50, y: 15, magnitude: 3 },
    ],
    lines: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [0, 7], [1, 7], [5, 6]],
  },
  {
    id: "ursa-major",
    name: "Ursa Major",
    description: "The Great Bear, containing the famous Big Dipper asterism which helps find the North Star.",
    stars: [
      { id: "um1", name: "Dubhe", x: 20, y: 20, magnitude: 2 },
      { id: "um2", name: "Merak", x: 22, y: 40, magnitude: 2 },
      { id: "um3", name: "Phecda", x: 45, y: 45, magnitude: 2 },
      { id: "um4", name: "Megrez", x: 48, y: 25, magnitude: 3 },
      { id: "um5", name: "Alioth", x: 65, y: 20, magnitude: 2 },
      { id: "um6", name: "Mizar", x: 80, y: 15, magnitude: 2 },
      { id: "um7", name: "Alkaid", x: 95, y: 25, magnitude: 2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 0], [3, 4], [4, 5], [5, 6]],
  },
  {
    id: "cassiopeia",
    name: "Cassiopeia",
    description: "The Queen, easily identified by its distinctive 'W' shape in the northern sky.",
    stars: [
      { id: "c1", name: "Segin", x: 10, y: 30, magnitude: 3 },
      { id: "c2", name: "Ruchbah", x: 30, y: 60, magnitude: 3 },
      { id: "c3", name: "Tsih", x: 50, y: 40, magnitude: 2 },
      { id: "c4", name: "Schedar", x: 70, y: 70, magnitude: 2 },
      { id: "c5", name: "Caph", x: 90, y: 40, magnitude: 2 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4]],
  },
  {
    id: "cygnus",
    name: "Cygnus",
    description: "The Swan, also known as the Northern Cross. Its brightest star is Deneb.",
    stars: [
      { id: "cy1", name: "Deneb", x: 50, y: 10, magnitude: 1 },
      { id: "cy2", name: "Sadr", x: 50, y: 40, magnitude: 2 },
      { id: "cy3", name: "Albireo", x: 50, y: 90, magnitude: 3 },
      { id: "cy4", name: "Gienah", x: 20, y: 40, magnitude: 2 },
      { id: "cy5", name: "Delta Cygni", x: 80, y: 40, magnitude: 3 },
    ],
    lines: [[0, 1], [1, 2], [1, 3], [1, 4]],
  },
  {
    id: "scorpius",
    name: "Scorpius",
    description: "The Scorpion, a southern constellation featuring the red supergiant star Antares.",
    stars: [
      { id: "s1", name: "Graffias", x: 20, y: 25, magnitude: 2 },
      { id: "s2", name: "Dschubba", x: 25, y: 35, magnitude: 2 },
      { id: "s3", name: "Antares", x: 40, y: 50, magnitude: 1 },
      { id: "s4", name: "Alniyat", x: 48, y: 55, magnitude: 3 },
      { id: "s5", name: "Larawag", x: 55, y: 65, magnitude: 3 },
      { id: "s6", name: "Sargas", x: 60, y: 80, magnitude: 2 },
      { id: "s7", name: "Girtab", x: 70, y: 85, magnitude: 3 },
      { id: "s8", name: "Shaula", x: 85, y: 80, magnitude: 2 },
      { id: "s9", name: "Lesath", x: 82, y: 75, magnitude: 3 },
    ],
    lines: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]],
  },
  {
    id: "aries",
    name: "Aries",
    description: "The Ram, the first sign of the zodiac. Its brightest star is Hamal.",
    stars: [
      { id: "ar1", name: "Hamal", x: 20, y: 30, magnitude: 2 },
      { id: "ar2", name: "Sheratan", x: 45, y: 45, magnitude: 3 },
      { id: "ar3", name: "Mesarthim", x: 60, y: 55, magnitude: 4 },
      { id: "ar4", name: "41 Arietis", x: 85, y: 35, magnitude: 4 },
    ],
    lines: [[0, 1], [1, 2], [1, 3]],
  },
  {
    id: "taurus",
    name: "Taurus",
    description: "The Bull, featuring the bright red star Aldebaran and the Pleiades star cluster.",
    stars: [
      { id: "ta1", name: "Aldebaran", x: 40, y: 50, magnitude: 1 },
      { id: "ta2", name: "Elnath", x: 80, y: 20, magnitude: 2 },
      { id: "ta3", name: "Alheka", x: 85, y: 60, magnitude: 3 },
      { id: "ta4", name: "Ain", x: 35, y: 40, magnitude: 3 },
      { id: "ta5", name: "Hyadum I", x: 30, y: 55, magnitude: 4 },
    ],
    lines: [[0, 1], [0, 3], [0, 4], [1, 2]],
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "The Twins, marked by the bright stars Castor and Pollux.",
    stars: [
      { id: "ge1", name: "Castor", x: 30, y: 20, magnitude: 2 },
      { id: "ge2", name: "Pollux", x: 45, y: 25, magnitude: 1 },
      { id: "ge3", name: "Alhena", x: 70, y: 80, magnitude: 2 },
      { id: "ge4", name: "Mebsuta", x: 25, y: 50, magnitude: 3 },
      { id: "ge5", name: "Tejat Posterior", x: 60, y: 70, magnitude: 3 },
    ],
    lines: [[0, 3], [3, 4], [4, 2], [1, 2]],
  },
  {
    id: "cancer",
    name: "Cancer",
    description: "The Crab, the faintest of the zodiacal constellations.",
    stars: [
      { id: "can1", name: "Acubens", x: 80, y: 70, magnitude: 4 },
      { id: "can2", name: "Al Tarf", x: 60, y: 85, magnitude: 3 },
      { id: "can3", name: "Asellus Australis", x: 50, y: 50, magnitude: 4 },
      { id: "can4", name: "Asellus Borealis", x: 45, y: 30, magnitude: 4 },
      { id: "can5", name: "Tegmine", x: 20, y: 20, magnitude: 5 },
    ],
    lines: [[0, 2], [1, 2], [2, 3], [3, 4]],
  },
  {
    id: "leo",
    name: "Leo",
    description: "The Lion, easily found by the 'Sickle' asterism and its brightest star, Regulus.",
    stars: [
      { id: "le1", name: "Regulus", x: 30, y: 70, magnitude: 1 },
      { id: "le2", name: "Denebola", x: 85, y: 50, magnitude: 2 },
      { id: "le3", name: "Algieba", x: 45, y: 40, magnitude: 2 },
      { id: "le4", name: "Zosma", x: 70, y: 40, magnitude: 2 },
      { id: "le5", name: "Adhafera", x: 40, y: 25, magnitude: 3 },
      { id: "le6", name: "Rasalas", x: 25, y: 35, magnitude: 4 },
      { id: "le7", name: "Eta Leonis", x: 35, y: 55, magnitude: 3 },
      { id: "le8", name: "Mu Leonis", x: 30, y: 20, magnitude: 4 },
    ],
    lines: [[0, 6], [6, 2], [2, 4], [4, 7], [7, 5], [5, 6], [2, 3], [3, 1]],
  },
  {
    id: "virgo",
    name: "Virgo",
    description: "The Maiden, the second-largest constellation in the sky, featuring Spica.",
    stars: [
      { id: "vi1", name: "Spica", x: 50, y: 80, magnitude: 1 },
      { id: "vi2", name: "Porrima", x: 40, y: 50, magnitude: 3 },
      { id: "vi3", name: "Vindemiatrix", x: 70, y: 30, magnitude: 3 },
      { id: "vi4", name: "Zavijava", x: 20, y: 30, magnitude: 4 },
      { id: "vi5", name: "Auva", x: 45, y: 35, magnitude: 3 },
      { id: "vi6", name: "Zaniah", x: 30, y: 40, magnitude: 4 },
      { id: "vi7", name: "Syrma", x: 65, y: 70, magnitude: 4 },
    ],
    lines: [[0, 6], [6, 1], [1, 2], [1, 5], [5, 4], [2, 3]],
  },
  {
    id: "libra",
    name: "Libra",
    description: "The Scales, the only zodiac sign represented by an object rather than an animal or person.",
    stars: [
      { id: "li1", name: "Zubeneschamali", x: 50, y: 20, magnitude: 3 },
      { id: "li2", name: "Zubenelgenubi", x: 30, y: 50, magnitude: 3 },
      { id: "li3", name: "Zubenelhakrabi", x: 70, y: 60, magnitude: 4 },
      { id: "li4", name: "Brachium", x: 55, y: 85, magnitude: 3 },
    ],
    lines: [[0, 1], [0, 2], [1, 3], [2, 3]],
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    description: "The Archer, containing the 'Teapot' asterism and pointing toward the center of the Milky Way.",
    stars: [
      { id: "sa1", name: "Kaus Australis", x: 40, y: 85, magnitude: 2 },
      { id: "sa2", name: "Nunki", x: 75, y: 45, magnitude: 2 },
      { id: "sa3", name: "Ascella", x: 65, y: 75, magnitude: 2 },
      { id: "sa4", name: "Kaus Media", x: 35, y: 65, magnitude: 3 },
      { id: "sa5", name: "Kaus Borealis", x: 45, y: 50, magnitude: 3 },
      { id: "sa6", name: "Alnasl", x: 20, y: 65, magnitude: 3 },
      { id: "sa7", name: "Tau Sagittarii", x: 80, y: 65, magnitude: 3 },
      { id: "sa8", name: "Phi Sagittarii", x: 60, y: 55, magnitude: 3 },
    ],
    lines: [[0, 2], [2, 6], [6, 1], [1, 7], [7, 2], [7, 4], [4, 3], [3, 0], [3, 5], [5, 4]],
  },
  {
    id: "capricornus",
    name: "Capricornus",
    description: "The Sea-Goat, one of the oldest recognized constellations.",
    stars: [
      { id: "cap1", name: "Deneb Algedi", x: 85, y: 40, magnitude: 3 },
      { id: "cap2", name: "Dabih", x: 25, y: 35, magnitude: 3 },
      { id: "cap3", name: "Algedi", x: 20, y: 25, magnitude: 4 },
      { id: "cap4", name: "Nashira", x: 75, y: 45, magnitude: 4 },
      { id: "cap5", name: "Omega Capricorni", x: 50, y: 80, magnitude: 4 },
    ],
    lines: [[0, 4], [4, 1], [1, 2], [0, 3]],
  },
  {
    id: "aquarius",
    name: "Aquarius",
    description: "The Water Bearer, a large but faint constellation in a region of the sky called 'The Sea'.",
    stars: [
      { id: "aq1", name: "Sadalsuud", x: 40, y: 30, magnitude: 3 },
      { id: "aq2", name: "Sadalmelik", x: 60, y: 35, magnitude: 3 },
      { id: "aq3", name: "Skat", x: 80, y: 75, magnitude: 3 },
      { id: "aq4", name: "Ancha", x: 50, y: 60, magnitude: 4 },
      { id: "aq5", name: "Albali", x: 20, y: 50, magnitude: 4 },
    ],
    lines: [[0, 1], [1, 3], [3, 2], [0, 4]],
  },
  {
    id: "pisces",
    name: "Pisces",
    description: "The Fishes, two fish tied together by a cord, represented by a large 'V' shape.",
    stars: [
      { id: "pi1", name: "Alpherg", x: 80, y: 20, magnitude: 4 },
      { id: "pi2", name: "Alrescha", x: 50, y: 85, magnitude: 4 },
      { id: "pi3", name: "Eta Piscium", x: 20, y: 35, magnitude: 4 },
      { id: "pi4", name: "Omega Piscium", x: 65, y: 65, magnitude: 5 },
      { id: "pi5", name: "Gamma Piscium", x: 35, y: 55, magnitude: 4 },
    ],
    lines: [[0, 3], [3, 1], [1, 4], [4, 2]],
  },
];
