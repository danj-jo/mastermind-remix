import type { MetaFunction } from "@remix-run/node";
import { Menu } from "../components/Menu.js"
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <p> Hi </p>
  );
}

