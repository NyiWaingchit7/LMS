import { config } from "./config";
import { prisma } from "./db";
import bcrypt from "bcrypt";

async function main() {
  const username = config.username;
  const email = config.email;
  const password = await bcrypt.hash(config.password, 10);

  await prisma.user.create({ data: { username, email, password } });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
