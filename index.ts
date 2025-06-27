import { gql } from "@apollo/client";

export const CREATE_EVENT_ATTENDEES_REGISTER = gql`
  mutation CreateEventAttendeesMutation($input: EventAttendeesInput!) {
    createEventAttendeesMutation(input: $input) {
      id
      business_name
      contact_name
      email
      tel
      website_url
      seat
      status
      shifts {
        id
        name
        date
      }
      is_lunch
    }
  }
`;
