"use client";

import { useClerk } from "@clerk/nextjs";
import Button from "@/components/ui/Button";

export const SignOutButton = ({ variant = "ghost", size = "sm" }) => {
  const { signOut } = useClerk();

  return (
    <Button
      variant={variant}
      size={size}
      onClick={() => signOut({ redirectUrl: "/" })}
    >
      Sign out
    </Button>
  );
};
