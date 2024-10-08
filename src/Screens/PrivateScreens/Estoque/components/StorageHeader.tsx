import { Link } from "react-router-dom"
import { Scroll, Storefront } from "phosphor-react"

interface StorageHeaderProps {
    title: string;
}

export const Header = ({title}: StorageHeaderProps) => {
    return (
        <section className="storage-header">
            <h1>{title}</h1>
            <div>
                <Link  to="/dashboard/estoque" title="Estoque">
                    <Scroll size={24} /> 
                </Link>
                <Link to="/dashboard/outlet" title="Outlet">
                    <Storefront size={24}  />
                </Link>
            </div>
        </section>
    )
}