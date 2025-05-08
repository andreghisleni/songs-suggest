// export const middleware = authMiddleware({
//   ignoredRoutes: ['/api/(.*)', '/auth/(.*)', '/sale/client/code/(.*)'],

//   // debug: true,
// });

import { authMiddleware } from "./auth/middleware/authMiddleware";

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(trpc)(.*)"],
};

export default authMiddleware({
  ignoredRoutes: [
    "/api/(.*)",
    "/auth/(.*)",
    "/sale/client/code/(.*)",
    "/s/(.*)",
    "/event/(.*)",
  ],

  // debug: true,
});
