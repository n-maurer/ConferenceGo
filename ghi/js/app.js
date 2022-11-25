function createCard(name, description, pictureUrl, starts, ends, location) {
    return `
    <div class="col">
      <div class="card" style="width: 275px; margin-bottom: 20px;box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle" mb-2 text-muted style="color: gray; margin-bottom: 10px;">${location}</h6>
          <p class="card-text" >${description}</p>
        </div>
        <div class="card-footer">
        <p>${starts}-${ends}</p>
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
            console.log(e);
            const html = errorAlert(e);
            const column = document.querySelector(".row");
            column.innerHTML += html;
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;
                    const starts = new Date(
                        details.conference.starts
                    ).toLocaleDateString();
                    const ends = new Date(
                        details.conference.ends
                    ).toLocaleDateString();
                    const location = details.conference.location.name;
                    const html = createCard(
                        name,
                        description,
                        pictureUrl,
                        starts,
                        ends,
                        location
                    );
                    console.log(location);
                    const column = document.querySelector(".row");
                    column.innerHTML += html;
                }
            }
        }
    } catch (e) {
        console.log(e);
        const html = errorAlert(e);
        const error = document.querySelector(".row");
        error.innerHTML += html;
    }
});
