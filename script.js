// script.js

document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const query = document.getElementById('search-box').value.trim().toLowerCase();
    if (query) {
        fetchPokemon(query);
    }
});

async function fetchPokemon(query) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        document.getElementById('result').innerHTML = `<p>${error.message}</p>`;
    }
}

function displayPokemon(data) {
    const pokemonInfo = `
        <div class="pokemon-info">
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>ID: ${data.id}</p>
            <p>Height: ${data.height}</p>
            <p>Weight: ${data.weight}</p>
            <p>Type: ${data.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        </div>
    `;
    document.getElementById('result').innerHTML = pokemonInfo;
}

