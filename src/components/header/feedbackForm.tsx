"use client";

import {
  Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader,
  Textarea
} from "@nextui-org/react";
import { FeedbackForm, feedbackFrom } from "../../types/feedback";
import { useState } from "react";
import toast from "react-hot-toast";

export function FeedbackFormButton() {
  const [isOpen, setIsOpen] = useState(false);

  const [description, setDescription] = useState("");

  function onSubmit(values: FeedbackForm) {
    const res = feedbackFrom.safeParse(values);

    if (!res.success) {
      toast.error(res.error.message);
      return;
    }

    (async () => {
      fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(values),
      });
    })();
    toast.success("Thanks for your feedback!");
    setIsOpen(false);
  }

  return <>
    <Button
      variant="flat"
      onClick={() => setIsOpen(!isOpen)}
    >
      Feedback
    </Button>
    <Modal
      isOpen={isOpen}
      onOpenChange={(newOpen) => {
        setIsOpen(newOpen);
        if (!newOpen) {
          setDescription("");
        }
      }}
    >
      <ModalContent>
        <ModalHeader>
        Feedback
        </ModalHeader>
        <ModalBody>
          <Textarea
            label="Description"
            value={description}
            onValueChange={setDescription}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => setIsOpen(false)}>
            Close
          </Button>
          <Button
            onClick={() => onSubmit({
              feedback: description,
            })}
          >
            Submit Feedback
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>;
}
