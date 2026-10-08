import { useEffect, useState } from "react";
import "./App.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
function App() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [health, setHealth] = useState(null);
  const [version, setVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchSystemData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [healthResponse, infoResponse, versionResponse] =
        await Promise.all([
          fetch(`${API_BASE_URL}/health`),
          fetch(`${API_BASE_URL}/info`),
          fetch(`${API_BASE_URL}/version`),
        ]);

      if (!healthResponse.ok || !infoResponse.ok || !versionResponse.ok) {
        throw new Error("Failed to fetch API data");
      }

      const healthData = await healthResponse.json();
      const infoData = await infoResponse.json();
      const versionData = await versionResponse.json();

      setHealth(healthData);
      setSystemInfo(infoData);
      setVersion(versionData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(
        "Unable to connect to Cloud System API. Make sure the Docker container is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemData();
  }, []);

  const formatTime = (date) => {
    if (!date) return "—";

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <div className="brand">
            <span className="brand-icon">☁</span>
            Cloud System API
          </div>

          <p className="subtitle">
            Containerized Cloud System Information Platform
          </p>
        </div>

        <div className="status-badge">
          <span className="status-dot"></span>
          {error ? "OFFLINE" : "SYSTEM ONLINE"}
        </div>
      </header>

      <main className="container">
        {error && <div className="error-banner">{error}</div>}

        <section className="stats-grid">
          <StatCard
            title="API STATUS"
            value={health?.status || "—"}
            detail={health?.application || "Cloud System API"}
            status={!error}
          />

          <StatCard
            title="VERSION"
            value={version?.version || "—"}
            detail="Application release"
          />

          <StatCard
            title="CONTAINER"
            value={
              systemInfo?.containerized
                ? "Docker"
                : systemInfo
                  ? "Local"
                  : "—"
            }
            detail={
              systemInfo?.containerized
                ? "Containerized runtime"
                : "Local runtime"
            }
          />

          <StatCard
            title="ENVIRONMENT"
            value={systemInfo?.environment?.toUpperCase() || "—"}
            detail="Runtime environment"
          />
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>System Information</h2>
              <p>Runtime environment and container details</p>
            </div>

            <span className="live-indicator">
              <span></span>
              LIVE
            </span>
          </div>

          {loading ? (
            <div className="loading">Loading system information...</div>
          ) : systemInfo ? (
            <div className="info-grid">
              <InfoItem label="Platform" value={systemInfo.platform} />
              <InfoItem
                label="Platform Release"
                value={systemInfo.platform_release}
              />
              <InfoItem
                label="Architecture"
                value={systemInfo.architecture}
              />
              <InfoItem
                label="Python Version"
                value={systemInfo.python_version}
              />
              <InfoItem label="Hostname" value={systemInfo.hostname} />
              <InfoItem
                label="Containerized"
                value={systemInfo.containerized ? "Yes" : "No"}
              />
              <InfoItem
                label="Runtime"
                value={systemInfo.container_runtime}
              />
              <InfoItem
                label="Process ID"
                value={systemInfo.process_id}
              />
            </div>
          ) : null}
        </section>

        <section className="panel">
          <div className="panel-header">
            <div>
              <h2>API Endpoints</h2>
              <p>Available Cloud System API resources</p>
            </div>
          </div>

          <div className="endpoint-list">
            <Endpoint
              method="GET"
              path="/"
              description="Application status"
            />

            <Endpoint
              method="GET"
              path="/health"
              description="Health check"
            />

            <Endpoint
              method="GET"
              path="/info"
              description="System information"
            />

            <Endpoint
              method="GET"
              path="/version"
              description="Application version"
            />
          </div>
        </section>

        <section className="bottom-bar">
          <div>
            Last updated: <strong>{formatTime(lastUpdated)}</strong>
          </div>

          <button
            className="refresh-button"
            onClick={fetchSystemData}
            disabled={loading}
          >
            ↻ {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </section>
      </main>

      <footer>
        <span>Cloud System Information Platform</span>
        <span>Flask • Docker • AWS Ready</span>
      </footer>
    </div>
  );
}

function StatCard({ title, value, detail, status }) {
  return (
    <div className="stat-card">
      <div className="stat-title">{title}</div>

      <div className="stat-value">
        {status !== undefined && (
          <span className={`mini-dot ${status ? "online" : "offline"}`}></span>
        )}

        {value}
      </div>

      <div className="stat-detail">{detail}</div>
    </div>
  );
}

function InfoItem({ label, value }) {
  return (
    <div className="info-item">
      <span>{label}</span>
      <strong>{value || "—"}</strong>
    </div>
  );
}

function Endpoint({ method, path, description }) {
  return (
    <div className="endpoint">
      <span className="method">{method}</span>
      <code>{path}</code>
      <span className="endpoint-description">{description}</span>
      <span className="endpoint-status">✓</span>
    </div>
  );
}

export default App;