console.log("Hello world!");
const cardsContainer = document.querySelector("#cards-container");

fetch("https://pokeapi.co/api/v2/pokemon")
    .then(response => {
        return response.json()
    })
    .then(data => {
        // console.log(data)
        const pokemons = data.results;
        console.log(pokemons)

        pokemons.forEach(pokemon => {
            // console.log(pokemon.url)
            fetch(pokemon.url)
                .then(singleResponse => {
                    return singleResponse.json()
                })
                .then(singleData => {
                    console.log(singleData.name.slice(0, 1).toUpperCase() + singleData.name.slice(1))
                    const newPokemon = `
                        <div class="pokemon-card">
                            <div class="image">
                                <img src=${singleData.sprites.other["official-artwork"].front_default} alt="Pokemon" />
                            </div>
                            <div class="content">
                                <div class="intro">
                                    <span>#${singleData.id}</span>
                                    <span>${singleData.name}</span>
                                </div>
                                <div><strong>Type:</strong> ${singleData.types.map(eachType => eachType.type.name).join(", ")}</div>
                                <div><strong>Weight:</strong> ${singleData.weight} | <strong>Height:</strong> ${singleData.height}</div>
                                <div><strong>Abilities:</strong> ${singleData.abilities.map(eachAbility => eachAbility.ability.name).join(", ")}</div>
                            </div>
                        </div>
                    `;

                    cardsContainer.innerHTML += newPokemon;
                })
        })
    })
    .catch(error => {
        console.log(error)
    })