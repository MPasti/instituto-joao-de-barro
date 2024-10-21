import { PlusCircle } from "phosphor-react"
import { publish } from "../../../../utils/events"
import { OutletRegisterModal } from "./modals/OutletRegisterModal"
import { getProducts, OutletProduct } from "../../../../services/storage/outletApi"
import { useEffect, useState } from "react"
import { OutletEditModal } from "./modals/OutletEditModal"

export const Outlet = () => {
    const [outletProducts, setOutletProducts] = useState<OutletProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<OutletProduct | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    async function loadOutletProducts() {
        const response = await getProducts();
        setOutletProducts(response);
    }

    useEffect(() => {
        loadOutletProducts();
    }, [outletProducts]);

    const handleEditOutletProduct = (product: OutletProduct) => {
        setSelectedProduct(product);
        publish("outlet:open-edit-modal");
    };

    const filteredMaterials = outletProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 className="page-title">Outlet</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar produto" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <PlusCircle size={26} onClick={() => publish("outlet:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Código</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                        </tr>
                        {filteredMaterials.map((product) => (
                                <tr key={product.id} onClick={() => handleEditOutletProduct(product)}>
                                    <td>{product.name}</td>
                                    <td>{product.id}</td>
                                    <td>{product.price}</td>
                                    <td>{product.description}</td>
                                </tr>
                            ))}
                    </thead>
                </table>
            </section>
            <OutletRegisterModal />
            <OutletEditModal selectedProduct={selectedProduct} />
        </>
    )
}