"use server";

import client from "@/lib/apollo/apollo-server";
import { GET_QRCODE_QUERY } from "../gql";

type GetQRCodeProps = {
  contact_name: string;
  tel: string;
};

export const getQRCode = async ({ contact_name, tel }: GetQRCodeProps) => {
  try {
    const { data } = await client.query({
      query: GET_QRCODE_QUERY,
      variables: {
        eventAttendeeGetQrCodeInput: {
          contact_name,
          tel,
        },
      },
    });

    if (!data || !data.getEventAttendeeQRCode) {
      return {
        data: null,
        error: "No data returned",
      };
    }

    return {
      data: data,
      error: null,
    };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "An error occurred",
    };
  }
};
