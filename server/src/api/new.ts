import { Express, Request, Response } from "express";
import { addCommission } from "../modules/database";

export default (app: Express): { method: string; route: string } => {
    app.post("/api/v1/new", async (req: Request, res: Response): Promise<void> => {
        const { title, description, paymentType, payment, contact } = req.body;

        if (
            !title 
            || !description 
            || !paymentType 
            || !payment 
            || !contact
            || typeof title !== "string"
            || typeof description !== "string"
            || (paymentType !== "robux" && paymentType !== "paypal")
            || typeof payment !== "number"
            || typeof contact !== "string"
            || payment <= 0
        ) {
            res.status(400).json({ error: "Required fields not provided or not formatted properly" });
            return;
        }

        try {
            const response = await addCommission(
                title,
                description,
                paymentType,
                payment,
                contact
            );

            res.status(200).json({ success: true, response });
        } catch (e: any) {
            res.status(500).json({ success: false, error: e.message });
        }
    });

    return {
        method: "POST",
        route: "/api/v1/new",
    };
};