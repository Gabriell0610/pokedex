const modalPokemon = document.querySelector('.modal-pokemon')

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
            photo: pokemon.sprites.other.dream_world.front_default,
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
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name"> ${pokemon.name}</span>

        <div class="details">
            <ol class="types ">
                ${pokemon.types.map((type) => `<li class="type ${pokemon.type}">${type}</li>`).join('')}
            </ol>
            <img src=${pokemon.photo}>
        </div>
        <div class="btn-details-container">
            <button class="btn-details" data-id=${pokemon.number}>Detalhes</button>
        </div>
    </li>`

}


function detailsPokemonFunction(pokemonsDetails) {
    document.addEventListener('click', (e) => {
       if(e.target.classList.contains('btn-details')) {
            modalPokemon.classList.add('modal-show')
            const idPokemon = e.target.dataset.id
            console.log(idPokemon)
            const pokemonIndex = pokemonsDetails.findIndex((pokemon) =>  {
                return pokemon.id == idPokemon
            })

          const pokemonClicked = pokemonsDetails[pokemonIndex]
          console.log(pokemonClicked)

          const newPokemonDetails = {
            height: pokemonClicked.height,
            weight: pokemonClicked.weight,
            abilities: pokemonClicked.abilities.map((index) => index.ability.name),
            photo: pokemonClicked.sprites.other.dream_world.front_default,
            type: pokemonClicked.types[0].type.name,
            number: pokemonClicked.id
          }

          console.log(newPokemonDetails)

          const newHTLM = openModalPokemon(newPokemonDetails)

          modalPokemon.innerHTML = newHTLM
        
       }
   })

}

function openModalPokemon(pokemon) {

    return `
    <div class="modal-box ${pokemon.type}">
            <div class="box-img">
                <i class="fa-solid fa-xmark close-modal"></i>
                <span class="number-modal">#${pokemon.number}</span>
                <img class="img-modal" src="${pokemon.photo}" alt="">
            </div>
            <div class="box-details">
                <h2 class="title-details">Detalhes</h2>
                <div class="habilitys-container">
                    <div class="details-container">
                        <p class="type-details">Height:</p>
                        <p class="type-details">Weight:</p>
                        <p class="type-details">Abilites:</p>
                    </div>
                    <div class="details-container">
                        <p class="details-pokemon">${pokemon.height}</p>
                        <p class="details-pokemon">${pokemon.weight}</p>
                        <p class="details-pokemon">${pokemon.abilities.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    `
}

//Eventos
document.addEventListener('click', (e) => {
    e.stopPropagation()
    if(e.target.classList.contains('close-modal')) {
        modalPokemon.classList.remove('modal-show')
    }
})







