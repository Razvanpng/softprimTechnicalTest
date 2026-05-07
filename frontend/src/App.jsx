import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts } from './api';

function App() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const cats = await fetchCategories();
                const prods = await fetchProducts();
                
                setCategories(cats);
                setProducts(prods);
            } catch (err) {
                console.error(err);
                setError('eroare la incarcarea datelor');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleFilterChange = async (e) => {
        const catId = e.target.value;
        setSelectedCat(catId);
        setLoading(true);
        setError(null);

        try {
            const prods = await fetchProducts(catId);
            setProducts(prods);
        } catch (err) {
            console.error(err);
            setError('nu s-au putut aduce produsele filtrate');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <header>
                <h1>Catalog Produse</h1>
                <div className="filters">
                    <label>Filtreaza: </label>
                    <select value={selectedCat} onChange={handleFilterChange}>
                        <option value="">Toate categoriile</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                </div>
            </header>

            <main>
                {loading && <p>se incarca...</p>}
                
                {error && <p className="error">{error}</p>}
                
                {!loading && !error && products.length === 0 && (
                    <p>nu exista produse in aceasta categorie.</p>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="product-list">
                        {products.map(p => (
                            <div key={p.id} className={`card ${p.stock === 0 ? 'no-stock' : ''}`}>
                                <h2>{p.name}</h2>
                                <span className="cat-name">{p.category_name}</span>
                                <p className="price">{Number(p.price).toFixed(2)} RON</p>
                                <p className="stock">
                                    {p.stock === 0 ? 'stoc epuizat' : `in stoc: ${p.stock}`}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;