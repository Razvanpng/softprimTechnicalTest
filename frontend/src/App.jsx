import { useState, useEffect } from 'react';
import { fetchCategories, fetchProducts } from './api';

function App() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCat, setSelectedCat] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    
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

    const finalProducts = products
        .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => {
            if (sortOrder === 'asc') return Number(a.price) - Number(b.price);
            return Number(b.price) - Number(a.price);
        });

    return (
        <div className="app-container">
            <header>
                <h1>Catalog Produse</h1>
                <div className="controls">
                    <div className="filter-group">
                        <label>categorie: </label>
                        <select value={selectedCat} onChange={handleFilterChange}>
                            <option value="">toate</option>
                            {categories.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label>cauta: </label>
                        <input 
                            type="text" 
                            placeholder="nume produs..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="filter-group">
                        <label>pret: </label>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="asc">crescator</option>
                            <option value="desc">descrescator</option>
                        </select>
                    </div>
                </div>
            </header>

            <main>
                {loading && <p>se incarca...</p>}
                
                {error && <p className="error">{error}</p>}
                
                {!loading && !error && finalProducts.length === 0 && (
                    <p>nu s-au gasit produse cu aceste filtre.</p>
                )}

                {!loading && !error && finalProducts.length > 0 && (
                    <div className="product-list">
                        {finalProducts.map(p => (
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