const loadPageBtn = document.querySelector('#loadmore-btn')
const cardPokemons = document.querySelector('.card-pokemons')


const maxRecords = 151
const limit = 10
let offset = 0

//Função que inicializa a url de acordo com o valor do limit e offset, sendo ele pad~rao ou alterado pelo usuário ao clicar
//no botão loadMore
function loadPokemonPage(limit,offset) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    getResUrl(url)
}


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

//Chamando essa função para aparecer os primeiros pokemons
loadPokemonPage(limit, offset)


//Pegando a resposta de todas as url's de detalhe dos pokemons 
async function getDetailsUrl(results) {
    //O await antes da Promise garante que todas as promessas serão feitas primeiro antes de serem
    //armazenadas na variável pokemonDetails e o Pomisse.all serve para que não tenha dados incompletos ou fora de ordem 
    const pokemonDetails = await Promise.all(results.map(async (pokemon) => {
        const urlPokemon = pokemon.url
        const response = await fetch(urlPokemon)
        const result = await response.json()
        return result
    }))
    
    console.log(pokemonDetails)
    //Função que armazena os detalhes do pokemon em um objeto
    pokedexPokemonsDetails(pokemonDetails)

    //Função que mostra mais detalhes do pokemon no modal
    detailsPokemonFunction(pokemonDetails)
    
}



//Eventos
loadPageBtn.addEventListener('click', () => {
    //Quando o botão receber um click o offset concatena com o limite, ou seja,
    //Ele irá carregar + 10 pokemons
    offset += limit
    
    const qtdNexPage = offset + limit;

    if(qtdNexPage >= maxRecords) {
       
        const newLimit = maxRecords - offset
        loadPokemonPage(newLimit, offset)
        loadPageBtn.remove()
        
    }else {
        loadPokemonPage(limit, offset)

    }
})