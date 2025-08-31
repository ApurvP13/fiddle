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
  const [history, setHistory] = useState([]);
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
      await new Promise((r) => setTimeout(r, 900));

      // very simple demo transformation
      const toneTag = `[${toneId}]`;
      const transform = (s: string) =>
        s.replace(/\s+/g, " ").trim().concat(` ${toneTag}`);
      if (hasSelection) {
        const before = text.slice(0, start);
        const target = text.slice(start, end);
        const after = text.slice(end);
        const updated = `${before}${transform(target)}${after}`;
        setText(updated);
        // restore selection to end of transformed segment
        const newPos = before.length + transform(target).length;
        setSelection({ start: newPos, end: newPos });
      } else {
        setText(transform(text));
      }

      setLoading(false);
      toast("Tone applied", { description: "Your selection was adjusted." });
    } catch (error) {
      toast("Failed to change tone");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Tone Picker</h1>
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
            <h2 className="mb-4 text-lg font-semibold">Pick Tone</h2>
            <ToneMatrix onSelect={applyTone} />
          </div>
        </div>
      </div>

      {/* <Toaster /> */}
    </main>
  );
}
