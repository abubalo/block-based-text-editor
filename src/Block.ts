export default class Block<T> {
  type: string; 
  data: T; 
  formatting: string;

  constructor(type: string, data: T, formatting: string) {
    this.type = type;
    this.data = data;
    this.formatting = formatting;
  }
}

export class ParagraphBlock extends Block<string> {
  constructor(data: string, formatting: string) {
    super("paragraph", data, formatting);
  }
}

export class HeadingBlock extends Block<string> {
  level: string;

  constructor(level: string, data: string, formatting: string) {
    super("heading", data, formatting);
    this.level = level;
  }
}

export class ImageBlock extends Block<{}> {
  src: string;
  alt: string;
  caption: string;

  constructor(src: string, alt: string, caption: string, formatting: string) {
    super("image", {}, formatting);
    this.src = src;
    this.alt = alt;
    this.caption = caption;
  }
}

export class LinkBlock extends Block<string> {
  url: string;

  constructor(url: string, data: string, formatting: string) {
    super("link", data, formatting);
    this.url = url;
  }
}

export class CodeBlock extends Block<string> {
  language: string;

  constructor(language: string, data: string, formatting: string) {
    super("code", data, formatting);
    this.language = language;
  }
}

export class MarkdownBlock extends Block<string> {
  constructor(data: string, formatting: string) {
    super("markdown", data, formatting);
  }
}

export class NumberBlock extends Block<string> {
  constructor(data: string, formatting: string) {
    super("number", data, formatting);
  }
}

export class BulletBlock extends Block<string> {
  constructor(data: string, formatting: string) {
    super("bullet", data, formatting);
  }
}

export class QuoteBlock extends Block<string> {
  constructor(data: string, formatting: string) {
    super("quote", data, formatting);
  }
}

export class SubpageBlock extends Block<string> {
  pageId: string | number;
  
  constructor(pageId: string, data: string, formatting: string) {
    super("subpage", data, formatting);
    this.pageId = pageId;
  }
}

export class TableBlock extends Block<string> {
  rows: number;
  columns: number;

  constructor(rows: number, columns: number, data: string, formatting: string) {
    super("table", data, formatting);
    this.rows = rows;
    this.columns = columns;
  }
}

export class BoardViewBlock extends Block<string> {
  constructor(data: string, formatting: string) {
    super("board", data, formatting);
  }
}





