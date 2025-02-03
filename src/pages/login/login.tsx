import { useState } from "react";
import { Form, Input, Button, Image, Layout, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import baseURL from "../../utils/api";
import { errorToast, successToast } from "../../components/toastManager";

const { Content } = Layout;

baseURL.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseURL.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
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
    setIsLoading(true);
    try {
      const response = await baseURL.post("/api/service/user/login", values, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      console.log(response.data);
      if (response.data.service_user.name) {
        localStorage.setItem("User_Name", response.data.service_user.name);
        localStorage.setItem("Role", response.data.service_user.role);
        localStorage.setItem("serviceId", response.data.service_user.id);
      }

      if (response.data?.access_token) {
        successToast("Dashboardga xush kelibsiz!");
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || "Xatolik Iltimos qaytanda kiriting !"
          : "Login failed";
      errorToast(errorMessage);
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
                {
                  required: true,
                  message: "Iltimos Telefon Nomerizni kiritng !",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Iltimos Telefon Nomerizni kiritng"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Iltimos kodingizni kiritng!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Iltimos kodingizni kiritng"
                className="rounded-lg"
              />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                loading={isLoading}
                className="w-full h-12 bg-[#fd521c] hover:bg-[#e64816] rounded-lg text-white font-semibold"
              >
                {isLoading ? "Tizimga kirish..." : "Tizimga kirish"}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};
