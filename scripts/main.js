Hooks.once("ready", () => {
	let dependencies = { "lib-wrapper": "libWrapper", "socketlib": "socketlib" }
	for (const [id, name] of Object.entries(dependencies)) {
		if(!game.modules.get(id)?.active && game.user.isGM) {
			ui.notifications.error("Infinite Maps requires the '" + name + "' module. Please install and activate it.");
		}
	}
});
Hooks.on("renderSceneConfig", async(obj) => {
	// new option
	const infiniteMapLabel = game.i18n.localize("INFMAP.EnableInfiniteMapLabel");
	const infiniteMapHint = game.i18n.localize("INFMAP.EnableInfiniteMapHint");
	const infiniteMapCheckStatus = obj.object.getFlag("infinite-maps", "infinite-map")? "checked" : "";
	const injection = `
      <div class="form-group">
        <label>${infiniteMapLabel}</label>
        <input
          type="checkbox"
          name="flags.infinite-maps.infinite-map"
          ${infiniteMapCheckStatus}>
        <p class="notes">${infiniteMapHint}</p>
      </div>`;

	// inject infinite map trigger only if it isn't there
	let basicTab = $(obj.form).find('[data-tab="basic"]');
	if (basicTab.find('[name="flags.infinite-maps.infinite-map"]').length === 0) {
		basicTab.find("hr").first().before(injection);
	}
  
	// auto resize the window
	obj.setPosition();
});