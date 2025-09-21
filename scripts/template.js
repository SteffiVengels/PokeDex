function getPokemonListBoxTemplate(index) {
    let pokemon;
    if (searchedPokemons.length > 0) {
        pokemon = searchedPokemons;
    } else {
        pokemon = pokemonData;
    }
    return `
        <div class="pokemon-list-box" onclick="openOverlay(event, ${index})">
            <div class="pokemon-list-box-top">
                <img src="${pokemon[index].image}" alt="">
            </div>
            <div class="pokemon-list-box-bottom">
                <div>
                    <p class="pokemon-id">${pokemon[index].id}</p>
                    <p class="pokemon-name">${pokemon[index].name}</p>
                </div>
                <div class="type">
                ${pokemon[index].types.map((type) => `<p class="base ${type}">${type}</p>`).join('')}
                </div>
            </div>
        </div>
    `
}

function getDialogTemplate(index) {

    if (usingSearchedPokemons) {
        pokemon = searchedPokemons
    } else { 
        pokemon = pokemonData
    }
    if (index > 0) {
        prevPokemon = pokemon[index - 1];  
    } else {
        prevPokemon = pokemon[pokemon.length-1];  
    }
    currentPokemon = pokemon[index];
    if (index < pokemon.length - 1) {
        nextPokemon = pokemon[index + 1];  
    } else {
        nextPokemon = pokemon[0]; 
    }
    return`
    <div id="dialog" class="dialog">
                <div id="bodyDialog">
                    <div class="bodyDialogLeft">
                        <div id="headDialogSideLeft" class="headDialogSide">
                            <div class="pokemonPreview left">
                                <button class="sliderPokemonButton m-right" onclick="getBackPokemon(event, ${index})">
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white svgColor" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m15 19-7-7 7-7" />
                                    </svg>
                                </button>
                                <p class="idPreview">${prevPokemon.id}</p>
                                <p class="namePreview">${prevPokemon.name}</p>
                            </div>
                        </div>
                    </div>
                    <div class="bodyDialogMiddle">
                        <div class="bodyDialogMiddleTop">
                            <button class="closeButton" onclick="closeDialog()">Close</button>
                            <p class="pokemon-id f-2_4vw">${currentPokemon.id}</p>
                            <p class="pokemon-name-overlay">${currentPokemon.name}</p>
                        </div>
                        <img src="${currentPokemon.image}" alt="">
                    </div>
                    <div class="bodyDialogRight">
                        <div class="pokemonPreview right">
                            <p class="namePreview">${nextPokemon.name}</p>
                            <p class="idPreview">${nextPokemon.id}</p>
                            <button class="sliderPokemonButton m-left" onclick="getNextPokemon(event, ${index})">
                                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                    viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="2" d="m9 5 7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="dialogTypeSection">
                    ${currentPokemon.types.map(type =>
                        `<p class="baseOverlay ${type}">${type}</p>`
                    ).join('')}
                </div>
                <div class= "menuOverlay">
                    <p onclick="openMain(currentPokemon)">Main</p>
                    <p onclick="openStatus(currentPokemon)">Status</p>
                </div>
                <div class="pokemonInfos" id="pokemonInfos">
                </div>
            </div>
    `
}

function openMainTemplate(currentPokemon) {
    return `
                <div class="dialogMain">
                <div class="dialogMainDiv">
                    <div class="m_24">
                        <p class="dialogMainDivHead">Height</p>
                        <p>${currentPokemon.height} m</p>
                    </div>
                    <div class="m_24">
                        <p class="dialogMainDivHead">Category</p>
                        <p>${currentPokemon.genusData}</p>
                    </div>
                </div>
                <div class="dialogMainDiv">
                    <div class="m_24">
                        <p class="dialogMainDivHead">Weight</p>
                        <p>${currentPokemon.weight} kg</p>
                    </div>
                    <div class="m_24">
                        <p class="dialogMainDivHead">Gender</p>
                        <p class="gender">${currentPokemon.genderSVG}</p>
                    </div>
                    <div class="m_24">
                        <p class="dialogMainDivHead">Abilites</p>
                        ${currentPokemon.abilities.map((ability) => `<p>${ability}</p>`).join('')}
                    </div>
                </div>
                <div class="dialogMainDiv">
                </div>
            </div>
    `
}

function openStatusTemplate(currentPokemon) {
    return`
            <div class="bodyDialogRightBottom">
                <div class="status">
                    <div class="pokemon-status" value="${currentPokemon.hp}">
                        <p>HP</p>
                        <div class="pokemon-status_scale-box">
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                        </div>
                    </div>
                    <div class="pokemon-status" value="${currentPokemon.attack}">
                        <p>Attack</p>
                        <div class="pokemon-status_scale-box">
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                        </div>
                    </div>
                    <div class="pokemon-status" value="${currentPokemon.defense}">
                        <p>Defense</p>
                        <div class="pokemon-status_scale-box">
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                        </div>
                    </div>
                    <div class="pokemon-status" value="${currentPokemon.specialAttack}">
                        <p>Special Attack</p>
                        <div class="pokemon-status_scale-box">
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                        </div>
                    </div>
                    <div class="pokemon-status" value="${currentPokemon.specialDefense}">
                        <p>Special Defense</p>
                        <div class="pokemon-status_scale-box">
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                        </div>
                    </div>
                    <div class="pokemon-status" value="${currentPokemon.speed}">
                        <p>Speed</p>
                        <div class="pokemon-status_scale-box">
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                            <span class="pokemon-status_scale"></span>
                        </div>
                    </div>
                </div>
            </div>
    `
}