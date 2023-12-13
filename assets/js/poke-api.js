const loadPageBtn = document.querySelector('#loadmore-btn')
const cardPokemons = document.querySelector('.card-pokemons')

const limit = 8
let offset = 0

function loadPokemonPage(limit,offset) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    getResUrl(url)
}

//Chamando essa função para aparecer os cincos primeiros pokemons
loadPokemonPage(limit, offset)

//Pegando a resposta da url
async function getResUrl (url){
    try {
        const response = await fetch(url);
        const data = await response.json()
        const results = data.results
        console.log(results)

        //Chamando a função que pega a reposta da url de detalhe de cada pokemon
        await getDetailsUrl(results)

    } catch (error) {
        console.log(error)
    }
}


//Pegando a resposta de todas as url's de detalhe dos pokemons 
async function getDetailsUrl(results) {
    //O await antes da Promise garante que todas as promessas serão feitas primeiro antes de serem
    //armazenadas na variável pokemonDetails e para que não tenha dados incompletos ou fora de ordem 
    const pokemonDetails = await Promise.all(results.map(async (pokemon) => {
        const urlPokemon = pokemon.url
        const response = await fetch(urlPokemon)
        const result = await response.json()
        return result
    }))
    
    console.log(pokemonDetails)

    //Percorrendo o objeto pokemonDetails, e cada item do objeto é transformado em uma lista HTML pela função createListPokemon
    //e sem nenhum separador pelo método 'join'
    const newHTLM = pokemonDetails.map(createListPokemon).join('')

    //E o pai do DOM recebe esse novo HTML
    cardPokemons.innerHTML += newHTLM
}


loadPageBtn.addEventListener('click', () => {
    offset += limit
    loadPokemonPage(limit, offset)
})