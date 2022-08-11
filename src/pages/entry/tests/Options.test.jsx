import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

// // Use query if elements not in page, find for async and get for regular elements in DOM

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images, with alt name ending with scoop
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images, with alt name ending with topping
  const toppingImages = await screen.findAllByRole("img", {
    name: /topping$/i,
  });
  expect(toppingImages).toHaveLength(4);

  // confirm alt text of images
  // @ts-ignore
  const imageTitles = toppingImages.map((element) => element.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
    "Mochi topping",
  ]);
});
