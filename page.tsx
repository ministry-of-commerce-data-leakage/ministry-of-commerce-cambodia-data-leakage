import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Get QRCode | moc.dtf.gov.kh",
  description:
    "The 1st Cambodia Digital Trade Forum & Online Expo is designed to be a landmark event that will showcase Cambodia s digital trade capabilities and inspire a movement to promote locally made products globally",
};

const GetQRCodeScreen = dynamic(() => import("@/Screen/get-qrcode"), {
  ssr: false,
});

export default function GetQRCodePage() {
  return <GetQRCodeScreen />;
}
