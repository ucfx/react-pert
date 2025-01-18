import { usePert, setSelectedTask } from "../../lib/main";

export const PertDetails = () => {
  const { criticalPaths, error, projectDuration } = usePert({ bounds: false });

  return (
    <div className="pert-details">
      <h2>PERT Details</h2>
      {error && <div className="error">{error}</div>}
      <button onClick={() => setSelectedTask(null)}>Clear Selection</button>
      <h3>Project Duration: {projectDuration}</h3>
      <h3>Critical Paths:</h3>
      <div>
        {criticalPaths.map((cp, index) => (
          <div key={index}>
            {cp.map((p, i) => (
              <span key={i}>
                {p.text}
                {i < cp.length - 1 && " → "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
