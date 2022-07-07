import { QueryClient } from "react-query";
// import { createStandaloneToast } from '@chakra-ui/react';
// import { theme } from '../theme';

// const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const id = "react-query-error";
  const title =
    error instanceof Error ? error.message : "error connecting to server";
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = new QueryClient();

//TODO set up this as queryclient and set up defulat error handler
