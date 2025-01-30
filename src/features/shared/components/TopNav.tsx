import { Badge } from "@/components/ui/badge";
export default function TopNavBar({
  name = "Home",
  besideTitle,
  children,
}: {
  name: string;
  children?: React.ReactNode;
  besideTitle?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        padding: "16px",
        zIndex: 10,
        height: "70px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Left-side children */}
      <div style={{ flexShrink: 0 }}></div>
      {/* Centered text */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Right-side children */}
        <h1
          style={{
            marginLeft: "5%",
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </h1>
        {besideTitle && (
          <Badge
            style={{ textAlign: "center", whiteSpace: "nowrap" }}
            variant="default"
          >
            {besideTitle}
          </Badge>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
}
