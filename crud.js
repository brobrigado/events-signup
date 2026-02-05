class Crud {
    constructor(template) {
        this.template = template;
        this.eventsUrl = 'https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/events/';
    }

    async viewEventList() {
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

    async viewEvent(id) {
        this.template.updateMessage('<div class="loading">Loading event...</div>');

        try {
            const response = await fetch(`${this.eventsUrl}${id}`);
            if (!response.ok) throw Error(response.message);

            const data = await response.json();

            this.template.clear('messages');
            this.template.clear('events');

            this.template.createEventCard(data, this);

        } catch (error) {
            this.template.updateMessage(`<div class="error">Error: ${error.message}</div>`);
        }
    }
}