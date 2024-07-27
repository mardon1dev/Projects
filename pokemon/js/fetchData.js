// Select elements
const pokedex = document.querySelector('.pokemons');
const searchInput = document.getElementById('search');

const fetchPokemon = (query) => {
    const promises = [];
    if (query) {
        const url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
        promises.push(
            fetch(url)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Pokémon not found');
                    }
                    return res.json();
                })
                .catch((err) => {
                    // console.error(err);  
                    return null; // Return null to handle errors
                })
        );
    } else {
        // Fetch a list of Pokémon if no search query is provided
        for (let i = 1; i <= 24; i++) {
            const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
            promises.push(fetch(url).then((res) => res.json()));
        }
    }

    // Handle the resolved promises
    Promise.all(promises)
        .then((results) => {
            const validResults = results.filter((result) => result !== null); // Filter out null results
            const pokemon = validResults.map((result) => ({
                name: result.name,
                image: result.sprites.other['official-artwork'].front_default,
                type: result.types,
                id: result.id,
                abilities: result.abilities.map((ability) => ability.ability.name).join(' - '),
                info: {
                    height: result.height,
                    weight: result.weight,
                    experience: result.base_experience
                },
                stats: {
                    health: result.stats[0].base_stat,
                    attack: result.stats[1].base_stat,
                    defense: result.stats[2].base_stat,
                    speed: result.stats[5].base_stat,
                },
            }));
            displayPokemon(pokemon);
        })
        .catch((err) => err);
};

// Function to display Pokémon cards
const displayPokemon = (pokemon) => {
    if (pokemon.length === 0) {
        pokedex.innerHTML = `<p class="error">No Pokémon found. Please try a different search.</p>`;
        return;
    }
    const pokemonInfo = pokemon
        .map(
            (pokeman, index) => `
        <div class="card" data-id="${index}">
            <img class="card-image" src="${pokeman.image}" width="90" height="90" alt="${pokeman.name}"/>
            <h2 class="card-title">${pokeman.name}</h2>
            <div>
            ${
                pokeman.type.map((type) => `<span class="card-type">${type.type.name}</span>`).join(' ')
            }
            </div>
        </div>
        `
        )
        .join('');

    pokedex.innerHTML = pokemonInfo;

    const onebutton = document.querySelectorAll('.card');
    onebutton.forEach((button, index) => {
        button.addEventListener('click', () => {
            displayPokemonDetails(pokemon[index]);
        });
    });
};

// Function to display detailed Pokémon info
const displayPokemonDetails = (pokemonData) => {
    const infoWrapper = document.querySelector('.info__wrapper');
    const body = document.querySelector('body');
    const pokemonInfoOne = `
    <div class="more">
        <div class="more__img">
            <img src="${pokemonData.image}" alt="${pokemonData.name}" width="364" height="364">
            <div class="pokemon__types">
            ${
                pokemonData.type.map((type) => `<span class="pokemon__type">${type.type.name}</span>`).join(' ')
            }
            </div>
        </div>
        <div class="more-info">
            <div class="character">
                <h2 class="character__name">${pokemonData.name}</h2>
            </div>
            <div class="abilities">
                <span>Abilities</span>
                <p>${pokemonData.abilities}</p>
            </div>
            <ul class="information">
                <li>Height: ${pokemonData.info.height}</li>
                <li>Weight: ${pokemonData.info.weight}</li>
                <li>Experience: ${pokemonData.info.experience}</li>
            </ul>
            <ul class="power">
                <li><span class="power-name">Health</span> <span class="power-stat">${pokemonData.stats.health}</span></li>
                <li><span class="power-name">Attack</span> <span class="power-stat">${pokemonData.stats.attack}</span></li>
                <li><span class="power-name">Defense</span> <span class="power-stat">${pokemonData.stats.defense}</span></li>
                <li><span class="power-name">Speed</span> <span class="power-stat">${pokemonData.stats.speed}</span></li>
            </ul>
        </div>
        <div class="pokemon">
            <span class="pokemon__span"></span>
            <span class="pokemon__span"></span>
        </div>
    </div>
    `;

    infoWrapper.innerHTML = pokemonInfoOne;
    infoWrapper.classList.add('show');
    body.classList.add('scroll');

    const closeInfo = document.querySelector('.pokemon');
    closeInfo.addEventListener('click', () => {
        infoWrapper.classList.remove('show');
        body.classList.remove('scroll');
    });
};

// Add event listener to search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        fetchPokemon(query);
    }
    else{
        fetchPokemon();
    }
});

// Fetch all Pokémon initially
fetchPokemon();
