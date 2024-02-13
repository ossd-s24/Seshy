let totalClicks = 0;

function updateStats(startTime) {
    //let timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    document.getElementById('clicks').textContent = totalClicks;
    //document.getElementById('time').textContent = timeElapsed;
    document.getElementById('scroll').textContent = Math.floor(scrollDistance);
    browser.runtime.sendMessage({command: "getTimeSpent"}).then(response => {
        const timeSpent = response.timeSpent;
        document.getElementById("time").textContent =Math.floor(timeSpent / 1000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    browser.storage.local.get(['startTime', 'scrollDistance', 'totalClicks']).then(data => {
        let startTime = data.startTime || Date.now();
        totalClicks = data.totalClicks || 0;
        scrollDistance = data.scrollDistance || 0;

        if (!data.startTime) {
            browser.storage.local.set({ startTime, totalClicks});
        }
        updateStats(startTime);
        setInterval(() => updateStats(startTime), 1000);
        document.addEventListener('click', () => {
            totalClicks++;
            browser.storage.local.set({ totalClicks });
            updateStats(startTime);
        });

    });
});
