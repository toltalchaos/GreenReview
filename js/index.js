const pageTitle = document.querySelector('h1')
const productimage1 = document.querySelector('.image-spread>img:first-of-type')
const productimage2 = document.querySelector('.image-spread>img:last-of-type')
const embededvideo = document.querySelector('.youtubelink') //grabbing parent element of iframe
const generalrating = document.querySelector('.image-spread p>i')
const priceparagraph = document.querySelector('.rating-aspects section:nth-child(1) p:first-of-type')
const priceratingsvg = document.querySelector('.rating-aspects section:nth-child(1) i:first-of-type')
const strengthparagraph = document.querySelector('.rating-aspects section:nth-child(2) p:first-of-type')
const strengthratingsvg = document.querySelector('.rating-aspects section:nth-child(2) i:first-of-type')
const effectparagraph = document.querySelector('.rating-aspects section:nth-child(3) p:first-of-type')
const effectratingsvg = document.querySelector('.rating-aspects section:nth-child(3) i:first-of-type')
const tasteparagraph = document.querySelector('.rating-aspects section:nth-child(4) p:first-of-type')
const tasteratingsvg = document.querySelector('.rating-aspects section:nth-child(4) i:first-of-type')
const writeupparagraph = document.querySelector('.blog-writeup p')

window.addEventListener('load', function(){
    let productArray = []
    let ddllisttemplate = ""; 
    const incomingID = GetIncomingID()
 
    //logic for DDL menu popout
    //--- handle for ddl menu (x2)
    //-- handle for ddl list
    const ddlProductList = document.querySelector('.product-list')
    const dropdownburger = document.querySelector('.burger i')
    const dropdownbar = document.querySelector('.dropdowntitle')
    const thesearchform = document.querySelector('form')

    // --- event listener on ddl menu handles
        // --- remove class "not-visible" from productlist
        // --- if not includes "not visible" ADD class
        dropdownbar.addEventListener('click',function(){
            if(ddlProductList.classList.contains('not-visible')){
                ddlProductList.classList.remove('not-visible')
            }
            else{
                ddlProductList.classList.add('not-visible')
            }
        })
        dropdownburger.addEventListener('click',function(){
            console.log("click registered")
            if(ddlProductList.classList.contains('not-visible')){
                ddlProductList.classList.remove('not-visible')
            }
            else{
                ddlProductList.classList.add('not-visible')
            }
        })

    //fill page data from json file
    fetch("https://doc-review-green-default-rtdb.firebaseio.com/products.json")
    .then((resolve) => resolve.json())
    .then((jsondata) => {
        productArray = [jsondata]
        productArray = Array.from(productArray)
        productArray.sort(function(a,b){
            return CompareItemNames(a.title, b.title)
        })

        // logic for fill DDL from json array file.
    //parse entire array for desired values
   
     //loop through data
     
    for (const product in productArray[0]) {
        ddllisttemplate += `
        <li class="product-item">
        <a href="?productID=${productArray[0][product].productId}"> ${productArray[0][product].title} </a>
        </li>`;
 
    };
   //create template for desired ouput (loop and add)
   //add fragment to dom under ddl handle
   ddlProductList.querySelector('ul').appendChild(document.createRange().createContextualFragment(ddllisttemplate)) 
    
   
   //event listener for search input - call function to filter list results
    thesearchform.addEventListener('submit', function(evnt){
        evnt.preventDefault()
        FilterSearchResults(thesearchform)
    })
    thesearchform.querySelector('input').addEventListener('input',function(){
        FilterSearchResults(thesearchform)
    })


        //find the url chosen product + fill doc
        let chosenprod = ChosenProductFinder(productArray, incomingID)
        console.log(chosenprod)
        
        if(chosenprod != undefined){
            dropdownbar.querySelector('p').innerText = chosenprod.title
            //add logic for inner text dropdownbar.p for incoming ID
            const elementstemplate = BuildTemplateModels(chosenprod)
            //build template models
            //insert into dom and replace values where needed
            //title
            pageTitle.innerText = chosenprod.title;
            //youtubelink
            embededvideo.appendChild(elementstemplate.youtube)
            //image1
             productimage1.src = chosenprod.imgOne;
            //image2
            productimage2.src = chosenprod.imgTwo;
            //generalSVG
            generalrating.outerHTML = chosenprod.genrating;
            //outter html
            //inner html
            //priceparagraph
            priceparagraph.innerText = chosenprod.priceDesc;
            //pricesvg
            priceratingsvg.outerHTML = chosenprod.priceRating;
            //strengthparagraph
            strengthparagraph.innerText = chosenprod.strengthDesc;
            //strengthsvg
            strengthratingsvg.outerHTML = chosenprod.strengthRating;
            //effectparagraph
            effectparagraph.innerText = chosenprod.effectDesc;
            //effectsvg
            effectratingsvg.outerHTML = chosenprod.effectRating;
            //taste paragraph
            tasteparagraph.innerText = chosenprod.tasteDesc;
            //taste rating
            tasteratingsvg.outerHTML = chosenprod.tasteRating;
            //writeup blog post
            writeupparagraph.innerText = chosenprod.blog;
    
        }
        else{
            //no product found on page by the inserted ID
            console.log("lol bad data my guy try \"?productID=THISISATEST\"")
        }    
    
    
        
    })




})
//global

ChosenProductFinder = (productArray, incomingID) => {
    for(const product in productArray[0]){
        //if url id reurns this product 
    if(incomingID == productArray[0][product].productId){
        console.log("found matching ID")
        
        return productArray[0][product]
    }}}

const GetIncomingID = () => {
    // ?productID=THISISATEST
    const QueryString = window.location.search
    const urlPerams = new URLSearchParams(QueryString)
   const selectedID =  urlPerams.get('productID')
   return selectedID
}

//turn string template elements into elements and save to object
//commented out for tags in favor of class name changes
const BuildTemplateModels = (productItem) => {
    let elementsObject;
    const youtubelinkframe = `<iframe width="560" height="315" src="${productItem.youtubeEmbed}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    youtubelinktemplate = document.createRange().createContextualFragment(youtubelinkframe)
    
    elementsObject = {
        youtube: youtubelinktemplate
    }
    
    return elementsObject;

}

function FilterSearchResults(theform){
    let inputvalue = theform.querySelector('input').value
    let searchlistitems = document.getElementsByClassName('product-item')
    for(let item of searchlistitems){
        if(item.querySelector('a').innerText.toLowerCase().includes(inputvalue.toLowerCase())){
            item.classList.remove('hide-me')
        }
        else{
            item.classList.add('hide-me')
        }
    }
    
}

function CompareItemNames(a, b){
    a = a.toLowerCase()
    b = b.toLowerCase()
    return (a < b) ? -1 : (a > b) ? 1 : 0;


}