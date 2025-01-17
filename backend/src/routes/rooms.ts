import { Router, Request, Response } from "express";

const router: Router = Router();

// Example route
router.get("/", (req: Request, res: Response) => {
  res.json({ message: "Rooms API is working!" });
});

export default router;
