"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus } from "lucide-react";
import Link from "next/link";
import { Agent } from "@/types/database";

export default function AgentPage() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/agents");
      if (!response.ok) {
        throw new Error("Failed to fetch agents");
      }
      const data = await response.json();
      setAgents(data.agents || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load agents");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (agentId: string) => {
    window.location.href = `/agent/${agentId}`;
  };

  const handleDelete = (agentId: string) => {
    console.log("Delete agent:", agentId);
  };
  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Agents</h1>
              <p className="text-gray-600 mt-1">Manage your AI agents and their performance</p>
            </div>
            <Link href="/agent/create">
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Create New Agent
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading agents...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
              <Button onClick={fetchAgents} className="mt-2">
                Retry
              </Button>
            </div>
          ) : agents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No agents found. Create your first agent to get started.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Agent Name</TableHead>
                  <TableHead>Languages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Calls</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {agents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium">{agent.name}</TableCell>
                    <TableCell>{agent.languages.join(", ")}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          agent.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {agent.status}
                      </span>
                    </TableCell>
                    <TableCell>{agent.calls.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(agent.id)}
                          className="h-8 px-2"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(agent.id)}
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:border-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableCaption>
                A list of your AI agents and their current performance metrics.
              </TableCaption>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
}
