import { useState } from "react";
import { Form, Input, Button, Image, Layout, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import api from "../../utils/api";

const { Content } = Layout;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

interface LoginFormData {
  phone: number;
  password: string;
}

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: LoginFormData) => {
    console.log(values, "values");

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.abusahiy.uz/api/service/user/login",
        values
      );
      console.log(response.data);

      if (response.data?.access_token) {
        localStorage.setItem("token", response.data.access_token);
        toast.success("Login successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Content className="flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <div className="text-center mb-8">
            <Image
              src="/abuSahiy.png"
              alt="abuSahiy"
              preview={false}
              className="mb-4"
            />
          </div>

          <Form
            form={form}
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="phone"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Phone Number"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                // type="primary"
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 bg-[#fd521c] hover:bg-[#e64816] rounded-lg text-white"
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
      <ToastContainer />
    </Layout>
  );
};
