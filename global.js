$(document).ready(function () {
    const savedTeamName = localStorage.getItem("teamName");

    if (savedTeamName) {
        $("#sidebarTeamName").text(savedTeamName);
        $("#pageTeamName").text(savedTeamName);
    }
});
