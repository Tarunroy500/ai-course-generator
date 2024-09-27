"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AddNewCourse() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Call the AI API
    // setLoading(false);
    // setOpenDialog(false);
  };
  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h2
          className="font-bold text-lg text-center"
          onClick={() => setOpenDialog(true)}
        >
          + Create AI Course
        </h2>
      </div>
      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">Create Course</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="mt-7 my-3">
                    <label htmlFor="">
                      Enter the topic for your course (e.g., Web Development,
                      Yoga, Python, etc.)
                    </label>
                    <Input required placeholder="Topic" />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">
                      Tell us about your course: What topics do you want to
                      include? (optional)
                    </label>
                    <Textarea required placeholder="About Your course" />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Difficulty Level</label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Beginner</SelectItem>
                        <SelectItem value="dark">Intermediate</SelectItem>
                        <SelectItem value="system">Advance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Course Duration</label>
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">1 Hours</SelectItem>
                        <SelectItem value="dark">2 Hour</SelectItem>
                        <SelectItem value="system">More than 3 Hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating From AI
                      </>
                    ) : (
                      "Generate the Course"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewCourse;
