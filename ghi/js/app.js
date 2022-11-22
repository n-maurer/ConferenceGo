window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/conferences/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Reponse not ok");
        } else {
            const data = await response.json();
            // console.log(data);

            const conference = data.conferences[0];
            const nameTag = document.querySelector(".card-title");
            nameTag.innerHTML = conference.name;

            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                const details = await detailResponse.json();
                console.log(details);

                const conference = details.conference;
                // const conference = details.weather;
                const detailTag = document.querySelector(".card-text");
                detailTag.innerHTML = conference.description;

                const imageTag = document.querySelector(".card-img-top");
                imageTag.src = details.conference.location.picture_url;
            }
        }
    } catch (e) {
        console.log("error", error);
    }
});
