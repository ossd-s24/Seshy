let startTime = Date.now();
browser.runtime.onStartup.addListener(function () {
    startTime = Date.now();
    browser.storage.local.set({
      totalClicks: 0,
      scrollDistance: 0,
    });
  });
  browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.command === "getTimeSpent") {
        const currentTime = Date.now();
        const timeSpent = currentTime - startTime;
        sendResponse({timeSpent: timeSpent}); 
    }
});

  browser.runtime.onMessage.addListener(function (request) {
    if (request.action === 'incrementCount') {
      browser.storage.local.get('totalClicks', function (data) {
        const newCount = (data.totalClicks || 0) + 1;
        browser.storage.local.set({ totalClicks: newCount });
      });
    } else if (request.action === 'updateScrollDistance') {
      browser.storage.local.get('scrollDistance', function (data) {
        const newDistance = (data.scrollDistance || 0) + request.scrollAmount;
        browser.storage.local.set({ scrollDistance: newDistance });
      });
    }
  });