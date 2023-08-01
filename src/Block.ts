export default class Block<T> {
  private readonly id: number;
  private type: string;
  private data: T;
  wrapper: HTMLDivElement | undefined;

  constructor(type: string, data: T) {
    this.id = Math.floor(Math.random() * 1_000_000);
    this.type = type;
    this.data = data;
    this.wrapper = undefined;
  }

  public setData(data: T): T{
    this.data = data
    return this.data
  }

  public getData(){
    return this.data
  }

  public save(): void {
    const blockData = {
      id: this.id,
      type: this.type,
      data: this.data,
    };

    const jsonData = JSON.stringify(blockData);
    localStorage.setItem("blockData", jsonData);
    console.log("Save BlockData: ", jsonData);
  }

  public setWrapper(wrapper: HTMLDivElement | undefined){
    this.wrapper = wrapper;
  }
  // public abstract render(): void;
}

export interface ParagraphData {
  content: string;
}

export class ParagraphBlock extends Block<ParagraphData> {
  constructor(content: string) {
    super("paragraph", { content });
  }

  private validate(): boolean {
    return Boolean(this.getData().content);
  }

  public render(): void {
    const wrapper = document.createElement("div");
    wrapper.classList.add("paragraph");
    const element = document.createElement("div");
    element.classList.add("paragraph");
    element.textContent = this.getData().content;

    element.addEventListener("input", () => {
      const text = element.textContent;
      if (text) {
        this.getData().content = text;
      }
    });

    this.save();
    this.wrapper?.appendChild(element);
  }
}

export interface HeadingData {
  content: string;
  level: number;
}

export class HeadingBlock extends Block<HeadingData> {
  constructor(content: string, level: number) {
    super("heading", { content, level });
  }

  public render(): void {
    const wrapper = document.createElement("div");
    wrapper.classList.add("heading");
    const element = document.createElement(`h${this.getData().level}`);
    element.classList.add("heading");
    element.textContent = this.getData().content;

    element.addEventListener("input", () => {
      const text = element.textContent;
      if (text) {
        this.getData().content = text;
      }
    });

    const levelButtonContainer = document.querySelector(".level");
    if (levelButtonContainer) {
      levelButtonContainer.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.matches("button")) {
          const selectedLevel = target.dataset.level;
          if (selectedLevel) {
            this.getData().level = parseInt(selectedLevel);
          }
        }
      });
    }

    this.save();
    this.wrapper?.appendChild(element);
  }
}

export interface ImageData {
  src: string;
  alt: string;
  caption: string;
}

export class ImageBlock extends Block<ImageData> {
  private src: string;
  private alt: string;
  private caption: string;

  constructor(src: string, alt: string, caption: string) {
    super("image", { src, alt, caption });
    this.src = this.validateSrc(src);
    this.alt = alt;
    this.caption = caption;
  }

  private validateSrc(src: string): string {
    if (!src) {
      throw new Error("No image source provided");
    }
    return src;
  }

  public render(): void {
    const wrapper = document.createElement("div");
    wrapper.classList.add("image--block");
    const input = document.createElement("input");
    input.type = "file";
    input.classList.add("image");

    input.addEventListener("change", (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        this._uploadImage(file).then((src) => {
          this.data.src = src;
          this._displayImage(src, this.alt);
        });
      }
    });

    wrapper.appendChild(input);
    this.wrapper?.appendChild(wrapper);
  }

  private async _uploadImage(image: File): Promise<string> {
    // Replace with actual upload logic
    const response = await fetch("/upload", { method: "POST", body: image });
    const responseData = await response.json();
    return responseData.src;
  }

  private _displayImage(source: string, alt = ""): void {
    const imageElement = document.createElement("img");
    imageElement.src = source;
    imageElement.alt = alt;

    this.wrapper?.appendChild(imageElement);
  }
}
interface LinkBlockData{
  url: string; caption: string
}
export class LinkBlock extends Block<LinkBlockData> {
  private url: string;

  constructor(url: string, caption: string) {
    super("link", { url, caption });
    this.url = url;
  }



  public render() {
    const wrapper = document.createElement("span");
    const input = document.createElement("input");
    const caption = document.createElement("input");
    const link = document.createElement("a");

    wrapper.classList.add("link--wrapper");

    input.placeholder = "Paste the link here";
    caption.placeholder = "add caption here";

   input.addEventListener("paste", () => {
        if (input.value === "" && caption.value === "") {
          return false;
        }
        link.href = this.data.url;
        link.textContent = this.data.caption;
        link.target = "_blank";
        link.classList.add("link");
      }
    );
    caption.addEventListener("blur", () => {
        if (caption.value === "") {
          return false;
        }
      }
    );

  }
}

export class CodeBlock extends Block<{ content: string; language: string }> {
  constructor(content: string, language: string) {
    super("code", { content, language });
  }

  public render(){
    const wrapper = document.createElement("div");
    const copyCode = document.createElement("span");

    wrapper.classList.add("markdown");
    wrapper.contentEditable = "true";
    copyCode.classList.add("coppy--code");

    
  }
}

export class MarkdownBlock extends Block<string> {
  constructor(data: string) {
    super("markdown", data);
  }
}

export class NumberBlock extends Block<string> {
  constructor(data: string) {
    super("number", data);
  }
}

export class BulletBlock extends Block<string> {
  constructor(data: string) {
    super("bullet", data);
  }
}
export class ListBlock extends Block<string[]> {
  constructor(data: string[]) {
    super("list", data);
  }
}

export class QuoteBlock extends Block<string> {
  constructor(data: string) {
    super("quote", data);
  }
}

export class SubpageBlock extends Block<string> {
  private pageId: string | number;

  constructor(pageId: string, data: string) {
    super("subpage", data);
    this.pageId = pageId;
  }
}

export class TableBlock extends Block<string> {
  private rows: number;
  private columns: number;

  constructor(rows: number, columns: number, data: string) {
    super("table", data);
    this.rows = rows;
    this.columns = columns;
  }
}

export class BoardViewBlock extends Block<string> {
  constructor(data: string) {
    super("board", data);
  }
}
