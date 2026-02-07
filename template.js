class Template {
    constructor() {
        this.pageElements = document.getElementById('pageElements');
        this.messagesDiv = document.getElementById('messages');
        this.eventsDiv = document.getElementById('events');
        this.formsDiv = document.getElementById('forms');
        this.registrantsDiv = document.getElementById('registrants');
        this.eventListMenuDiv = document.getElementById('eventListMenu');
        this.filterCategoryBtn = document.getElementById('filterCategoryBtn');
        this.filterDropDown = document.getElementById('filterDropDown');
        this.search = document.getElementById('search');
    }

    createEventListCard(event, crud) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        let html = '';
        
        if(event.featured) {
            html += '<div class="event-card--featured"><i class="bi bi-star-fill"></i></div>';
        }

        html += 
        `<div class="event-card--image">
            <img class="img-fluid" src="${event.imageUrl}" alt="${event.title}">
        </div>
        <div class="event-card--text">
            <h3>${event.title}</h3>
            <div class="event-card--details">
                <p><i class="bi bi-bookmark"></i> ${event.category}</p>
                <p><i class="bi bi-calendar"></i> ${event.date}</p>
                <p><i class="bi bi-geo-alt"></i> ${event.location}</p>
                <p><i class="bi bi-box"></i> ${event.capacity}</p>
            </div>
            <div class="event-card--description">
                <p>${event.description}</p>
            </div>
            <button id="viewEventBtn_${event._id}" class="btn btn-secondary">View Event</button>
        </div>`;

        eventCard.innerHTML = html;

        this.eventsDiv.appendChild(eventCard);

        const viewEventBtn = document.getElementById(`viewEventBtn_${event._id}`);
        viewEventBtn.addEventListener("click", () => {
            crud.viewEvent(event._id);
        });
    }

    createEventCard(event, crud) {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.classList.add('event-card--single');

        let html = '';
        
        if(event.featured) {
            html += '<div class="event-card--featured"><i class="bi bi-star-fill"></i></div>';
        }

        html += 
        `<div class="event-card--image">
            <img class="img-fluid" src="${event.imageUrl}" alt="${event.title}">
        </div>
        <div class="event-card--text">
            <h3>${event.title}</h3>
            <div class="event-card--details">
                <p><i class="bi bi-bookmark"></i> ${event.category}</p>
                <p><i class="bi bi-calendar"></i> ${event.date}</p>
                <p><i class="bi bi-geo-alt"></i> ${event.location}</p>
                <p><i class="bi bi-box"></i> ${event.capacity}</p>
            </div>
            <div class="event-card--description">
                <p>${event.description}</p>
            </div>
        </div>`;

        eventCard.innerHTML = html;

        const eventCloseButton = document.createElement('button');
        eventCloseButton.textContent = 'X';
        eventCloseButton.classList.add('event-card--close-button');
        eventCloseButton.addEventListener("click", () => {
            crud.viewEventList();
        });
        eventCard.appendChild(eventCloseButton);

        this.eventsDiv.appendChild(eventCard);
    }

    createRegistrantListHeader() {
        const registrantListHeader = document.createElement('h4');
        registrantListHeader.textContent = "Registered Users";
        this.registrantsDiv.appendChild(registrantListHeader);
    }

    createRegistrantListCard(registrant, crud) {
        const registrantCard = document.createElement('div');
        registrantCard.classList.add('registrant-card');

        let html = 
        `<h5>${registrant.fullName}</h5>
        <p><i class="bi bi-envelope-fill"></i> ${registrant.email}</p>
        <p><i class="bi bi-people-fill"></i> ${registrant.guests}</p>`;
        if(registrant.notes) {
            html += `<p><i class="bi bi-chat-dots-fill"></i> ${registrant.notes}</p>`;
        }
        html += 
        `<div class="buttonSet">
            <button id="registrantUpdateBtn_${registrant._id}" class="btn btn-sm btn-outline-secondary">Update</button>
            <button id="registrantDeleteBtn_${registrant._id}" class="btn btn-sm btn-outline-secondary">Delete</button>
        </div>`;
        registrantCard.innerHTML = html;

        this.registrantsDiv.appendChild(registrantCard);

        const registrantUpdateBtn = document.getElementById(`registrantUpdateBtn_${registrant._id}`);
        registrantUpdateBtn.addEventListener("click", () => {
            this.createUpdateRegistrantForm(registrant, registrantCard, crud);
        });

        const registrantDeleteBtn = document.getElementById(`registrantDeleteBtn_${registrant._id}`);
        registrantDeleteBtn.addEventListener("click", () => {
            crud.deleteRegistrant(registrant._id, registrant.eventId);
        });
    }

    createNewRegistrantForm(event, crud) {
        const registrantFormCard = document.createElement('div');
        registrantFormCard.classList.add('form-card');
        registrantFormCard.setAttribute('id', `form_${event._id}`);

        let html = 
        `<h4>Register for Event</h4>
        <div class="form-group">
            <div class="input-group">
                <label class="form-label" for="name">Name:</label>
                <input class="form-control" type="text" id="name_${event._id}" placeholder="Full name" required>
            </div>
            <div class="input-group">
                <label class="form-label" for="email">Email:</label>
                <input class="form-control" type="text" id="email_${event._id}" placeholder="Email" required>
            </div>
            <div class="input-group">
                <label class="form-label" for="guests">Guests:</label>
                <input class="form-control" type="number" id="guests_${event._id}" placeholder="Amount of guests" required>
            </div>
            <div class="input-group">
                <label class="form-label" for="notes">Notes:</label>
                <textarea class="form-control" id="notes_${event._id}" placeholder="Notes about registration"></textarea>
            </div>
            <div class="input-group input-group--right">
                <button type="submit" id="registerBtn_${event._id}" class="btn btn-primary mt-2">Register</button>
            </div>
        </div>`;

        registrantFormCard.innerHTML = html;

        this.formsDiv.appendChild(registrantFormCard);

        const registerBtn = document.getElementById(`registerBtn_${event._id}`);
        registerBtn.addEventListener("click", () => {
            crud.createRegistrant(event._id, event.title);
        });
    }

    createUpdateRegistrantForm(registrant, parentDiv, crud) {
        const registrantFormCard = document.createElement('div');
        registrantFormCard.classList.add('form-card');
        registrantFormCard.setAttribute('id', `form_${registrant._id}`);

        let html = 
        `<p><strong>Update your registration for ${registrant.eventTitle}</strong></p>
        <div class="form-group">
            <div class="input-group">
                <label class="form-label" for="name">Name:</label>
                <input class="form-control" type="text" id="name_${registrant._id}" value="${registrant.fullName}" required>
            </div>
            <div class="input-group">
                <label class="form-label" for="email">Email:</label>
                <input class="form-control" type="text" id="email_${registrant._id}" value="${registrant.email}" required>
            </div>
            <div class="input-group">
                <label class="form-label" for="guests">Guests:</label>
                <input class="form-control" type="number" id="guests_${registrant._id}" value="${registrant.guests}" required>
            </div>
            <div class="input-group">
                <label class="form-label" for="notes">Notes:</label>
                <textarea class="form-control" id="notes_${registrant._id}">${registrant.notes}</textarea>
            </div>
            <div class="buttonSet">
                <button type="submit" id="updateBtn_${registrant._id}" class="btn btn-sm btn-outline-secondary">Update</button>
                <button type="submit" id="cancelBtn_${registrant._id}" class="btn btn-sm btn-outline-secondary">Cancel</button>
            </div>
        </div>`;

        registrantFormCard.innerHTML = html;

        parentDiv.appendChild(registrantFormCard);

        const updateBtn = document.getElementById(`updateBtn_${registrant._id}`);
        updateBtn.addEventListener("click", () => {
            crud.updateRegistrant(registrant._id, registrant.eventId, registrant.eventTitle);
        });

        const cancelBtn = document.getElementById(`cancelBtn_${registrant._id}`);
        cancelBtn.addEventListener("click", () => {
            registrantFormCard.remove();
        });
    }

    updatePageElements(classId) {
        switch (classId) {
            case 'event_list':
                this.pageElements.classList.add('page-elements--event-list');
                this.pageElements.classList.remove('page-elements--event-single');
                this.showEventListMenu();
                this.clearAll();
                this.loadingMessage();
                break;
            case 'event_single':
                this.pageElements.classList.add('page-elements--event-single');
                this.pageElements.classList.remove('page-elements--event-list');
                this.hideEventListMenu();
                this.clearAll();
                this.loadingMessage();
                break;
            default:
                break;
        }
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

    hideEventListMenu() {
        this.eventListMenuDiv.style.display = 'none';
    }

    showEventListMenu() {
        this.eventListMenuDiv.style.display = 'flex';
    }

    resetFilterButton() {
        this.filterCategoryBtn.textContent = 'All';
    }

    clearSearchbar() {
        this.search.value = '';
    }

    emptySearchMessage(message) {
        this.eventsDiv.innerHTML = `<p>Sorry, no events found for "${message}".</p>`;
    }

    loadingMessage() {
        this.eventsDiv.innerHTML = `<p>Loading...</p>`;
    }

    registrationComplete() {
        this.formsDiv.innerHTML = 
        `<div class="form-card">
        <h5>Thank you for registering</h5>
        <p>Your registration is complete</p>
        </div>`;
    }

    createFilterButtons(categories, crud) {
        this.filterDropDown.replaceChildren();

        categories.forEach(category => {
            if(this.filterCategoryBtn.textContent != category) {
                const filterCategoryButton = document.createElement('button');
                filterCategoryButton.textContent = category;
                filterCategoryButton.classList.add('btn');
                filterCategoryButton.classList.add('btn-secondary');
                filterCategoryButton.addEventListener("click", () => {
                    crud.viewEventList({
                        type: 'category',
                        value: category
                    });
                    this.filterDropDown.replaceChildren();
                    this.filterCategoryBtn.textContent = category;
                });
                this.filterDropDown.appendChild(filterCategoryButton);
            }
        });
    }
}