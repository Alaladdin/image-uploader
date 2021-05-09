import DropZoneUploader from './classes/DropZoneUploader.js';
import ThemeChanger from './classes/ThemeChanger.js';

// @todo fix .js extension for modules

(() => {
  const themeChanger = new ThemeChanger(<HTMLElement>document.querySelector('.theme-toggle'));

  // @todo fix unused vars
  console.info({ isDark: themeChanger.isDark() });

  const zone = new DropZoneUploader(
    <HTMLElement>document.querySelector('.drop-zone'),
    <HTMLElement>document.querySelector('.drop-zone__content'),
    <HTMLInputElement>document.getElementById('file-upload'),
  );

  // @todo fix unused vars
  console.info({ zone });
})();
