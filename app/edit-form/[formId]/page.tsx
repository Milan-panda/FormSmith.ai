"use client";

import { db } from "@/configs";
import { JsonForms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditForm = ({ params }: { params: any }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState<any>([]);
  const router = useRouter()

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
    setJsonForm(JSON.parse(result[0].jsonForm));
    console.log(JSON.parse(result[0].jsonForm));
  };
  return (
    <div className="p-10">
      <div className="my-5">
        <h2 className="flex gap-2 items-center max-w-fit cursor-pointer hover:scale-105 transition-all" onClick={()=>router.back()}>
          <ArrowLeft className="" /> Back
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>Controller</div>
        <div className="md:col-span-2">Form</div>
      </div>
    </div>
  );
};

export default EditForm;
