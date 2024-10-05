import { Input, StorageContainer, StorageMaterialsList, StorageSearch } from "./styles"
import { PlusCircle } from "phosphor-react"
import { Header } from "./components/StorageHeader"
import { publish } from "./utils/events"
import { StorageRegisterModal } from "./components/modals/StorageRegisterModal"

export const Storage = () => {
    return (
        <StorageContainer>
            <Header title="Estoque"/>
            <StorageSearch>
                <Input type="text" name="" id="" placeholder="Pesquisar material" className="search-input"/>
                <PlusCircle size={26} onClick={() => publish("storage:open-register-modal")}/>
            </StorageSearch>
            <StorageRegisterModal />
            <StorageMaterialsList>
                <table>
                    <thead>
                        <tr>
                            <th>Material</th>
                            <th>Código</th>
                            <th>Quantidade</th>
                            <th>Descrição</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                        <tr>
                            <td>Tijolo</td>
                            <td>0001</td>
                            <td>1250</td>
                            <td>unidades</td>
                        </tr>
                    </tbody>
                </table>
            </StorageMaterialsList>
        </StorageContainer>
    )
}