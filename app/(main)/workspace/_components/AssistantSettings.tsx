"use client";

import { AssistantContext } from "@/context/AssistantContext";
import Image from "next/image";
import React, { useContext, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AiModelOptions from "@/services/AiModelOptions";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Save, Trash } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function AssistantSettings() {
  const { assistant, setAssistant } = useContext(AssistantContext);
  const UpdateAssistant = useMutation(
    api.userAiAssistants.UpdateUserAiAssistant
  );
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field: string, value: string) => {
    setAssistant((prev: any) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnSave = async () => {
    setLoading(true);
    const result = await UpdateAssistant({
      id: assistant?._id,
      aiModelId: assistant?.aiModelId,
      userInstruction: assistant?.userInstruction,
    });
    setLoading(false);
  };

  return (
    assistant && (
      <div className="p-5 bg-secondary border-l h-screen">
        <h2 className="font-bold text-xl">Settings</h2>
        <div className="mt-4 flex gap-3">
          <Image
            src={assistant?.image}
            alt="assistant"
            width={80}
            height={80}
            className="rounded-xl h-20 w-20 object-cover"
          />
          <div className="">
            <h2 className="font-bold">{assistant?.name}</h2>
            <p className="text-gray-700 dark:text-gray-300">
              {assistant?.title}
            </p>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-500">Model:</h2>
          <Select
            defaultValue={assistant.aiModelId}
            onValueChange={(value) => onHandleInputChange("aiModelId", value)}
          >
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Select Model" />
            </SelectTrigger>
            <SelectContent>
              {AiModelOptions.map((model, index) => (
                <SelectItem
                  key={index}
                  value={model.name}
                  className="cursor-pointer"
                >
                  <div className="flex items-center gap-2 m-1">
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={20}
                      height={20}
                      className="rounded-md"
                    />
                    <h2 className="">{model.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4">
          <h2 className="text-gray-500">Instructions</h2>
          <Textarea
            placeholder="Add Instruction"
            value={assistant?.userInstruction}
            className="h-[180px] bg-white"
            onChange={(e) =>
              onHandleInputChange("userInstruction", e.target.value)
            }
          />
        </div>
        <div className="absolute bottom-10 right-5 flex gap-5">
          <Button variant={"ghost"} disabled={loading}>
            <Trash /> Delete
          </Button>
          <Button onClick={OnSave} disabled={loading}>
            {loading ? <Loader2Icon className="animate-spin" /> : <Save />}Save
          </Button>
        </div>
      </div>
    )
  );
}

export default AssistantSettings;
