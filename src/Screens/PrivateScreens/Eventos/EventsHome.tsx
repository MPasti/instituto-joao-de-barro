import { TabGroup, TabPanel, TabPanels } from "@headlessui/react"
import { Events } from "./components/EventsContent"

export const EventsHome = () => {
    return (
        <main className="storage-container">
            <TabGroup>
                <TabPanels>
                    <TabPanel><Events /></TabPanel>
                </TabPanels>
            </TabGroup>
        </main>
    )
}