'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, FileText, Volume2, X } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  website_url: string;
  vapi_assistant_id: string | null;
}

interface Call {
  id: string;
  status: string;
  createdAt?: string;
  created_at?: string;
  transcript?: string;
  summary?: string;
  recordingUrl?: string;
  agent_id: string;
  agent_name: string;
  agent_website: string;
  vapi_assistant_id: string;
  startedAt?: string;
  endedAt?: string;
  cost?: number;
}


export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string>('all');
  const [selectedSummary, setSelectedSummary] = useState<string | null>(null);
  const [selectedTranscript, setSelectedTranscript] = useState<string | null>(null);

  const fetchCalls = async (agentId?: string) => {
    try {
      setLoading(true);
      const url = agentId && agentId !== 'all' 
        ? `/api/calls?agentId=${agentId}`
        : '/api/calls';
      
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch calls');
      }

      setCalls(data.calls || []);
      setAgents(data.agents || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalls();
  }, []);

  const handleAgentFilter = (agentId: string) => {
    setSelectedAgent(agentId);
    fetchCalls(agentId);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'ended':
        return 'bg-green-100 text-green-800';
      case 'started':
      case 'in-progress':
        return 'bg-gray-100 text-gray-800';
      case 'failed':
      case 'error':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateDuration = (startedAt?: string, endedAt?: string) => {
    if (!startedAt || !endedAt) return 'N/A';
    
    const start = new Date(startedAt);
    const end = new Date(endedAt);
    const durationMs = end.getTime() - start.getTime();
    
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading calls...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-red-800 font-semibold">Error</h3>
          <p className="text-red-600">{error}</p>
          <Button onClick={() => fetchCalls()} className="mt-2">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Call History</h1>
            <div className="flex items-center gap-4">
              <Select value={selectedAgent} onValueChange={handleAgentFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder="Filter by agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  {agents.map((agent) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Badge variant="outline">
                {calls.length} calls
              </Badge>
            </div>
          </div>
        </div>
        
        {calls.length === 0 ? (
          <div className="p-8 text-center">
            <h3 className="text-lg font-semibold mb-2">No calls found</h3>
            <p className="text-gray-600">
              {selectedAgent !== 'all' 
                ? 'No calls found for the selected agent.' 
                : 'No calls found for any of your agents. Make sure your agents have VAPI assistant IDs and have received calls.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
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
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calls.map((call: Call) => (
                  <tr key={call.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{call.agent_name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-xs">{call.agent_website}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(call.createdAt || call.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {calculateDuration(call.startedAt, call.endedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={getStatusColor(call.status)}>
                        {call.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {call.summary ? (
                        <Button
                          variant="link"
                          onClick={() => setSelectedSummary(call.summary!)}
                          className="text-gray-700 hover:text-gray-900 p-0 h-auto font-normal"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {call.transcript ? (
                        <Button
                          variant="link"
                          onClick={() => setSelectedTranscript(call.transcript!)}
                          className="text-gray-700 hover:text-gray-900 p-0 h-auto font-normal"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          View
                        </Button>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {call.recordingUrl ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(call.recordingUrl, '_blank')}
                          className="flex items-center gap-2"
                        >
                          <Volume2 className="w-4 h-4" />
                          Play
                        </Button>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {call.cost ? `$${call.cost.toFixed(4)}` : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

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
                  <X className="w-4 h-4" />
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
                  <X className="w-4 h-4" />
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
