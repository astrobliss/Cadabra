import SearchResult from "./SearchResult";
import $ from "jquery"

class CraigsList {
    constructor(sort) {     // we use "https://cors-anywhere.herokuapp.com/" as a proxy to circumvent CORS errors
        this.city = 'seattle';    // default, this would need to be changed in a production build
        this.baseHost = `https://cors-anywhere.herokuapp.com/https://${this.city}.craigslist.org/search/sss?format=rss&
        sort=${CraigsList.sortType[sort]}&query=`
    }

    static sortType= {
        'ASCENDING': 'asc',
        'DECENDING': 'dec',
        'NOSORT': 'rel'
    };

    searchItem(item) {      // returns an array of SearchResult objects
        console.log(`Searching for ${item} on Craigslist...`);
        let results = [];
        let feed = this.baseHost + item;
        $.ajax(feed, {
            accepts:{
                xml:"application/rss+xml"
            },
            dataType:"xml",
            crossDomain: true,
            async: false,
            success:function(data) {

                $(data).find("item").each(function () {
                    var curItem = $(this);
                    let titleText = curItem.find("title").text();
                    let dollarSignHex = '&#x0024;';
                    let name = titleText;
                    let price = 0;
                    if(titleText.indexOf(dollarSignHex)!==-1) {
                        price = titleText.substr(titleText.lastIndexOf(dollarSignHex) + dollarSignHex.length);
                        name = titleText.substr(0,titleText.lastIndexOf(dollarSignHex));
                    }
                    let site = 'craigslist';
                    let url = curItem.find("link").text();
                    results.push(new SearchResult(name,price,site,url));
                });
            }
        });
        return results;
    }
}

export default CraigsList;