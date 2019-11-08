import React from 'react';
import ReactDOM from 'react-dom';
import SearchResult from "./SearchResult";
import Ebay from './Ebay';
import CraigsList from './Craigslist';
import './SearchForm.css';

const inputStyle = {        // styling for search input box
    width: '300px',
    fontSize: 'large',
    border: 'solid black 3px'
};

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',      // user input in the search box
            site: 'all'     // site(s) to search
        };

        // API objects
        this.craigsList = new CraigsList();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
            site: this.state.site
        });
    }

    handleSubmit(event) {       // triggers when form is submitted
        let phase1 = true;      // change this once other APIs are implemented
        let results = [];       // array of SearchResult objects

        // Call APIs, fill in results with the returned information

        // Amazon

        // Ebay

        // Craigslist
        if (this.state.site === 'craigslist' || phase1 === true) {
            console.log("Calling Craigslist API...");
            //results = this.craigsList.searchItem(this.state.value);
        }

        // Render results to webpage
        let items = [];     // contains JSX <li> objects
        /*for (let i = 0; i < results.length; i++) {
            console.log(results[i].price);
            items.push(<li key={i}>Name:{results[i].name}, Price:{results[i].price}, Site:{results[i].site}</li>);
        }

        ReactDOM.render(
            <ul>
                {items}
            </ul>,
            document.getElementById('results')
        );*/

        ReactDOM.render(    // deprecated
            <h1>{"Searching for " + this.state.value + " on " + this.state.site}</h1>,
            document.getElementById('results')
        );

        event.preventDefault();     // not sure what this does...
    }

    handleRadioChange(event) {
        this.setState({
            value: this.state.value,
            site: event.target.value
        })
    }

    render() {
        return (
            <div className="SearchForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input style={inputStyle} type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Search" /><br /><br />

                    <label className="radio-inline">
                        <input type="radio" name="site" value="all" onChange={this.handleRadioChange} defaultChecked />  All
                    </label>

                    <label className="radio-inline">
                        <input type="radio" name="site" value="amazon" onChange={this.handleRadioChange} />  Amazon
                    </label>

                    <label className="radio-inline">
                        <input type="radio" name="site" value="ebay" onChange={this.handleRadioChange} />  Ebay
                    </label>

                    <label className="radio-inline">
                        <input type="radio" name="site" value="craigslist" onChange={this.handleRadioChange} />  Craigslist
                    </label>
                </form>
            </div>
        );
    }
}

export default SearchForm;