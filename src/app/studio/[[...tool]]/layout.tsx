export const metadata = {
  title: "NetArt Studio",
  description: "ממשק ניהול תוכן",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ height: "100vh" }}>
      {children}
    </div>
  );
}
