import { gql } from "@apollo/client";

export const GET_ALL_SHIFTS = gql`
  query GetAllShiftsQuery {
    getAllShiftsQuery {
      id
      name
      date
    }
  }
`;
