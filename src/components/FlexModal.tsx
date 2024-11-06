import { Modal, Button, Form, Input, Select, Space } from "antd";
import { useEffect } from "react";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const FlexModal: React.FC<{
  isModalOpen: boolean;
  handleOk: (values: any) => void;
  handleCancel: () => void;
  data?: {
    id: number;
    name: string;
    surname: string;
    state: boolean;
    description: string;
  };
}> = ({ isModalOpen, handleOk, handleCancel, data }) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const formedData = { ...values, id: Math.round(Math.random() * 100) };
    if (data) {
      console.log("UPDATED");
    }
    console.log(formedData, "FORMED DATA");
    handleOk(formedData);
    form.resetFields();
  };

  useEffect(() => {
    return () => {
      form.resetFields();
      console.log("cleanup");
    };
  }, [isModalOpen]);

  useEffect(() => {
    if (data) {
      console.log(data, "DATA");

      form.setFieldsValue(data);
    }
  }, [data]);

  return (
    <>
      <Modal
        title="Add New Item"
        open={isModalOpen}
        onOk={undefined}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="surname"
            label="Surname"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="state" label="State" rules={[{ required: true }]}>
            <Select
              placeholder="Select a option"
              /* onChange={onGenderChange} */
              allowClear
            >
              <Option value={true}>Active</Option>
              <Option value={false}>Inactive</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
