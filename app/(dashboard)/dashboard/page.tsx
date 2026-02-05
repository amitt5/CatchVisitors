import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <UserButton />
        </div>
        
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Welcome to your Dashboard!
            </h2>
            <p className="text-gray-600">
              This is a protected route. Only authenticated users can access this page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
