import { message, Input, Form, Space, Button } from "antd";
import { useForm } from "antd/lib/form/Form";
import CLayout from "components/CLayout";
import AxiosClient from "fetchers/client";
import React from "react";
import { useHistory } from "react-router-dom";

function NewWebsitePage() {
  const [form] = useForm();
  const history = useHistory();

  return (
    <CLayout>
      <Form
        layout="vertical"
        form={form}
        onFinish={(formData) => {
          AxiosClient.post("/api/websites", formData)
            .then(() => {
              history.push("/websites/");
              message.success("성공적으로 생성되었습니다");
            })
            .catch((error) => {
              message.error("오류가 발생했습니다");
            });
        }}
      >
        <Form.Item name="name" label="웹사이트 이름" required>
          <Input placeholder="내 웹사이트 1" />
        </Form.Item>
        <Form.Item name="domain" label="웹사이트 주소" required>
          <Input addonBefore="https://" placeholder="mywebsite.com" />
        </Form.Item>
        <Form.Item name="description" label="웹사이트 설명" required>
          <Input.TextArea placeholder="나의 웹사이트입니다" />
        </Form.Item>
        <Form.Item style={{ float: "right" }}>
          <Space>
            <Button type="primary" htmlType="submit">
              생성하기
            </Button>
            <Button type="primary" htmlType="button" danger href="/websites/">
              취소하기
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </CLayout>
  );
}

export default NewWebsitePage;
