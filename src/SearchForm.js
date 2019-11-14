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

const dummyData = [
    new SearchResult("wii", "149", "amazon.com/xbox-1"),
    new SearchResult("wii", "121", "seattle.craigslist.org/used-wii-3"),
    new SearchResult("waffle maker", "21", "seattle.craigslist.org/good-waffle-maker-3"),
    new SearchResult("waffle maker", "49", "ebay.com/really-good-waffle-maker")
];

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',          // user input in the search box
            site: 'all',        // site(s) to search
            min: '',            // min price
            max: ''             // max price
        };

        // API objects
        this.craigsList = new CraigsList();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
            site: this.state.site,
            min: this.state.min,
            max: this.state.max
        });
    }

    handleSubmit(event) {       // triggers when form is submitted
        let results = [];       // array of SearchResult objects

        // Call APIs, fill in results with the returned information

        // Amazon

        // Ebay

        // Craigslist

        // Render results to webpage

        // Testing
        for (let i = 0; i < dummyData.length; i++) {
            if (dummyData[i].name === this.state.value) {
                results.push(dummyData[i]);
            }
        }
        //

        let items = [];     // contains JSX <li> objects
        for (let i = 0; i < results.length; i++) {
            console.log(results[i].price);
            let flag = false;

            if (this.state.min.length > 0 && this.state.max.length > 0) {
                let min = parseInt(this.state.min, 10);
                let max = parseInt(this.state.max, 10);
                if (parseInt(results[i].price, 10) >= min && parseInt(results[i].price, 10) <= max )
                {
                    flag = true;
                }
                else {
                    flag = false;
                }
            }
            else if (this.state.min.length > 0) {
                let min = parseInt(this.state.min, 10);
                if (parseInt(results[i].price, 10) >= min) {
                    flag = true;
                } else {
                    flag = false;
                }
            }
            else if (this.state.max.length > 0) {
                let max = parseInt(this.state.max, 10);
                if (parseInt(results[i].price, 10) <= max) {
                    flag = true;
                } else {
                    flag = false;
                }
            }
            else {              // neither min nor max set
                flag = true;
            }

            if (flag === true) {
                items.push(<li key={i}>Name: {results[i].name}, Price: {results[i].price}, Site: {results[i].site}</li>);
            }
        }

        if (items.length > 0) {
            ReactDOM.render(
                <ul>
                    {items}
                </ul>,
                document.getElementById('results')
            );
        } else {
            ReactDOM.render(
                <p>

                </p>,
                document.getElementById('results')
            );
            alert('No results found');
        }

        event.preventDefault();     // not sure what this does...
    }

    handleRadioChange(event) {
        this.setState({
            value: this.state.value,
            site: event.target.value,
            min: this.state.min,
            max: this.state.max
        })
    }

    handleMinChange(event) {
        this.setState({
            value: this.state.value,
            site: this.state.site,
            min: event.target.value,
            max: this.state.max
        })
    }

    handleMaxChange(event) {
        this.setState({
            value: this.state.value,
            site: this.state.site,
            min: this.state.min,
            max: event.target.value
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

                    Price: <input type="number" name="min_price" placeholder="min" className ="PriceRange" title="Enter whole
                    number, no letters, no symbols" value={this.state.min} onChange={this.handleMinChange}/>
                    ~<input type="number" name="max_price" placeholder="max" className ="PriceRange" title="Enter whole
                    number, no letters, no symbols" value={this.state.max} onChange={this.handleMaxChange}/><br /><br />

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
