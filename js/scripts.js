const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    // fetch retorna uma promise, então temos que encadear um then para conseguir acessar
    // esse then precisa pegar essa resposta e converter para json.
    // contudo, o método acima resulta em outra promisse que temos que acessar com outro then
    // para conseguirmos visualizar no console.

const generetePokemonPromises = () => Array(150).fill().map((_,index) =>  
    fetch(getPokemonUrl(index + 1)).then(response => response.json()))

const generateHTML = pokemons => {
    return pokemons.reduce((accumulator, pokemon) => {
        const types = pokemon.types.map(typeInfo => typeInfo.type.name)

        accumulator += `
            <li class="card ${types[0]}">
            <img class = "card-image " alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png"
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card-subtitle">${types.join(' | ')}</p>
            </li>
        `

        return accumulator
    }, '')
}

const insertPokemonIntoPage = pokemons => {
    const ul = window.document.querySelector('ul.pokedex')
    ul.innerHTML = pokemons

}

const pokemonPromises = generetePokemonPromises();

Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonIntoPage)
