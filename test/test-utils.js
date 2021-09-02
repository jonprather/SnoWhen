// test-utils.js
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
//feel like i just need to learn how to wrap in my query provdier im not sure how...
const Providers = ({ children }) => {
  const router = useRouter();

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnmount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 100000,
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: Providers, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
