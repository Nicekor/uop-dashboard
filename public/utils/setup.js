let loadedSettings = {};
let defaultSettings = {};

async function initSettings() {
  const settings = await getSettings();
  settings.forEach(({ setting, value }) => {
    switch (setting) {
      case 'background-color':
        document.querySelector('body').style.backgroundColor = value;
        break;
      default:
    }
  });

  loadedSettings = settings.reduce((acc, { setting, value }) => ({
    ...acc,
    [setting]: value
  }), {});

  defaultSettings = settings.reduce((acc, { setting, default_value }) => ({
    ...acc,
    [setting]: default_value
  }), {});

}
