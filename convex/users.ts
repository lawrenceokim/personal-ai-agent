//write all user's table related operations inside this file

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    picture: v.string(),
  },
  handler: async (ctx, args) => {
    //if user already exist in table using email address as search medium.
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    if (user?.length == 0) {
      //if NO user ? add user to db
      const data = {
        name: args.name,
        email: args.email,
        picture: args.picture,
        credits: 500,
      };
      const result = await ctx.db.insert("users", data);
      return data;
    }
    //if user exist return user first instance
    return user[0];
  },
});

export const GetUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();

    return user[0];
  },
});
