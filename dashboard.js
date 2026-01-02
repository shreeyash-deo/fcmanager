$(document).ready(function () {

    $.getJSON("dashboard.json", function (data) {

        $("#statsCards").html(`
            <div class="col-md-3">
                <div class="stat-card orange">
                    <div class="stat-header">
                        <span>Matches Played</span>
                        <i class="fa-solid fa-trophy"></i>
                    </div>
                    <h2>${data.stats.matchesPlayed}</h2>
                </div>
            </div>

            <div class="col-md-3">
                <div class="stat-card green">
                    <div class="stat-header">
                        <span>Wins</span>
                        <i class="fa-solid fa-medal"></i>
                    </div>
                    <h2>${data.stats.wins}</h2>
                    <small>${data.stats.winRate} Win Rate</small>
                </div>
            </div>

            <div class="col-md-3">
                <div class="stat-card yellow">
                    <div class="stat-header">
                        <span>Goals Scored</span>
                        <i class="fa-solid fa-bullseye"></i>
                    </div>
                    <h2>${data.stats.goalsScored}</h2>
                </div>
            </div>

            <div class="col-md-3">
                <div class="stat-card blue">
                    <div class="stat-header">
                        <span>Squad Size</span>
                        <i class="fa-solid fa-users"></i>
                    </div>
                    <h2>${data.stats.squadSize}</h2>
                    <small>Active Players</small>
                </div>
            </div>
        `);

        $("#nextMatch").html(`
            <h5>Next Match</h5>
            <div class="next-match">
                <strong>${data.nextMatch.home}</strong>
                <span>VS</span>
                <strong>${data.nextMatch.away}</strong>
            </div>
            <p class="match-time">${data.nextMatch.date} · ${data.nextMatch.time}</p>
            <button class="btn btn-warning mt-2">Match Details</button>
        `);

        data.recentResults.forEach(r => {
            $("#recentResults").append(`
                <div class="result-item ${r.result === "W" ? "win" : "draw"}">
                    <span>${r.result}</span>
                    <div>
                        <strong>${r.match}</strong>
                        <small>${r.location}</small>
                    </div>
                    <b>${r.score}</b>
                </div>
            `);
        });

        data.topPlayers.forEach(p => {
            $("#topPlayers").append(`
                <div class="player-row">
                    <div>
                        <strong>${p.name}</strong>
                        <small>${p.position}</small>
                    </div>
                    <span class="skill">${p.skill}</span>
                </div>
            `);
        });

        $("#seasonOverview").html(`
            <h5>Season Overview</h5>
            <div class="row text-center mt-3">
                <div class="col-6 stat-mini win">${data.seasonOverview.wins}<br><small>Wins</small></div>
                <div class="col-6 stat-mini draw">${data.seasonOverview.draws}<br><small>Draws</small></div>
                <div class="col-6 stat-mini loss">${data.seasonOverview.losses}<br><small>Losses</small></div>
                <div class="col-6 stat-mini clean">${data.seasonOverview.cleanSheets}<br><small>Clean Sheets</small></div>
            </div>
            <hr>
            <strong>Goal Difference: ${data.seasonOverview.goalDifference}</strong>
        `);

    });

});

