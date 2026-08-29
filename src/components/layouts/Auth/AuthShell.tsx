interface TypeProps {
  children: React.ReactNode;
}

const AuthShell = (props: TypeProps) => {
  const {
    children
  } = props;

  return (
    <div className="min-h-screen w-full ">
			{children}
		</div>
  )
}

export default AuthShell;