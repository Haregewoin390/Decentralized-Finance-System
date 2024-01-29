"use client";
import { useState } from "react";
import { DatePicker, Form, Input, Typography } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import moment from "moment";
import { GlassCard } from "components/elements/cards";
import Button from "components/elements/buttons";
import { ProposalType } from "utils/types/proposalType";
import { useUser } from "utils/context/user";
import { useNetwork } from "utils/context/network";
import { createProposal } from "utils/helpers/dao";

import styles from "./new.module.scss";
import { notification } from "components/elements/notification";

const { Title } = Typography;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

export default function NewProposal(): JSX.Element {
  const [form] = Form.useForm();
  const { userInfo } = useUser();
  const { choosenNetwork, provider } = useNetwork();
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    // Can not select days before today and today
    return current && current < moment().startOf("days");
  };

  const onFinsih = (values: any) => {
    const work = async () => {
      setButtonLoading(true);
      const proposalInformation: ProposalType = {
        name: values.proposalname,
        description: values.description,
        startDate: ~~(Date.parse(values.duration[0].$d) / 1000),
        endDate: ~~(Date.parse(values.duration[1].$d) / 1000),
      };
      try {
        if (provider && userInfo?.priv)
          await createProposal(
            provider,
            userInfo?.priv,
            choosenNetwork.name as "Polygon" | "Local" | "Mumbai",
            proposalInformation
          );
        notification({
          message: "succesfully created proposal",
          messageType: "success",
          description: `vote will start at ${values.duration[0].$d} and end ${values.duration[1].$d}`,
        });
      } catch (err) {
        notification({
          message: "error occured",
          messageType: "error",
          description: "",
        });
        console.log(err);
      }
      setButtonLoading(false);
    };
    work();
  };

  return (
    <div className={styles.container}>
      <GlassCard>
        <div className={styles.layout}>
          <Title level={4}>Create a New Proposal</Title>

          <Form
            name="proposal"
            form={form}
            size="large"
            layout="vertical"
            autoComplete="off"
            onFinish={onFinsih}
          >
            <Form.Item
              label="Proposal name"
              name="proposalname"
              rules={[
                {
                  required: true,
                  message: `Please Input name!`,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: `Please Input descriptions!`,
                },
              ]}
            >
              <TextArea rows={4} maxLength={200} />
            </Form.Item>
            <Form.Item
              label="duration"
              name="duration"
              rules={[
                {
                  required: true,
                  message: `Please input correct date!`,
                },
              ]}
            >
              <RangePicker
                disabledDate={disabledDate}
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                allowEmpty={[false, false]}
                className={"createDateRangePicker"}
                dropdownClassName={"createDateRangePicker"}
              />
            </Form.Item>

            <Form.Item>
              <Button
                text="Create"
                type="primary"
                htmlType="submit"
                loading={buttonLoading}
              />
            </Form.Item>
          </Form>
        </div>
      </GlassCard>
    </div>
  );
}
