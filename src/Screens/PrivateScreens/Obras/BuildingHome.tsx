import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BuildingContent } from "./components/BuildingContent"; // Corrigido para refletir o nome correto do component
import { Scroll, Storefront } from "phosphor-react"; // Ajuste o ícone conforme necessário

export const BuildingHome = () => {
    return (
        <main className="building-container">
            <TabGroup>
                <TabList className="building-header">
                    <Tab className="building-header-link"><Scroll size={24} /> </Tab>
                    <Tab className="building-header-link"><Storefront size={24} /></Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><BuildingContent /></TabPanel> {}
                </TabPanels>
            </TabGroup>
        </main>
    );
};
