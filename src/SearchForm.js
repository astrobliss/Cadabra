import React from 'react';
import ReactDOM from 'react-dom';
import './SearchForm.css';

const inputStyle = {
    width: '300px',
    fontSize: 'large'
};

class SearchForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {       // triggers when form is submitted
        ReactDOM.render(<h1>{this.state.value}</h1>, document.getElementById('results'));
        event.preventDefault();
    }

    render() {
        return (
            <div className="SearchForm">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input style={inputStyle} type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Search" />
                </form>
            </div>
        );
    }
}

export default SearchForm;