"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, FileText, Volume2 } from "lucide-react";

interface Call {
  id: string;
  startTime: string;
  duration: string;
  summary: string;
  transcript: string;
  audioUrl: string;
  emailResult: string;
  language: string;
}

const fakeCalls: Call[] = [
  {
    id: "1",
    startTime: "2024-02-04 10:30 AM",
    duration: "5:23",
    summary: "Customer inquired about employment law consultation services and asked about pricing for different case types.",
    transcript: "Customer: Hi, I'm looking for legal advice regarding a workplace issue...\nAgent: Good morning! I'd be happy to help you with your employment law questions...",
    audioUrl: "",
    emailResult: "Initial consultation requested - potential wrongful termination case",
    language: "English"
  },
  {
    id: "2", 
    startTime: "2024-02-04 09:15 AM",
    duration: "3:45",
    summary: "Caller asked about discrimination case documentation requirements and timeline.",
    transcript: "Customer: I need to understand what documents I should prepare...\nAgent: For discrimination cases, you'll typically need...",
    audioUrl: "",
    emailResult: "Documentation guidance provided - discrimination case",
    language: "English"
  },
  {
    id: "3",
    startTime: "2024-02-03 04:20 PM", 
    duration: "7:12",
    summary: "Long consultation regarding overtime pay disputes and wage theft allegations.",
    transcript: "Customer: I believe my employer hasn't been paying overtime correctly...\nAgent: Overtime disputes are serious matters that require careful documentation...",
    audioUrl: "",
    emailResult: "Overtime case evaluation requested - extensive documentation needed",
    language: "English"
  },
  {
    id: "4",
    startTime: "2024-02-03 02:30 PM",
    duration: "4:56",
    summary: "Quick questions about severance package negotiation and employee rights.",
    transcript: "Customer: I've been offered a severance package, is it fair?\nAgent: Severance packages should be evaluated based on several factors...",
    audioUrl: "",
    emailResult: "Severance package review consultation scheduled",
    language: "English"
  },
  {
    id: "5",
    startTime: "2024-02-02 11:45 AM",
    duration: "6:30",
    summary: "Detailed discussion about workplace harassment and company policy violations.",
    transcript: "Customer: I'm experiencing harassment at work and don't know what to do...\nAgent: Workplace harassment requires immediate attention and proper documentation...",
    audioUrl: "",
    emailResult: "Harassment case intake completed - urgent follow-up required",
    language: "English"
  }
];

export default function CallsPage() {
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Call History</h1>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Summary
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transcript
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Audio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email Result
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {fakeCalls.map((call) => (
                    <tr key={call.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {call.startTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {call.duration}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="link"
                          onClick={() => setSelectedSummary(call.summary)}
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
                        >
                          View Summary
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="link"
                          onClick={() => setSelectedTranscript(call.transcript)}
                          className="text-blue-600 hover:text-blue-800 p-0 h-auto font-normal"
                        >
                          View Transcript
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="flex items-center gap-2"
                        >
                          <Volume2 className="w-4 h-4" />
                          Play
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        {call.emailResult}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {call.language}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Summary Modal */}
      {selectedSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Call Summary</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedSummary(null)}
                >
                  ×
                </Button>
              </div>
              <p className="text-gray-700 leading-relaxed">{selectedSummary}</p>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedSummary(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transcript Modal */}
      {selectedTranscript && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Call Transcript</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedTranscript(null)}
                >
                  ×
                </Button>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {selectedTranscript}
                </pre>
              </div>
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedTranscript(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
