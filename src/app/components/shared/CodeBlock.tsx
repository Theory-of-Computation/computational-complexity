"use client";

import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { BlurFade } from "@/components/ui/blur-fade";

type Props = {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
};

export default function CodeBlock({ code, language = "python", showLineNumbers = false }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    if (language !== "python") return;

    const codeEl = containerRef.current.querySelector("pre code") || containerRef.current.querySelector("code");
    if (!codeEl) return;

    const timeouts: number[] = [];
    let idx = 0;

    // Walk the tree and replace text nodes with word-wrapped spans
    const walker = document.createTreeWalker(codeEl, NodeFilter.SHOW_TEXT, null);
    const textNodes: Text[] = [];
    let node: Node | null;
    while ((node = walker.nextNode())) {
      // skip empty / whitespace-only nodes to avoid excessive spans
      if (node.textContent && node.textContent.trim().length > 0) {
        textNodes.push(node as Text);
      }
    }

    textNodes.forEach((textNode) => {
      const parent = textNode.parentNode as HTMLElement;
      if (!parent) return;
      const fragments = textNode.textContent!.match(/(\S+|\s+)/g) || [];
      const fragmentNodes: Node[] = fragments.map((frag) => {
        if (/^\s+$/.test(frag)) {
          return document.createTextNode(frag);
        }
        const span = document.createElement("span");
        span.className = "code-word";
        span.textContent = frag;
        // initial style (hidden + blur + translateY)
        span.style.opacity = "0";
        span.style.display = "inline-block";
        span.style.transform = "translateY(6px)";
        span.style.filter = "blur(6px)";
        span.style.transition = "opacity 220ms ease, transform 220ms ease, filter 220ms ease";
        // schedule reveal
        const delay = idx * 40; // 40ms stagger per word
        const t = window.setTimeout(() => {
          span.style.opacity = "1";
          span.style.transform = "translateY(0)";
          span.style.filter = "blur(0px)";
        }, delay);
        timeouts.push(t);
        idx += 1;
        return span;
      });

      fragmentNodes.forEach((n) => parent.insertBefore(n, textNode));
      parent.removeChild(textNode);
    });

    return () => {
      // clear timeouts
      timeouts.forEach((t) => clearTimeout(t));
    };
  }, [code, language]);

  return (
    <BlurFade className="rounded-md overflow-hidden border relative">
      <div ref={containerRef}>
        <button
          type="button"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1200);
            } catch (err) {
              setCopied(false);
            }
          }}
          className="absolute right-3 top-3 z-10 rounded-md border border-white/10 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/80 dark:text-slate-100"
        >
          {copied ? "Copied" : "Copy"}
        </button>

        <div>
        {language === "python" ? (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            wrapLongLines={true}
            customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
          >
            {code}
          </SyntaxHighlighter>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={vscDarkPlus}
            showLineNumbers={showLineNumbers}
            wrapLongLines={true}
            customStyle={{ margin: 0, padding: "1rem", background: "transparent" }}
          >
            {code}
          </SyntaxHighlighter>
        )}
        </div>
      </div>
    </BlurFade>
  );
}
