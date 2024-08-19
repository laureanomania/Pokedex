document.addEventListener("DOMContentLoaded", () => {
  const selectedList = document.getElementById("selectedList");
  const apiBaseUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";
  let selectedPokemons = [];

  function loadSelectedPokemons() {
    selectedPokemons =
      JSON.parse(localStorage.getItem("selectedPokemons")) || [];
    displaySelectedPokemons();
  }

  function fetchPokemonDetails(id) {
    return fetch(`${apiBaseUrl}/${id}`)
      .then((response) => response.json())
      .then((data) => {
        return {
          id: data.id,
          name: data.name,
          sprites: data.sprites,
        };
      })
      .catch((error) => {
        console.error(`Error fetching details for Pokémon ID ${id}:`, error);
        return null;
      });
  }

  function displaySelectedPokemons() {
    selectedList.innerHTML = "";
    selectedPokemons.forEach((pokemon) => {
      if (pokemon) {
        const selectedCard = document.createElement("div");
        selectedCard.className = "selected-card";
        selectedCard.dataset.id = pokemon.id;

        const pokemonImage = document.createElement("img");
        pokemonImage.src = pokemon.sprites.front_default;
        pokemonImage.alt = pokemon.name;
        pokemonImage.className = "pokemon-image";

        const pokemonName = document.createElement("h3");
        pokemonName.textContent =
          pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar";
        removeButton.addEventListener("click", () => removePokemon(pokemon.id));

        selectedCard.appendChild(pokemonImage);
        selectedCard.appendChild(pokemonName);
        selectedCard.appendChild(removeButton);

        selectedList.appendChild(selectedCard);
      }
    });
  }

  function removePokemon(id) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF5733",
      cancelButtonColor: "#C70039",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      customClass: {
        title: "swal-title",
        content: "swal-content",
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        selectedPokemons = selectedPokemons.filter(
          (pokemon) => pokemon.id !== id
        );

        displaySelectedPokemons();
        saveSelectedPokemons();

        Swal.fire("¡Eliminado!", "El Pokémon ha sido eliminado.", "success");
      }
    });
  }

  function saveSelectedPokemons() {
    localStorage.setItem("selectedPokemons", JSON.stringify(selectedPokemons));
  }

  loadSelectedPokemons();
});
