import React from 'react';
import './App.css';
import Input from './Input';
import PokemonCard from './PokemonCard';
import {pascalcase} from 'pascalcase';

class App extends React.Component {

  constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: '', 
      pokemon: {
        data: '',
        loading: false,
        exists: false
      }
    }
  }

  onInputChange = (event) => {
    this.setState({name: event.target.value});
  }

  handleSubmit = async(event) => {
    event.preventDefault();
    try {
        if(this.state.name === ''){
          this.setState({pokemon: {data: '', exists: false}});
        } else {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.state.name}`);
          if(response.status === 404){
            this.setState({pokemon: {exists: false}});
          }
          const result = await response.json();
          console.log(result);
          this.setState({pokemon: {data: result, exists: true}});
        }
    } catch (error) {
        console.log(error);
    }
}

  render() {
    let pokemonImageURL = null;
    let pokemonName = null;
    let dexEntry = null;
    let types = [];
    if(!this.state.pokemon.loading && this.state.pokemon.exists){
      pokemonImageURL = this.state.pokemon.data.sprites.other["official-artwork"]["front_default"];
      pokemonName = pascalcase(this.state.pokemon.data.name);
      dexEntry = this.state.pokemon.data.id;
      types = this.state.pokemon.data.types;
    }

    let result;

    if(this.state.name !== '' || this.state.pokemon.exists){
      if(this.state.pokemon.exists && !this.state.pokemon.loading){
        result = <PokemonCard 
                    name={pokemonName}
                    id={dexEntry}
                    types={types}
                    imageSource={pokemonImageURL}
                    info=""/>
      } else {
        result = <p className='error'>Pokémon doesn't exist!</p>
      }
    } 

    return (
      <>
        <div className='background-image'></div>
        <main className='main-container'>
          <h1>Find a Pokémon!</h1>
          <Input 
            handleSubmit={this.handleSubmit}
            name={this.state.name}
            pokemon={this.state.pokemon}
            onInputChange={this.onInputChange} />
            { result }
        </main>
      </>
    );
  }
}

export default App;
