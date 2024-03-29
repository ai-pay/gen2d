"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { FeedbackForm, feedbackFrom } from "../../types/feedback";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, Dialog, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormField, FormItem, FormLabel, FormControl } from "../ui/form";
import { Input } from "../ui/input";

export function FeedbackFormButton() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackFrom),
    defaultValues: {
      feedback: "",
    },
  });
 
  function onSubmit(values: FeedbackForm) {
    (async () => {
      console.log(values);
      fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(values),
      });
    })();
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">Feedback</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Input placeholder="Description" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Submit Feedback</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
