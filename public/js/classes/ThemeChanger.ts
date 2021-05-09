export default class {
  toggler: HTMLElement;

  constructor(togglerBtn: HTMLElement) {
    this.toggler = togglerBtn;

    this.initEvents();
    this.toggleTheme(this.isDark());
  }

  toggleTheme = (isDark: boolean = !this.isDark()): string => {
    const newTheme: string = isDark ? 'dark' : 'light';

    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', isDark);
    this.toggler.textContent = `Theme: ${newTheme}`;

    return this.currentTheme;
  };

  isDark = (): boolean => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return localStorage.theme ? localStorage.theme === 'dark' : prefersDarkScheme;
  };

  private initEvents = (): void => {
    this.toggler.addEventListener('click', () => this.toggleTheme());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      this.toggleTheme(e.matches);
    });
  };

  get currentTheme(): string {
    return this.isDark() ? 'dark' : 'light';
  }
}
