async function viewEvents() {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '<div class="loading">Loading events...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/events/`);
        if (!response.ok) throw Error(response.message);

        const data = await response.json();
        // console.log(data);

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
        if (!response.ok) throw Error(response.message);

        const data = await response.json();
        // console.log(data);

        if(!data) return;

        eventsContainer.replaceChildren();

        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.dataset.id = data._id;
        eventCard.dataset.location = data.location;

        let html = 
        `<h3>${data.title}</h3>
        <p>${data.location}</p>
        <p>${data.description}</p>`;
        eventCard.innerHTML = html;

        eventsContainer.appendChild(eventCard);

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

async function viewRegistrants() {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '<div class="loading">Loading registrants...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants/`);
        if (!response.ok) throw Error(response.message);

        const data = await response.json();
        // console.log(data);

        if(!data) return;

        eventsContainer.replaceChildren();

        data.forEach(registrant => {            
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.dataset.id = registrant._id;
            let html = 
            `<h3>${registrant.eventTitle}</h3>
            <p>name: ${registrant.fullName}</p>
            <p>email: ${registrant.email}</p>
            <p>guests: ${registrant.guests}</p>`;
            if(registrant.notes) {
                html += `<p>notes: ${registrant.notes}</p>`;
            }
            html += `<button onclick="putRegistrant('${registrant._id}')">Update</button>`;
            html += `<button onclick="deleteRegistrant('${registrant._id}')">Delete</button>`;
            eventCard.innerHTML = html;
            eventsContainer.appendChild(eventCard);
        });

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

async function postRegistrant() {
    const eventsContainer = document.getElementById('events');
    const createdAt = new Date(Date.now()).toISOString();
    eventsContainer.innerHTML = '<div class="loading">Creating registrant...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventId: '698299439a4cac03e8a330cb',
                eventTitle: 'Holiday of Hope',
                fullName: 'Test Name',
                email: 'test@test.com',
                guests: 5,
                notes: 'Here are my notes.',
                createdAt: createdAt
            })
        });
        if (!response.ok) throw Error(response.message);

        // const data = await response.json();
        // console.log(data);

        this.viewRegistrants();

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

async function putRegistrant(id) {
    const eventsContainer = document.getElementById('events');
    const createdAt = new Date(Date.now()).toISOString();
    eventsContainer.innerHTML = '<div class="loading">Updating registrant...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventId: '698299439a4cac03e8a330cb',
                eventTitle: 'Holiday of Hope (Updated)',
                fullName: 'Test Name (Updated)',
                email: 'test(Updated)@test.com',
                guests: 3,
                notes: 'Here are my notes. (Updated)',
                createdAt: createdAt
            })
        });
        if (!response.ok) throw Error(response.message);

        // const data = await response.json();
        // console.log(data);

        viewRegistrants();

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

async function deleteRegistrant(id) {
    const eventsContainer = document.getElementById('events');
    eventsContainer.innerHTML = '<div class="loading">Creating Registrant...</div>';

    try {
        const response = await fetch(`https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: ''
        });
        if (!response.ok) throw Error(response.message);

        // const data = await response.json();
        // console.log(data);

        this.viewRegistrants();

    } catch (error) {
        eventsContainer.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// var endpointUrl = "https://crudcrud.com/api/7e42b21784e849e197d7dcb5be768efe/registrants";
// var registrantJson = {
//                         createdAt: Date.now(),
//                         email: 'test@test.com',
//                         eventId: '698299439a4cac03e8a330cb',
//                         eventTitle: 'Holiday of Hope',
//                         fullName: 'Test Name',
//                         guests: 5,
//                         notes: 'Here are my notes.'
//                     }
// var unicornJson = JSON.stringify(registrantJson);

document.addEventListener('DOMContentLoaded', function () {
    viewEvents();
});