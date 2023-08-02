import { CodeBlock, HeadingBlock, ImageBlock, LinkBlock, ParagraphBlock } from "./Block";

export class BlockFactory {
    public static createBlock<T>(type: string, data: T): Block<T> {
      switch (type) {
        case "paragraph":
          return new ParagraphBlock(data);
        case "heading":
          return new HeadingBlock(data);
        case "image":
          return new ImageBlock(data);
        case "link":
          return new LinkBlock(data);
        case "code":
          return new CodeBlock(type, data);

        default:
          throw new Error(`Unsupported block type: ${type}`);
      }
    }
  }
  