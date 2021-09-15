import { Request, Response } from "express";
import { Refrigerator } from '../models/Refrigerator';

export const getUserRefrigerator = async (req: Request, res: Response) => {
    let refrigerators = await Refrigerator.findAll();
    res.json({refrigerators});
}
