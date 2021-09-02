/**
 * @jest-environment jsdom
 */
import { render, waitFor } from "../../test/test-utils";
import "@testing-library/jest-dom/extend-expect";
import preloadAll from "jest-next-dynamic";

import WeatherHome from "../../pages/weather/[location]";

test("Location- Check subheadings loaded", async () => {
  await preloadAll();
  const { getByText } = render(<WeatherHome />);
  // fire some events here
  const lazyContent = await waitFor(() => getByText(/Snow Forecast/));
  expect(lazyContent).toBeInTheDocument();
});
test("Location- Check Nav Loaded", async () => {
  await preloadAll();
  const { getByText } = render(<WeatherHome />);
  // fire some events here
  const lazyContent = await waitFor(() => getByText(/sno/));
  expect(lazyContent).toBeInTheDocument();
});
