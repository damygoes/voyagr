import { Request, Response } from "express";
import { getAllEntries } from "./entry.service";

export async function getEntriesHandler(_req: Request, res: Response) {
  const entries = await getAllEntries();
  res.status(200).json(entries);
}
