import React from "react";
import './Input.css';

class Input extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         name: '',
    //     }
    // }

    render(){
        return (
            <div className="input-container">
            <h2>Search for a Pokémon: </h2>
            <form onSubmit={this.props.handleSubmit} className='form-container'>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" 
                        name="name" 
                        id="name" 
                        value={this.props.name} 
                        onChange={this.props.onInputChange} 
                        className="input-field"
                    />
                </div>
                <button type="submit" className="submit-btn">Find Pokémon</button>
            </form>
        </div>
        );
    }
}

export default Input;