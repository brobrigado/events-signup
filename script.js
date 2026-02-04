async function viewEvents() {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/events/`);
        if (!response.ok) throw Error(response.message)

        const data = await response.json();
        console.log(data);

        if(!data) return;

        eventsContainer.replaceChildren();

        data.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.dataset.id = event._id;
            eventCard.dataset.location = event.location;
            eventCard.innerHTML = 
            `<h3>${event.title}</h3>
            <p>${event.location}</p>
            <p>${event.description}</p>`;
            eventsContainer.appendChild(eventCard);
        });

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

async function viewEvent(id) {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/events/${id}`);
        if (!response.ok) throw Error(response.message)

        const data = await response.json();
        console.log(data);

        if(!data) return;

        eventsContainer.replaceChildren();

        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.dataset.id = data._id;
        eventCard.dataset.location = data.location;
        eventCard.innerHTML = 
        `<h3>${data.title}</h3>
        <p>${data.location}</p>
        <p>${data.description}</p>`;
        eventsContainer.appendChild(eventCard);

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}