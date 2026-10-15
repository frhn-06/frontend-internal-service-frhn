import LandingPageShell from "@/components/layouts/LandingPage";


interface TypeProps {
    children: React.ReactNode;
}

export default function LandingPageLayout(props: TypeProps) {
  const { children } = props;

  return (
    <LandingPageShell>
      {children}
    </LandingPageShell>
  )
}
