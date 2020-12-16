window.addEventListener('load', function(){
let productArray = []
const incomingID = GetIncomingID()
fetch("./js/products.json")
.then((resolve) => resolve.json())
.then((jsondata) => {productArray = [...jsondata]
    console.log(productArray)
    
})

})
//global

const GetIncomingID = () => {
    // ?productID=1234
    const QueryString = window.location.search
    const urlPerams = new URLSearchParams(QueryString)
   const selectedID =  urlPerams.get('productID')
   console.log(selectedID)
   return selectedID
}