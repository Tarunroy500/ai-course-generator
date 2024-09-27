"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
function AddNewCourse() {
    const [openDialog, setOpenDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSubmit = async (e) => {
        e.preventDefault();
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
      
    </div>
  )
}

export default AddNewCourse