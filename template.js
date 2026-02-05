class Template {
    constructor() {
        this.messagesDiv = document.getElementById('messages');
        this.eventsDiv = document.getElementById('events');
        this.formsDiv = document.getElementById('forms');
    }

    clear(id) {
        switch (id) {
            case 'messages':
                this.messagesDiv.replaceChildren();
                break;
            case 'events':
                this.eventsDiv.replaceChildren();
                break;
            case 'forms':
                this.formsDiv.replaceChildren();
                break;
            default:
                break;
        }
    }

    updateMessage(message) {
        this.messagesDiv.innerHTML = message;
    }

    createEventListCard(event, crud) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        let html = 
        `<h3>${event.title}</h3>
        <p>${event.location}</p>
        <p>${event.description}</p>`;

        eventCard.innerHTML = html;

        const eventButton = document.createElement('button');
        eventButton.textContent = 'View Event';
        eventButton.addEventListener("click", () => {
            crud.viewEvent(event._id);
        });
        eventCard.appendChild(eventButton);

        this.eventsDiv.appendChild(eventCard);
    }

    createEventCard(event, crud) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        let html = 
        `<img class="event-card--image" src="${event.imageUrl}" alt="${event.title}" />
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <p>date: ${event.date}</p>
        <p>location: ${event.location}</p>
        <p>category: ${event.category}</p>
        <p>featured: ${event.featured}</p>
        <p>capacity: ${event.capacity}</p>`;

        eventCard.innerHTML = html;

        this.eventsDiv.appendChild(eventCard);
    }
}