import { Component, type ErrorInfo, type ReactNode } from "react";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import Text from "./ui/Text";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary menangkap error:", error, errorInfo);
  }

  handleReload = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-2xl font-bold text-red-600">
            !
          </div>

          <Heading level="h3" className="text-slate-900">
            Terjadi kesalahan tak terduga
          </Heading>

          <Text size="body" className="max-w-md text-slate-500">
            Mohon maaf, ada masalah saat memuat halaman ini. Silakan muat ulang
            atau kembali ke beranda.
          </Text>

          <Button variant="dark" onClick={this.handleReload} icon="lucide:home">
            Kembali ke Beranda
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
