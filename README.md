# Text Editor

This code provides a simplified version of a block-based editor. It demonstrates the basic structure and functionality of creating different types of content blocks and rendering them in a wrapper element.

Each block type (ParagraphBlock, HeadingBlock, ImageBlock, LinkBlock) extends the Block abstract class and adds its specific rendering logic and event handling. The Block abstract class itself provides a common structure for storing and saving block data.

## Features

- **Block Types**: The editor supports various block types, including paragraphs, headings, images, links, code blocks, and more.

- **Drag and Drop**: Users can easily reorganize the blocks using drag and drop functionality.

- **Data Persistence**: Block data is saved using the localStorage API, ensuring that the user's content is retained even after the browser is closed.

- **Image Upload**: When adding an image block, users can upload an image file, which is then processed and saved on the server.

- **Rich Text Editing**: Users can interact with text blocks and headings to edit their content directly.

- **Undo/Redo**: Users can undo and redo changes made to the content blocks.

## How to Use

1. Clone the repository:

```bash 
git clone https://github.com/abubalo/block-based-content-editor.git

cd block-based-content-editor
```

2. Open the `index.html` file in your web browser.

3. Use the editor to add, edit, and rearrange content blocks.

## Limitations

- **Local Storage**: Since data is saved using the localStorage API, the storage capacity is limited to the user's browser and may vary depending on the browser and device used.

- **Image Processing**: The image upload feature is implemented for demonstration purposes and uses a simple server-side logic. In a production environment, you would need to implement more robust image processing and storage solutions.

- **Cross-Browser Compatibility**: The editor has been tested on modern browsers (e.g., Chrome, Firefox, Safari), but compatibility with older browsers may be limited.

- **Persistence Limitations**: While the localStorage API ensures data persistence on the user's device, it does not provide synchronization across multiple devices or browsers. Users may lose their data if they switch devices or browsers.

## Contributing

Contributions to the project are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## Disclaimer

While the simplified version lacks many advanced features and complexities of a full-featured rich text editor, it serves as a starting point for understanding the basic principles of building such an editor. From here, you can expand and enhance the code to add more features and customization options based on your specific requirements.
## License

This project is licensed under the [MIT License](LICENSE).
