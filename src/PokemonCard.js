import React from "react";
import './PokemonCard.css';

class PokemonCard extends  React.Component {

    render(){
        let typeList = <div></div>
        if(this.props.types.length !== 0){
            typeList = this.props.types.map((type) =>
                <div key={type.slot} className={type.type.name}>{type.type.name.toUpperCase()}</div> 
            );
        }

        return (
            <div className="pokemon-card">
                <img src={this.props.imageSource}
                alt={this.props.name}
                width="256"
                height="256"
                className="pokemon-image"></img>
                <div className="pokemon-stats">
                    <p>#{this.props.id}</p>
                    <p>{this.props.name}</p>
                    <div className="types">
                        {this.props.types.length > 0 && typeList}
                    </div>
                </div>
            </div>
        );
    }
}

export default PokemonCard;