const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const spriteContainer = document.getElementById('sprite-container');

const getCreatureData = async () => {
  try {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const res = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${searchTerm}`);
    
    if (!res.ok) {
      alert('Creature not found');
      return;
    }

    const data = await res.json();
    console.log(data); // Näet tästä konsolista tarkalleen miltä data näyttää

    // Asetetaan perustiedot
    creatureName.textContent = data.name.toUpperCase();
    creatureId.textContent = `#${data.id}`;
    weight.textContent = data.weight;
    height.textContent = data.height;

    // Asetetaan statit turvallisesti
    const getStat = (name) => {
      const found = data.stats.find(s => s.name === name || s.stat?.name === name);
      return found ? found.base_stat : '';
    };

    hp.textContent = getStat('hp') || data.stats[0]?.base_stat;
    attack.textContent = getStat('attack') || data.stats[1]?.base_stat;
    defense.textContent = getStat('defense') || data.stats[2]?.base_stat;
    specialAttack.textContent = getStat('special-attack') || data.stats[3]?.base_stat;
    specialDefense.textContent = getStat('special-defense') || data.stats[4]?.base_stat;
    speed.textContent = getStat('speed') || data.stats[5]?.base_stat;

    // Tyhjennetään aiemmat
    types.innerHTML = '';
    spriteContainer.innerHTML = '';

    // Haetaan kuva turvallisesti (tarkistetaan eri vaihtoehdot)
    const imageUrl = data.image || data.sprite || data.sprites?.front_default || '';
    if (imageUrl) {
      const img = document.createElement('img');
      img.id = 'sprite';
      img.src = imageUrl;
      img.alt = data.name;
      spriteContainer.appendChild(img);
    }

    // Lisätään tyypit
    data.types.forEach(t => {
      const typeSpan = document.createElement('span');
      typeSpan.textContent = (t.type?.name || t.name || t).toUpperCase();
      types.appendChild(typeSpan);
    });

  } catch (error) {
    alert('Creature not found');
    console.error(error);
  }
};

searchButton.addEventListener('click', (e) => {
  e.preventDefault();
  getCreatureData();
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getCreatureData();
  }
});