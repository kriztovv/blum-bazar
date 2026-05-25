// Auth.js Configuration
// This file is prepared for future server-side authentication integration
// Currently using client-side authentication in UserAuthMenu.tsx

import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/",
  },
} satisfies NextAuthConfig;
