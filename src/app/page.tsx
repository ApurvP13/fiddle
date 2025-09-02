"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Undo2, Redo2, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import TextEditor from "@/components/TextEditor";
import ToneMatrix from "@/components/ToneMatrix";

export default function HomePage() {
  // Simple state
  const [text, setText] = useState("");
  const [selection, setSelection] = useState({ start: 0, end: 0 });
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTone, setActiveTone] = useState<string | null>(null);

  // Simple undo - just store previous text
  const saveToHistory = () => {
    if (text) setHistory((prev) => [...prev, text]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setText(previous);
  };

  const reset = () => {
    saveToHistory();
    setText("");
  };

  // Main tone changer
  const applyTone = async (toneId: string) => {
    if (!text.trim()) {
      toast("Add some text first");
      return;
    }

    setLoading(true);
    setActiveTone(toneId);
    saveToHistory();

    const { start, end } = selection;
    const hasSelection = end > start;

    try {
      // Determine what text to transform
      const textToTransform = hasSelection ? text.slice(start, end) : text;

      // Skip API call if text is too short or empty
      if (!textToTransform.trim()) {
        toast("No text selected to transform");
        return;
      }

      // Call the ToneChanger API
      const response = await fetch("/api/ToneChanger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTransform,
          toneId,
          selection: hasSelection ? { start, end } : null,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to change tone");
      }

      const { result } = await response.json();

      // Apply the transformed text
      if (hasSelection) {
        // Replace only the selected portion
        const before = text.slice(0, start);
        const after = text.slice(end);
        const updated = `${before}${result}${after}`;
        setText(updated);

        // Update selection to cover the new transformed text
        const newEnd = start + result.length;
        setSelection({ start, end: newEnd });
      } else {
        // Replace entire text
        setText(result);
        // Reset selection to end of text
        setSelection({ start: result.length, end: result.length });
      }

      toast("Tone applied", {
        description: hasSelection
          ? "Your selection was transformed."
          : "Your text was transformed.",
      });
    } catch (error) {
      console.error("Tone change error:", error);
      toast("Failed to change tone", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen  bg-background p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-mono text-neutral-700 font-bold">
            Tone Picker
          </h1>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={undo}
              disabled={!history.length}
            >
              <Undo2 className="h-5 w-5" />
            </Button>
            <Button variant="secondary" onClick={reset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Text Editor */}
          <div className="md:col-span-2">
            <TextEditor
              value={text}
              onChange={setText}
              onSelectionChange={setSelection}
              loading={loading}
            />
          </div>

          {/* Tone Matrix */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-mono text-neutral-700 font-semibold">
              Pick A Tone
            </h2>
            <ToneMatrix onSelect={applyTone} />
          </div>
        </div>
      </div>

      {/* <Toaster /> */}
    </main>
  );
}
