"use client";
import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FormUI from "../_components/FormUI";

const EditForm = ({ params }: { params: any }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<any>([]);
  const router = useRouter();
  const [updateTrigger, setUpdateTrigger] = useState<any>();
  const [record, setRecord] = useState<any>([]);

  useEffect(() => {
    user && getformData();
  }, [user]);

  const getformData = async () => {
    const result = await db
      .select()
      .from(JsonForms)
      .where(
        and(
          eq(JsonForms.id, params.formId),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        )
      );
    console.log(result[0]);
    setRecord(result[0]);
    setJsonForm(JSON.parse(result[0].jsonForm));
    console.log(JSON.parse(result[0].jsonForm));
  };

  useEffect(() => {
    if (updateTrigger) {
      setJsonForm(jsonForm);
      updateJsonFormInDB();
    }
  }, [updateTrigger]);

  const onFieldUpdate = (value: any, index: any) => {
    jsonForm.formFields[index].fieldLabel = value.label;
    jsonForm.formFields[index].placeholder = value.placeholder;

    setUpdateTrigger(Date.now());
  };

  const updateJsonFormInDB = async () => {
    const result = await db
      .update(JsonForms)
      .set({
        jsonForm: jsonForm,
      })
      .where(
        and(
          eq(JsonForms.id, record.id),
          eq(JsonForms.createdBy, user?.primaryEmailAddress?.emailAddress || "")
        )
      );

      console.log(result);
  };

  return (
    <div className="p-10">
      <div className="my-5">
        <h2
          className="flex gap-2 items-center max-w-fit cursor-pointer hover:scale-105 transition-all"
          onClick={() => router.back()}
        >
          <ArrowLeft className="" /> Back
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 border rounded-lg shadow-md">Controller</div>
        <div className="md:col-span-2 border rounded-lg p-5 flex items-center justify-center">
          <FormUI jsonForm={jsonForm} onFieldUpdate={onFieldUpdate} />
        </div>
      </div>
    </div>
  );
};

export default EditForm;
