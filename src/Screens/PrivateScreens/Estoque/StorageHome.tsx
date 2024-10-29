import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import { Storage } from "./components/StorageContent"
import { Outlet } from "./components/OutletContent"
import { Scroll, Storefront } from "phosphor-react"

export const StorageHome = () => {
    return (
        <main className="storage-container">
            <TabGroup>
                <TabList className="storage-header">
                    <Tab className="storage-header-link"><Scroll size={24} /> </Tab>
                    <Tab className="storage-header-link"><Storefront size={24} /></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><Storage /></TabPanel>
                    <TabPanel><Outlet /></TabPanel>
                </TabPanels>
            </TabGroup>

        </main>
    )
}