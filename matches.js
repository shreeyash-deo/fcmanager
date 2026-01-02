let allMatches = [];

$(document).ready(function () {

    $.getJSON("matches.json", function (data) {
        allMatches = data.matches;
        renderMatches(allMatches);
        updateCounts();
    });

    $(".match-tabs button").click(function () {
        $(".match-tabs button").removeClass("active");
        $(this).addClass("active");

        const filter = $(this).data("filter");

        if (filter === "all") {
            renderMatches(allMatches);
        } else if (filter === "upcoming") {
            renderMatches(allMatches.filter(m => m.status === "upcoming"));
        } else {
            renderMatches(allMatches.filter(m => m.status !== "upcoming"));
        }
    });

});

function updateCounts() {
    const upcoming = allMatches.filter(m => m.status === "upcoming").length;
    const completed = allMatches.length - upcoming;

    $(".match-tabs button[data-filter='upcoming']").text(`Upcoming (${upcoming})`);
    $(".match-tabs button[data-filter='completed']").text(`Completed (${completed})`);
    $(".match-tabs button[data-filter='all']").text(`All (${allMatches.length})`);
}

function renderMatches(matches) {
    $("#matchesContainer").empty();

    matches.forEach(m => {
        $("#matchesContainer").append(`
            <div class="col-lg-6">
                <div class="match-card">
                    <div class="match-header">
                        <span><i class="fa-solid fa-calendar"></i> ${m.date}</span>
                        <span class="badge ${m.status}">${m.status}</span>
                    </div>

                    <div class="match-body">
                        <div class="team">
                            <div class="team-box">${m.homeCode}</div>
                            <span>${m.home}</span>
                        </div>

                        <div class="match-info">
                            ${m.time ? `<i class="fa-regular fa-clock"></i> ${m.time}` : `<h3>${m.score}</h3>`}
                        </div>

                        <div class="team">
                            <div class="team-box gray">${m.awayCode}</div>
                            <span>${m.away}</span>
                        </div>
                    </div>

                    <div class="match-footer">
                        <i class="fa-solid fa-location-dot"></i> ${m.venue}
                    </div>
                </div>
            </div>
        `);
    });
}
