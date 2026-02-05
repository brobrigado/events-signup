class Template {
    constructor() {
        this.messagesDiv = document.getElementById('messages');
        this.eventsDiv = document.getElementById('events');
        this.formsDiv = document.getElementById('forms');
        this.registrantsDiv = document.getElementById('registrants');
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
            case 'registrants':
                this.registrantsDiv.replaceChildren();
                break;
            default:
                break;
        }
    }

    clearAll() {
        this.messagesDiv.replaceChildren();
        this.eventsDiv.replaceChildren();
        this.formsDiv.replaceChildren();
        this.registrantsDiv.replaceChildren();
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

    createRegistrantListCard(registrant, crud) {
        const registrantCard = document.createElement('div');
        registrantCard.classList.add('registrant-card');

        let html = 
        `<h3>${registrant.fullName}</h3>
        <p>name: ${registrant.eventTitle}</p>
        <p>email: ${registrant.email}</p>
        <p>guests: ${registrant.guests}</p>`;
        if(registrant.notes) {
            html += `<p>notes: ${registrant.notes}</p>`;
        }
        // html += `<button onclick="putRegistrant('${registrant._id}')">Update</button>`;
        // html += `<button onclick="deleteRegistrant('${registrant._id}')">Delete</button>`;
        registrantCard.innerHTML = html;

        registrantCard.innerHTML = html;

        const registrantUpdateButton = document.createElement('button');
        registrantUpdateButton.textContent = 'Update';
        registrantUpdateButton.addEventListener("click", () => {
            console.log(registrant._id);
            // crud.viewEvent(registrant._id);
        });
        registrantCard.appendChild(registrantUpdateButton);

        this.registrantsDiv.appendChild(registrantCard);
    }
}