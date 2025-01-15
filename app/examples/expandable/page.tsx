"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { Post, User } from "../examples.types";
import { columns } from "./expandable-columns";

export default function ExpandableTableExample() {
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Record<number, Post[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Create multiple user sets by modifying original data
        const usersRes = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const initialUsers: User[] = await usersRes.json();

        // Create additional users by cloning and modifying existing ones
        const extraUsers = Array.from({ length: 3 }).flatMap((_, i) =>
          initialUsers.map((user) => ({
            ...user,
            id: user.id + (i + 1) * 10,
            name: `${user.name} ${i + 2}`,
            email: `${user.email.split("@")[0]}_${i + 2}@${
              user.email.split("@")[1]
            }`,
            username: `${user.username}_${i + 2}`,
          }))
        );

        const allUsers = [...initialUsers, ...extraUsers];
        setUsers(allUsers);

        // Fetch posts and create additional ones
        const postsRes = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const initialPosts: Post[] = await postsRes.json();

        const extraPosts = Array.from({ length: 3 }).flatMap((_, i) =>
          initialPosts.map((post) => ({
            ...post,
            id: post.id + (i + 1) * 100,
            userId: post.userId + (i + 1) * 10,
          }))
        );

        const allPosts = [...initialPosts, ...extraPosts];

        // Group all posts by user ID
        const groupedPosts = allPosts.reduce<Record<number, Post[]>>(
          (acc, post) => {
            if (!acc[post.userId]) {
              acc[post.userId] = [];
            }
            acc[post.userId].push(post);
            return acc;
          },
          {}
        );

        setPosts(groupedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderExpandedContent = (row: { original: User }) => (
    <div className="p-4 bg-muted/50">
      <h3 className="font-medium mb-4">Posts by {row.original.name}</h3>
      <div className="grid gap-4">
        {posts[row.original.id]?.map((post) => (
          <div key={post.id} className="border rounded-lg p-4 bg-background">
            <h4 className="font-medium mb-2">{post.title}</h4>
            <p className="text-sm text-muted-foreground">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Users & Posts Table</h1>
        <p className="text-muted-foreground">
          Expandable table showing users and their posts. Click a row to see
          user&apos;s posts.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          expandable={true}
          renderSubRow={renderExpandedContent}
        />
      )}
    </div>
  );
}
