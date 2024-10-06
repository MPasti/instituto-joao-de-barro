import { PlusCircle } from "phosphor-react"
import { Header } from "./components/StorageHeader"
import { publish } from "../../../utils/events"
import { OutletRegisterModal } from "./components/modals/OutletRegisterModal"
import { getProducts, OutletProduct } from "./services/outletApi"
import { useEffect, useState } from "react"
import { OutletEditModal } from "./components/modals/OutletEditModal"

export const Outlet = () => {
    const [OutletProducts, setOutletProducts] = useState<OutletProduct[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<OutletProduct | null>(null);

    async function loadOutletProducts() {
        const response = await getProducts();
        setOutletProducts(response);
    }

    useEffect(() => {
        loadOutletProducts();
    }, [OutletProducts]);

    const handleEditOutletProduct = (product: OutletProduct) => {
        setSelectedProduct(product);
        publish("outlet:open-edit-modal");
    };

    return (
        <main className="storage-container">
        <Header title="Outlet" />
        <section className="storage-search">
            <input type="text" placeholder="Pesquisar produto" className="form-control search-input" />
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
                    {OutletProducts.map((product) => (
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
    </main>
    )
}