<script>
	import PageDataPortions from "./pageLayouts/PageDataPortions.svelte";
        //grab item array
        let products =[];
        let productWanted;
        fetch("./products.json")
        .then(response => response.json())
        .then(productArray => { 
            products = [...productArray]

            productWanted = products[0]
            console.log(productWanted)
        
        })
        //grab id#later from ?pid = 
</script>

<div>
    <ul>
        {#each products as product}
        <PageDataPortions productItem = {product}/>
        {/each}
       
         
    </ul>
</div>

<style>

</style>