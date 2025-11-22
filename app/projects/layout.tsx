import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project - Alejo Feas Matej",
  description: "Project details and case study",
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
