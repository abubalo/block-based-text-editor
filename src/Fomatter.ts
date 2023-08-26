export default class Formatter {
  type: string;
  text: string;
  content: Element | null;

  constructor(type: string, text: string) {
    this.type = type;
    this.text = text;
    this.content = document.querySelector(".content");

    this.content?.addEventListener("mouseup", this.handleSelection);
  }

  public handleSelection() {
    const selection = window.getSelection();

    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const strong = document.createElement("strong");

      range.surroundContents(strong);

      selection.removeAllRanges();
      console.log(this.content?.innerHTML);
    }
  }

  public applyHighlight() {}
  public applyBold() {}
  public applyItalic() {}
  public applyUnderline() {}
  public applySkillthrough() {}
  public applyLink() {}
}
