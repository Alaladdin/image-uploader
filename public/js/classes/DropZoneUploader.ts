import { IDropZoneUploaderEvents as IEvents } from '../interfaces/IDropZoneUploaderEvents';
import { IDropZoneUploaderClasses as IClasses } from '../interfaces/IDropZoneUploaderClasses';

export default class {
  private classes: IClasses = {
    success: ['border-green-500', 'dark:border-green-200'],
    error: ['border-red-500', 'dark:border-red-200'],
    drag: ['border-indigo-600', 'dark:border-indigo-400'],
  };

  el: HTMLElement | null;

  elContent: HTMLElement | null;

  uploader: HTMLInputElement | null;

  private events: IEvents = {
    in: ['dragenter', 'dragover'],
    out: ['dragleave', 'drop'],
  };

  constructor(element: HTMLElement | null, elementContent: HTMLElement | null, uploader: HTMLInputElement | null) {
    if (!element || !elementContent || !uploader) {
      this.handleError(new Error('one or more parameters were not passed'));
    }

    this.el = element;
    this.elContent = elementContent;
    this.uploader = uploader;

    this.initEvents();
  }

  private upload = (file: File): Promise<Response | void> => {
    const url = '/upload';
    const formData = new FormData();

    formData.append('image', file);

    return fetch(url, {
      method: 'post',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        if (res.redirected) window.location.href = res.url;
      })
      .catch(this.handleError);
  };

  private preview = (file: File): void => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const readerResult: string = reader.result ? reader.result.toString() : '';
      const imageClass: string = 'drop-zone__preview';
      const currentPreviewImage: HTMLImageElement | null = document.querySelector(`.${imageClass}`);

      if (currentPreviewImage) currentPreviewImage.remove();
      if (readerResult) {
        const img: HTMLImageElement = document.createElement('img');

        img.src = readerResult;
        img.classList.add(imageClass, 'rounded-md');

        this.el!.appendChild(img);
      }
    };
  };

  private handleFileChange = async (file: File) => {
    this.el!.classList.add(...this.classes.success);
    this.elContent!.classList.add('hidden');

    this.preview(file);
    await this.upload(file);
  };

  private handleError = (e: Error) => {
    console.error(e);
    this.el!.classList.remove(...this.classes.success);
    this.el!.classList.remove(...this.classes.drag);
    this.el!.classList.add(...this.classes.error);
  };

  private handleDrop = async (e: DragEvent) => {
    const dt: DataTransfer | null = e.dataTransfer;

    if (dt) await this.handleFileChange(dt.files[0]);
  };

  private initEvents = () => {
    const { handleFileChange } = this || {};
    const eventsArr: Array<string> = Object.values(this.events)
      .reduce((accumulator: Array<string>, currentValue: Array<string>) => [...accumulator, ...currentValue]);

    // all events
    eventsArr.forEach((event: string): void => {
      this.el!.addEventListener(event, (e): void => {
        e.preventDefault();
        e.stopPropagation();
      });
    });

    // in events
    this.events.in.forEach((event: string): void => {
      this.el!.addEventListener(event, (): void => this.el!.classList.add(...this.classes.drag));
    });

    // out events
    this.events.out.forEach((event: string): void => {
      this.el!.addEventListener(event, (): void => this.el!.classList.remove(...this.classes.drag));
    });

    // file drop event
    this.el!.addEventListener('drop', this.handleDrop);

    // file change event
    this.uploader!.addEventListener('change', function uploaderChange() {
      if (this.files && handleFileChange) handleFileChange(this.files[0]);
    });
  };
}
