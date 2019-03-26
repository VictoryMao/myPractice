import React, { Component, Fragment } from  'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css';
class App extends Component {
    constructor (props) {
        super(props);
        this.state = {
            list: []
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }

    render () {
        const { show } = this.state
        return (
            <Fragment>
                <TransitionGroup>
                    {
                        this.state.list.map((item, index) => (
                            <CSSTransition
                                in={show}
                                timeout={1000}
                                classNames='fade'
                                unmountOnExit
                                onEntered={(el) => { el.style.color='blue'}}
                                appear={true}
                                key={index}
                            >
                            <div>{item}</div>
                            </CSSTransition>
                        ))
                     }
                </TransitionGroup>
                <button onClick={this.handleAddItem}>toggle</button>
            </Fragment>
        )
    }

    handleToggle () {
        this.setState((prevState) => ({
            show: !prevState.show
        }))
    }

    handleAddItem () {
        this.setState((prevState) => {
            return {
                list: [...prevState.list, 'item']
            }
        })
    }
}

export default App;