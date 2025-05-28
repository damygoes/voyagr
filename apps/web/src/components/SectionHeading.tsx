"use client";

export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="text-center max-w-md">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground mt-sm">{description}</p>
    </div>
  );
}
