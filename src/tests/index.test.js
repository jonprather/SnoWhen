/**
 * @jest-environment jsdom
 */
import { render, waitForElement } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import preloadAll from "jest-next-dynamic";

import WeatherHome from "../../pages/weather/[location]/[day]";

test("MyComponent", async () => {
  await preloadAll();
  const { getByText } = render(<WeatherHome />);
  // fire some events here
  const lazyContent = await waitForElement(() => getByText(/snoWhen/));
  expect(lazyContent).toBeInTheDocument();
});
