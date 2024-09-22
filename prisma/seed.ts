import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  // create two dummy users
  const passwordSabin = await bcrypt.hash('password-sabin', roundsOfHashing);
  const passwordAlex = await bcrypt.hash('password-alex', roundsOfHashing);

  const user1 = await prisma.user.upsert({
    where: { email: 'sabin@adams.com' },
    update: {
      password: passwordSabin,
    },
    create: {
      email: 'sabin@adams.com',
      name: 'Sabin Adams',
      password: passwordSabin,
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'alex@ruheni.com' },
    update: {
      password: passwordAlex,
    },
    create: {
      email: 'alex@ruheni.com',
      name: 'Alex Ruheni',
      password: passwordAlex,
    },
  });
 
    // create three dummy articles
    const post1 = await prisma.article.upsert({
      where: { title: 'Prisma Adds Support for MongoDB' },
      update: {
        authorId: user1.id,
      },
      create: {
        title: 'Prisma Adds Support for MongoDB',
        body: 'Support for MongoDB has been one of the most requested features since the initial release of...',
        description:
          "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
        published: false,
        authorId: user1.id,
      },
    });
  
    const post2 = await prisma.article.upsert({
      where: { title: "What's new in Prisma? (Q1/22)" },
      update: {
        authorId: user2.id,
      },
      create: {
        title: "What's new in Prisma? (Q1/22)",
        body: 'Our engineers have been working hard, issuing new releases with many improvements...',
        description:
          'Learn about everything in the Prisma ecosystem and community from January to March 2022.',
        published: true,
        authorId: user2.id,
      },
    });
  
    const post3 = await prisma.article.upsert({
      where: { title: 'Prisma Client Just Became a Lot More Flexible' },
      update: {},
      create: {
        title: 'Prisma Client Just Became a Lot More Flexible',
        body: 'Prisma Client extensions provide a powerful new way to add functionality to Prisma in a type-safe manner...',
        description:
          'This article will explore various ways you can use Prisma Client extensions to add custom functionality to Prisma Client..',
        published: true,
      },
    });
  
    await prisma.article.createMany({
        data: [
          {
            title: 'Introduction to Prisma',
            description: 'Learn how to use Prisma in your next project',
            body: 'Prisma is an ORM that simplifies database management and querying.',
            thumbnailUrl: 'https://rutube.ru/api/video/preview/8b01bcbaab1c9ce8cdc3594761f040c4/?width=450',
            videoUrl: 'https://rutube.ru/video/8b01bcbaab1c9ce8cdc3594761f040c4/',
            published: true,
            authorId: user1.id,
          },
          {
            title: 'Advanced Prisma Techniques',
            description: 'Deep dive into advanced features of Prisma',
            body: 'In this article, we will explore advanced querying techniques in Prisma.',
            thumbnailUrl: 'https://rutube.ru/api/video/preview/3c252db89c524e426eb2ea6bb6dd9ab0/?width=450',
            videoUrl: 'https://rutube.ru/video/3c252db89c524e426eb2ea6bb6dd9ab0/',
            published: false,
            authorId: user1.id,
          },
          {
            title: 'Building Scalable APIs with NestJS',
            description: 'Learn how to build scalable APIs using NestJS and Prisma',
            body: 'In this tutorial, we will walk through building scalable APIs with NestJS and Prisma ORM.',
            thumbnailUrl: 'https://rutube.ru/api/video/preview/45eeab80e6ed9f5018379c6687387812/?width=450',
            videoUrl: 'https://rutube.ru/video/45eeab80e6ed9f5018379c6687387812/',
            published: true,
            authorId: user2.id,
          },
        ],
      });

    console.log({ user1, user2, post1, post2, post3 });
}
  
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

