"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Language {
  id: string;
  name: string;
}

const languages: Language[] = [
  { id: "english", name: "English" },
  { id: "dutch", name: "Dutch" },
  { id: "flemish", name: "Flemish" },
  { id: "french", name: "French" },
  { id: "german", name: "German" },
  { id: "spanish", name: "Spanish" },
];

export default function CreateAgentPage() {
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const handleLanguageChange = (languageId: string, checked: boolean) => {
    if (checked) {
      setSelectedLanguages([...selectedLanguages, languageId]);
    } else {
      setSelectedLanguages(selectedLanguages.filter(id => id !== languageId));
    }
  };

  const handleGenerate = () => {
    console.log("Generating agent with:", {
      businessName,
      website,
      languages: selectedLanguages,
    });
  };

  return (
    <div className="p-6">
      <div className="w-full">
        {/* Header */}
        <div className="mb-6">
          <Link href="/agent" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Agents
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Create New Agent</h1>
          <p className="text-gray-600 mt-2">
            Configure your AI agent by providing business details and language preferences.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Agent Configuration</h2>
          <p className="text-gray-600 mb-6">
            Fill in the details below to create your AI agent.
          </p>
          
          <div className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName">Business Name</Label>
              <Input
                id="businessName"
                placeholder="Enter your business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <Label>Languages</Label>
              <div className="grid grid-cols-2 gap-4">
                {languages.map((language) => (
                  <div key={language.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={language.id}
                      checked={selectedLanguages.includes(language.id)}
                      onCheckedChange={(checked) => 
                        handleLanguageChange(language.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={language.id}
                      className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {language.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button 
                onClick={handleGenerate}
                className="w-full"
                disabled={!businessName || !website || selectedLanguages.length === 0}
              >
                Generate Agent
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
