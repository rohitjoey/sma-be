import { Prisma, PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
// if (process.env.NODE_ENV === "production") {
// prisma = new PrismaClient({
//   log: [
//     {
//       emit: "event",
//       level: "query",
//     },
//   ],
// });
prisma = new PrismaClient();
// // } else {
// //   if (!global.cachedPrisma) {
// //     global.cachedPrisma = new PrismaClient();
// //   }
// //   prisma = global.cachedPrisma;
// // }
// prisma.$on("query" as never, (e: Prisma.QueryEvent) => {
//   console.log("Query: " + e.query);
//   console.log("Params: " + e.params);
//   console.log("Duration: " + e.duration + "ms");
// });

export const db = prisma;
