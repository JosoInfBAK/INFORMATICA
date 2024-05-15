// Path: src/components/input.js

import React, { Component } from 'react';
export default class InputP extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: '',
            suggestions: []
        };
    }

    handleChange = ({ target: { value } }) => {
        fetch('https://api.github.com/search/users?q=' + value)
            .then(res => res.json())
            .then(data => {
                this.setState({ suggestions: data.items });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    render() {
        return (
            <>
                <input onChange={this.handleChange} value={this.state.inputVal} />
                <ul id="suggestions">
                    {this.state.suggestions.map((sugg) => {
                        return <li>{sugg.login}</li>;
                    })}
                </ul>
            </>
        );
    }
}


``