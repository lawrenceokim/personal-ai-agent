"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ASSISTANT } from "../../ai-assistants/page";
import AiAssistantList from "@/services/AiAssistantList";
import Image from "next/image";
import { AssistantContext } from "@/context/AssistantContext";

function AssistantList() {
  const { user } = useContext(AuthContext);
  const convex = useConvex();
  const router = useRouter();
  const [assistantList, setAssistantList] = useState<ASSISTANT[]>([]);
  const { assistant, setAssistant } = useContext(AssistantContext);

  useEffect(() => {
    //calling the function whenever the user component gets loaded and only when we have the user information.
    user && GetUserAssistants();
  }, [user]);

  const GetUserAssistants = async () => {
    //making a query to get the "GetAllUserAssistants" data from db.
    const result = await convex.query(
      api.userAiAssistants.GetAllUserAssistants,
      {
        uid: user._id,
      }
    );
    console.log(result);
    setAssistantList(result);
  };

  return (
    <div className="p-5 bg-secondary border-r h-screen relative">
      <h2 className="font-bold text-xl">Your Personal AI Assistants</h2>
      <Button className="w-full mt-3 cursor-pointer">
        + Add New Assistant
      </Button>
      <Input className="bg-white mt-3" placeholder="Search" />

      <div className="mt-5">
        {assistantList.map((assistant_, index) => (
          <div
            key={index}
            className={`p-2 flex gap-3 items-center hover:bg-gray-200 hover:dark:bg-slate-700 rounded-xl cursor-pointer mt-2 ${assistant_.id == assistant?.id && "bg-gray-200"}`}
            onClick={() => setAssistant(assistant_)}
          >
            <Image
              src={assistant_.image}
              alt={assistant_.name}
              width={60}
              height={60}
              className="rounded-lg w-[60px] h-[60px] object-cover"
            />
            <div className="">
              <h2 className="font-bold">{assistant_.name}</h2>
              <h2 className="text-gray-600 text-sm dark:text-gray-300">
                {assistant_.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 flex gap-3 items-center hover:bg-gray-200 w-[87%] p-2 rounded-xl">
        <Image
          src={user?.picture}
          alt="user"
          width={35}
          height={35}
          className="rounded-full "
        />
        <div className="">
          <h2 className="font-bold">{user?.name}</h2>
          <h2 className="text-gray-400 text-sm">
            {user?.orderId ? "Pro Plan" : "Free Plan"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default AssistantList;
