const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const adminUsername = process.env.ADMIN_USERNAME || "girish";
  const adminPassword = process.env.ADMIN_PASSWORD || "Sqli@1337";

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      passwordHash
    }
  });

  const jobs = [
    {
      title: "Cloud DevOps Engineer – Visa Sponsorship",
      company: "CloudSync Ltd",
      location: "Dublin, Ireland",
      salary: "€70,000 - €95,000",
      url: "https://example.com/jobs/cloud-devops-ireland",
      description:
        "Manage cloud infrastructure and CI/CD pipelines; relocation and visa sponsorship offered."
    },
    {
      title: "Software Engineer – Backend (Visa Sponsored)",
      company: "TechBridge GmbH",
      location: "Berlin, Germany",
      salary: "€65,000 - €85,000",
      url: "https://example.com/jobs/backend-engineer-berlin",
      description:
        "Work on scalable backend services in a multicultural, visa-sponsored environment."
    },
    {
      title: "Application Security Engineer – Visa Sponsorship",
      company: "SecureLayer AG",
      location: "Zurich, Switzerland",
      salary: "CHF 110,000 - CHF 130,000",
      url: "https://example.com/jobs/appsec-engineer-zurich",
      description:
        "Own product security, threat modeling, and SDLC for cloud-native platforms."
    }
  ];

  for (const job of jobs) {
    await prisma.job.create({ data: job });
  }

  console.log("Database seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
