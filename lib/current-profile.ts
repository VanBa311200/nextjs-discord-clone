import { auth } from "@clerk/nextjs";

import { prismaClient } from "@/lib/db";

export const currentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const profile = await prismaClient.profile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};
