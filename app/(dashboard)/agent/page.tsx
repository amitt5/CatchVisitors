"use client";

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

interface Agent {
  id: string;
  name: string;
  languages: string[];
  status: "active" | "paused";
  calls: number;
}

const fakeAgents: Agent[] = [
  {
    id: "1",
    name: "Sales Assistant",
    languages: ["English", "Spanish"],
    status: "active",
    calls: 1247,
  },
  {
    id: "2",
    name: "Support Bot",
    languages: ["English", "French", "German"],
    status: "active",
    calls: 892,
  },
  {
    id: "3",
    name: "Lead Qualifier",
    languages: ["English"],
    status: "paused",
    calls: 456,
  },
  {
    id: "4",
    name: "Customer Service",
    languages: ["English", "Mandarin", "Japanese"],
    status: "active",
    calls: 2103,
  },
  {
    id: "5",
    name: "Technical Support",
    languages: ["English", "Spanish", "Portuguese"],
    status: "paused",
    calls: 678,
  },
];

export default function AgentPage() {
  const handleEdit = (agentId: string) => {
    console.log("Edit agent:", agentId);
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
              {fakeAgents.map((agent) => (
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
        </div>
      </div>
    </div>
  );
}
