import SearchResult from "./SearchResult";
import $ from "jquery"

class NewEgg {
    constructor(sort) {     // we use "https://cors-anywhere.herokuapp.com/" as a proxy to circumvent CORS errors
        this.baseHost = `https://cors-anywhere.herokuapp.com/https://www.newegg.com/d/Product/RSS?Submit=ENE&IsNodeId=1&Order=${NewEgg.sortType[sort]}
        &ShowDeactivatedMark=False&Description=`
    }

    static sortType = {
        'ASCENDING': 'PRICE',
        'DECENDING': 'PRICED',
        'NOSORT': ''
    };

    searchItem(item) {      // returns an array of SearchResult objects
        console.log(`Searching for ${item} on NewEgg...`);
        let results = [];
        let feed = this.baseHost + item;
        $.ajax( {
            url: feed,
            type: 'GET',
            dataType:"xml",
            crossDomain: true,
            async: false,
            success: function(xmlResponse) {
                $(xmlResponse).find("item").each(function () {
                    var curItem = $(this);
                    let titleText = curItem.find("title").text();
                    let pricePrefix = '$';
                    let titlePrefix = ' - ';
                    let name = titleText.substr(titleText.indexOf(titlePrefix) + titlePrefix.length);
                    let price = titleText.substr(titleText.indexOf(pricePrefix)+pricePrefix.length,titleText.indexOf(' '));
                    let site = 'newegg';
                    let url = curItem.find("link").text();
                    results.push(new SearchResult(name,price,site,url));
                });
            }
        });
        return results;
    }
}

export default NewEgg;