import { PokemonCard, _SimplePokemon } from ".."

interface Props {
    pokemons: _SimplePokemon[];
}

export const PokemonGrid = ({ pokemons } : Props) => {
    return (
        <div className="flex flex-wrap gap-10 items-center justify-center">
            {
                pokemons.map(pokemon => (
                    // <span key={pokemon.id}>Poke</span>
                    <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                ))
            }
        </div>
    )
}
