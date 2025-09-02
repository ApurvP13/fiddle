"use client";

import { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  onSelectionChange?: (selection: { start: number; end: number }) => void;
  placeholder?: string;
  className?: string;
  loading?: boolean;
  error?: string | null;
}

export default function TextEditor({
  value,
  onChange,
  onSelectionChange,
  placeholder = "Start typing here...",
  className,
  loading = false,
  error = null,
}: TextEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [selection, setSelection] = useState<{ start: number; end: number }>({
    start: 0,
    end: 0,
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const handleSelection = () => {
    const el = textareaRef.current;
    if (!el) return;

    const newSelection = {
      start: el.selectionStart ?? 0,
      end: el.selectionEnd ?? 0,
    };

    setSelection(newSelection);
    onSelectionChange?.(newSelection);
  };

  const selectedCount = Math.max(0, selection.end - selection.start);

  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card p-3 shadow-sm",
        className
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-md text-muted-foreground">
          <span className="text-md font-bold">Write or paste your text.</span>{" "}
          <span className="text-xs">
            (Select a portion to target your tone changes.)
          </span>
        </p>
        {selectedCount > 0 && (
          <span className="rounded-full bg-orange-200 px-2 py-1 text-xs text-white">
            {selectedCount} selected
          </span>
        )}
      </div>

      <div className="relative">
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={handleTextChange}
          onSelect={handleSelection}
          placeholder={placeholder}
          className={cn(
            "min-h-[400px] resize-y rounded-md",
            "focus-visible:ring-orange-500/70",
            loading && "opacity-50"
          )}
          disabled={loading}
          aria-label="Text editor"
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-md">
            <div className="flex flex-col items-center gap-2">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-orange-600 border-t-transparent" />
              <span className="text-sm text-muted-foreground">
                Adjusting tone…
              </span>
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-md border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}
    </div>
  );
}
