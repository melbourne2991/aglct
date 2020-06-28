import React, { useMemo } from "react";
import { groupPetsByOwnerGenderSelector, AppState, Gender } from "./state";
import { Layout } from "./Layout";
import { List } from "./List";
import { PetsByOwnerGender } from "./state";

const listHeaders: Record<Gender, string> = {
  male: "Male",
  female: "Female",
};

const ownerGenderPetList = (petsByOwnerGender: PetsByOwnerGender) => {
  return (gender: Gender) => {
    return (
      <List
        id={`${gender}-owner-pet-list`}
        items={petsByOwnerGender[gender].map((pet) => ({
          value: pet.name,
          key: pet.id,
        }))}
        headerText={listHeaders[gender]}
      />
    );
  };
};

export interface PetsListByOwnerGenderProps {
  state: AppState;
}

export const PetsListByOwnerGender = ({
  state,
}: PetsListByOwnerGenderProps) => {
  const petsByGender = groupPetsByOwnerGenderSelector(state);

  const renderByOwnerGender = useMemo(() => ownerGenderPetList(petsByGender), [
    petsByGender,
  ]);

  return (
    <Layout>
      {renderByOwnerGender("male")}
      {renderByOwnerGender("female")}
    </Layout>
  );
};
