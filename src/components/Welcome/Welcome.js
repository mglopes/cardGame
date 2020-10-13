import React from "react";
import "./Welcome.css";

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { onClick } = this.props;
        return (
            <div className='Welcome-wrapper'>
                <div className='Welcome-input'>
                    <input type='text' id='pName' placeholder='Name' />
                    <button onClick={onClick}>Play Game</button>
                </div>
            </div>
        );
    }
}
export default Welcome;
