window.addEventListener("DOMContentLoaded", async () => {
    const selectTag = document.getElementById("conference");

    const url = "http://localhost:8000/api/conferences/";

    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            for (let conference of data.conferences) {
                const option = document.createElement("option");
                option.value = conference.href;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }
            const selectDiv = document.getElementById("conference");
            const loadingDiv = document.getElementById(
                "loading-conference-spinner"
            );
            loadingDiv.classList.add("d-none");
            selectDiv.classList.remove("d-none");

            const formTag = document.getElementById("create-attendee-form");
            formTag.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const attendeeName = Object.fromEntries(formData).name;
                const attendeeEmail = Object.fromEntries(formData).email;
                const conferenceId = Object.fromEntries(formData).conference;

                const json = JSON.stringify(Object.fromEntries(formData));

                const attendeeUrl = "http://localhost:8001/api/attendees/";
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const response = await fetch(attendeeUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newAttendee = await response.json();
                    console.log(newAttendee);
                    selectDiv.classList.add("d-none");
                    const alertDiv = document.getElementById("success-message");
                    alertDiv.classList.remove("d-none");
                }
            });
        }
    } catch (e) {
        console.error("There has been an error");
    }
});
