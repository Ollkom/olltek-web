"use client";
import cx from "classnames";
import Image from "next/image";
import { useState } from "react";

import { getStrapiURL } from "@/utils/api-helpers";
import {
  Typography,
  Input,
  ErrorMessage,
  TextArea,
  SnackBar,
  Button,
  MotionContainer,
} from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { validation } from "@/utils/form-validations";
import { SectionHeader } from "@/components/common";

const formFields = {
  firstName: "",
  lastName: "-",
  phoneNumber: "",
  email: "",
  organization: "-",
  message: "",
};

export default function InternalContact({ data, department }) {
  const { title, description, picture } = data;
  const [formValues, setFormValues] = useState(formFields);
  const [formerror, setFormerror] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const handleValidation = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormerror((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const sumbitForm = async () => {
    const res = await fetch(getStrapiURL() + "/api/contact-form-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        data: {
          FirstName: formValues?.firstName,
          LastName: formValues?.lastName,
          PhoneNumber: formValues?.phoneNumber,
          Email: formValues?.email,
          Department: department,
          Organization: formValues?.organization,
          Message: formValues?.message,
        },
      }),
    });

    setSnackbar({
      open: true,
      type: "success",
      message: "Enquiry successfully submitted!",
    });

    if (!res.ok) {
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to submit, please try again",
      });
      return;
    }
    // Send email after form submission
    else {
      try {
        const res = await fetch("/api/send/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            FirstName: formValues?.firstName,
            LastName: formValues?.lastName,
            PhoneNumber: formValues?.phoneNumber,
            Email: formValues?.email,
            Department: department,
            Organization: formValues?.organization,
            Message: formValues?.message,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validation(formValues);
    if (Object.keys(errors).length === 0) {
      sumbitForm();
      setFormValues(formFields);
    } else {
      setFormerror(errors);
      setSnackbar({
        open: true,
        type: "error",
        message: "Failed to submit the form, please check the form fields",
      });
    }
  };

  return (
    <>
      <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
      <MotionContainer className="py-12 md:py-14 text-white relative">
        {picture?.data?.attributes?.url && (
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <Image
              src={getStrapiMedia(picture.data.attributes.url)}
              alt="Background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-[#273665]/90"></div>
          </div>
        )}
        <div className="container-custom px-5 md:px-0 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col gap-4 max-w-3xl mx-auto text-center pb-4 md:pb-8 2xl:pb-12">
            {title && (
              <h2 className="text-white font-medium text-2xl md:text-3xl">
                {title}
              </h2>
            )}
            {description && <p className="text-white font-normal text-sm md:text-lg">{description}</p>}
          </div>
          {/* Form */}
          <div className="md:max-w-4xl mx-auto mt-5 bg-white p-8 rounded-md">
            <div className="flex flex-col">
              <form onSubmit={handleSubmit}>
                <div className="md:flex md:space-x-3">
                  <div className="w-full mb-6">
                    <Input
                      type="text"
                      value={formValues?.firstName}
                      placeholder="Enter your name"
                      name="firstName"
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.firstName} />
                  </div>
                </div>
                <div className="md:flex md:space-x-3">
                  <div className="w-full md:w-1/2 mb-6">
                    <Input
                      type="text"
                      placeholder="Enter your Official Email ID"
                      name="email"
                      value={formValues?.email}
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.email} />
                  </div>
                  <div className="w-full md:w-1/2 mb-6">
                    <Input
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      value={formValues?.phoneNumber}
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.phoneNumber} />
                  </div>
                </div>
                <div className="flex mb-6">
                  <div className="w-full">
                    <TextArea
                      name="message"
                      rows={4}
                      cols={40}
                      placeholder="Let us know how we can help you"
                      value={formValues?.message}
                      onChange={handleValidation}
                    />
                    <ErrorMessage message={formerror?.message} />
                  </div>
                </div>
                <div className="text-left">
                  <Button type="submit" variant="primary">
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MotionContainer>
    </>
  );
}
