import { Client, Databases, Account } from "appwrite";

const client = new Client().setProject(import.meta.env.VITE_PROJECT_ID); // Your project ID

const accountInfo = new Account(client);
const databaseInfo = new Databases(client);

export { accountInfo, databaseInfo };
