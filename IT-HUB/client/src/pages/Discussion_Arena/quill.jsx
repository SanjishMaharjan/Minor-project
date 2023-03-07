import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const Block = Quill.import("blots/block");
class MultiLineCodeBlock extends Block {}
MultiLineCodeBlock.blotName = "multi-line-code-block";
MultiLineCodeBlock.tagName = "pre";
Quill.register(MultiLineCodeBlock);

ReactQuill.QuillKeyboard.addBinding({
  key: "Enter",
  shiftKey: true,
  handler: function (range, context) {
    const [block, offset] = this.quill.getLine(range.index);
    if (block && block.domNode.tagName === "PRE") {
      const newlineChar = "\n";
      const insertText = true;
      this.quill.insertText(range.index, newlineChar, insertText);
      this.quill.setSelection(range.index + 1, range.length);
      return false;
    }
    return true;
  },
});

class CustomQuill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }

  render() {
    const modules = {
      keyboard: {
        bindings: ReactQuill.QuillKeyboard.bindings,
      },
      toolbar: [
        // ...
        { "multi-line-code-block": "Multi-Line Code Block" },
        // ...
      ],
    };

    return (
      <ReactQuill
        value={this.state.value}
        onChange={this.handleChange}
        modules={modules}
        {...this.props}
      />
    );
  }
}

export default CustomQuill;
