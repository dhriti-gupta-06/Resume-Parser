import Sidebar from "./Sidebar";

function AppShell({ children }) {
  return (
    <div className="min-h-screen flex bg-[var(--color-app-bg)]">
      <Sidebar />
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export default AppShell;
