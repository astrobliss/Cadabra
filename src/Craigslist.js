import craigslist from 'node-craigslist';
import SearchResult from "./SearchResult";

class CraigsList {
    constructor() {
        let craigslist = require('node-craigslist');
        this.client = new craigslist.Client({
            baseHost: 'craigslist.org',
            city: 'seattle'     // default, this would need to be changed in a production build
        });
    }

    searchItem(item) {      // returns an array of SearchResult objects
        let items = []

        this.client.search(item)    // CORS issues...
            .then((listings) => {
                listings.forEach((listing) => items.push(SearchResult(listing.title, listing.price, 'Ebay')));        // filling up items array
            })
            .catch((err) => {
                console.error(err);
            });

        return items;
    }
}

export default CraigsList;