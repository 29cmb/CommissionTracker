import { Express } from "express"
import { getCommissions } from "../modules/database"
export default (app: Express) => {
    app.get("/api/v1/commissions", async (req,res) => {
        const apiKey = req.get("x-api-key")
        if(!apiKey || apiKey !== process.env.API_KEY) {
            res.status(401).json({ success: false, error: "Unauthorized" })
            return
        }
        
        const commissions = await getCommissions()
        if(!commissions) {
            res.status(500).json({ success: false, error: "Failed to fetch commissions" })
            return
        }

        res.status(200).json({ success: true, commissions: commissions.documents })
    })

    return {
        method: "GET",
        route: "/api/v1/commissions",
    }
}