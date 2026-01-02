$(document).ready(function () {

    $.getJSON("statistics.json", function (data) {

        /* PERFORMANCE OVERVIEW */
        $("#performanceOverview").html(`
            <h5>📈 Performance Overview</h5>

            ${progressBar("Win Rate", data.performance.winRate, "green")}
            ${progressBar("Goals Scored", data.performance.goalsScored, "orange")}
            ${progressBar("Clean Sheet Rate", data.performance.cleanSheetRate, "yellow")}
            ${progressBar("Goals Conceded", data.performance.goalsConceded, "red")}
        `);

        /* TOP SCORER */
        $("#topScorer").html(`
            <h6>Top Scorer</h6>
            <div class="top-card">
                <div class="avatar">${data.topScorer.code}</div>
                <div>
                    <strong>${data.topScorer.name}</strong>
                    <p>${data.topScorer.goals} goals</p>
                </div>
            </div>
        `);

        /* TOP ASSISTER */
        $("#topAssister").html(`
            <h6>Top Assister</h6>
            <div class="top-card">
                <div class="avatar green">${data.topAssister.code}</div>
                <div>
                    <strong>${data.topAssister.name}</strong>
                    <p>${data.topAssister.assists} assists</p>
                </div>
            </div>
        `);

        /* METRICS */
        $("#metricsCards").html(`
            ${metricCard("🎯", data.metrics.goalsPerMatch, "Goals / Match")}
            ${metricCard("🛡️", data.metrics.concededPerMatch, "Conceded / Match")}
            ${metricCard("⚡", data.metrics.avgSkill, "Avg Skill Rating")}
            ${metricCard("👤", data.metrics.avgAge, "Avg Squad Age")}
        `);

        /* SEASON SUMMARY */
        $("#seasonSummary").html(`
            <h6>Season Summary</h6>
            <p>Total Matches: <b>${data.seasonSummary.totalMatches}</b></p>
            <p class="green">Wins: ${data.seasonSummary.wins}</p>
            <p>Draws: ${data.seasonSummary.draws}</p>
            <p class="red">Losses: ${data.seasonSummary.losses}</p>
        `);

    });

});

/* HELPERS */

function progressBar(label, value, color) {
    return `
        <div class="mb-3">
            <div class="d-flex justify-content-between">
                <span>${label}</span>
                <span>${value}</span>
            </div>
            <div class="bar">
                <div class="${color}" style="width:${value}%"></div>
            </div>
        </div>
    `;
}

function metricCard(icon, value, label) {
    return `
        <div class="col-md-3">
            <div class="metric-card">
                <div class="icon">${icon}</div>
                <h3>${value}</h3>
                <small>${label}</small>
            </div>
        </div>
    `;
}
