import { PrismaClient } from '@db/client';

console.log('Seeding database...');

const prisma = new PrismaClient();

async function main() {
  // await Promise.all(
  //   group_sessions.map(async group_session => {
  //     await prisma.groupSession.create({
  //       data: {
  //         name: group_session.name,
  //         type: group_session.type as any,
  //         organization: {
  //           connect: {
  //             id: group_session.organization_id,
  //           },
  //         },
  //       },
  //     });
  //   }),
  // );
}
main();
