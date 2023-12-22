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

//Função que retorna os detalhes do pokemon que recebeu o click no botão
function detailsPokemonFunction(pokemonsDetails) {
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('btn-details')) {
            modalPokemon.classList.add('modal-show')

            //O botão de cada pokemon possui um atributo com o seu valor de id, se o usuário clicar no primeiro pokemon
            //seu atributo id será 1. E essa variável 'idPokemon' armazena esse Id
            const idPokemon = e.target.dataset.id
            console.log(idPokemon)

            //Armazenando na variável pokemonIndex, o index do pokemon que tem o id igual
            //ao o id do pokemon que recebeu o clique
            const pokemonIndex = pokemonsDetails.findIndex((pokemon) =>  {
                return pokemon.id == idPokemon
            })

            //A variável pokemonClicked armazena o objeto do array pokemonDetails 
            //que está no index que foi encontrado anteriormente
            const pokemonClicked = pokemonsDetails[pokemonIndex]
            console.log(pokemonClicked)

            //Um novo objeto é criado para poder armazenar as propriedades desse objeto que foi encontrado
            const newPokemonDetails = {
                height: pokemonClicked.height,
                weight: pokemonClicked.weight,
                abilities: pokemonClicked.abilities.map((index) => index.ability.name),
                photo: pokemonClicked.sprites.other.dream_world.front_default,
                type: pokemonClicked.types[0].type.name,
                number: pokemonClicked.id
                
            }
            
            console.log(newPokemonDetails.height)

            //Essa variável armazena a função openModalPokemon que retorna um html com as informações que estão
            // no objeto newPokemonDetails
            const newHTLM = openModalPokemon(newPokemonDetails)

            //O elemento pai do Modal recebe em seu html esse novo html
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







