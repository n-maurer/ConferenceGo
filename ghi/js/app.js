function createCard(title, description, pictureUrl, start, end, location) {
    return `
        <div class="col-sm-6 col-md-4 mb-1">
            <div class="card shadow-lg p-3 mb-5 bg-body rounded">
                <img src="${pictureUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${location}</h5>
                    <p class="card-text">${description}</p>
                </div>
                <div class="card-footer">
                    ${start} - ${end}
                </div>
            </div>
        </div>
        `;
}

function errorAlert(e) {
    return `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            ${e}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <span aria-hidden="true">&times;</span>
        </div>
    `;
}

window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/conferences/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            const e = "An error happened!";
            console.error(e);
            const html = errorAlert(e);
            const column = document.querySelector(".row");
            column.innerHTML += html;
            // Figure out what to do when the response is bad
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const title = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const startDate = new Date(details.conference.starts);
                    const start = `${startDate.getMonth()}/${startDate.getDate()}/${startDate.getFullYear()}`;
                    const endDate = new Date(details.conference.ends);
                    const end = `${endDate.getMonth()}/${endDate.getDate()}/${endDate.getFullYear()}`;
                    const location = details.conference.location.name;
                    const html = createCard(
                        title,
                        description,
                        pictureUrl,
                        start,
                        end,
                        location
                    );
                    const column = document.querySelector(".row");
                    column.innerHTML += html;
                }
            }
        }
    } catch (e) {
        console.error(e);
        const html = errorAlert(e);
        const error = document.querySelector(".row");
        error.innerHTML += html;
        // Figure out what to do if an error is raised
    }
});
