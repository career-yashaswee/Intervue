import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateCourseLayout } from "@/helpers/pathwayAPI";
import { extractCourseId } from "@/helpers/api";

function EditBasicCourseInfo({ course }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const courseId = extractCourseId(window.location.href);

  useEffect(() => {
    setName(course?.skillName || "");
    setDescription(course?.description || "");
  }, [course]);

  const onUpdateHandler = async () => {
    const updatedCourse = {
      ...course,
      skillName: name,
      description: description,
    };
    console.log(updatedCourse);
    try {
      const result = await updateCourseLayout(courseId, updatedCourse);
      console.log(result);
    } catch (error) {
      console.error("Error updating course layout:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center">
          <Button variant="outline" className="flex items-center gap-2">
            <Pencil className="w-4 h-4 text-primary" />
            Edit
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title and Description</DialogTitle>
          <DialogDescription>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Title
                </label>
                <Input
                  placeholder="Enter course title"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Course Description
                </label>
                <Textarea
                  placeholder="Enter course description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex justify-end space-x-2">
            <DialogClose>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={onUpdateHandler}
              className="bg-primary text-white hover:bg-primary-dark"
            >
              Update
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditBasicCourseInfo;
