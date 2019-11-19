import SearchResult from "./SearchResult";
import $ from "jquery"

class NewEgg {
    constructor(sort) {
        this.baseHost = `https://www.newegg.com/d/Product/RSS?Submit=ENE&IsNodeId=1&Order=${NewEgg.sortType[sort]}
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
        $.ajax(feed, {
            accepts:{
                xml:"application/rss+xml"
            },
            dataType:"xml",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "https://www.newegg.com",
                "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
            },
            async: false,                                   // prevents the function from returning without any results
            success: function(data) {
                $(data).find("item").each(function () {
                    var curItem = $(this);
                    let titleText = curItem.find("title").text();
                    let priceStart = 1;
                    let name = titleText.substr(titleText.indexOf(' - ') + 3);
                    let price = titleText.substr(priceStart,titleText.indexOf(' '));
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