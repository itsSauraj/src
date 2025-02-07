"use client";

import type { SetStateAction } from "react";
import type { Module } from "@/types/dashboard/view";
import type {
  ImportCreateCourse,
  FolderStructure,
  FileMetadata,
} from "@/types/dashboard/course";
import type { Course } from "@/types/dashboard/view";

import React, { useState, ChangeEvent } from "react";
import { Loader2, Download } from "lucide-react";

import ScannedStructure from "./courseScanner";

import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

interface CourseFormProps {
  setCourses: React.Dispatch<SetStateAction<Course[]>>;
  setState: (value: boolean) => void;
  onClose?: () => void;
}

export const CourseUpload: React.FC<CourseFormProps> = ({
  setCourses,
  setState,
  onClose,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [createFolderStructure, setCreateFolderStructure] =
    useState<ImportCreateCourse | null>(null);

  const FormatViewStructure = (
    moduleStructure: FolderStructure,
  ): Module[] | any => {
    return moduleStructure.modules?.flatMap((module) => {
      return {
        title: module.title,
        lessons: module.lessons,
        sub_modules: module.modules ? FormatViewStructure(module) : [],
      };
    });
  };

  const FormatCreateStructure = (
    moduleStructure: FolderStructure,
  ): ImportCreateCourse => {
    return {
      course: {
        title: moduleStructure.title,
        image: "",
        description: "",
      },
      modules: moduleStructure.modules?.flatMap((module) => {
        return {
          title: module.title,
          lessons: module.lessons,
          sub_modules: (module.modules
            ? FormatViewStructure(module)
            : []) as Module,
        } as unknown as Module[];
      }),
    };
  };

  const handleFolderUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setIsUploading(true);
    setProgress(0);
    const files = event.target.files;
    const folderStructure: any = {};

    if (!files) return;
    let processedFiles = 0;
    const totalFiles = files.length;

    for (const file of Array.from(files)) {
      const pathParts = file.webkitRelativePath.split("/");
      let currentFolder: FolderStructure = folderStructure;

      for (let i = 0; i < pathParts.length - 1; i++) {
        const folderName = pathParts[i];

        if (!currentFolder.modules) {
          currentFolder.modules = [];
        }

        let existingModule = currentFolder.modules.find(
          (module) => module.title === folderName,
        );

        if (!existingModule) {
          existingModule = {
            title: folderName,
            lessons: [],
            modules: [],
          };
          currentFolder.modules.push(existingModule);
          currentFolder = existingModule;
        }

        currentFolder = existingModule;
      }

      if (!currentFolder.lessons) {
        currentFolder.lessons = [];
      }

      let fileMetadata: FileMetadata = {
        title: file.name,
        duration: "",
        hours: "0",
        minutes: "0",
        seconds: "0",
      };

      if (file.type.startsWith("video/") && file.name.endsWith(".mp4")) {
        fileMetadata = await getVideoMetadata(file);
      }

      currentFolder.lessons.push(fileMetadata);

      processedFiles++;
      setProgress((processedFiles / totalFiles) * 100);
    }

    const createFormattedStructure = FormatCreateStructure(
      folderStructure.modules[0],
    );

    setCreateFolderStructure(createFormattedStructure);
    setIsUploading(false);
  };

  const getVideoMetadata = (file: File): Promise<FileMetadata> => {
    return new Promise((resolve) => {
      const video = document.createElement("video");

      video.preload = "metadata";
      video.src = URL.createObjectURL(file);

      video.onloadedmetadata = function () {
        const hours = Math.floor(video.duration / 3600)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((video.duration % 3600) / 60)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor(video.duration % 60)
          .toString()
          .padStart(2, "0");

        resolve({
          title: file.name.replace(".mp4", ""),
          hours: hours,
          minutes: minutes,
          seconds: seconds,
          duration: `${hours}:${minutes}:${seconds}`,
        });

        URL.revokeObjectURL(video.src);
      };
    });
  };

  return (
    <>
      {createFolderStructure ? (
        <ScannedStructure
          data={createFolderStructure}
          setCourses={setCourses}
          setState={setState}
          onClose={onClose}
        />
      ) : (
        <>
          <input
            ref={(input) => {
              if (input) {
                input.webkitdirectory = true;
              }
            }}
            className="hidden"
            disabled={isUploading}
            id="folderInput"
            type="file"
            onChange={handleFolderUpload}
          />

          <Button
            disabled={isUploading}
            onClick={() => document.getElementById("folderInput")?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Download />
                Import Course
              </>
            )}
          </Button>
          {isUploading && (
            <div className="w-full space-y-2">
              <Progress className="w-full" value={progress} />
              <p className="text-center text-sm text-gray-500">
                Processing files: {progress.toFixed(0)}%
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};
