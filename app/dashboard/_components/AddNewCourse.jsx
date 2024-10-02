"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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
  const [Details, setDetails] = useState({
    'title': '',
    'description': '',
    'difficulty': '',
    'duration': '',
    'identifier': '',
  });


  const handleDetailsChange = (key, value) => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(Details);

    try {
      const response = await axios.post("/api/details", {
        details: Details
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 120000, // Set a timeout of 10 seconds (10000 milliseconds) or adjust as needed
        withCredentials: true,
      });


      if(response.status === 200 || response.status === 201) {
        toast.success('Course created successfully!');
        setLoading(false);
        console.log(response.data);
        // Redirect to course page or perform other actions as needed
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  return (
    <div>
      <div className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all">
        <h2
          className="font-bold text-lg text-center"
          onClick={() => {
            setOpenDialog(true)
          }}
        >
          + Create AI Course
        </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader >
            <DialogTitle className="text-2xl">Create Course</DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <div className="mt-7 my-3">
                    <label htmlFor="">
                      Enter the topic for your course (e.g., Web Development,
                      Yoga, Python, etc.)
                    </label>
                    <Input onChange={(e) => handleDetailsChange("title", e.target.value)} value={Details.title} required placeholder="Topic" />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">
                      Tell us about your course: What topics do you want to
                      include? (optional)
                    </label>
                    <Textarea onChange={(e) => handleDetailsChange("description", e.target.value)} value={Details.description} className="h-20" placeholder="About Your course" />
                  </div>
                  <div className="my-3">
                    <label htmlFor="">Difficulty Level</label>
                    <Select value={Details.difficulty} onValueChange={(value) => handleDetailsChange("difficulty", value)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="my-3 flex items-center gap-5">
                    <div>
                      <label htmlFor="">
                        Course Duration
                      </label>
                      <Input onChange={(e) => handleDetailsChange("duration", e.target.value)} value={Details.duration} placeholder="a Number (e.g. 1, 4, 9)" />
                    </div>
                    <div className="pt-5">
                      <Select value={Details.identifier} onValueChange={(value) => handleDetailsChange("identifier", value)}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weeks">Weeks</SelectItem>
                          <SelectItem value="Days">Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setOpenDialog(false);
                      setLoading(false);
                    }}
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
      <ToastContainer />
    </div>
  );
}

export default AddNewCourse;
