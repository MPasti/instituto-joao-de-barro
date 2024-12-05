import { useEffect, useState } from "react";
import { PlusCircle } from "phosphor-react";
import { publish } from "../../../../utils/events";
import { EventsRegisterModal } from "./modals/EventsRegisterModal";
import { EventsEditModal } from "./modals/EventsEditModal";

import { getEvents } from "../../../../services/events/eventsApi"; 
import { Event } from "../../../../services/events/eventsApi";

export const Events = () => {
    const [events, setEvents] = useState<Event[]>([]); 
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>("");

    
    async function loadEvents() {
        const response = await getEvents();
        setEvents(response);
    }

    useEffect(() => {
        loadEvents();
    }, [events]);

    const handleEditEvent = (event: Event) => {
        setSelectedEvent(event);
        publish("events:open-edit-modal");
    };

    const filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1 className="page-title">Eventos</h1>
            <section className="storage-search">
                <input 
                    type="text" 
                    placeholder="Pesquisar evento" 
                    className="form-control search-input"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <PlusCircle size={26} onClick={() => publish("events:open-register-modal")} />
            </section>
            <section className="storage-material-list">
                <table>
                    <thead>
                        <tr>
                            <th>Nome do evento</th>
                            <th>Código</th>
                            <th>Data</th>
                            <th>Descrição</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((event) => (
                            <tr key={event.id} onClick={() => handleEditEvent(event)}>
                                <td>{event.name}</td> {/* Nome do evento */}
                                <td>{event.id}</td>
                                <td>{new Date(event.date).toLocaleDateString("pt-BR")}</td> {/* Data formatada */}
                                <td>{event.description}</td> {/* Descrição */}
                                <td>{event.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <EventsRegisterModal />
            {selectedEvent && <EventsEditModal selectedEvent={selectedEvent} />}
        </>
    );
};
