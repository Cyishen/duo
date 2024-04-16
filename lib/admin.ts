import { auth } from "@clerk/nextjs"

const adminIds = [
  "user_2fArPtYCgtp1ciuVIWbdLCVT5iM",
];

export const isAdmin = () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  return adminIds.indexOf(userId) !== -1;
};
