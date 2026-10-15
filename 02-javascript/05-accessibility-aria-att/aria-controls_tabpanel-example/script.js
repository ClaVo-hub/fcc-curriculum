const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activateTab(tab);
  });

  tab.addEventListener("keydown", (e) => {
    const key = e.key;
    const currentIndex = Array.from(tabs).indexOf(tab);
    let newIndex = null;

    if (key === "ArrowRight") {
      newIndex = (currentIndex + 1) % tabs.length;
    } else if (key === "ArrowLeft") {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (key === "Home") {
      newIndex = 0;
    } else if (key === "End") {
      newIndex = tabs.length - 1;
    }

    if (newIndex !== null) {
      tabs[newIndex].focus();
      activateTab(tabs[newIndex]);
    }
  });
});

function activateTab(tab) {
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((t) => {
    t.setAttribute("aria-selected", "false");
    t.setAttribute("tabindex", "-1");
  });

  tabPanels.forEach((panel) => (panel.hidden = true));

  tab.setAttribute("aria-selected", "true");
  tab.removeAttribute("tabindex");

  const panelId = tab.getAttribute("aria-controls");
  const panel = document.getElementById(panelId);
  panel.hidden = false;
  tab.focus();
}

/*Tabs are a common use case for the aria-controls attribute, but it can be used in other scenarios where one element controls the visibility or behavior of another element. Other examples include accordions, dropdown menus, and modals.

The next time you design a user interface that involves controlling the visibility of elements, consider using the aria-controls attribute to establish the relationship between the controlling element and the controlled element.

 */
