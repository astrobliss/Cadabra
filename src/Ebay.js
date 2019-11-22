import $ from "jquery";
import SearchResult from "./SearchResult";

class Ebay {
    constructor(sort) {     // we use "https://cors-anywhere.herokuapp.com/" as a proxy to circumvent CORS errors
        this.baseHost = `https://cors-anywhere.herokuapp.com/https://www.ebay.com/sch/i.html?_from=R40&_trksid=m570.l131
        3&_sacat=0&_rss=1${Ebay.sortType[sort]}&_nkw=`;
    }

    static sortType = {
        'ASCENDING': '&_sop=15',
        'DECENDING': '&_sop=16',
        'NOSORT': ''
    };
    searchItem(item) {      // returns an array of SearchResult objects
        console.log(`Searching for ${item} on Ebay...`);
        let feed = this.baseHost + item;
        let results = [];
        $.ajax( {
            url: feed,
            type: 'GET',
            dataType:"xml",
            crossDomain: true,
            async: false,
            success: function(xmlResponse) {
                $(xmlResponse).find("item").each(function () {
                    var curItem = $(this);
                    let pricePrefix = '<strong>$';
                    let priceSuffix = '</strong>';
                    let imageUrlPrefix = '<img border="0" src="';
                    let imageUrlSuffix = '">';
                    let descriptionText = curItem.find('description').text();
                    let priceIndex = descriptionText.indexOf(pricePrefix)+pricePrefix.length;
                    let imageUrlIndex = descriptionText.indexOf(imageUrlPrefix)+imageUrlPrefix.length;
                    let url = curItem.find("link").text();
                    let name = curItem.find('title').text();
                    let price = descriptionText.substr(priceIndex,descriptionText.indexOf(priceSuffix,priceIndex)-priceIndex);
                    let imageUrl = descriptionText.substr(imageUrlIndex,descriptionText.indexOf(imageUrlSuffix,imageUrlIndex)-imageUrlIndex);
                    let site = 'ebay';
                    results.push(new SearchResult(name,price,site,url,imageUrl));
                });
            }
        });
        return results;
    }
}

export default Ebay;