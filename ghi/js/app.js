window.addEventListener("DOMContentLoaded", async () => {
    const url = "http://localhost:8000/api/conferences/";
    const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log(data);
});
