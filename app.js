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

function createRegistrationPostForm(eventId, eventTitle) {
    const rootElement = document.getElementById('form');
    const formCard = document.createElement('div');
    formCard.classList.add('form-card');
    formCard.dataset.id = eventId;
    let html = `<p>FORM</p>`;
    formCard.innerHTML = html;
    rootElement.appendChild(formCard);
}

document.addEventListener('DOMContentLoaded', function () {
    const template = new Template();
    const crud = new Crud(template);
    crud.viewEventList();

    document.getElementById("viewEventListBtn").addEventListener("click", () => {
      crud.viewEventList();
    });
});