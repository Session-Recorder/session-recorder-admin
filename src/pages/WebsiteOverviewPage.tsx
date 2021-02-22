import { EyeOutlined } from '@ant-design/icons';
import { Col, Row, Statistic } from 'antd';
import CLayout from 'components/CLayout';
import React from 'react'

export type ISession = any;
export interface IWebsite {
  id: string;
  name: string;
  domain: string;
  sessions: ISession[]
}

function WebsiteOverviewPage() {
  return (
    <CLayout>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="오늘 총 접속자 수" value={1122} prefix={<EyeOutlined />}/>
        </Col>
      </Row>
    </CLayout>
  )
}

export default WebsiteOverviewPage
