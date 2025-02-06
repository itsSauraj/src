/* eslint-disable @next/next/no-img-element */
"use client";

import type { UUID } from "crypto";
import type { StoreDispatch } from "@/redux/store";
import type { CourseFormData } from "@/dependencies/yup";
import type { CourseContent } from "@/types/dashboard/course";
import type { TraineeCourseView } from "@/types/dashboard/view";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Clock,
  ImageIcon,
} from "lucide-react";
import { MdDelete } from "react-icons/md";

import { createNewCourse } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// api
import { getCourseDetails } from "@/lib/api";

const CourseForm = ({ courseID }: { courseID: UUID }) => {
  const dispatch = useDispatch<StoreDispatch>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [content, setContent] = useState<CourseContent[]>([
    {
      id: crypto.randomUUID(),
      type: "course",
      title: "",
      description: "",
      expanded: true,
      modules: [
        {
          id: crypto.randomUUID(),
          title: "",
          expanded: true,
          lessons: [
            {
              id: crypto.randomUUID(),
              title: "",
              duration: "",
              expanded: true,
            },
          ],
        },
      ],
    },
  ]);
  // const course = {
  //   title: data.metadata.title,
  //   description: data.metadata.description,
  //   image: data.metadata.image,
  // }

  const constructStructure = (data: any) => {
    
    const context = {
      
    }
  }

  useEffect(() => {
    dispatch(getCourseDetails(courseID)).then((data) => {
      
    });
  }, []);

  const [errors, setErrors] = useState<{
    course?: { title?: string; description?: string; image?: string };
    modules?: { [key: string]: string };
    lessons?: { [key: string]: string };
  }>({});

  // validations for course
  const validateCourse = (): boolean => {
    const newErrors: {
      course?: { title?: string; description?: string; image?: string };
      modules?: { [key: string]: string };
      lessons?: { [key: string]: string };
    } = {};
    let isValid = true;

    if (!content[0].title.trim()) {
      newErrors.course = {
        ...newErrors.course,
        title: "Course title is required",
      };
      isValid = false;
    }

    if (!content[0].description.trim()) {
      newErrors.course = {
        ...newErrors.course,
        description: "Course description is required",
      };
      isValid = false;
    }

    const moduleErrors: { [key: string]: string } = {};

    content[0].modules.forEach((module) => {
      if (!module.title.trim()) {
        moduleErrors[module.id] = "Module title is required";
        isValid = false;
      }
    });
    if (Object.keys(moduleErrors).length > 0) {
      newErrors.modules = moduleErrors;
    }

    const lessonErrors: { [key: string]: string } = {};

    content[0].modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (!lesson.title.trim()) {
          lessonErrors[lesson.id] = "Lesson title is required";
          isValid = false;
        }
        if (!lesson.duration.trim()) {
          lessonErrors[lesson.id] = "Duration is required";
          isValid = false;
        }
      });
    });
    if (Object.keys(lessonErrors).length > 0) {
      newErrors.lessons = lessonErrors;
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setContent((prev) =>
        prev.map((course) => ({
          ...course,
          image: file,
        })),
      );

      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addModule = (courseId: string) => {
    setContent((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: [
              ...course.modules,
              {
                id: crypto.randomUUID(),
                title: "",
                expanded: true,
                lessons: [
                  {
                    id: crypto.randomUUID(),
                    title: "",
                    duration: "",
                    expanded: true,
                  },
                ],
              },
            ],
          };
        }

        return course;
      }),
    );
  };

  const addLesson = (courseId: string, moduleId: string) => {
    setContent((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map((module) => {
              if (module.id === moduleId) {
                return {
                  ...module,
                  lessons: [
                    ...module.lessons,
                    {
                      id: crypto.randomUUID(),
                      title: "",
                      duration: "",
                      expanded: true,
                    },
                  ],
                };
              }

              return module;
            }),
          };
        }

        return course;
      }),
    );
  };

  const deleteModule = (courseId: string, moduleId: string) => {
    setContent((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          if (course.modules.length <= 1) {
            alert("You must have at least one module");

            return course;
          }

          return {
            ...course,
            modules: course.modules.filter((module) => module.id !== moduleId),
          };
        }

        return course;
      }),
    );
  };

  const deleteLesson = (
    courseId: string,
    moduleId: string,
    lessonId: string,
  ) => {
    setContent((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          return {
            ...course,
            modules: course.modules.map((module) => {
              if (module.id === moduleId) {
                if (module.lessons.length <= 1) {
                  alert("You must have at least one lesson per module");

                  return module;
                }

                return {
                  ...module,
                  lessons: module.lessons.filter(
                    (lesson) => lesson.id !== lessonId,
                  ),
                };
              }

              return module;
            }),
          };
        }

        return course;
      }),
    );
  };

  const toggleExpand = (
    courseId: string,
    moduleId?: string | null,
    lessonId?: string | null,
  ) => {
    setContent((prev) =>
      prev.map((course) => {
        if (course.id === courseId) {
          if (!moduleId) {
            return { ...course, expanded: !course.expanded };
          }

          return {
            ...course,
            modules: course.modules.map((module) => {
              if (module.id === moduleId) {
                if (!lessonId) {
                  return { ...module, expanded: !module.expanded };
                }

                return {
                  ...module,
                  lessons: module.lessons.map((lesson) =>
                    lesson.id === lessonId
                      ? { ...lesson, expanded: !lesson.expanded }
                      : lesson,
                  ),
                };
              }

              return module;
            }),
          };
        }

        return course;
      }),
    );
  };

  const handleSubmit = async () => {
    if (!validateCourse()) {
      return;
    }

    try {
      const formData = new FormData();
      const courseData = content[0];

      formData.append("title", courseData.title);
      formData.append("description", courseData.description);

      if (courseData.image) {
        formData.append("image", courseData.image);
      }

      const modules = courseData.modules.map((module, _moduleIndex) => {
        return {
          title: module.title,
          lessons: module.lessons.map((lesson, _lessonIndex) => {
            const [hours = "0", minutes = "0", seconds = "0"] =
              lesson.duration.split(":");

            return {
              title: lesson.title,
              hours,
              minutes,
              seconds,
            };
          }),
        };
      });

      formData.append("modules", JSON.stringify(modules));
    } catch (error) {
      console.error("Course creation failed", error); // eslint-disable-line no-console
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {content.map((course) => (
          <div key={course.id} className="space-y-1">
            {/* Course Title and Image */}
            <div className="group flex items-center gap-2 px-2 py-1 -ml-2 hover:bg-gray-100 rounded-md cursor-text mb-4">
              <label
                className="flex items-center justify-center w-24 h-24 border-2 border-dashed rounded-lg cursor-pointer hover:border-blue-500"
                htmlFor="image-upload"
              >
                {imagePreview ? (
                  <img
                    alt="Course"
                    className="w-full h-full object-cover rounded-lg"
                    src={imagePreview}
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <ImageIcon size={32} />
                    <span className="text-sm mt-2">Add cover</span>
                  </div>
                )}
              </label>
              <input
                accept="image/jpeg,image/png,image/gif,image/webp"
                className="hidden"
                id="image-upload"
                type="file"
                onChange={handleImageUpload}
              />

              <div className="flex-grow">
                <Input
                  className={`border-none bg-transparent focus:ring-0 text-2xl font-bold px-2 ${
                    errors.course?.title ? "text-red-500" : ""
                  }`}
                  placeholder="Course title..."
                  type="text"
                  value={course.title}
                  onChange={(e) => {
                    setContent((prev) =>
                      prev.map((c) =>
                        c.id === course.id
                          ? { ...c, title: e.target.value }
                          : c,
                      ),
                    );
                  }}
                />
                {errors.course?.title && (
                  <div className="text-red-500 text-sm ml-8">
                    {errors.course.title}
                  </div>
                )}
              </div>
            </div>

            <div className="px-2 py-1 -ml-2 hover:bg-gray-100 rounded-md">
              <textarea
                className={`w-full border-none bg-transparent focus:ring-0 text-sm text-gray-600 focus:outline-primary
                focus:border-primary focus:outline-1 p-1 resize-none ${
                  errors.course?.description ? "text-red-500" : ""
                }`}
                placeholder="Add a description (required)..."
                rows={3}
                value={course.description}
                onChange={(e) => {
                  setContent((prev) =>
                    prev.map((c) =>
                      c.id === course.id
                        ? { ...c, description: e.target.value }
                        : c,
                    ),
                  );
                }}
              />
              {errors.course?.description && (
                <div className="text-red-500 text-sm ml-2">
                  {errors.course.description}
                </div>
              )}
            </div>

            {/* Modules */}
            {course.expanded && (
              <div className="space-y-1 mt-2">
                {course.modules.map((module) => (
                  <div key={module.id} className="pl-4">
                    {/* Module Title */}
                    <div className="group flex items-center gap-2 px-2 py-1 -ml-2 hover:bg-gray-100 rounded-md cursor-text">
                      <button
                        className="text-gray-400 hover:text-gray-600"
                        onClick={() => toggleExpand(course.id, module.id)}
                      >
                        {module.expanded ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>
                      <Input
                        className={`border-none bg-transparent focus:ring-0 font-medium px-2 ${
                          errors.modules?.[module.id] ? "text-red-500" : ""
                        }`}
                        placeholder="Module title..."
                        type="text"
                        value={module.title}
                        onChange={(e) => {
                          setContent((prev) =>
                            prev.map((c) => ({
                              ...c,
                              modules: c.modules.map((m) =>
                                m.id === module.id
                                  ? { ...m, title: e.target.value }
                                  : m,
                              ),
                            })),
                          );
                        }}
                      />
                      {errors.modules?.[module.id] && (
                        <div className="text-red-500 text-sm ml-8">
                          {errors.modules[module.id]}
                        </div>
                      )}
                      <button
                        className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                        onClick={() => deleteModule(course.id, module.id)}
                      >
                        <MdDelete size={16} />
                      </button>
                    </div>

                    {/* Lessons */}
                    {module.expanded && (
                      <div className="pl-8 space-y-1 mt-1">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className="group flex items-center gap-2 px-2 py-1 -ml-2 hover:bg-gray-100 rounded-md cursor-text"
                          >
                            <Input
                              className={`border-none bg-transparent focus:ring-0 px-2 ${
                                errors.lessons?.[lesson.id]
                                  ? "text-red-500"
                                  : ""
                              }`}
                              placeholder="Lesson title..."
                              type="text"
                              value={lesson.title}
                              onChange={(e) => {
                                setContent((prev) =>
                                  prev.map((c) => ({
                                    ...c,
                                    modules: c.modules.map((m) => ({
                                      ...m,
                                      lessons: m.lessons.map((l) =>
                                        l.id === lesson.id
                                          ? { ...l, title: e.target.value }
                                          : l,
                                      ),
                                    })),
                                  })),
                                );
                              }}
                            />
                            {errors.lessons?.[lesson.id] && (
                              <div className="text-red-500 text-sm ml-8">
                                {errors.lessons[lesson.id]}
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <Clock className="text-gray-400" size={16} />
                              <Input
                                className="w-20 border-none bg-transparent focus:ring-0 text-sm text-gray-600 px-2"
                                placeholder="00:00:00"
                                type="text"
                                value={lesson.duration}
                                onChange={(e) => {
                                  setContent((prev) =>
                                    prev.map((c) => ({
                                      ...c,
                                      modules: c.modules.map((m) => ({
                                        ...m,
                                        lessons: m.lessons.map((l) =>
                                          l.id === lesson.id
                                            ? { ...l, duration: e.target.value }
                                            : l,
                                        ),
                                      })),
                                    })),
                                  );
                                }}
                              />
                            </div>
                            <button
                              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600"
                              onClick={() =>
                                deleteLesson(course.id, module.id, lesson.id)
                              }
                            >
                              <MdDelete size={16} />
                            </button>
                          </div>
                        ))}

                        <Button
                          className="text-gray-500 hover:text-gray-700 -ml-2"
                          size="sm"
                          variant="ghost"
                          onClick={() => addLesson(course.id, module.id)}
                        >
                          <Plus className="mr-2" size={16} />
                          Add Lesson
                        </Button>
                      </div>
                    )}
                  </div>
                ))}

                <Button
                  className="text-gray-500 hover:text-gray-700 ml-2"
                  size="sm"
                  variant="ghost"
                  onClick={() => addModule(course.id)}
                >
                  <Plus className="mr-2" size={16} />
                  Add Module
                </Button>
              </div>
            )}
          </div>
        ))}

        <div className="mt-8">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            onClick={handleSubmit}
          >
            {Object.keys(errors).length > 0
              ? "Please fix errors"
              : "Create Course"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;
