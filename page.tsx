import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Join Event Registration | moc.dtf.gov.kh",
  description:
    "The 1st Cambodia Digital Trade Forum & Online Expo is designed to be a landmark event that will showcase Cambodia s digital trade capabilities and inspire a movement to promote locally made products globally",
};

const EventRegisterScreen = dynamic(() => import("@/Screen/event-register"), {
  ssr: false,
});

export default function EventRegister() {
  return <EventRegisterScreen />;
}
