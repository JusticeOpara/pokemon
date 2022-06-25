const pokedex = document.getElementById("pokedex")
const fetchPokemon = () => {
   const promises = []
   for (let i = 1; i < 150; i++) {
      const url = `https://pokeapi.co/api/v2/pokemon/${i}`
      promises.push(fetch(url).then(response => response.json()))
   }
   Promise.all(promises).then(results => {
      const pokemon = results.map((data) => ({
         name: data.name,
         id: data.id,
         image: data.sprites['front_default'],
         type: data.types.map(type => type.type.name).join(' , ')

      }))
      displayPokemon(pokemon, "POKEMON")
   })

}
const displayPokemon = (pokemon) => {
   console.log(pokemon, "POKEMON")
   const pokemonHTMLString = pokemon.map(pokeman => 
      `<li class="card">
      <img class="card-image"src="${pokeman.image}">
      <h2 class="card-title">${pokeman.id}.${pokeman.name}</h2>
      <p class="card-subtitle">Type:${pokeman.type}</p>
   </li>`).join("")
   pokedex.innerHTML = pokemonHTMLString
}

fetchPokemon()