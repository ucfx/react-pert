export default function Error({ error }: { error: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem",
        padding: "3rem",
      }}
    >
      {error}
    </div>
  );
}
