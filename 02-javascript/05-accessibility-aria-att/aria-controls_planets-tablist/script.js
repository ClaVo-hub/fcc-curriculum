const tabs = document.querySelectorAll('[role="tab"]');
const panels = document.querySelectorAll('[role="tabpanel"]');

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.setAttribute("aria-selected", "false")); //reset all attributes to select correct later.
    panels.forEach((panel) => (panel.hidden = true)); //reset all attributes to select correct later.

    tab.setAttribute("aria-selected", "true"); //after reset - on clicked tab change to true. went event triggered and rest is done on attributes.
    const associatedPanel = tab.getAttribute("aria-controls"); // retrieves panel ID that is associated with the tab aria-controls.
    const panel = document.getElementById(associatedPanel); //retrieves the entire div containing the panel information that should display when clicked upon.
    panel.hidden = false;
  });
});
