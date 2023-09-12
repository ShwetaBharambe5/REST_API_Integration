document.addEventListener("DOMContentLoaded", function(){

const apiUrl = `https://crudcrud.com/api/d9a8b99681e9456584a60025d67adefa/products`;

function getProducts(){
    axios.get(apiUrl)
        .then(response => {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            response.data.forEach(product => {
                const listItem = document.createElement('li');

                listItem.innerHTML = `
                    $${product.sellingPrice} - ${product.productName} - ${product.category}
                    <button data-product-id = "${product._id}" class = "delete-button">Delete</button>
                `;

                productList.appendChild(listItem);
            });

            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', function(){
                    const productId = this.getAttribute('data-product-id');
                    deleteProduct(productId);
                })
            })
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });  
}

function addProduct(){
    
    const sellingPrice = document.getElementById('sellingPrice').value;
    const productName = document.getElementById('productName').value;
    const category = document.getElementById('category').value;

    axios.post(apiUrl, { 
        sellingPrice: sellingPrice, 
        productName: productName, 
        category: category 
    })
        .then(response => {
            //if(response.status === 200){
                console.log('Product added Successfully');
            //}
            //else{
            //    console.error('Error adding product.');
           // }
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
}

function deleteProduct(productId){
    axios.delete(apiUrl + '/' + productId)
        .then(response => {
            //if(response.status === 204){
                console.log('Product deleted successfully.');
                getProducts();
            //}
            //else{
            //    console.error('Error deleting product.');
            //}
        })
        .catch(error => {
            console.error('Error deleting product:', error);
        });
}

document.getElementById('addProductButton').addEventListener('click', addProduct);

getProducts();

});