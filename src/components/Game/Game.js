import React from "react";
import "./Game.css";
import Card from "../Card/Card";
import table from "../../data/table.json";
import Status from "../Status/Status";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardArray: [],
            rightCards: [],
            nRightCards: 0,
            time: 0,
            tries: 0,
            nVisible: 0,
            cardType: 0,
            right: true,
            timer: null,
            idx: -1,
        };
        //function needs to be bound to be used in child component (Card.js)
        this.clickCard = this.clickCard.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    componentWillMount() {
        console.log("DEBUG: componentWillMount");
        this.updateUser();
    }

    updateUser() {
        //     console.log("DEBUG: updateUser");
        //     var _idx = this.checkUser();
        //     if (_idx === -1) {
        //         var _pNames = JSON.parse(localStorage.getItem("pNames"));
        //         _idx = _pNames.push(this.props.pName) - 1;
        //         this.setState({ idx: _idx });
        //         localStorage.setItem("pNames", JSON.stringify(_pNames));
        this.resetGame();
        //     } else {
        //         this.setState({
        //             cardArray: JSON.parse(localStorage.getItem("cardArrays"))[_idx],
        //             rightCards: JSON.parse(localStorage.getItem("rightCards"))[
        //                 _idx
        //             ],
        //             nRightCards: JSON.parse(localStorage.getItem("nRightCards"))[
        //                 _idx
        //             ],
        //             time: JSON.parse(localStorage.getItem("times"))[_idx],
        //             tries: JSON.parse(localStorage.getItem("tries"))[_idx],
        //             nVisible: JSON.parse(localStorage.getItem("nVisibles"))[_idx],
        //             cardType: JSON.parse(localStorage.getItem("cardTypes"))[_idx],
        //             right: JSON.parse(localStorage.getItem("rights"))[_idx],
        //             timer: JSON.parse(localStorage.getItem("timers"))[_idx],
        //             idx: _idx,
        //         });
        //     }
    }

    // checkUser() {
    //     var local = JSON.parse(localStorage.getItem("pNames"));
    //     if (local === null) {
    //         localStorage.setItem("pNames", JSON.stringify([]));
    //         localStorage.setItem("cardArrays", JSON.stringify([]));
    //         localStorage.setItem("rightCards", JSON.stringify([]));
    //         localStorage.setItem("nRightCards", JSON.stringify([]));
    //         localStorage.setItem("times", JSON.stringify([]));
    //         localStorage.setItem("tries", JSON.stringify([]));
    //         localStorage.setItem("nVisibles", JSON.stringify([]));
    //         localStorage.setItem("cardTypes", JSON.stringify([]));
    //         localStorage.setItem("rights", JSON.stringify([]));
    //         localStorage.setItem("timers", JSON.stringify([]));
    //     }
    //     local = JSON.parse(localStorage.getItem("pNames"));
    //     var idx = -1;
    //     local.forEach((name, index) => {
    //         if (name === this.props.pName) {
    //             idx = index;
    //         }
    //     });
    //     return idx;
    // }

    generateCardArray() {
        console.log("DEBUG: -> generateCardArray");
        var _cardArray = this.state.cardArray;
        for (var i = 0; i < table.length; i++) {
            _cardArray[i] = {
                cardType: table[i].cardType,
                cardState: table[i].cardState,
                styles: "card_back",
            };
        }
        this.setState({ cardArray: _cardArray });
    }

    generateRightCards() {
        var _rightCards = this.state.rightCards;
        for (var i = 0; i < table.length / 3; i++) {
            _rightCards[i] = {
                cardState: null,
            };
        }
        this.setState({ rightCards: _rightCards });
    }

    shuffleFunction() {
        console.log("DEBUG: -> shuffleFunction");
        var _cardArray = this.state.cardArray;
        _cardArray.sort(() => Math.random() - 0.5);
        this.setState({ cardArray: _cardArray });
    }

    startTimer() {
        var _timer = this.state.timer;
        _timer = setInterval(() => {
            var _time = this.state.time + 1;
            this.setState({ time: _time });
            // var _times = JSON.parse(localStorage.getItem("times"));
            // _times[this.state.idx] = _time;
            // localStorage.setItem("times", JSON.stringify(_times));
        }, 1000);
        this.setState({ timer: _timer });
        // var _timers = JSON.parse(localStorage.getItem("timers"));
        // _timers[this.state.idx] = _timer;
        // localStorage.setItem("timers", _timers));
    }

    clickCard(_position) {
        var _cardArray = this.state.cardArray;
        var _nVisible = this.state.nVisible;
        var _right = this.state.right;

        console.log("Clicked:" + _position);
        console.log(_cardArray[_position]);
        if (_cardArray[_position].cardState === "INVISIBLE" && _nVisible < 3) {
            _cardArray[_position].cardState = "VISIBLE";
            _cardArray[_position].styles =
                "card_" + _cardArray[_position].cardType;
            _nVisible++;
            this.setState({ nVisible: _nVisible });
            // var _nVisibles = JSON.parse(localStorage.getItem("nVisibles"));
            // _nVisibles[this.state.idx] = _nVisible;
            // localStorage.setItem("nVisibles", JSON.stringify(_nVisibles));

            _right = this.checkCardsType(_cardArray[_position].cardType);

            if (_nVisible === 3) {
                if (_right) {
                    this.changeRightCards(
                        "card_" + _cardArray[_position].cardType
                    );
                    _cardArray.forEach((card) => {
                        if (card.cardType === _cardArray[_position].cardType) {
                            card.styles = card.styles + " card_glow";
                        }
                    });
                }
                this.resetTable(_cardArray);
            }
            this.setState({ right: _right });
            // var _rights = JSON.parse(localStorage.getItem("rights"));
            // _rights[this.state.idx] = _right;
            // localStorage.setItem("rights", JSON.stringify(_rights));
        }
        this.setState({ cardArray: _cardArray });

        // var _cardArrays = JSON.parse(localStorage.getItem("cardArrays"));
        // _cardArrays[this.state.idx] = _cardArray;
        // localStorage.setItem("cardArrays", JSON.stringify(_cardArrays));
    }

    changeRightCards(_styles) {
        var _rightCards = this.state.rightCards;
        var _nRightCards = this.state.nRightCards + 1;
        _rightCards[this.state.nRightCards].styles = _styles;

        this.setState({
            nRightCards: _nRightCards,
            rightCards: _rightCards,
        });

        // var _nRightCardss = JSON.parse(localStorage.getItem("nRightCards"));
        // _nRightCardss[this.state.idx] = _nRightCards;
        // localStorage.setItem("nRightCards", JSON.stringify(_nRightCardss));
        // var _rightCardss = JSON.parse(localStorage.getItem("rightCards"));
        // _rightCardss[this.state.idx] = _rightCards;
        // localStorage.setItem("rightCards", JSON.stringify(_rightCardss));
    }

    resetGame() {
        this.setState({
            cardArray: [],
            rightCards: [],
            nRightCards: 0,
            time: 0,
            tries: 0,
            nVisible: 0,
            cardType: 0,
            right: true,
            timer: null,
        });
        this.generateCardArray();
        this.generateRightCards();
        this.shuffleFunction();
        this.startTimer();
        // this.resetLocalStorage();
    }

    // resetLocalStorage() {
    //     var _idx = this.state.idx;
    //     console.log(this.state.cardArray);
    //     var _cardArrays = JSON.parse(localStorage.getItem("cardArrays"));
    //     var _rightCards = JSON.parse(localStorage.getItem("rightCards"));
    //     var _nRightCards = JSON.parse(localStorage.getItem("nRightCards"));
    //     var _times = JSON.parse(localStorage.getItem("times"));
    //     var _tries = JSON.parse(localStorage.getItem("tries"));
    //     var _nVisibles = JSON.parse(localStorage.getItem("nVisibles"));
    //     var _cardTypes = JSON.parse(localStorage.getItem("cardTypes"));
    //     var _right = JSON.parse(localStorage.getItem("rights"));
    //     var _timers = JSON.parse(localStorage.getItem("timers"));

    //     _nRightCards[_idx] = 0;
    //     _times[_idx] = 0;
    //     _tries[_idx] = 0;
    //     _nVisibles[_idx] = 0;
    //     _cardTypes[_idx] = 0;
    //     _right[_idx] = true;
    //     _cardArrays[_idx] = this.state.cardArray;
    //     _rightCards[_idx] = this.state.rightCards;
    //     _timers[_idx] = this.state.timer;

    //     localStorage.setItem("cardArrays", JSON.stringify(_cardArrays));
    //     localStorage.setItem("rightCards", JSON.stringify(_rightCards));
    //     localStorage.setItem("nRightCards", JSON.stringify(_nRightCards));
    //     localStorage.setItem("times", JSON.stringify(_times));
    //     localStorage.setItem("tries", JSON.stringify(_tries));
    //     localStorage.setItem("nVisibles", JSON.stringify(_nVisibles));
    //     localStorage.setItem("cardTypes", JSON.stringify(_cardTypes));
    //     localStorage.setItem("rights", JSON.stringify(_right));
    //     localStorage.setItem("timers", JSON.stringify(_timers));
    // }

    resetTable(_cardArray) {
        var _tries = this.state.tries + 1;
        this.setState({ tries: _tries, right: true, cardType: 0 });
        setTimeout(() => {
            this.setState({ nVisible: 0 });
            // var _nVisibles = JSON.parse(localStorage.getItem("nVisibles"));
            // _nVisibles[this.state.idx] = 0;
            // localStorage.setItem("nVisibles", JSON.stringify(_nVisibles));
            // var _triess = JSON.parse(localStorage.getItem("tries"));
            // _triess[this.state.idx] = _tries;
            // localStorage.setItem("tries", JSON.stringify(_triess));
            // var _rights = JSON.parse(localStorage.getItem("rights"));
            // _rights[this.state.idx] = true;
            // localStorage.setItem("rights", JSON.stringify(_rights));
            _cardArray.forEach((card) => {
                var exists = false;
                for (var i = 0; i < this.state.nRightCards; i++) {
                    if (
                        card.styles ===
                        this.state.rightCards[i].styles + " card_glow"
                    ) {
                        exists = true;
                    }
                }
                if (!exists) {
                    card.cardState = "INVISIBLE";
                    card.styles = "card_back";
                }
            });

            // var _cardTypes = JSON.parse(localStorage.getItem("cardTypes"));
            // _cardTypes[this.state.idx] = 0;
            // localStorage.setItem("cardTypes", JSON.stringify(_cardTypes));
        }, 1000);
    }

    checkCardsType(_type) {
        var _cardType = this.state.cardType;
        if (_cardType === 0) {
            this.setState({ cardType: _type });
            // var _cardTypes = JSON.parse(localStorage.getItem("cardTypes"));
            // _cardTypes[this.state.idx] = _type;
            // localStorage.setItem("cardTypes", JSON.stringify(_cardTypes));
            return true;
        } else if (this.state.right && _cardType === _type) {
            return true;
        } else {
            return false;
        }
    }

    renderCardTable() {
        return this.state.cardArray.map((card, index) => {
            const { styles } = card;
            return (
                <Card
                    key={index}
                    onClick={() => this.clickCard(index)}
                    styles={styles}
                />
            );
        });
    }

    renderSideStatus() {
        return (
            <Status
                playerName={this.props.pName}
                tries={this.state.tries}
                time={this.state.time}
                cards={this.state.rightCards}
            />
        );
    }

    renderRightCards() {
        return this.state.rightCards.map((card, index) => {
            const { styles } = card;
            return <Card key={index} onClick={null} styles={styles} />;
        });
    }

    render() {
        return (
            <div className='Game-wrapper'>
                <div className='Table-wrapper'>{this.renderCardTable()}</div>
                <div className='Status-wrapper'>
                    {this.renderSideStatus()}
                    <div className='statusCards'>{this.renderRightCards()}</div>
                </div>
                {this.state.nRightCards === table.length / 3 ? (
                    <div className='Congrats-wrapper'>
                        {clearInterval(this.state.timer)}
                        <h1>Congratulations!</h1>
                        <p>Score: {this.state.tries * 5 + this.state.time}</p>
                        <button onClick={this.resetGame}>Play Again</button>
                    </div>
                ) : null}
            </div>
        );
    }
}

export default Game;
