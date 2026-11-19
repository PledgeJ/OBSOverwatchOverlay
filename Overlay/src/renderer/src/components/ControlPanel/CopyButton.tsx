/* eslint-disable prettier/prettier */
import { Button } from "@mui/material";
import React, { useState } from "react";

import { FaCopy } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

interface CopyProps {
  url: string
}

export function CopyButton({
  url,
}: CopyProps) : React.JSX.Element {
  const [copied, setCopied] = useState(false)

  async function handleCopy(): Promise<void> {
    if (copied) return

    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      console.error(`Clipboard copy failed: ${e}`)
      // Error pop up
    }
  }

  return (
    <Button onClick={handleCopy} sx={{color: 'white', minWidth: 0, alignItems: 'center'}}>
      {copied ? <TiTick /> : <FaCopy />}
    </Button>
  )
}