interface RenderableBlock {
  render(): void;
}

interface SaveBlock {
  save(): void;
  update(): void;
}

export abstract class Block<T> implements SaveBlock {
  private readonly id: string;
  protected type: string;
  protected data: T;
  protected wrapper: HTMLDivElement | undefined;

  constructor(type: string, data: T) {
    this.id = this.generateRandomID();
    this.type = type;
    this.data = data;
    this.wrapper = undefined;
  }

  private generateRandomID(): string {
    const characters: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const characterLength = characters.length;
    const idLength = 10;
    let randomID = "";

    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characterLength);
      randomID += characters.charAt(randomIndex);
    }

    return randomID;
  }

  public setData(data: T): T {
    this.data = data;
    return this.data;
  }

  public getData() {
    return this.data;
  }

  public async save(): Promise<void> {
    const blockData = {
      id: this.id,
      type: this.type,
      data: this.data,
    };

    try {
      const response = await fetch("path/file", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(blockData),
      });

      this.data = await response.json();
    } catch (error) {
      console.error("Error while saving:", error);
      throw error;
    }
  }

  public update(): void {
    //
  }
}

export interface ParagraphData {
  content: string;
}

export class ParagraphBlock extends Block<ParagraphData> implements RenderableBlock
{
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

export class HeadingBlock extends Block<HeadingData> implements RenderableBlock
{
  constructor(content: string, level: number) {
    super("heading", { content, level });
  }

  public render(): void {
    const wrapper = document.createElement("div");
    const element = document.createElement(`h${this.getData().level}`);
    element.classList.add("heading");
    element.textContent = this.getData().content;

    element.addEventListener("input", () => {
      const text = element.textContent?.trim();
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
          this.getData().src = src;
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
interface LinkBlockData {
  url: string;
  caption: string;
}

export class LinkBlock extends Block<LinkBlockData> implements RenderableBlock {
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
      link.href = this.getData().url;
      link.textContent = this.getData().caption;
      link.target = "_blank";
      link.classList.add("link");
    });
    caption.addEventListener("blur", () => {
      if (caption.value === "") {
        return false;
      }
    });
  }
}

interface CodeBlockData {
  content: string;
  language: string;
}

export class CodeBlock extends Block<CodeBlockData> implements RenderableBlock {
  constructor(content: string, language: string) {
    super("code", { content, language });
  }

  public render() {
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
