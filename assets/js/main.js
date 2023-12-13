//Função que percorre os indices de cada types e pega a propriedade type e name 
function convertPokemonTypes(pokemonTypes) {
    //Pegando o nome do primeiro tipo de habilidade do pokemon
    const type = pokemonTypes[0].type.name

    //Percorrendo a propriedade types de cada pokemon e pegando a propriedade name de cada index
    //E retornando uma string com as informações para o HTML
    return pokemonTypes.map((indexSlot) => `<li class="type ${type}">${indexSlot.type.name}</li>`)
    
}

//Função que pega o nome do primeiro tipo de habilidade do pokemon
function typePokemon(pokemon) {
    //Esse tipo será usado para controlar a cor de fundo dos pokemons
    const nameType = pokemon.types[0].type.name
    return nameType
}

//Função que retorna a imagem de cada pokemon
function imgUrlApi(pokemon) {
    return pokemon.sprites.other.dream_world.front_default
}


//Função que pega os detalhes do pokemon e coloca dentro do HTML
function createListPokemon(pokemon) {
    //A variável type armazena o nome do primeiro tipo de habilidade do pokemon
    const type = typePokemon(pokemon)

    // Essa variável photo armazena a imagem de cada pokemon
    const photo = imgUrlApi(pokemon)

    return `
    <li class="pokemon ${type}">
        <span class="number">#00${pokemon.id}</span>
        <span class="name"> ${pokemon.name}</span>

        <div class="details">
            <ol class="types ">
                ${convertPokemonTypes(pokemon.types).join('')}
            </ol>
            <img src=${photo}>
        </div>
    </li>`
}

