import dynamic  from "next/dynamic";

export const Button = dynamic(
  () => import("miro-react-demo").then((components) => components.Button),
  { ssr: false }
);

export const Form = dynamic(
  () => import("miro-react-demo").then((components) => components.Form),
  { ssr: false }
);