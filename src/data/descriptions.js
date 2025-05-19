export const entityDescriptions = {
  // 🧍 PEOPLE
  "Luke Skywalker": {
    text: "Luke Skywalker is a character in the Star Wars universe.",
    details: {
      gender: "Male",
      species: "Human",
      dimensions: "Height: 1.72m",
      affiliations: ["Rebel Alliance", "Jedi Order"],
      appearances: ["Episode IV", "Episode V", "Episode VI"],
      locations: ["Tatooine", "Dagobah"],
      weapons: ["Lightsaber", "Blaster Pistol"],
      vehicles: ["X-wing", "Landspeeder"]
    }
  },
  "C-3PO": {
    text: "C-3PO is a protocol droid fluent in over six million forms of communication.",
    details: {
      gender: "N/A",
      species: "Droid",
      dimensions: "Height: 1.67m",
      affiliations: ["Rebel Alliance"],
      appearances: ["Episode IV", "Episode V", "Episode VI"],
      locations: ["Tatooine", "Endor"],
      weapons: ["None"],
      vehicles: ["Various transports"]
    }
  },
  "R2-D2": {
    text: "R2-D2 is a loyal astromech droid who played a key role in many galactic events.",
    details: {
      gender: "N/A",
      species: "Droid",
      dimensions: "Height: 0.96m",
      affiliations: ["Rebel Alliance"],
      appearances: ["Episode IV", "Episode V", "Episode VI"],
      locations: ["Tatooine", "Hoth", "Endor"],
      weapons: ["Electric prod", "Data probe"],
      vehicles: ["X-wing"]
    }
  },
  "Darth Vader": {
    text: "Darth Vader is a Sith Lord formerly known as Anakin Skywalker.",
    details: {
      gender: "Male",
      species: "Human",
      dimensions: "Height: 2.02m",
      affiliations: ["Galactic Empire", "Sith"],
      appearances: ["Episode III", "Episode IV", "Episode V", "Episode VI"],
      locations: ["Mustafar", "Death Star"],
      weapons: ["Red Lightsaber"],
      vehicles: ["TIE Advanced x1"]
    }
  },
  "Leia Organa": {
    text: "Leia Organa was a princess and a leader of the Rebel Alliance.",
    details: {
      gender: "Female",
      species: "Human",
      dimensions: "Height: 1.50m",
      affiliations: ["Rebel Alliance"],
      appearances: ["Episode IV", "Episode V", "Episode VI"],
      locations: ["Alderaan", "Endor"],
      weapons: ["Blaster"],
      vehicles: []
    }
  },
  "Owen Lars": {
    text: "Owen Lars was a moisture farmer on Tatooine and Luke's uncle.",
    details: {
      gender: "Male",
      species: "Human",
      dimensions: "Unknown",
      affiliations: ["Tatooine locals"],
      appearances: ["Episode II", "Episode IV"],
      locations: ["Tatooine"],
      weapons: [],
      vehicles: []
    }
  },
  "Beru Whitesun lars": {
    text: "Beru was the wife of Owen Lars and aunt to Luke Skywalker.",
    details: {
      gender: "Female",
      species: "Human",
      dimensions: "Unknown",
      affiliations: ["Tatooine locals"],
      appearances: ["Episode II", "Episode IV"],
      locations: ["Tatooine"],
      weapons: [],
      vehicles: []
    }
  },
  "R5-D4": {
    text: "R5-D4 is a red astromech droid with a bad motivator.",
    details: {
      gender: "N/A",
      species: "Droid",
      dimensions: "Unknown",
      affiliations: ["None"],
      appearances: ["Episode IV"],
      locations: ["Tatooine"],
      weapons: [],
      vehicles: []
    }
  },
  "Biggs Darklighter": {
    text: "Biggs was a Rebel pilot and friend of Luke Skywalker.",
    details: {
      gender: "Male",
      species: "Human",
      dimensions: "Unknown",
      affiliations: ["Rebel Alliance"],
      appearances: ["Episode IV"],
      locations: ["Tatooine", "Yavin IV"],
      weapons: ["Blaster"],
      vehicles: ["X-wing"]
    }
  },
  "Obi-Wan Kenobi": {
    text: "Obi-Wan Kenobi was a wise Jedi Master and mentor to Anakin and Luke.",
    details: {
      gender: "Male",
      species: "Human",
      dimensions: "Height: 1.82m",
      affiliations: ["Jedi Order"],
      appearances: ["Episode I", "Episode II", "Episode III", "Episode IV"],
      locations: ["Tatooine", "Geonosis"],
      weapons: ["Lightsaber"],
      vehicles: ["Jedi Starfighter"]
    }
  },

  // 🌍 PLANETS
  "Tatooine": {
    text: "Tatooine is a desert planet and the homeworld of Anakin and Luke Skywalker.",
    details: {
      region: "Outer Rim",
      climate: "Arid",
      terrain: "Desert",
      notable_species: ["Humans", "Jawas", "Tusken Raiders"],
      affiliations: ["Hutt Cartel"],
      appearances: ["Episode I–IV"]
    }
  },
  "Alderaan": {
    text: "Alderaan was a peaceful Core World destroyed by the Death Star.",
    details: {
      region: "Core Worlds",
      climate: "Temperate",
      terrain: "Grasslands, Mountains",
      notable_species: ["Humans"],
      affiliations: ["Galactic Senate"],
      appearances: ["Episode IV"]
    }
  },
  "Yavin IV": {
    text: "Yavin IV is a jungle moon that served as a Rebel base.",
    details: {
      region: "Outer Rim",
      climate: "Humid",
      terrain: "Jungle, Ruins",
      notable_species: [],
      affiliations: ["Rebel Alliance"],
      appearances: ["Episode IV"]
    }
  },
  "Hoth": {
    text: "Hoth is an icy planet and site of a major Rebel base.",
    details: {
      region: "Outer Rim",
      climate: "Frozen",
      terrain: "Ice fields, Mountains",
      notable_species: ["Wampa", "Tauntaun"],
      affiliations: ["Rebel Alliance"],
      appearances: ["Episode V"]
    }
  },
  "Dagobah": {
    text: "Dagobah is a swampy world where Yoda lived in exile.",
    details: {
      region: "Outer Rim",
      climate: "Wet",
      terrain: "Swamp, Jungle",
      notable_species: [],
      affiliations: [],
      appearances: ["Episode V", "Episode VI"]
    }
  },

  // 🚗 VEHICLES
  "Sand Crawler": {
    text: "Sandcrawlers are large treaded fortresses used by Jawas.",
    details: {
      class: "Transport",
      manufacturer: "Corellia Mining Corporation",
      affiliations: ["Jawas"],
      appearances: ["Episode IV"],
      used_by: ["Jawas"],
      weapons: ["None"]
    }
  },
  "T-16 skyhopper": {
    text: "The T-16 skyhopper is a high-speed repulsorlift vehicle.",
    details: {
      class: "Air Speeder",
      manufacturer: "Incom Corporation",
      affiliations: ["Tatooine Civilians"],
      appearances: ["Episode IV"],
      used_by: ["Luke Skywalker"],
      weapons: []
    }
  },
  "X-34 landspeeder": {
    text: "A common landspeeder model used on Tatooine.",
    details: {
      class: "Landspeeder",
      manufacturer: "SoroSuub Corporation",
      affiliations: ["Civilians"],
      appearances: ["Episode IV"],
      used_by: ["Luke Skywalker"],
      weapons: []
    }
  },
  "TIE/LN starfighter": {
    text: "The standard Imperial starfighter.",
    details: {
      class: "Starfighter",
      manufacturer: "Sienar Fleet Systems",
      affiliations: ["Galactic Empire"],
      appearances: ["Episode IV–VI"],
      used_by: ["Imperial Pilots"],
      weapons: ["Laser Cannons"]
    }
  }
};

