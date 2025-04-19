import { Client, Databases, ID, Account, Query, Users, Models } from 'node-appwrite';
import * as settings from "../config/settings.json";

const endpoint: string = process.env.APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1";
const project: string = process.env.APPWRITE_PROJECT || "";
const key: string = process.env.APPWRITE_API_KEY || "";

const client = new Client()
    .setEndpoint(endpoint)
    .setProject(project)
    .setKey(key);

const databases = new Databases(client);
const accounts = new Account(client);
const users = new Users(client);

const databaseID = process.env.APPWRITE_DATABASE_ID || "";
const commissionsCollectionID = process.env.APPWRITE_COMMISSIONS_COLLECTION_ID || "";

const addCommission = async (title: string, description: string, paymentType: "robux"|"paypal", payment: number, contact: string) => {
    const currentCommissions = await getCommissions()

    const data = {
        title,
        description,
        payment,
        contact,
        paymentType,
        status: (settings.queueMode && currentCommissions.documents.length > 0) ? 'inqueue' : 'active'
    }

    try {
        const response = await databases.createDocument(
            databaseID,
            commissionsCollectionID,
            ID.unique(),
            data,
        )

        return response
    } catch (e) {
        return Promise.reject(e)
    }
}

const getCommissions = async () => {
    try {
        return databases.listDocuments(
            databaseID,
            commissionsCollectionID
        )
    } catch(e){
        return Promise.reject(e)
    }
}

export {
    addCommission,
    getCommissions
}