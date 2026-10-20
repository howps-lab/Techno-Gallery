import img1 from "../assets/images/urban_neon_tokyo_1792505212902.jpg";
import img2 from "../assets/images/cyber_architecture_1792505213365.jpg";
import img3 from "../assets/images/cinematic_light_trails_1792505213780.jpg";
import img4 from "../assets/images/dramatic_cyber_portrait_1792505214064.jpg";
import img5 from "../assets/images/minimalist_concrete_facade_1792505215647.jpg";
import img6 from "../assets/images/misty_fjord_monolith_1792505216101.jpg";
import img7 from "../assets/images/night_rain_reflections_1792505216883.jpg";
import img8 from "../assets/images/brutalist_geometric_stair_1792505216462.jpg";

export interface PhotoSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  year: string;
  src: string;
  curatorNote: string;
  exif: {
    camera: string;
    lens: string;
    focalLength: string;
    aperture: string;
    shutterSpeed: string;
    iso: string;
  };
}

export const GALLERY_DATA: PhotoSlide[] = [
  {
    id: "slide-1",
    number: "01",
    title: "NEON AFTER DARK",
    subtitle: "An exploration of light, architecture, and the midnight pulse of the metropolis.",
    category: "URBAN FUTURES",
    location: "Kabukicho, Tokyo",
    year: "2026",
    src: img1,
    curatorNote: "Shot during a sudden torrential downpour. The rain-slicked asphalt turns into a reflective canvas, mirroring neon cybernetic typography in deep cyan and indigo hues.",
    exif: {
      camera: "Leica SL3",
      lens: "Summilux-SL 35mm f/1.4 ASPH",
      focalLength: "35mm",
      aperture: "f/1.4",
      shutterSpeed: "1/125s",
      iso: "800",
    },
  },
  {
    id: "slide-2",
    number: "02",
    title: "THE OBSIDIAN TOWER",
    subtitle: "Sculptural brutalism ascending through dusk into atmospheric twilight.",
    category: "ARCHITECTURE",
    location: "Shenzhen Financial Hub",
    year: "2026",
    src: img2,
    curatorNote: "Angular geometric faceted glass paired with monolithic concrete trusses. Subtle electric luminescent seams illuminate the tower's aerodynamic profile.",
    exif: {
      camera: "Hasselblad X2D 100C",
      lens: "XCD 21mm f/4",
      focalLength: "21mm",
      aperture: "f/8.0",
      shutterSpeed: "1/4s",
      iso: "64",
    },
  },
  {
    id: "slide-3",
    number: "03",
    title: "PHOTON ARTERIES",
    subtitle: "Continuous kinetic velocity carved across multilevel arterial viaducts.",
    category: "LIGHT TRAILS",
    location: "Chongqing Interchange",
    year: "2026",
    src: img3,
    curatorNote: "A 30-second long exposure documenting three tiers of hyper-connected transit infrastructure, distilling commuter traffic into luminous cyan ribbon currents.",
    exif: {
      camera: "Sony α1",
      lens: "FE 16-35mm f/2.8 GM II",
      focalLength: "19mm",
      aperture: "f/11",
      shutterSpeed: "30.0s",
      iso: "100",
    },
  },
  {
    id: "slide-4",
    number: "04",
    title: "SHADOW OPERATIVE",
    subtitle: "Solitary cinematic portrait within the stark acoustics of a modern brutalist gallery.",
    category: "PORTRAITURE",
    location: "Neue Nationalgalerie, Berlin",
    year: "2026",
    src: img4,
    curatorNote: "Single cold-cyan edge kicker light defining technical garment textures against the deep matte black architectural museum perimeter.",
    exif: {
      camera: "Fujifilm GFX 100 II",
      lens: "GF 110mm f/2 R LM WR",
      focalLength: "110mm",
      aperture: "f/2.0",
      shutterSpeed: "1/250s",
      iso: "400",
    },
  },
  {
    id: "slide-5",
    number: "05",
    title: "MONOLITHIC CHOP",
    subtitle: "Pure negative space and raking sunbeams against raw unyielding formwork.",
    category: "MINIMALISM",
    location: "Atacama Desert Pavilion",
    year: "2025",
    src: img5,
    curatorNote: "Investigating the weight of voided concrete. The structure behaves as a sundial, casting razor-sharp triangular penumbras across arid terrain.",
    exif: {
      camera: "Leica M11 Monochrom",
      lens: "Apo-Summicron-M 50mm f/2",
      focalLength: "50mm",
      aperture: "f/5.6",
      shutterSpeed: "1/1000s",
      iso: "125",
    },
  },
  {
    id: "slide-6",
    number: "06",
    title: "BASALT RESILIENCE",
    subtitle: "Primeval sea spires rising against arctic fog and crashing volcanic tides.",
    category: "LANDSCAPES",
    location: "Reynisfjara, Vik, Iceland",
    year: "2025",
    src: img6,
    curatorNote: "Dark oceanic basalt needles confronting North Atlantic storm swells. Cold monochromatic cyan grading emphasizes geological solitude.",
    exif: {
      camera: "Phase One IQ4 150MP",
      lens: "Schneider Kreuznach 45mm",
      focalLength: "45mm",
      aperture: "f/9.0",
      shutterSpeed: "1.2s",
      iso: "50",
    },
  },
  {
    id: "slide-7",
    number: "07",
    title: "AQUEOUS HORIZON",
    subtitle: "Distorted city lights filtered through rain condensations on panoramic glass.",
    category: "NIGHT NOIR",
    location: "Lotte World Tower, Seoul",
    year: "2026",
    src: img7,
    curatorNote: "Micro-droplets on high-altitude viewing glass act as hundreds of miniature optical lenses, scattering the city glow into impressionistic bokeh.",
    exif: {
      camera: "Canon EOS R5 C",
      lens: "RF 50mm f/1.2 L USM",
      focalLength: "50mm",
      aperture: "f/1.4",
      shutterSpeed: "1/60s",
      iso: "1600",
    },
  },
  {
    id: "slide-8",
    number: "08",
    title: "KINETIC VORTEX",
    subtitle: "Hypnotic vertical descent through cantilevered architectural spiral geometry.",
    category: "GEOMETRY",
    location: "City of Arts and Sciences, Valencia",
    year: "2026",
    src: img8,
    curatorNote: "Looking upward through the helix. The spiral ribbon guides the eye through contrasting chiaroscuro lighting and crisp cast concrete curves.",
    exif: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 14-24mm f/2.8 S",
      focalLength: "14mm",
      aperture: "f/8.0",
      shutterSpeed: "1/80s",
      iso: "250",
    },
  },
];
