import { createFileRoute, Link } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { mockContentPages } from "@/data/mock/content";
import type { ContentPage } from "@/data/types";
import { useState } from "react";

export const Route = createFileRoute("/admin/ops/content")({
  head: () => ({
    meta: [
      { title: "Content — Admin Dashboard" },
      {
        name: "description",
        content: "Manage content for Vicky's Place.",
      },
    ],
  }),
  component: AdminContent,
});

function AdminContent() {
  const [selectedPage, setSelectedPage] = useState<ContentPage | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [editedTitle, setEditedTitle] = useState<string>("");

  const handleSelectPage = (page: ContentPage) => {
    setSelectedPage(page);
    setEditedContent(page.content);
    setEditedTitle(page.title);
  };

  const handleSave = () => {
    if (selectedPage) {
      console.log("Saving content for:", selectedPage.slug, {
        title: editedTitle,
        content: editedContent,
      });
      alert(`Saved changes to ${selectedPage.title}`);
    }
  };

  const currentPage = selectedPage || mockContentPages[0];

  return (
    <div className="p-4 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link to="/admin" className="text-sm text-muted-foreground hover:text-foreground">
            Admin
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <Link
            to="/admin/ops/content"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Ops
          </Link>
          <span className="mx-2 text-muted-foreground">/</span>
          <h1 className="text-2xl md:text-3xl">Content</h1>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="font-serif text-lg mb-4">Pages</h3>
          <div className="space-y-2">
            {mockContentPages.map((page: ContentPage) => (
              <button
                key={page.slug}
                onClick={() => handleSelectPage(page)}
                className={`w-full rounded-lg border border-border p-4 text-left transition-colors hover:border-primary ${
                  selectedPage?.slug === page.slug ? "border-primary bg-primary/5" : "bg-muted/30"
                }`}
              >
                <h4 className="font-semibold">{page.title}</h4>
                <p className="text-xs text-muted-foreground">/{page.slug}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-lg border border-border bg-card p-6">
          {selectedPage ? (
            <>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-serif text-lg">Edit: {selectedPage.title}</h3>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-deep"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="h-10 w-full rounded-md border border-border bg-card px-4 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Content</label>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    rows={20}
                    className="w-full rounded-md border border-border bg-card p-4 text-sm outline-none focus:border-primary resize-y"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  Last updated: {selectedPage.updatedAt}
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Select a page to edit
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
