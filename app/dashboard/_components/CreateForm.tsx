"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { AIChatSession } from "@/configs/AIModel";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";
import moment from "moment/moment"
import {db} from "@/configs";
import { useRouter } from "next/navigation";

const PROMPT =
  ", On the basis of the description please give form in json format with form title, form subheading with form having Form field, form name, placeholder name, and form label, fieldType, field required in JSON format";

const CreateForm = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const {user} = useUser();

  const route = useRouter()

  const onCreateForm = async () => {
    console.log(userInput);
    setIsLoading(true);
    try {
      const result = await AIChatSession.sendMessage(
        "Description: " + userInput + PROMPT
      );
      if(result.response.text()){
        const resp = await db.insert(JsonForms).values({
          jsonForm: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('DD/MM/yyyy')
        }).returning({id: JsonForms.id});
        console.log("New Form Id: ", resp[0].id);
        if(resp[0].id){
          route.push(`/edit-form/${resp[0].id}`)
        }
      }
    } catch (error) {
      window.alert("Error in creating form");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>Create Form</Button>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Write description of your form"
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  variant="destructive"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button disabled={isLoading} onClick={() => onCreateForm()}>{isLoading ? <Loader2Icon className="animate-spin" /> : "Create"}</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
