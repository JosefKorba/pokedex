const pokedex = document.getElementById("pokedex");

// Function to fetch pokemon data from the API
const catchPokemon = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  return fetch(url).then((res) => res.json());
};

// Function to display Pokemon data as cards
const displayPokemon = (pokemon) => {
  const pokemonArray = Array.isArray(pokemon) ? pokemon : [pokemon];

  const pokemonHTMLString = pokemonArray
    .map((pal) => {
      const firstLetter = pal.name.charAt(0).toUpperCase();
      const firstLetterCaps = firstLetter + pal.name.slice(1);

      return `<li class="main__card">
                <img class="main__card-image" src="${pal.sprites.front_default}"/>
                <h2 class="main__card-title">${pal.id}. ${firstLetterCaps}</h2>
            </li>`;
    })
    .join("");
  pokedex.insertAdjacentHTML("beforeend", pokemonHTMLString);
};

// Fetch data for the first 151 Pokemon
const pokemonPromises = Array.from({ length: 151 }, (_, i) =>
  catchPokemon(i + 1)
);

// Display all fetched Pokemon data
Promise.all(pokemonPromises).then((pokemonArray) => {
  displayPokemon(pokemonArray);
});

// Search pokemon
document.getElementById("search-button").addEventListener("click", function () {
  const searchTerm = document
    .querySelector(".header__search")
    .value.toLowerCase();
  const pokemonList = document.querySelectorAll(".main__card");

  pokemonList.forEach((pokemonCard) => {
    const pokemonName = pokemonCard
      .querySelector(".main__card-title")
      .textContent.toLowerCase();
    if (pokemonName.includes(searchTerm)) {
      pokemonCard.style.display = "block";
    } else {
      pokemonCard.style.display = "none";
    }
  });
});
