import { Link } from "react-router-dom"
import { StorageHeader} from "../styles"
import { Scroll, Storefront } from "phosphor-react"

interface StorageHeaderProps {
    title: string;
}

export const Header = ({title}: StorageHeaderProps) => {
    return (
        <StorageHeader>
                <h1>{title}</h1>
                <div>
                    <Link  to="/estoque" title="Estoque">
                        <Scroll size={24} /> 
                    </Link>
                    <Link to="/outlet" title="Outlet">
                        <Storefront size={24}  />
                    </Link>
                </div>
            </StorageHeader>
    )
}