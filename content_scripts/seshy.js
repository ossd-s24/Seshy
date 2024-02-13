let lastScrollTop = 0;

document.addEventListener('click', function () {
  browser.runtime.sendMessage({ action: 'incrementCount' });
});

window.addEventListener('scroll', function () {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const scrollAmount = Math.abs(scrollTop - lastScrollTop);
  lastScrollTop = scrollTop;
  browser.runtime.sendMessage({ action: 'updateScrollDistance', scrollAmount });
});