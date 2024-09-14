// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// const roundsOfHashing = 10;

// async function main() {
//   // create two dummy users
//   const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
//   const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

//   const user1 = await prisma.user.upsert({
//     where: { email: 'sabin@adams.com' },
//     update: {
//       password: passwordSabin,
//     },
//     create: {
//       email: 'sabin@adams.com',
//       name: 'Sabin Adams',
//       password: passwordSabin,
//     },
//   });

//   const user2 = await prisma.user.upsert({
//     where: { email: 'alex@ruheni.com' },
//     update: {
//       password: passwordAlex,
//     },
//     create: {
//       email: 'alex@ruheni.com',
//       name: 'Alex Ruheni',
//       password: passwordAlex,
//     },
//   });
 
//     // create three dummy articles
//     const post1 = await prisma.article.upsert({
//       where: { title: 'Prisma Adds Support for MongoDB' },
//       update: {
//         authorId: user1.id,
//       },
//       create: {
//         title: 'Prisma Adds Support for MongoDB',
//         body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
//         description:
//           "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
//         published: false,
//         authorId: user1.id,
//       },
//     });
  
//     const post2 = await prisma.article.upsert({
//       where: { title: "What's new in Prisma? (Q1/22)" },
//       update: {
//         authorId: user2.id,
//       },
//       create: {
//         title: "What's new in Prisma? (Q1/22)",
//         body: 'Our engineers have been working hard, issuing new releases with many improvements...',
//         description:
//           'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
//         published: true,
//         authorId: user2.id,
//       },
//     });
  
//     const post3 = await prisma.article.upsert({
//       where: { title: 'Prisma Client Just Became a Lot More Flexible' },
//       update: {},
//       create: {
//         title: 'Prisma Client Just Became a Lot More Flexible',
//         body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
//         description:
//           'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
//         published: true,
//       },
//     });
  
//     console.log({ user1, user2, post1, post2, post3 });
// }
  
// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password123',
      name: 'User 1',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password456',
      name: 'User 2',
    },
  });

  // Create articles
  const article1 = await prisma.article.create({
    data: {
      title: 'Article 1',
      description: 'This is the first article',
      body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      authorId: user1.id,
    },
  });

  const article2 = await prisma.article.create({
    data: {
      title: 'Article 2',
      description: 'This is the second article',
      body: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      authorId: user2.id,
    },
  });

  // Create posts
  const post1 = await prisma.post.create({
    data: {
      title: 'Post 1',
      slug: 'post-1',
      body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      authorId: user1.id,
    },
  });

  // Create comments
  const comment1 = await prisma.comment.create({
    data: {
      comment: 'Great article!',
      postId: post1.id,
    },
  });

  
  console.log('Seed data created successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });