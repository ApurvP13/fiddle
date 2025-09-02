"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ToneOption = {
  id: string;
  title: string;
  subtitle?: string;
};

type Props = {
  onSelect: (id: string) => void;
  disabled?: boolean;
};

export default function ToneMatrix({ onSelect, disabled = false }: Props) {
  return (
    <div className="relative rounded-lg border bg-muted/20 p-4">
      {/* Axis Labels */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded bg-background px-2 py-1 text-xs text-orange-400">
        Professional
      </div>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded bg-background px-2 py-1 text-xs text-orange-400">
        Casual
      </div>
      <div className="absolute -left-7 bg-background top-1/2 -translate-y-1/2 -rotate-90 text-xs text-orange-400">
        Concise
      </div>
      <div className="absolute -right-7 bg-background top-1/2 -translate-y-1/2 rotate-90 text-xs text-orange-400">
        Expanded
      </div>

      {/* 3x3 Grid */}
      <div className="grid grid-cols-3 gap-1 h-48 w-full">
        {/* Row 1 - Professional */}
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("professional-concise")}
        />
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("professional-balanced")}
        />
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("professional-expanded")}
        />

        {/* Row 2 - Balanced */}
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("balanced-concise")}
        />
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("balanced-neutral")}
        />
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("balanced-expanded")}
        />

        {/* Row 3 - Casual */}
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("casual-concise")}
        />
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("casual-balanced")}
        />
        <Button
          variant="ghost"
          disabled={disabled}
          className={cn(
            "h-full border border-muted hover:border-orange-500/40 hover:bg-muted/50",
            "transition-all duration-200"
          )}
          onClick={() => onSelect("casual-expanded")}
        />
      </div>
    </div>
  );
}
