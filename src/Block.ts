export default class Block<T> {
  readonly id: number;
  type: string;
  data: T;

  constructor(type: string, data: T) {
    this.id = Math.floor(Math.random() * 1_000_000);
    this.type = type;
    this.data = data;
    this.wrapper = undefined;
  }

  public save() {
    const blockData = {
      id: this.id,
      type: this.type,
      data: this.data,
    };

    const jsonData = JSON.stringify(blockData);
    localStorage.setItem("blockData", jsonData);
    console.log("Save BlockData: ", jsonData);
  }
}

export class ParagraphBlock extends Block<{ content: string }> {
  constructor(content: string) {
    super("paragraph", { content });
  }

  private validate(): Boolean {
    return Boolean(this.data);
  }

  public render(): void {
    const wrapper = document.createElement("div");
    wrapper.classList.add("paragraph");
    const element = document.createElement("div");
    element.classList.add("paragraph");
    element.innerText = this.data.content;

    element.addEventListener("input", () => {
      const text = element.innerText;
      this.data = { content: text };
    });

    this.save();
    this.wrapper?.appendChild(element);
  }
}

export class HeadingBlock extends Block<{ content: string; level: number }> {
  constructor(content: string, level: number) {
    super("heading", { content, level });
  }

  public render(): void {
    const wrapper = document.createElement("div");
    wrapper.classList.add("heading");
    const element = document.createElement(`h${this.data.level}`);
    element.classList.add("heading");
    element.textContent = this.data.content;

    element.addEventListener("input", () => {
      const text = element.innerText;
      this.data.content = text;
    });

    const levelButton = document.querySelectorAll(".level button");
    levelButton.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedLevel = button.dataset.level;
        this.data.level = parseInt(selectedLevel);
      });
    });

    this.save();
    this.wrapper?.appendChild(element);
  }
}

export class ImageBlock extends Block<{
  src: string;
  alt: string;
  caption: string;
}> {
  private src: string;
  private alt: string;
  private caption: string;

  constructor(src: string, alt: string, caption: string) {
    super("image", { src, alt, caption });
    this.src = this.validateSrc(src);
    this.alt = alt;
    this.caption = caption;
  }

  private validateSrc(src: string): boolean | string {
    if (!src) {
      console.log("No image sorce provided");
      return false;
    }

    return src;
  }

  public render() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("image--block");
    const input = document.createElement("input");
    input.type = "file";
    input.classList.add("image");

    input.addEventListener("change", (e) => {
      const file = e.target?.files[0];
      if (file) {
        this._uploadImage(file).then((src) => {
          this.data.src = src;
          this._displayImage(src, this.alt);
        });
      }
    });
  }

  async _uploadImage(image: File): Promise<string> {
    const respose = await fetch("/upload", image );
    return `http:localhost:3000/upload/399288100.jpg`;
  }

  _displayImage(source: string, alt = "") {
    const imageElement = document.createElement("img");
    imageElement.src = source;

    this.wrapper?.appendChild(imageElement)
  }
}

export class LinkBlock extends Block<{ url: string; caption: string }> {
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
      }
    );
    caption.addEventListener("blur", () => {
        if (caption.value === "") {
          return false;
        }
      }
    );

    link.href = this.data.url;
    link.textContent = this.data.caption;
    link.target = "_blank";
    link.classList.add("link");
  }
}

export class CodeBlock extends Block<{ content: string; language: string }> {
  constructor(content: string, language: string) {
    super("code", { content, language });
  }

  public render(){
    const wrapper = document.createElement("div")
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
