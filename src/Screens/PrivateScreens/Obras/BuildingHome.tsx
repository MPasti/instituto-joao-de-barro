import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BuildingContent } from "./components/BuildingContent"; // Corrigido para refletir o nome correto do component
import { Scroll } from "phosphor-react"; // Ajuste o ícone conforme necessário

export const BuildingHome = () => {
    return (
        <main className="storage-container">
            <TabGroup>
                <TabList className="storage-header">
                    <Tab className="storage-header-link"><Scroll size={24} /> </Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><BuildingContent /></TabPanel> {}
                </TabPanels>
            </TabGroup>
        </main>
    );
};
