import React from "react";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  if (!content) return null;

  // Simple, deterministic, and safe local Markdown-to-JSX parser
  const lines = content.split("\n");
  const parsedNodes: React.ReactNode[] = [];
  let inList = false;
  let listItems: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      parsedNodes.push(
        <ul key={`list-${key}`} className="list-disc pl-5 mb-4 text-[#E0D8D0]/80 space-y-1">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-xs md:text-sm font-light leading-relaxed">
              {parseInlineStyles(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushTable = (key: number) => {
    if (tableRows.length > 0) {
      // Filter separator rows like |---|---|
      const cleanRows = tableRows.filter(
        (row) => !row.every((cell) => cell.includes("---") || cell.trim() === "")
      );

      if (cleanRows.length > 0) {
        const headers = cleanRows[0];
        const bodyRows = cleanRows.slice(1);

        parsedNodes.push(
          <div key={`table-container-${key}`} className="overflow-x-auto my-4 border border-[#E0D8D0]/10 rounded-lg bg-[#050505]/40">
            <table className="min-w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#050505] border-b border-[#E0D8D0]/15 text-[#E0D8D0]">
                  {headers.map((h, idx) => (
                    <th key={idx} className="px-3 py-2.5 font-semibold text-[10px] uppercase tracking-wider">
                      {h.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0D8D0]/5 text-[#E0D8D0]/80">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#E0D8D0]/5">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3 py-2 text-xs font-light">
                        {parseInlineStyles(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      tableRows = [];
      inTable = false;
    }
  };

  function parseInlineStyles(text: string): React.ReactNode {
    // Basic bold parsing **text**
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="font-semibold text-white">{part}</strong>;
      }
      // Check for simple legacy code format `code`
      const subParts = part.split(/`([^`]+)`/g);
      return subParts.map((sub, sIdx) => {
        if (sIdx % 2 === 1) {
          return (
            <code key={sIdx} className="bg-[#E0D8D0]/10 text-[#E0D8D0] px-1 py-0.5 rounded font-mono text-[11px]">
              {sub}
            </code>
          );
        }
        return sub;
      });
    });
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    // Check for Table rows starting and ending with |
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushList(i);
      inTable = true;
      const cells = trimmed
        .split("|")
        .slice(1, -1) // remove empty end cells from start/end
        .map((cell) => cell.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    // List item (starts with - * or +)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listItems.push(trimmed.substring(2));
      continue;
    } else if (inList) {
      flushList(i);
    }

    // Headers
    if (trimmed.startsWith("### ")) {
      parsedNodes.push(
        <h3 key={i} className="text-sm font-semibold text-[#E0D8D0] mt-5 mb-2 font-sans tracking-wide uppercase">
          {parseInlineStyles(trimmed.substring(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      parsedNodes.push(
        <h2 key={i} className="text-base font-semibold text-[#E0D8D0] mt-6 mb-3 border-b border-[#E0D8D0]/10 pb-1.5 font-sans tracking-wide">
          {parseInlineStyles(trimmed.substring(3))}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      parsedNodes.push(
        <h1 key={i} className="text-lg font-bold text-[#E0D8D0] mt-8 mb-4 tracking-wider uppercase font-sans">
          {parseInlineStyles(trimmed.substring(2))}
        </h1>
      );
    } else if (trimmed === "") {
      // Paragraph separator
      continue;
    } else {
      // Normal paragraph
      parsedNodes.push(
        <p key={i} className="text-xs md:text-sm text-[#E0D8D0]/80 font-light leading-relaxed mb-4">
          {parseInlineStyles(rawLine)}
        </p>
      );
    }
  }

  // Final flushes
  if (inList) flushList(lines.length);
  if (inTable) flushTable(lines.length);

  return <div className="proposal-markdown">{parsedNodes}</div>;
}
