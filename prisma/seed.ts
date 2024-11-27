import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  // Clean the database
  await db.post.deleteMany();

  // Create sample posts
  const posts = [
    {
      title: "Getting Started with Remix",
      content: `Remix is a full stack web framework that lets you focus on the user interface and work back through web fundamentals to deliver a fast, slick, and resilient user experience.

Here are some key features of Remix:

1. Server Side Rendering (SSR)
2. Nested Routing
3. Built-in Form Handling
4. Error Boundary Support
5. Progressive Enhancement

Give it a try and see how it can improve your web development workflow!`,
      excerpt: "Learn the basics of Remix and start building better web applications",
    },
    {
      title: "Understanding TypeScript",
      content: `TypeScript is a strongly typed programming language that builds on JavaScript. It adds optional static types, classes, and modules to JavaScript.

Key benefits include:

- Early error detection
- Better IDE support
- Enhanced code maintainability
- Improved team collaboration

Start using TypeScript in your projects today!`,
      excerpt: "Explore the benefits of using TypeScript in your projects",
    },
    {
      title: "Tailwind CSS Best Practices",
      content: `Tailwind CSS is a utility-first CSS framework that can speed up your development process significantly.

Best practices include:

1. Using custom configurations
2. Extracting components
3. Organizing utilities
4. Responsive design patterns
5. Dark mode implementation

Follow these guidelines to write maintainable and scalable CSS!`,
      excerpt: "Learn how to effectively use Tailwind CSS in your projects",
    },
  ];

  for (const post of posts) {
    await db.post.create({ data: post });
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  }); 