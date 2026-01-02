let allPlayers = [];

$(document).ready(function () {

    $.getJSON("players.json", function (data) {
        allPlayers = data.players;
        renderPlayers(allPlayers);
    });
    
    $(".filter-group button").click(function () {
        $(this).siblings().removeClass("active");
        $(this).addClass("active");
        applyFilters();
    });

});

function applyFilters() {
    const pos = $("#positionFilter .active").data("pos");
    const fit = $("#fitnessFilter .active").data("fit");

    let filtered = allPlayers.filter(p => {
        let posOk = pos === "All" || p.position === pos;
        let fitOk =
            fit === "All" ||
            (fit == 90 && p.fitness >= 90) ||
            (fit == 70 && p.fitness >= 70 && p.fitness < 90) ||
            (fit == 0 && p.fitness < 70);

        return posOk && fitOk;
    });

    renderPlayers(filtered);
}

function renderPlayers(players) {
    $("#playersContainer").empty();
    $("#playerCount").text(`Showing ${players.length} of ${allPlayers.length} players`);

    players.forEach(p => {
        $("#playersContainer").append(`
            <div class="col-lg-4">
                <div class="player-card-advanced">

                    <div class="player-top">
                        <div class="avatar">${p.code}</div>
                        <div>
                            <h5>${p.name}</h5>
                            <span class="badge ${p.position.toLowerCase()}">${p.position}</span>
                            <small>${p.country}</small>
                        </div>
                        <div class="skill">${p.skill}</div>
                    </div>

                    <div class="stats">
                        <div><b>${p.age}</b><small>Age</small></div>
                        <div><b>${p.goals}</b><small>Goals</small></div>
                        <div><b>${p.assists}</b><small>Assists</small></div>
                    </div>

                    <div class="fitness">
                        ❤️ Fitness <span>${p.fitness}%</span>
                        <div class="bar">
                            <div style="width:${p.fitness}%"></div>
                        </div>
                    </div>

                </div>
            </div>
        `);
    });
}
