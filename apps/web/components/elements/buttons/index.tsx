import { Button as AntdButton } from "antd";
import ButtonProps from "./types";

export default function Button({ text, ...rest }: ButtonProps): JSX.Element {
  return <AntdButton {...rest}>{text}</AntdButton>;
}
