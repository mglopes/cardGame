import React from "react";
import "./Status.css";
//import Card from "../Card/Card";

class Status extends React.Component {
    render() {
        var minutes = Math.floor(this.props.time / 60);
        var seconds = this.props.time - minutes * 60;
        return (
            <div className='statusPlayer'>
                <h3>{this.props.playerName}</h3>
                <p>
                    Tries: {this.props.tries} Time elapsed: {minutes}:
                    {("0" + seconds).slice(-2)}
                </p>
            </div>
        );
    }
}

export default Status;
