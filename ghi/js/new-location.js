window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/states/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        const element = document.getElementById("state");
        for (let state of data.states) {
            let option = document.createElement("option");
            option.value = Object.values(state);
            option.innerHTML = Object.keys(state);
            element.appendChild(option);
        }
        const formTag = document.getElementById("create-location-form");
        formTag.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const locationUrl = "http://localhost:8000/api/locations/";
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
                console.log(newLocation);
            }
        });
    } else {
        console.error("There has been an error");
    }
});
