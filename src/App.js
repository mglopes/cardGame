import React from "react";
import "./App.css";
import NavBar from "./components/Nav/NavBar";
import Game from "./components/Game/Game";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import Welcome from "./components/Welcome/Welcome";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: "welcome",
            pName: null,
        };
        //function needs to be bound to be used in child component (NavBar.js)
        this.changePage = this.changePage.bind(this);
    }

    changePage(page) {
        this.setState({
            page,
        });
    }

    startGame() {
        this.setState({
            page: "game",
            pName: document.getElementById("pName").value,
        });
    }

    render() {
        const { page } = this.state;
        return (
            <div className='App'>
                <div className='App-wrapper'>
                    <NavBar page={page} changePage={this.changePage} />
                    <div className='App-header'>
                        {page === "welcome" && (
                            <Welcome onClick={() => this.startGame()} />
                        )}
                        {page === "game" && <Game pName={this.state.pName} />}
                        {page === "leaderboard" && <LeaderBoard />}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
