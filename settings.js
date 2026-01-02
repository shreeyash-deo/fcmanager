$(document).ready(function () {

    /* LOAD STATIC DATA */
    $.getJSON("settings.json", function (data) {

        const savedName = localStorage.getItem("teamName") || data.team.name;

        $("#teamNameInput").val(savedName);
        $("#sidebarTeamName").text(savedName);

        $("#teamInfo").html(`
            <h5>Team Information</h5>

            <div class="info-row">
                <i class="fa-solid fa-building"></i>
                <div>
                    <small>Stadium</small>
                    <strong>${data.team.stadium}</strong>
                </div>
            </div>

            <div class="info-row">
                <i class="fa-solid fa-users"></i>
                <div>
                    <small>Capacity</small>
                    <strong>${data.team.capacity}</strong>
                </div>
            </div>

            <div class="info-row">
                <i class="fa-solid fa-calendar"></i>
                <div>
                    <small>Founded</small>
                    <strong>${data.team.founded}</strong>
                </div>
            </div>
        `);

        $("#aboutSection").html(`
            <h5>About</h5>
            <p><strong>${data.about.version}</strong></p>
            <p class="subtitle">${data.about.description}</p>
        `);
    });

    /* SAVE TEAM NAME */
    $("#saveTeamName").click(function () {
        const newName = $("#teamNameInput").val().trim();
        if (newName !== "") {
            localStorage.setItem("teamName", newName);
            $("#sidebarTeamName").text(newName);
            alert("Team name saved!");
        }
    });

    /* THEME TOGGLE */
    const theme = localStorage.getItem("theme") || "dark";
    applyTheme(theme);

    $("#toggleTheme").click(function () {
        const newTheme = $("body").hasClass("light") ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });

});

/* APPLY THEME */
function applyTheme(theme) {
    if (theme === "light") {
        $("body").addClass("light");
        $("#toggleTheme").text("Switch to Dark");
    } else {
        $("body").removeClass("light");
        $("#toggleTheme").text("Switch to Light");
    }
}
