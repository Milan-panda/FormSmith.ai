import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import FieldEdit from "./FieldEdit";

const FormUI = ({ jsonForm, onFieldUpdate }: any) => {
  return (
    <div className="border p-5 md:w-[600px] rounded-md">
      <h2 className="fon-bold text-center text-2xl">{jsonForm.formTitle}</h2>
      <h2 className="text-sm text-gray-400 text-center">
        {jsonForm.formSubheading}
      </h2>

      {jsonForm.formFields &&
        jsonForm.formFields.map((field: any, index: number) => (
          <div key={index} className="my-5 flex items-center gap-2">
            {field.fieldType === "select" ? (
              <div className="my-3 w-full">
                <Label className="text-sm">{field.fieldLabel}</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={field.placeholder}></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {field.options.map((item: any, index: number) => (
                      <SelectItem key={index} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : field.fieldType === "radio" ? (
              <div className="my-3 w-full">
                <Label className="text-sm">{field.fieldLabel}</Label>
                <RadioGroup>
                  {field.options.map((item: any, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={item.value} id={item.value} />
                      <Label htmlFor={item.value}>{item.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ) : field.fieldType === "checkbox" ? (
              <div className="gap-2 flex items-center w-full">
                <Checkbox id={field.fieldName} />
                <Label htmlFor={field.fieldName}>{field.label}</Label>
              </div>
            ) : (
              <div className="my-3 w-full">
                <Label className="text-sm">{field.fieldLabel}</Label>
                <Input
                  name={field.fieldName}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="border p-2 w-full rounded-lg"
                />
              </div>
            )}
            <div>
              <FieldEdit
                defaultValue={field}
                onUpdate={(value: any) => onFieldUpdate(value, index)}
              />
            </div>
          </div>
        ))}
    </div>
  );
};

export default FormUI;
