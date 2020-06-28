import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { peopleEndpoint } from "./api";
import { act } from "react-dom/test-utils";

const peopleEndpointResponse = require("./fixtures/people.json");

let container: HTMLElement;

beforeEach(() => {
  fetchMock.enableMocks();
  fetchMock.resetMocks();
  container = document.createElement("div");
});

test("Shows loading while waiting for api response", () => {
  fetchMock.disableMocks();

  render(<App />, {
    container,
  });

  const loaderEl = container.querySelector("#loader");

  expect(loaderEl).not.toBeFalsy();
});

test("Renders pet names grouped by their owner's gender", async () => {
  fetchMock.mockIf(peopleEndpoint, async () => {
    return {
      status: 200,
      body: JSON.stringify(peopleEndpointResponse),
    };
  });

  await act(async () => {
    render(<App />, {
      container,
    });
  });

  const maleOwnerPetListEl = container.querySelector("#male-owner-pet-list");

  const femaleOwnerPetListEl = container.querySelector(
    "#female-owner-pet-list"
  );

  expect(maleOwnerPetListEl).toBeTruthy();
  expect(femaleOwnerPetListEl).toBeTruthy();

  const femaleItems = container.querySelectorAll("#female-owner-pet-list li");
  const maleItems = container.querySelectorAll("#male-owner-pet-list li");

  assertListItemsMatch(femaleItems, ["Garfield", "Tabby", "Simba", "Nemo"]);

  assertListItemsMatch(maleItems, [
    "Garfield",
    "Fido",
    "Tom",
    "Max",
    "Sam",
    "Jim",
  ]);
});

test("Handles API failures gracefully", async () => {
  fetchMock.mockIf(peopleEndpoint, async () => {
    return {
      status: 500,
      body: JSON.stringify({}),
    };
  });

  await act(async () => {
    render(<App />, {
      container,
    });
  });

  const errorMessageEl = container.querySelector("#error-message");

  expect(errorMessageEl).toBeTruthy();
});

function assertListItemsMatch(
  nodeList: NodeListOf<Element>,
  expected: string[]
) {
  expect(nodeList.length).toBe(expected.length);

  // Just sort both arrays as we don't care about
  // the order
  expect(
    Array.from(nodeList)
      .map((el) => el.textContent)
      .sort()
  ).toEqual(expected.sort());
}
