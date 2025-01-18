import { Button, Layout, Result } from "antd";
import React, { useEffect } from "react";

interface ErrorBoundarayContainerProps {
  children: React.ReactNode;
}

interface ErrorBoundarayContainerState {
  hasError: boolean;
  error?: Error;
  errorInfo?: unknown;
}

export class ErrorBoundarayContainer extends React.Component<
  ErrorBoundarayContainerProps,
  ErrorBoundarayContainerState
> {
  constructor(props: ErrorBoundarayContainerProps) {
    super(props);

    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: unknown, errorInfo: unknown) {
    // Update state so the next render will show the fallback UI

    return { hasError: true, error, errorInfo };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

const ErrorFallback = ({ error }: { error?: Error }) => {
  // const { createErrorLog } = useCreateErrorLog({}, {});

  useEffect(() => {
    if (document.URL.includes("localhost:")) return;
    console.log({
      text: error?.message,
      path: location.pathname,
      desc: error?.stack,
    });
    // createErrorLog({ text: error?.message, path: location.pathname, desc: error?.stack });
  }, []);

  return (
    <Layout className="flex min-h-screen items-center justify-center">
      <Result
        status="500"
        title="Oops!"
        subTitle={
          <div>
            {"We are experiencing a temporary outage. We are working on it"}
            <pre>
              <span className={"font-bold"}>{"Error"}:</span>{" "}
              {error && <span>{error.toString()}</span>}
            </pre>
          </div>
        }
        extra={[
          <Button
            type="primary"
            onClick={() => location.replace("/")}
            key={"login"}
          >
            {"Login"}
          </Button>,
          <Button onClick={() => location.reload()} key={"reload"}>
            {"Reload"}
          </Button>,
        ]}
      />
    </Layout>
  );
};
