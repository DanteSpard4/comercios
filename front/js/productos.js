// Constantes y variables globales
const PRODUCTOS_API = `${API_URL}/api/productos`;
let editMode = false;

// Elementos del DOM
const productForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');
const formTitle = document.getElementById('form-title');
const newProductBtn = document.getElementById('new-product-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Cargar todos los productos
async function loadProducts() {
    try {
        const response = await fetch(PRODUCTOS_API, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // Token expirado o inválido
                logout();
                return;
            }
            throw new Error('Error al cargar productos');
        }

        const products = await response.json();
        renderProductsList(products);
    } catch (error) {
        showError(`Error al cargar productos: ${error.message}`);
        console.error('Error en loadProducts:', error);
    }
}

// Renderizar la lista de productos
function renderProductsList(products) {
    productsList.innerHTML = '';
    
    if (products.length === 0) {
        productsList.innerHTML = '<tr><td colspan="5" style="text-align: center;">No hay productos disponibles</td></tr>';
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.id}</td>
            <td>${product.nombre || ''}</td>
            <td>${product.precio || ''}</td>
            <td>${product.stock || '0'}</td>
            <td class="action-cell">
                <button class="btn btn-secondary btn-edit" data-id="${product.id}">Editar</button>
                <button class="btn btn-danger btn-delete" data-id="${product.id}">Eliminar</button>
            </td>
        `;
        
        productsList.appendChild(row);
    });
    
    // Añadir event listeners a los botones de acciones
    document.querySelectorAll('.btn-edit').forEach(btn => {
        btn.addEventListener('click', () => editProduct(btn.dataset.id));
    });
    
    document.querySelectorAll('.btn-delete').forEach(btn => {
        btn.addEventListener('click', () => deleteProduct(btn.dataset.id));
    });
}

// Crear un nuevo producto
async function createProduct(productData) {
    try {
        const response = await fetch(PRODUCTOS_API, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                logout();
                return;
            }
            throw new Error('Error al crear el producto');
        }

        await response.json();
        resetForm();
        loadProducts();
    } catch (error) {
        showError(`Error al crear el producto: ${error.message}`);
        console.error('Error en createProduct:', error);
    }
}

// Obtener un producto por ID
async function getProductById(id) {
    try {
        const response = await fetch(`${PRODUCTOS_API}/${id}?id=${id}`, {
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                logout();
                return;
            }
            throw new Error('Error al obtener el producto');
        }

        return await response.json();
    } catch (error) {
        showError(`Error al obtener el producto: ${error.message}`);
        console.error('Error en getProductById:', error);
        return null;
    }
}

// Actualizar un producto
async function updateProduct(productData) {
    try {
        const response = await fetch(PRODUCTOS_API, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                logout();
                return;
            }
            throw new Error('Error al actualizar el producto');
        }

        await response.json();
        resetForm();
        loadProducts();
    } catch (error) {
        showError(`Error al actualizar el producto: ${error.message}`);
        console.error('Error en updateProduct:', error);
    }
}

// Eliminar un producto
async function deleteProduct(id) {
    if (!confirm('¿Está seguro de que desea eliminar este producto?')) {
        return;
    }
    
    try {
        const response = await fetch(`${PRODUCTOS_API}/${id}?id=${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                logout();
                return;
            }
            throw new Error('Error al eliminar el producto');
        }

        loadProducts();
    } catch (error) {
        showError(`Error al eliminar el producto: ${error.message}`);
        console.error('Error en deleteProduct:', error);
    }
}

// Editar un producto (cargar datos en formulario)
async function editProduct(id) {
    const product = await getProductById(id);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.nombre || '';
        document.getElementById('product-price').value = product.precio || '';
        document.getElementById('product-stock').value = product.stock || '0';
        
        formTitle.textContent = 'Editar Producto';
        editMode = true;
    }
}

// Resetear el formulario
function resetForm() {
    productForm.reset();
    document.getElementById('product-id').value = '';
    formTitle.textContent = 'Nuevo Producto';
    editMode = false;
}

// Eventos
document.addEventListener('DOMContentLoaded', function() {
    // Cargar productos al iniciar
    loadProducts();
    
    // Evento para enviar el formulario (crear o actualizar)
    productForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const productData = {
            nombre: document.getElementById('product-name').value,
            precio: parseFloat(document.getElementById('product-price').value),
            stock: parseInt(document.getElementById('product-stock').value)
        };
        
        if (editMode) {
            productData.id = parseInt(document.getElementById('product-id').value);
            updateProduct(productData);
        } else {
            createProduct(productData);
        }
    });
    
    // Evento para el botón Nuevo Producto
    newProductBtn.addEventListener('click', resetForm);
    
    // Evento para cancelar
    cancelBtn.addEventListener('click', resetForm);
});