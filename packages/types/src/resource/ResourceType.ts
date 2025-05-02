export const ResourceTypeEnum = {
  ENTRY: "entry",
  TRIP: "trip",
  ALBUM: "album",
} as const;

export type ResourceType =
  (typeof ResourceTypeEnum)[keyof typeof ResourceTypeEnum];

export type ResourceId = string; // UUID
