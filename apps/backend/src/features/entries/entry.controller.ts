import { Request, Response } from "express";
import { getAllEntries } from "./entry.service";

export async function getEntriesHandler(_req: Request, res: Response) {
  try {
    const entries = await getAllEntries();
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching entries:", error);
    res.status(500).json({
      error: "Failed to retrieve entries",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
