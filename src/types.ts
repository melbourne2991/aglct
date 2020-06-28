export type Gender = "Male" | "Female";
export type PetType = "Dog" | "Cat";

export interface Person<T> {
  name: string;
  gender: Gender;
  age: number;
  pets: T[];
}

export interface Pet {
  name: string;
  type: PetType;
}
