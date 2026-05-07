const baseUrl = 'http://localhost:3000/api';

export const fetchCategories = async () => {
    const response = await fetch(`${baseUrl}/categories`);
    if (!response.ok) {
        throw new Error('nu s-au putut incarca categoriile');
    }
    return response.json();
};

export const fetchProducts = async (catId = '') => {
    let url = `${baseUrl}/products`;
    
    if (catId) {
        url += `?category_id=${catId}`;
    }
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('nu s-au putut incarca produsele');
    }
    return response.json();
};