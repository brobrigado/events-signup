class Crud {
    constructor(template) {
        this.template = template;
        this.eventsUrl = 'https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/events/';
        this.registrantsUrl = 'https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants/';
        this.categories = ['All', 'Holiday', 'Cultural'];
    }

    async viewEventList(filter = {type:'all', value:''}) {
        this.template.showEventListMenu();
        this.template.clearAll();
        this.template.updateMessage('<div class="loading">Loading events...</div>');

        if(filter.type != 'category') {
            this.template.resetFilterButton();
        }

        if(filter.type != 'search') {
            this.template.clearSearchbar();
        }

        try {
            const response = await fetch(this.eventsUrl);
            if (!response.ok) throw Error(response.message);

            const data = await response.json();
            const filteredData = this.filterEvents(filter, data);

            this.template.clear('events');

            if(filteredData.length > 0) {
                this.template.updateMessage(`<div class="success">Load complete: ${filteredData.length} events found.</div>`);
            } else {
                this.template.emptySearchMessage(filter.value);
                this.template.updateMessage(`<div class="success">Load complete: No events found.</div>`);
            }

            filteredData.forEach(event => {
                this.template.createEventListCard(event, this);
            });

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    async viewEvent(eventId) {
        this.template.hideEventListMenu();
        this.template.clearAll();
        this.template.updateMessage('<div class="loading">Loading event...</div>');

        try {
            const response = await fetch(`${this.eventsUrl}${eventId}`);
            if (!response.ok) throw Error(response.message);

            const data = await response.json();

            this.template.clear('messages');
            this.template.clear('events');

            this.template.createEventCard(data, this);
            this.template.createNewRegistrantForm(data, this);

            this.viewRegistrants(eventId);

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    async viewRegistrants(eventId) {
        this.template.updateMessage('<div class="loading">Loading registrants...</div>');

        try {
            const response = await fetch(this.registrantsUrl);
            if (!response.ok) throw Error(response.message);

            const data = await response.json();

            this.template.clear('messages');
            this.template.clear('registrants');
            this.template.createRegistrantListHeader();

            let registrantCount = 0;

            data.forEach(registrant => {
                if(registrant.eventId == eventId) {
                    registrantCount++;
                    this.template.createRegistrantListCard(registrant, this);
                }
            });

            this.template.updateMessage(`<div class="success">Load complete: ${registrantCount} registrants found.</div>`);

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    async createRegistrant(eventId, eventTitle) {
        this.template.updateMessage('<div class="loading">Creating registration...</div>');
        const createdAt = new Date(Date.now()).toISOString();

        const formContainer = document.getElementById(`form_${eventId}`);
        const formData = this.createFormData(eventId);
        if(!formData) return;

        try {
            const response = await fetch(this.registrantsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: eventId,
                    eventTitle: eventTitle,
                    fullName: formData.fullName,
                    email: formData.email,
                    guests: formData.guests,
                    notes: formData.notes,
                    createdAt: createdAt
                })
            });
            if (!response.ok) throw Error(response.message);

            formContainer.remove();
            this.template.updateMessage(`<div class="success">Thank you. Your registration has been received.</div>`);
            this.viewRegistrants(eventId);

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    async updateRegistrant(registrantId, eventId, eventTitle) {
        this.template.updateMessage('<div class="loading">Updating registration...</div>');
        const createdAt = new Date(Date.now()).toISOString();

        const formContainer = document.getElementById(`form_${registrantId}`);
        const formData = this.createFormData(registrantId);
        if(!formData) return;

        try {
            const response = await fetch(`${this.registrantsUrl}${registrantId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    eventId: eventId,
                    eventTitle: eventTitle,
                    fullName: formData.fullName,
                    email: formData.email,
                    guests: formData.guests,
                    notes: formData.notes,
                    createdAt: createdAt
                })
            });
            if (!response.ok) throw Error(response.message);

            formContainer.remove();
            this.template.updateMessage(`<div class="success">Thank you. Your registration has been received.</div>`);
            this.viewRegistrants(eventId);

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    async deleteRegistrant(registrantId, eventId) {
        this.template.updateMessage('<div class="loading">Deleting registration...</div>');

        try {
            const response = await fetch(`${this.registrantsUrl}${registrantId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: ''
            });
            if (!response.ok) throw Error(response.message);

            this.template.updateMessage(`<div class="success">Thank you. Your registration has been removed.</div>`);

            this.viewRegistrants(eventId);

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    searchEvents() {
        const search =  this.sanitizeHTML(document.getElementById('search').value);

        if(!search) {
            this.template.updateMessage('<div class="error">Error: Nothing to search.</div>');
            return;
        }

        this.viewEventList({
            type: 'search',
            value: search
        });
    }

    filterEvents(filter, data) {
        if(filter.type == 'all' || filter.type == 'category' && filter.value == 'All') {
            return data;
        }
        
        let results = [];

        switch (filter.type) {
            case 'search':
                data.forEach(event => {
                    let testString = event.title.concat(' ', event.description);
                    testString = testString.concat(' ', event.location);
                    const regex = new RegExp(filter.value, "i");
                    if(regex.test(testString)) {
                        results.push(event);
                    }
                });
                break;
            
            case 'category':
                data.forEach(event => {
                    if(event.category == filter.value) {
                        results.push(event);
                    }
                });
                break;
        
            default:
                results = data;
        }
        
        return results;
    }

    createFormData(formId) {
        const fullName =  this.sanitizeHTML(document.getElementById(`name_${formId}`).value);
        const email =  this.sanitizeHTML(document.getElementById(`email_${formId}`).value);
        const guests =  this.sanitizeHTML(document.getElementById(`guests_${formId}`).value);
        const notes =  this.sanitizeHTML(document.getElementById(`notes_${formId}`).value);

        if(!fullName || !email || !guests) {
            this.template.updateMessage('<div class="error">Error: Please fill out the required fields.</div>');
            return;
        }

        if(!this.isValidEmail(email)) {
            this.template.updateMessage('<div class="error">Error: Please enter a correct email.</div>');
            return;
        }

        return {
            fullName: fullName,
            email: email,
            guests: guests,
            notes: notes,
        }
    }

    sanitizeHTML(str) {
        return str.replace(/[&<>"'/]/g, function (char) {
            const escapeMap = {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;',
                '/': '&#x2F;'
            };
            return escapeMap[char];
        });
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    openCategoryFilterMenu() {
        const filterDropDown =  document.getElementById('filterDropDown');
        if (filterDropDown.hasChildNodes()) {
            filterDropDown.replaceChildren();
        } else {
            this.template.createFilterButtons(this.categories, this);
        }
    }
}