window.addEventListener("DOMContentLoaded", async () => {
    const selectTag = document.getElementById("conference");

    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement("option");
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        // Here, add the 'd-none' class to the loading icon
        const selectDiv = document.getElementById("conference");
        const loadingDiv = document.getElementById(
            "loading-conference-spinner"
        );
        loadingDiv.classList.add("d-none");
        selectDiv.classList.remove("d-none");
    }
});
