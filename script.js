document.addEventListener("DOMContentLoaded", function () {
    const apiDataElement = document.getElementById("apiData");
    const searchButton = document.getElementById("searchButton");
    const pokemonIdInput = document.getElementById("pokemonId");
    const pokemonImageElement = document.getElementById("pokemonImage");

    searchButton.addEventListener("click", function () {
        const pokemonId = pokemonIdInput.value.trim();

        // URL de la API de Pokémon para obtener información de un Pokémon por su ID
        const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

        // Realiza una solicitud GET a la API
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('La solicitud no fue exitosa');
                }
                return response.json();
            })
            .then((data) => {
                // Accede a los datos específicos que deseas mostrar
                const pokemonName = data.name;
                const pokemonAbilities = data.abilities.map(ability => ability.ability.name).join(", ");

                // Muestra los datos en la página
                apiDataElement.innerHTML = `<h2>Nombre del Pokémon: ${pokemonName}</h2><p>Habilidades: ${pokemonAbilities}</p>`;

                // Formatea el ID del Pokémon para tener tres dígitos
                const formattedId = pokemonId.padStart(3, '0');

                // Construye la URL de la imagen basada en el ID
                const imageUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formattedId}.png`;

                // Crea un elemento de imagen y establece su atributo src
                const pokemonImage = document.createElement("img");
                pokemonImage.src = imageUrl;

                // Limpia cualquier imagen previa
                pokemonImageElement.innerHTML = "";

                // Agrega la imagen al elemento en la página
                pokemonImageElement.appendChild(pokemonImage);
            })
            .catch((error) => {
                console.error("Error al obtener los datos de la API:", error);
            });
    });
});