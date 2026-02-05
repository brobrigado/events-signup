class Crud {
    constructor(template) {
        this.template = template;
        this.eventsUrl = 'https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/events/';
        this.registrantsUrl = 'https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants/';
    }

    async viewEventList() {
        this.template.clearAll();
        this.template.updateMessage('<div class="loading">Loading events...</div>');

        try {
            const response = await fetch(this.eventsUrl);
            if (!response.ok) throw Error(response.message);

            const data = await response.json();

            this.template.updateMessage(`${data.length} events found.`);
            this.template.clear('events');

            data.forEach(event => {
                this.template.createEventListCard(event, this);
            });

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }

    async viewEvent(eventId) {
        this.template.clearAll();
        this.template.updateMessage('<div class="loading">Loading event...</div>');

        try {
            const response = await fetch(`${this.eventsUrl}${eventId}`);
            if (!response.ok) throw Error(response.message);

            const data = await response.json();

            this.template.clear('messages');
            this.template.clear('events');

            this.template.createEventCard(data, this);

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

            data.forEach(registrant => {
                if(registrant.eventId == eventId) {
                    this.template.createRegistrantListCard(registrant, this);
                }
            });

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }
}