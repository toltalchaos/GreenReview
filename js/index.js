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
window.addEventListener('DOMContentLoaded',function(){

    console.log("dom loaded")
})

window.addEventListener('load', function(){
    console.log("page loaded")

    let productArray = []
    const incomingID = GetIncomingID()
    fetch("./js/products.json")
    .then((resolve) => resolve.json())
    .then((jsondata) => {productArray = [...jsondata]
        //find the url chosen product 
    const chosenProduct = productArray.find(function(product){
        //if url id reurns this product 
        if(incomingID === product.productID){
            console.log("found matching ID")
            return product
        }
    })
        if(chosenProduct != undefined){
            //build template models
         const elementstemplate = BuildTemplateModels(chosenProduct)
            //insert into dom and replace values where needed
            //title
            pageTitle.innerText = chosenProduct.title;
            //youtubelink
            embededvideo.appendChild(elementstemplate.youtube)
            //image1
             productimage1.src = chosenProduct.imgSrc1;
            //image2
            productimage2.src = chosenProduct.imgSrc2;
            //generalSVG
            generalrating.classList = chosenProduct.generalRating;
            //priceparagraph
            priceparagraph.innerText = chosenProduct.price;
            //pricesvg
            priceratingsvg.classList = chosenProduct.priceRating;
            //strengthparagraph
            strengthparagraph.innerText = chosenProduct.strength;
            //strengthsvg
            strengthratingsvg.classList = chosenProduct.strengthRating;
            //effectparagraph
            effectparagraph.innerText = chosenProduct.effect;
            //effectsvg
            effectratingsvg.classList = chosenProduct.effectRating;
            //taste paragraph
            tasteparagraph.innerText = chosenProduct.taste;
            //taste rating
            tasteratingsvg.classList = chosenProduct.tasteRating;
            //writeup blog post
            writeupparagraph.innerText = chosenProduct.writeupBlog;
    
        }
        else{
            //no product found on page by the inserted ID
            console.log("lol bad data my guy try \"?productID=THISISATEST\"")
        }    
    
    
        
    })
//selectors for all the changing elements



})
//global

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
    youtubelinktemplate = document.createRange().createContextualFragment(productItem.YouTubeEmbed)
    // generalratingtemplate = document.createRange().createContextualFragment(productItem.generalRating)
    // priceratingtemplate = document.createRange().createContextualFragment(productItem.priceRating)
    // strengthRatingtemplate = document.createRange().createContextualFragment(productItem.strengthRating)
    // effectRatingtemplate = document.createRange().createContextualFragment(productItem.effectRating)
    // tasteRatingtemplate = document.createRange().createContextualFragment(productItem.tasteRating)

    elementsObject = {
        youtube: youtubelinktemplate,
        // RatingGen: generalratingtemplate,
        // RatingPrice: priceratingtemplate,
        // RatingStr: strengthRatingtemplate,
        // RatingEff: effectRatingtemplate,
        // RatingTaste: tasteRatingtemplate

    }
    
    return elementsObject;

}