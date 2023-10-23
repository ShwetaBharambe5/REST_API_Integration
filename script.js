document.addEventListener("DOMContentLoaded", async function() {
    const apiUrl = `https://crudcrud.com/api/52e1cc9baa2f40d8904e8c12d9341cc6/products`;

    async function getProducts() {
        try {
            const response = await axios.get(apiUrl);
            const productList = document.getElementById('productList');
            productList.innerHTML = '';

            response.data.forEach(product => {
                const listItem = document.createElement('li');

                listItem.innerHTML = `
                    $${product.sellingPrice} - ${product.productName} - ${product.category}
                    <button data-product-id="${product._id}" class="delete-button">Delete</button>
                `;

                productList.appendChild(listItem);
            });

            const deleteButtons = document.querySelectorAll('.delete-button');
            deleteButtons.forEach(button => {
                button.addEventListener('click', async function() {
                    const productId = this.getAttribute('data-product-id');
                    await deleteProduct(productId);
                });
            });
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async function addProduct() {
        const sellingPrice = document.getElementById('sellingPrice').value;
        const productName = document.getElementById('productName').value;
        const category = document.getElementById('category').value;

        try {
            await axios.post(apiUrl, {
                sellingPrice: sellingPrice,
                productName: productName,
                category: category
            });
            console.log('Product added Successfully');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    async function deleteProduct(productId) {
        try {
            await axios.delete(apiUrl + '/' + productId);
            console.log('Product deleted successfully.');
            await getProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    document.getElementById('addProductButton').addEventListener('click', addProduct);

    await getProducts();
});
