interface PageLayoutProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function PageLayout({ title, description, children }: PageLayoutProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-xl gap-md bg-background">
      <div className="max-w-4xl mx-auto text-center space-y-lg">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        {children}
      </div>
    </main>
  );
}
