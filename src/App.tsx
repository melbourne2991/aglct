import React, { useState, useEffect } from "react";
import * as api from "./api";
import { createEmptyAppState } from "./state";
import {
  mapApiResponseToState,
  mapApiFailureToState,
} from "./mapApiResponseToState";
import { PetsListByOwnerGender } from "./PetsByOwnerGender";
import { Layout } from "./Layout";
import { Box } from "rebass";

const useAppState = () => {
  const [state, setState] = useState(createEmptyAppState());

  useEffect(() => {
    api
      .getPeople()
      .then(mapApiResponseToState, mapApiFailureToState)
      .then(setState);
  }, []);

  return state;
};

const Loading = () => {
  return (
    <Layout>
      <Box id="loader">Loading...</Box>
    </Layout>
  );
};

const Error = () => {
  return (
    <Layout>
      <Box id="error-message">
        Sorry, something went wrong. Please try again later.
      </Box>
    </Layout>
  );
};

function App() {
  const state = useAppState();

  if (state.loading) return <Loading />;
  if (state.error) return <Error />;

  // In a larger application we would probably use redux/mobx/other to manage state
  // or alternatively use ReactContext so we don't have to pass the state all the way down
  // the component tree.
  //
  // For the sake of simplicity (due to this being such a small app)
  // I'll just pass the state down as a prop here.
  return <PetsListByOwnerGender state={state} />;
}

export default App;
