import React from 'react';
import ReactDOM from 'react-dom';
import SearchResult from "./SearchResult";
import Ebay from './Ebay';
import CraigsList from './Craigslist';
import './SearchForm.css';

const dummyData = [
    new SearchResult("wii", "149.00", "ebay", "https://www.ebay.com/wii-1"),
    new SearchResult("wii", "121.00", "craigslist", "https://www.seattle.craigslist.org/used-wii-3"),
    new SearchResult("wii", "93.00", "craigslist", "https://www.college-station.craigslist.org/used-wii-3"),
    new SearchResult("wii", "599.00", "craigslist", "https://www.moscow.craigslist.org/cheeki-wii-VERY-GOOD"),
    new SearchResult("wii", "219.00", "craigslist", "https://www.san-francisco.craigslist.org/used-wii-3"),
    new SearchResult("wii", "145.00", "ebay", "https://www.ebay.com/used-wii-2"),
    new SearchResult("wii", "132.00", "ebay", "https://www.ebay.com/wii-7"),
    new SearchResult("wii", "135.00", "newegg", "https://www.newegg.com/wii-7"),
    new SearchResult("wii", "299.00", "craigslist", "https://www.seattle.craigslist.org/GOOD-Wii"),
    new SearchResult("wii", "159.00", "ebay", "https://www.ebay.com/used-wii-3"),
    new SearchResult("wii", "159.00", "ebay", "https://www.ebay.com/used-wii-1"),
    new SearchResult("wii", "140.00", "newegg", "https://www.newegg.com/wii-3"),
    new SearchResult("wii", "105.00", "newegg", "https://www.newegg.com/wii-7"),
    new SearchResult("wii", "103.00", "craigslist", "https://www.seattle.craigslist.org/used-wii-3"),
    new SearchResult("waffle maker", "21.00", "craigslist", "https://www.seattle.craigslist.org/good-waffle-maker-3"),
    new SearchResult("waffle maker", "49.00", "ebay", "https://www.ebay.com/really-good-waffle-maker"),
    new SearchResult("test", "9999999999.99", "ebay", "https://www.ebay.com")
];

// Constants, maybe put this in class later?
const defaultSite = 'all';
const defaultSort = 'none';

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',                          // user input in the search box
            site: defaultSite,                  // site(s) to search
            min: '',                            // min price
            max: '' ,                           // max price
            productSort: defaultSort            // sorting
        };

        // API objects
        this.craigsList = new CraigsList();

        // Misc State Vars
        this.advancedSearch = false;
        this.results = []
        this.filteredResults = [];

        // Function Binding
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSiteChange = this.handleSiteChange.bind(this);
        this.handleMinChange = this.handleMinChange.bind(this);
        this.handleMaxChange = this.handleMaxChange.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
            site: this.state.site,
            min: this.state.min,
            max: this.state.max,
            productSort: this.state.productSort
        });
    }

    handleSubmit(event) {       // triggers when form is submitted

        // Error Handling
        if (this.state.min.length > 0 && this.state.max.length > 0) {
            if (parseInt(this.state.min, 10) > parseInt(this.state.max, 10)) {
                alert("Minimum price can't be greater than maximum price");
                return;
            }
        }

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

        this.results = results;

        if (this.state.productSort.localeCompare("ascending") === 0) {      // sorting
            results.sort(function(a, b) { return parseInt(a.price, 10) - parseInt(b.price, 10); });
        } else if (this.state.productSort.localeCompare("descending") === 0) {
            results.sort(function(a, b) { return parseInt(b.price, 10) - parseInt(a.price, 10); });
        }

        let items = [];     // contains JSX <li> objects
        for (let i = 0; i < results.length; i++) {
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

            if (this.state.site.localeCompare("all") !== 0) {       // if the result is not in the specified marketplace
                if (this.state.site.localeCompare(results[i].site) !== 0) {
                    flag = false;
                }
            }

            if (flag === true) {
                //this.filteredResults.push(results[i]);
                items.push(<li key={i}>Name: {results[i].name}, ${results[i].price}, <a href={results[i].url} target="_blank">{results[i].site}</a><br /><br /></li>);
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

    handleSiteChange(event) {
        this.setState({
            value: this.state.value,
            site: event.target.value,
            min: this.state.min,
            max: this.state.max,
            productSort: this.state.productSort
        });

        if (this.results.length > 0) {
            console.log("memes");
            let items = [];
            for (let i = 0; i < this.results.length; i++) {
                let flag = true;
                if (event.target.value.localeCompare("all") !== 0) {       // if the result is not in the specified marketplace
                    if (event.target.value.localeCompare(this.results[i].site) !== 0) {
                        flag = false;
                    }
                }

                if (flag === true) {
                    items.push(<li key={i}>Name: {this.results[i].name}, ${this.results[i].price}, <a href={this.results[i].url} target="_blank">{this.results[i].site}</a><br /><br /></li>);
                }
            }

            ReactDOM.render(
                <ul>
                    {items}
                </ul>,
                document.getElementById('results')
            );
        }
    }

    handleMinChange(event) {
        this.setState({
            value: this.state.value,
            site: this.state.site,
            min: event.target.value,
            max: this.state.max,
            productSort: this.state.productSort
        })
    }

    handleMaxChange(event) {
        this.setState({
            value: this.state.value,
            site: this.state.site,
            min: this.state.min,
            max: event.target.value,
            productSort: this.state.productSort
        })
    }

    handleSortChange(event) {
        this.setState({
            value: this.state.value,
            site: this.state.site,
            min: this.state.min,
            max: this.state.max,
            productSort: event.target.value
        });

        if (this.results.length > 0) {
            if (event.target.value.localeCompare("ascending") === 0) {      // sorting
                this.results.sort(function(a, b) { return parseInt(a.price, 10) - parseInt(b.price, 10); });
            } else if (event.target.value.localeCompare("descending") === 0) {
                this.results.sort(function(a, b) { return parseInt(b.price, 10) - parseInt(a.price, 10); });
            }

            let items = [];
            for (let i = 0; i < this.results.length; i++) {
                let flag = true;
                if (this.state.site.localeCompare("all") !== 0) {       // if the result is not in the specified marketplace
                    if (this.state.site.localeCompare(this.results[i].site) !== 0) {
                        flag = false;
                    }
                }

                if (flag === true) {
                    items.push(<li key={i}>Name: {this.results[i].name}, ${this.results[i].price}, <a
                        href={this.results[i].url} target="_blank">{this.results[i].site}</a><br/><br/></li>);
                }
            }
            ReactDOM.render(
                <ul>
                    {items}
                </ul>,
                document.getElementById('results')
            );
        }
    }

    handleSearchChange(event) {
        if (this.advancedSearch === true) {
            this.advancedSearch = false;
            this.setState({
                value: this.state.value,
                site: defaultSite,
                min: '',
                max: '',
                productSort: defaultSort
            });
        } else {
            this.advancedSearch = true;
        }
        this.forceUpdate();                     // this tells index.js to re-render this component
    }

    render() {
        if (this.advancedSearch === false) {            // both conditionals share a common SearchForm, make sure they mirror eachother
            return (
                <div className="SearchForm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="SearchBar">
                            <label>
                                <input type="text" placeholder="Search..." value={this.state.value} onChange={this.handleChange} />
                            </label>

                            <button type="submit"><i className="fa fa-search"></i></button><br /><br />
                        </div>
                        <label>
                            <a href="#" onClick={this.handleSearchChange}>Advanced</a>
                        </label><br /><br />
                    </form>
                </div>
            );
        } else {
            return (
                <div className="SearchForm">
                    <form onSubmit={this.handleSubmit}>
                        <div className="SearchBar">
                            <label>
                                <input type="text" placeholder="Search..." value={this.state.value} onChange={this.handleChange} />
                            </label>

                            <button type="submit"><i className="fa fa-search"></i></button><br /><br />
                        </div>
                        <label>
                            <a href="#" onClick={this.handleSearchChange}>Advanced</a>
                        </label><br /><br />

                        <div id="advanced_search">
                            Price Range: <input id="min" type="number" name="min_price" placeholder="min" className ="PriceRange" title="Enter whole
                        number, no letters, no symbols" value={this.state.min} onChange={this.handleMinChange}/>
                            ~<input id="max" type="number" name="max_price" placeholder="max" className ="PriceRange" title="Enter whole
                        number, no letters, no symbols" value={this.state.max} onChange={this.handleMaxChange}/><br /><br />

                            Sort Products by Price: <label className="radio-inline">
                                <input id="noSort" type="radio" name="sort" value="none" onChange={this.handleSortChange} defaultChecked />  No Sort
                            </label>

                            <label className="radio-inline">
                                <input id="ascending" type="radio" name="sort" value="ascending" onChange={this.handleSortChange} />  Ascending
                            </label>

                            <label className="radio-inline">
                                <input id="descending" type="radio" name="sort" value="descending" onChange={this.handleSortChange} />  Descending
                            </label><br /><br />

                            Marketplaces: <label className="radio-inline">
                                <input id="all" type="radio" name="site" value="all" onChange={this.handleSiteChange} defaultChecked />  All
                            </label>

                            <label className="radio-inline">
                                <input id="amazon" type="radio" name="site" value="amazon" onChange={this.handleSiteChange} />  Amazon
                            </label>

                            <label className="radio-inline">
                                <input id="ebay" type="radio" name="site" value="ebay" onChange={this.handleSiteChange} />  Ebay
                            </label>

                            <label className="radio-inline">
                                <input id="craigslist" type="radio" name="site" value="craigslist" onChange={this.handleSiteChange} />  Craigslist
                            </label><br /><br />

                        </div>
                    </form>
                </div>
            );
        }

    }
}

export default SearchForm;
