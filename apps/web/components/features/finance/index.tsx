"use client";
import { Col, Row } from "antd";
import Default from "components/layouts/default";
import CreditAmount from "components/modules/creditAmount";
import CreditLimit from "components/modules/creditLimit";
import CreditScore from "components/modules/creditScore";
import FinanceTap from "components/modules/finance";

export default function Finance(): JSX.Element {
  return (
    <Default>
      <Row
        gutter={[
          { xs: 15, sm: 4, md: 4, lg: 26 },
          { xs: 15, sm: 4, md: 4, lg: 20 },
        ]}
      >
        <Col md={20} xs={24} lg={5} span={12}>
          <CreditScore />
        </Col>
        <Col md={20} xs={24} lg={6} span={12}>
          <CreditAmount />
        </Col>
        <Col md={20} xs={24} lg={6} span={12}>
          <CreditLimit />
        </Col>
        <Col md={20} xs={24} lg={17} span={6}>
          <FinanceTap />{" "}
        </Col>
      </Row>
    </Default>
  );
}
