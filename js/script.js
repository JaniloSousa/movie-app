const formPesquisa = document.getElementById("form") // pegando via DOM o meu input do form
const movie_cover = document.getElementById("cover") // pegando o título do filme
const movie_title = document.getElementById("title") // pegando o cover do filme

formPesquisa.onsubmit = async (e) => {
    e.preventDefault() // resetando todas as configurações padrões do evento

    const pesquisa = e.target.pesquisa.value // pegando o valor da pesquisa do input

    // tratando o caso de o usuário ter feito uma pesquisa vazia
    if (pesquisa == "") {
        alert("Preencha o campo")
        return

    } else {
        const apiKey = '8fa8be48' // chave pública da API
        const apiUrl = `https://www.omdbapi.com/?s=${pesquisa}&apikey=${apiKey}` // url da API

        const res = await fetch(apiUrl) // consulta API

        const data = await res.json() // convertendo o retorno da consulta em formato json. um array com todos os filmes retornados da minha pesquisa

        console.log(data)

        loadMovies(data) // passando os dados para uma função que vai inserir os dados no nosso template
    }

}

function loadMovies(data) {
    let movies_list = document.getElementById("movies-list") // pegando a div que vai conter todos os meus filmes
    movies_list.innerHTML = "" // esvaziando a lista que vai conter todos os meus filmes

    // percorrendo o array que tem todos os meus filmes
    data.Search.forEach(movie => {
        let movie_div = document.createElement("div") // criando um objeto div e jogando dentro da minha variável 'movie_card'
        movie_div.classList.add("movie-card") // adicionado uma classe a essa div chamada 'movie_card'

        movie_div.innerHTML = `
        <img src="${movie.Poster}" />
        <h2>${movie.Title}</h2>
        ` // inserindo conteúdo HTML dentro dessa div('movie_card')

        movies_list.appendChild(movie_div) // fazendo ela fazer parte da minha div 'movies_list'
    })
}