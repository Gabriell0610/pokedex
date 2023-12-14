//Função que armazena os detalhes do pokemon em um objeto
function pokedexPokemonsDetails(pokemonDetails) {
    //Percorrendo o objeto pokemonDetails, e cada item do objeto é transformado em uma lista HTML pela função 
    //createListPokemon e sem nenhum separador pelo método 'join' 
    const newHTLM = pokemonDetails.map((pokemon) => {
        const newPokemon =  {
            number: pokemon.id,
            name: pokemon.name,
            types: pokemon.types.map((indexSlot) => indexSlot.type.name),
            type: pokemon.types[0].type.name,
            photo: pokemon.sprites.other.dream_world.front_default
        }

        //Toda vez que os detalhes de um pokemon são armazenados no objeto, ele retorna a função que faz o DOM 
        //com o objeto como parâmetro
        return createListPokemon(newPokemon)
    }).join('') //Método que deixa sem separador cada card de pokemon


    //E o pai do DOM recebe esse novo HTML
    cardPokemons.innerHTML += newHTLM
}

//Função que pega os detalhes do pokemon e coloca dentro do HTML
function createListPokemon(pokemon) {
    return `
    <li class="pokemon ${pokemon.type} ">
        <span class="number">#${pokemon.number}</span>
        <span class="name"> ${pokemon.name}</span>

        <div class="details">
            <ol class="types ">
                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
            </ol>
            <img src=${pokemon.photo}>
        </div>
    </li>`
}

