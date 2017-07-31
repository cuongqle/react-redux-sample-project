import pick from "lodash/pick";

const InputProps = [
    "placeholder",
    "type",
    "value",
    "onChange",
    "checked",
    "readOnly"
];

export default props => pick(props, InputProps);
