import { gql } from "@apollo/client";

export const GET_QRCODE_QUERY = gql`
  query getEventAttendeeQRCode(
    $eventAttendeeGetQrCodeInput: EventAttendeeGetQRCodeInput!
  ) {
    getEventAttendeeQRCode(
      eventAttendeeGetQRCodeInput: $eventAttendeeGetQrCodeInput
    )
  }
`;
