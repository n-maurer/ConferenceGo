window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/conferences/";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            console.error("there has been an error");
        } else {
            const data = await response.json();
            const selectTag = document.getElementById("conferences");

            for (let conference of data.conferences) {
                let option = document.createElement("option");
                option.value = conference.id;
                option.innerHTML = conference.name;
                selectTag.appendChild(option);
            }

            const formTag = document.getElementById("create-presentation-form");
            formTag.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(formTag);
                const conferenceid = Object.fromEntries(formData).conferences;

                const presenter_name =
                    Object.fromEntries(formData).presenter_name;
                const presenter_email =
                    Object.fromEntries(formData).presenter_email;
                const synopsis = Object.fromEntries(formData).synopsis;
                const company_name = Object.fromEntries(formData).company_name;
                const title = Object.fromEntries(formData).title;
                let test = {};
                test["presenter_name"] = presenter_name;
                test["presenter_email"] = presenter_email;
                test["synopsis"] = synopsis;
                test["company_name"] = company_name;
                if (title === {}) {
                } else {
                    test["title"] = title;
                }
                let json = JSON.stringify(test);

                const presentationsUrl = `http://localhost:8000/api/conferences/${conferenceid}/presentations/`;
                const fetchConfig = {
                    method: "post",
                    body: json,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };
                const response = await fetch(presentationsUrl, fetchConfig);
                if (response.ok) {
                    formTag.reset();
                    const newPresentation = await response.json();
                    console.log(newPresentation);
                }
            });
        }
    } catch (e) {
        console.error("There has been an error");
    }
});
