import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Storage } from "./components/StorageContent"
import { Outlet } from "./components/OutletContent"
import { Scroll, Storefront } from "phosphor-react"
import { StorageProvider } from "../../../contexts/storage/StorageContext"
import { OutletProvider } from "../../../contexts/storage/OutletContext"

export const StorageHome = () => {
    return (
        <main className="storage-container">
            <TabGroup>
                <TabList className="storage-header">
                    <Tab className="storage-header-link"><Scroll size={24} /> </Tab>
                    <Tab className="storage-header-link"><Storefront size={24} /></Tab>
                </TabList>
                <TabPanels>
                    <StorageProvider>
                        <TabPanel><Storage /></TabPanel>
                    </StorageProvider>
                    <OutletProvider>
                        <TabPanel><Outlet /></TabPanel>
                    </OutletProvider>
                </TabPanels>
            </TabGroup>
        </main>
    )
}