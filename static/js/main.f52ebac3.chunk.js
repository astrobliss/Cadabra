(this.webpackJsonpcadabra=this.webpackJsonpcadabra||[]).push([[0],{236:function(e,t,a){e.exports=a(539)},241:function(e,t,a){},295:function(e,t){},309:function(e,t){},311:function(e,t){},526:function(e,t){},528:function(e,t){},538:function(e,t,a){},539:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),l=a(37),r=a.n(l),s=(a(241),a(23)),c=a(82),h=a(234),m=a(233),u=a(13),o=a(235),d=function e(t,a,n,i){Object(s.a)(this,e),this.name=t,this.price=a,this.site=n,this.url=i},p=(a(134),function(){function e(){Object(s.a)(this,e);var t=a(134);this.client=new t.Client({baseHost:"craigslist.org",city:"seattle"})}return Object(c.a)(e,[{key:"searchItem",value:function(e){var t=[];return this.client.search(e).then((function(e){e.forEach((function(e){return t.push(d(e.title,e.price,"Ebay"))}))})).catch((function(e){console.error(e)})),t}}]),e}()),g=(a(538),{width:"300px",fontSize:"large",border:"solid black 3px"}),b=[new d("wii","149","amazon","amazon.com/xbox-1"),new d("wii","121","craigslist","seattle.craigslist.org/used-wii-3"),new d("waffle maker","21","craigslist","seattle.craigslist.org/good-waffle-maker-3"),new d("waffle maker","49","ebay","ebay.com/really-good-waffle-maker")],v="all",E="none",S=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(h.a)(this,Object(m.a)(t).call(this,e))).state={value:"",site:v,min:"",max:"",productSort:E},a.craigsList=new p,a.advancedSearch=!1,a.handleChange=a.handleChange.bind(Object(u.a)(a)),a.handleSubmit=a.handleSubmit.bind(Object(u.a)(a)),a.handleSiteChange=a.handleSiteChange.bind(Object(u.a)(a)),a.handleMinChange=a.handleMinChange.bind(Object(u.a)(a)),a.handleMaxChange=a.handleMaxChange.bind(Object(u.a)(a)),a.handleSortChange=a.handleSortChange.bind(Object(u.a)(a)),a.handleSearchChange=a.handleSearchChange.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(c.a)(t,[{key:"handleChange",value:function(e){this.setState({value:e.target.value,site:this.state.site,min:this.state.min,max:this.state.max,productSort:this.state.productSort})}},{key:"handleSubmit",value:function(e){if(this.state.min.length>0&&this.state.max.length>0&&parseInt(this.state.min,10)>parseInt(this.state.max,10))alert("Minimum price can't be greater than maximum price");else{for(var t=[],a=0;a<b.length;a++)b[a].name===this.state.value&&t.push(b[a]);0===this.state.productSort.localeCompare("ascending")?t.sort((function(e,t){return parseInt(e.price,10)-parseInt(t.price,10)})):0===this.state.productSort.localeCompare("descending")&&t.sort((function(e,t){return parseInt(t.price,10)-parseInt(e.price,10)}));for(var n=[],l=0;l<t.length;l++){var s=!1;if(this.state.min.length>0&&this.state.max.length>0){var c=parseInt(this.state.min,10),h=parseInt(this.state.max,10);s=parseInt(t[l].price,10)>=c&&parseInt(t[l].price,10)<=h}else if(this.state.min.length>0){var m=parseInt(this.state.min,10);s=parseInt(t[l].price,10)>=m}else if(this.state.max.length>0){var u=parseInt(this.state.max,10);s=parseInt(t[l].price,10)<=u}else s=!0;!0===s&&n.push(i.a.createElement("li",{key:l},"Name: ",t[l].name,", Price: ",t[l].price,", Site: ",i.a.createElement("a",{href:t[l].url},t[l].site)))}n.length>0?r.a.render(i.a.createElement("ul",null,n),document.getElementById("results")):(r.a.render(i.a.createElement("p",null),document.getElementById("results")),alert("No results found")),e.preventDefault()}}},{key:"handleSiteChange",value:function(e){this.setState({value:this.state.value,site:e.target.value,min:this.state.min,max:this.state.max,productSort:this.state.productSort})}},{key:"handleMinChange",value:function(e){this.setState({value:this.state.value,site:this.state.site,min:e.target.value,max:this.state.max,productSort:this.state.productSort})}},{key:"handleMaxChange",value:function(e){this.setState({value:this.state.value,site:this.state.site,min:this.state.min,max:e.target.value,productSort:this.state.productSort})}},{key:"handleSortChange",value:function(e){this.setState({value:this.state.value,site:this.state.site,min:this.state.min,max:this.state.max,productSort:e.target.value})}},{key:"handleSearchChange",value:function(e){!0===this.advancedSearch?(this.advancedSearch=!1,this.setState({value:this.state.value,site:v,min:"",max:"",productSort:E})):this.advancedSearch=!0,this.forceUpdate()}},{key:"render",value:function(){return!1===this.advancedSearch?i.a.createElement("div",{className:"SearchForm"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("label",null,i.a.createElement("input",{style:g,type:"text",value:this.state.value,onChange:this.handleChange})),i.a.createElement("input",{type:"submit",value:"Search"}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("label",null,i.a.createElement("a",{href:"#",onClick:this.handleSearchChange},"Advanced")),i.a.createElement("br",null),i.a.createElement("br",null))):i.a.createElement("div",{className:"SearchForm"},i.a.createElement("form",{onSubmit:this.handleSubmit},i.a.createElement("label",null,i.a.createElement("input",{style:g,type:"text",value:this.state.value,onChange:this.handleChange})),i.a.createElement("input",{type:"submit",value:"Search"}),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("label",null,i.a.createElement("a",{href:"#",onClick:this.handleSearchChange},"Advanced")),i.a.createElement("br",null),i.a.createElement("br",null),i.a.createElement("div",{id:"advanced_search"},"Price Range: ",i.a.createElement("input",{id:"min",type:"number",name:"min_price",placeholder:"min",className:"PriceRange",title:"Enter whole\r number, no letters, no symbols",value:this.state.min,onChange:this.handleMinChange}),"~",i.a.createElement("input",{id:"max",type:"number",name:"max_price",placeholder:"max",className:"PriceRange",title:"Enter whole\r number, no letters, no symbols",value:this.state.max,onChange:this.handleMaxChange}),i.a.createElement("br",null),i.a.createElement("br",null),"Sort Products by Price: ",i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"noSort",type:"radio",name:"sort",value:"none",onChange:this.handleSortChange,defaultChecked:!0}),"  No Sort"),i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"ascending",type:"radio",name:"sort",value:"ascending",onChange:this.handleSortChange}),"  Ascending"),i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"descending",type:"radio",name:"sort",value:"descending",onChange:this.handleSortChange}),"  Descending"),i.a.createElement("br",null),i.a.createElement("br",null),"Marketplaces: ",i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"all",type:"radio",name:"site",value:"all",onChange:this.handleSiteChange,defaultChecked:!0}),"  All"),i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"amazon",type:"radio",name:"site",value:"amazon",onChange:this.handleSiteChange}),"  Amazon"),i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"ebay",type:"radio",name:"site",value:"ebay",onChange:this.handleSiteChange}),"  Ebay"),i.a.createElement("label",{className:"radio-inline"},i.a.createElement("input",{id:"craigslist",type:"radio",name:"site",value:"craigslist",onChange:this.handleSiteChange}),"  Craigslist"),i.a.createElement("br",null),i.a.createElement("br",null))))}}]),t}(i.a.Component);r.a.render(i.a.createElement("h1",{style:{fontSize:"120",border:"dashed purple 5px"}}," Cadabra "),document.getElementById("root")),r.a.render(i.a.createElement(S,null),document.getElementById("search"))}},[[236,1,2]]]);
//# sourceMappingURL=main.f52ebac3.chunk.js.map