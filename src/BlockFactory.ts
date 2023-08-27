import { CodeBlock, HeadingBlock, ImageBlock, LinkBlock, MarkdownBlock, ParagraphBlock, } from "./Block";

interface BlockData {
  content: string; 
  level: number;
  src: string;
  alt: string;
  caption: string;
  url: string;
  language: string;
}

export class BlockFactory {
  public static createBlock<T extends BlockData>(type: string, data: T){
    switch (type) {
      case "paragraph":
        return new ParagraphBlock(data.content);
      case "heading":
        return new HeadingBlock(data.content, data.level);
      case "image":
        return new ImageBlock(data.src, data.alt, data.caption);
      case "link":
        return new LinkBlock(data.url, data.caption);
      case "code":
        return new CodeBlock(data.content, data.language);
      case "markdown":
         return new MarkdownBlock(data.content, data.language);

      default:
        throw new Error(`Unsupported block type: ${type}`);
    }
  }
}
