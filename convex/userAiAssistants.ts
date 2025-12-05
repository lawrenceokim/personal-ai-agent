//note: saving the selected ai assistant of a user to the db while linking the user's uid to identify who saved it

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants = mutation({
  args: {
    records: v.any(), //list of selected ai assistant(checkbox selected)
    uid: v.id("users"), // get the id of whoever is checkboxing the ai assistant from the "users" table in the db
  },
  handler: async (ctx, args) => {
    const insertedIds = await Promise.all(
      args.records.map(
        async (record: any) =>
          await ctx.db.insert("userAiAssistants", {
            ...record,
            aiModelId: "Google: Gemini 2.0 Flash",
            uid: args.uid,
          })
      )
    );
    return insertedIds;
  },
});

//implement showing all ai assistants to users opening the app for the first time else we navigate user to the workspace route.
//code below fetches all the user's selected ai assistants
export const GetAllUserAssistants = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("userAiAssistants")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .collect();

    return result;
  },
});

export const UpdateUserAiAssistant = mutation({
  //to update the user ai assistant for the "userInstruction" and "aiModelid" fields.
  args: {
    id: v.id("userAiAssistants"),
    userInstruction: v.string(),
    aiModelId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.id, {
      aiModelId: args.aiModelId,
      userInstruction: args.userInstruction,
    });
    return result;
  },
});
