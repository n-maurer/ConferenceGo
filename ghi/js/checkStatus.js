window.addEventListener("DOMContentLoaded", async () => {
    const payloadCookie = await cookieStore.get("jwt_access_payload");
    if (payloadCookie) {
        const encodedPayload = JSON.parse(payloadCookie.value);
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);

        if (
            payload.user.perms.includes("events.add_conference") &&
            payload.user.perms.includes("events.add_location")
        ) {
            const locationLinkTag = document.getElementById("hidden-location");
            locationLinkTag.classList.remove("d-none");
            const conferenceLinkTag =
                document.getElementById("hidden-conference");
            conferenceLinkTag.classList.remove("d-none");
        }
    }
});
