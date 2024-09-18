import Nav from "./components/Nav";
import Dashboard from "./Dashboard";
export default function DashboardLayout() {
  return (
    <div className="flex flex-col h-screen max-h-screen">
      <Nav />

      <div className="flex-grow overflow-y-auto bg-page text-default-text">
        <Dashboard />
      </div>
    </div>
  );
}
