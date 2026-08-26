import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Internal Service",
    template: "%s | Internal Service",
  },
};


interface TypeProps {
  children: React.ReactNode
}

export default function AuthLayout(props: TypeProps) {
  const {
		children
	} = props;

  return (
		<div className="min-h-screen w-full ">
			{children}
		</div>
	)
}