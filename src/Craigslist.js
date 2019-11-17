import SearchResult from "./SearchResult";

class CraigsList {
    constructor(sort) {
            this.city = 'seattle';    // default, this would need to be changed in a production build
            this.baseHost = `http://${this.city}.craigslist.org/search/sss?format=rss&sort=${CraigsList.sortType[sort]}&query=`
    }

    static sortType= {
        'ASCENDING': 'asc',
        'DECENDING': 'dec',
        'NOSORT': ''
    };

    searchItem(item) {      // returns an array of SearchResult objects
        let results = [];
        let feed = this.baseHost + item;
        $.ajax(feed, {
            accepts:{
                xml:"application/rss+xml"
            },
            dataType:"xml",
            success:function(data) {
                $(data).find("item").each(function () {
                    var curItem = $(this);
                    let titleText = curItem.find("title").text();
                    let dollarSignHex = '&#x0024;';
                    let name = titleText.substr(0,titleText.lastIndexOf(dollarSignHex));
                    let price = titleText.substr(titleText.lastIndexOf(dollarSignHex)+dollarSignHex.length());
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