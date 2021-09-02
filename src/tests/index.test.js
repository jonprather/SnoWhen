/**
 * @jest-environment jsdom
 */
import { render, waitFor } from "../../test/test-utils";
import "@testing-library/jest-dom/extend-expect";
import preloadAll from "jest-next-dynamic";

import WeatherHome from "../../pages/weather/";
import LocationCard from "../../components/locationCard";

test("Check SelectResort Comp is loaded", async () => {
  await preloadAll();
  const { getByText } = render(<WeatherHome />);
  // fire some events here
  const lazyContent = await waitFor(() => getByText(/Find a Resort/));
  expect(lazyContent).toBeInTheDocument();
});
test("Weather Home- Check Nav Loaded", async () => {
  await preloadAll();
  const { getByText } = render(<WeatherHome />);
  // fire some events here
  const lazyContent = await waitFor(() => getByText(/When/));
  expect(lazyContent).toBeInTheDocument();
});
test("Weather Home- Check Cards Loaded", async () => {
  await preloadAll();
  const { getByText } = render(<LocationCard />);
  // fire some events here
  const lazyContent = await waitFor(() => getByText(/MOUNTAIN/));
  expect(lazyContent).toBeInTheDocument();
});
//idk how to test for when there is stuff actually in Local Storage and thus queries and thus data...
