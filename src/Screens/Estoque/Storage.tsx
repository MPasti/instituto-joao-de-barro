import { Input, StorageContainer, StorageMaterialsList, StorageSearch } from "./styles"
import { PlusCircle } from "phosphor-react"
import { Header } from "./components/StorageHeader"

export const Storage = () => {
    return (
        <StorageContainer>
            <Header title="Estoque"/>
            <StorageSearch>
                <Input type="text" name="" id="" placeholder="Pesquisar material" />
                <PlusCircle size={26} />
            </StorageSearch>
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