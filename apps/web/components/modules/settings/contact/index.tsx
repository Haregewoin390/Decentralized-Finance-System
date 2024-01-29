import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Form, Input, Popconfirm, Table, Typography, Spin, Button } from "antd";
import {
  CheckCircleTwoTone,
  LoadingOutlined,
  WarningTwoTone,
} from "@ant-design/icons";
import { notification } from "components/elements/notification";
import {
  getItemFromLocalStorage,
  setItemInLocalStorage,
} from "utils/helpers/localStorage";

import styles from "./contact.module.scss";

const { Text, Title } = Typography;

interface Item {
  key: string;
  name: string;
  address: string;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

export function ContactSetting() {
  const [form] = Form.useForm();
  const [data, setData] = useState<Item[]>([]);
  const [editingKey, setEditingKey] = useState("");
  const [isAddress, setIsAddress] = useState<
    "notAddress" | "searching" | "address" | null
  >(null);
  const [isAddressForNewInput, setIsAddressForNewInput] = useState<
    "error" | "searching" | "address" | null
  >(null);

  useEffect(() => {
    const contact = getItemFromLocalStorage("contacts", true);
    if (contact.length > 0) {
      setData(contact as Item[]);
    }
  }, []);

  const onChangeAddress = (event: any) => {
    let timer;
    clearTimeout(timer);
    setIsAddress("searching");
    timer = setTimeout(() => {
      //"0x8ba1f109551bd432803012645ac136ddd64dba72"
      setIsAddress(
        ethers.isAddress(event.target.value) ? "address" : "notAddress"
      );
    }, 5000);
  };

  const onChangeAddressForNewInput = (event: any) => {
    let timer;
    clearTimeout(timer);
    setIsAddressForNewInput("searching");
    timer = setTimeout(() => {
      //"0x8ba1f109551bd432803012645ac136ddd64dba72"
      setIsAddressForNewInput(
        ethers.isAddress(event.target.value) ? "address" : "error"
      );
    }, 5000);
  };

  const onFinishAdd = (values: any) => {
    if (!ethers.isAddress(values.address)) {
      notification({
        message: "Invalid address",
        description: "Please check you entered the field correctly",
        messageType: "error",
      });
      return;
    }
    for (let i = 0; i < data.length; i++) {
      let items = data[i];

      if (items.name == values.name) {
        notification({
          message: "Contact name already exisits",
          description:
            "Please change contact name or make sure your contact doesn't already exisit",
          messageType: "error",
        });
        return;
      }
      if (items.address == values.address) {
        notification({
          message: "Contact address already exisits",
          description:
            "Please change contact address or make sure your contact doesn't already exisit",
          messageType: "error",
        });
        return;
      }
    }
    const key = (data.length + 1).toString();
    const newData: Item = {
      key: key,
      name: values.name,
      address: values.address,
    };
    setData([...data, newData]);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item: Item) => item.key !== key);
    setData(newData);
  };

  useEffect(() => {
    setItemInLocalStorage("contacts", data, true);
  }, [data]);

  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      title === "name" ? (
        <Input />
      ) : (
        <Input
          onChange={onChangeAddress}
          autoCorrect="false"
          spellCheck={false}
          suffix={
            isAddress == "searching" ? (
              <Spin indicator={antIcon} />
            ) : isAddress == "address" ? (
              <CheckCircleTwoTone />
            ) : (
              <WarningTwoTone twoToneColor="#eb2f96" />
            )
          }
        />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  const isEditing: Function = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", address: "", ...record });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      if (!ethers.isAddress(row.address)) throw new Error("Invalid address");

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      notification({
        message: "Invalid address",
        description: "Please check you entered the field correctly",
        messageType: "error",
      });
    }
  };

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "25%",
      editable: true,
    },
    {
      title: "address",
      dataIndex: "address",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return (
          <>
            {" "}
            {editable ? (
              <span>
                <Typography.Link
                  onClick={() => save(record.key)}
                  style={{ marginRight: 8 }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            ) : (
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                Edit
              </Typography.Link>
            )}
            {data.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.key)}
              >
                <Typography.Link style={{ marginLeft: 8 }}>
                  Delete
                </Typography.Link>{" "}
              </Popconfirm>
            ) : null}
          </>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form
        className={styles.addContact}
        onFinish={onFinishAdd}
        autoComplete="off"
      >
        <Title level={5}>Add contacts </Title>
        <Form.Item
          name="name"
          rules={[
            { required: true, message: "Please input your contact name!" },
          ]}
        >
          <Input className={styles.inputField} placeholder="name" />
        </Form.Item>
        <Form.Item
          name="address"
          rules={[
            { required: true, message: "Please input your contact address!" },
          ]}
        >
          <Input
            className={styles.inputField}
            placeholder="Address"
            onChange={onChangeAddressForNewInput}
            autoCorrect="false"
            spellCheck={false}
            suffix={
              isAddressForNewInput == "searching" ? (
                <Spin indicator={antIcon} />
              ) : isAddressForNewInput == "address" ? (
                <CheckCircleTwoTone />
              ) : (
                <WarningTwoTone twoToneColor="#eb2f96" />
              )
            }
          />
        </Form.Item>
        <Form.Item>
          <Button className={styles.button} htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
      <Title level={5}>My contacts </Title>

      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            pageSize: 5,
          }}
        />
      </Form>
    </div>
  );
}
