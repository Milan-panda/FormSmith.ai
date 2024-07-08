"use client";

import { DeleteIcon, EditIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FieldEdit = ({ defaultValue, onUpdate }: any) => {
  const [label, setLabel] = useState<string>(defaultValue.fieldLabel);
  const [placeholder, setPlaceholder] = useState<string>(
    defaultValue.placeholder
  );

  return (
    <div className="flex gap-2 ">
      <Popover>
        <PopoverTrigger>
          <EditIcon className="h-4 w-4 text-gray-500" />
        </PopoverTrigger>
        <PopoverContent className="space-y-2">
          <h2>Edit Fields</h2>
          <div>
            <Label className="text-xs">Label Name</Label>
            <Input
              type="text"
              defaultValue={defaultValue.fieldLabel}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div>
            <Label className="text-xs">Placeholder</Label>
            <Input
              type="text"
              defaultValue={defaultValue.placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <Button
            size="sm"
            onClick={() =>
              onUpdate({
                label: label,
                placeholder: placeholder,
              })
            }
          >
            Update
          </Button>
        </PopoverContent>
      </Popover>

      <TrashIcon className="h-4 w-4 text-red-500" />
    </div>
  );
};

export default FieldEdit;
