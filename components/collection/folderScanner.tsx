import React, { useState } from "react";
import { Loader2, FolderOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VideoMetadata {
  title: string;
  duration: string;
}

interface FolderStructure {
  title: string;
  lessons: VideoMetadata[];
  modules: FolderStructure[];
}

const FolderScanner = () => {
  const [folderData, setFolderData] = useState<FolderStructure | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const getVideoMetadata = async (file: File): Promise<VideoMetadata> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");

      video.preload = "metadata";
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = function () {
        resolve({
          title: file.name.replace(/\.mp4$/, ""),
          duration: video.duration.toFixed(2),
        });
        URL.revokeObjectURL(video.src);
      };
    });
  };

  const readDirectory = async (
    dirHandle: FileSystemDirectoryHandle,
  ): Promise<FolderStructure> => {
    const folderStructure: FolderStructure = {
      title: dirHandle.name,
      lessons: [],
      modules: [],
    };

    for await (const entry of dirHandle.values()) {
      if (entry.kind === "file") {
        const file = await entry.getFile();

        if (file.type.startsWith("video/")) {
          const metadata = await getVideoMetadata(file);

          folderStructure.lessons.push(metadata);
        }
      } else if (entry.kind === "directory") {
        const subfolder = await readDirectory(entry);

        folderStructure.modules.push(subfolder);
      }
    }

    return folderStructure;
  };

  const scanFolder = async () => {
    try {
      setIsScanning(true);
      const directoryHandle = await window.showDirectoryPicker();
      const data = await readDirectory(directoryHandle);

      setFolderData(data);
    } catch (error) {
      console.error("Error scanning folder:", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <>
      <div className="flex gap-4 mb-4">
        <Button disabled={isScanning} onClick={scanFolder}>
          {isScanning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <FolderOpen className="mr-2 h-4 w-4" />
              Scan Folder
            </>
          )}
        </Button>
      </div>

      {folderData && (
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <pre className="text-sm">{JSON.stringify(folderData, null, 2)}</pre>
        </ScrollArea>
      )}
    </>
  );
};

export default FolderScanner;
