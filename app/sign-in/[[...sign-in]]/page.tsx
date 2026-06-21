import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      {/* Signup disabled for now — hide the "Sign up" footer action */}
      <SignIn appearance={{ elements: { footerAction: "hidden" } }} />
    </div>
  );
}
