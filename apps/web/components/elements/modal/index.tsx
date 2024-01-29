import React from "react";
import { Modal as AntdModal } from "antd/lib";
import { GlassCard } from "../cards";
import { ModalProps } from "./types";

import styles from "./modal.module.scss";

export default function Modal({
  children,
  open,
  onCancel,
  ...rest
}: ModalProps): JSX.Element {
  return (
    <AntdModal
      open={open}
      onCancel={onCancel}
      footer={null}
      {...rest}
      className={styles.modal}
    >
      <GlassCard>{children}</GlassCard>
    </AntdModal>
  );
}
