import { useState } from "react";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { WorkspaceView } from "./components/WorkspaceView";

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="flex h-screen w-full flex-col overflow-hidden">
      <Header />

      <div className="flex min-h-0 flex-1">
        <Sidebar
          collapsed={sidebarCollapsed}
          onCollapse={handleSidebarCollapse}
        />

        <main className="min-w-0 flex-1 overflow-hidden p-8">
          <WorkspaceView />
        </main>
      </div>
    </div>
  );
}

export default App;
