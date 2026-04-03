import React from "react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { isAdminIdentity } from "@/lib/auth";
import UplodeZone from "../components/UplodeZone";
import Chat from "../components/ChatZone";
import UsageBanner from "../components/UsageBanner";
import { UserButton } from "@clerk/nextjs";
import { syncCurrentUser } from "@/lib/sync-current-user";
import {
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

const Home = async () => {
  const clerkUser = await currentUser();
  await syncCurrentUser(clerkUser);
  const isAdmin = isAdminIdentity({
    userId: clerkUser?.id,
    email: clerkUser?.primaryEmailAddress?.emailAddress,
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/** HEADER */}
      <header className="flex justify-between border-b border-border bg-surface/90 px-4 py-4 backdrop-blur">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <h1 className="font-display text-2xl text-foreground sm:text-3xl">
            CopyBook
          </h1>
          <span className="rounded-pill bg-primary px-3 py-1 text-sm font-semibold text-primary-contrast">
            LM
          </span>
        </div>
        <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
          <div>
            <UserButton />
          </div>
          {isAdmin ? (
            <Button
              as={Link}
              href="/admin/dashboard"
              variant="secondary"
              size="sm"
            >
              Go to Dashboard
            </Button>
          ) : null}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <UsageBanner />
      </div>

      {/**MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-4">
          {/** LEFT SIDE -> UPLODE SECTION START HERE*/}
          <Card padding="none" className="mb-4 overflow-hidden lg:mb-0">
            <CardHeader className="border-b border-border p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">
                Upload Sources
              </CardTitle>
              <CardDescription>
                Add documents, paste text, or provide URLs to get started
              </CardDescription>
            </CardHeader>
            <div className="p-4 sm:p-6">
              <UplodeZone />
            </div>
          </Card>

          {/** RIGHT SIDE -> CHAT SECTION */}
          <Card padding="none" className="mb-4 overflow-hidden lg:mb-0">
            <CardHeader className="border-b border-border p-4 sm:p-6">
              <CardTitle className="text-xl sm:text-2xl">
                Chat with your Sources
              </CardTitle>
              <CardDescription>
                Ask questions about your uploaded content
              </CardDescription>
            </CardHeader>
            <Chat />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
