"use client";
import { track } from "@vercel/analytics";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { getStrapiURL } from "@/utils/api-helpers";
import {
  Input,
  TextArea,
  Select,
  SnackBar,
  ErrorMessage,
} from "@/components/ui";
import { Typography } from "@/components/ui";
import { getStrapiMedia } from "@/utils/api-helpers";
import { validation } from "@/utils/form-validations";

const options = [
  { label: "Select Department", value: "" },
  { label: "Ollkom", value: "ollkom" },
  { label: "Marketing", value: "marketing" },
  { label: "Logistics", value: "logistics" },
  { label: "Retail", value: "retail" },
  { label: "Technology", value: "technology" },
  { label: "E-commerce Solutions", value: "ecommerce" },
  { label: "Media & Press", value: "media" },
  { label: "Help & Support", value: "support" },
  { label: "Others", value: "others" },
];

export default function Contact({ data }) {
  const searchParams = useSearchParams();
  const department = searchParams.get("department") ?? "";
  const formFields = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    organization: "",
    department: department,
    message: "",
  };

  const {
    heading,
    title,
    description,
    ContactDetails,
    Button: btnSubmit,
    media,
    marketingEmail,
    logisticsEmail,
    retailEmail,
    enable,
  } = data;

  if (enable === false) return;

  const [formValues, setFormValues] = useState(formFields);
  const [errorMessage, setErrorMessage] = useState("");
  const [formerror, setFormerror] = useState({});
  const token = process.env.NEXT_PUBLIC_STRAPI_FORM_SUBMISSION_TOKEN;

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success",
  });

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
          Department: formValues?.department,
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

    track("contact form successful");

    if (!res.ok) {
      track("contact form failed");
      setErrorMessage("Failed to submit, please try again");
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
            Department: formValues?.department,
            Organization: formValues?.organization,
            Message: formValues?.message,
            marketingEmail: marketingEmail,
            logisticsEmail: logisticsEmail,
            retailEmail: retailEmail,
          }),
        });
      } catch (error) {
        console.log(error);
      }
    }
    setErrorMessage("");
  };

  const handleSubmit = (e) => {
    track("contact button clicked");
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
      <div className="bg-[#F2F4F8]">
        <div className="max-w-[1271px] mx-auto py-20 px-6 md:px-0">
          <div className="md:w-3/4 mx-auto">
            <SnackBar snackbar={snackbar} setSnackbar={setSnackbar} />
            <div className="text-center">
              <Typography variant="gradient">{heading}</Typography>
            </div>
            {title && (
              <Typography variant="heading1" className="py-4 text-center">
                {title}
              </Typography>
            )}
            {description && (
              <Typography
                variant="body"
                className="text-gray-600 text-center md:max-w-2xl md:block mx-auto"
              >
                <p>{description}</p>
              </Typography>
            )}

            {errorMessage && (
              <p className="text-red-500 bg-red-200 px-4 py-2 rounded-lg my-2">
                {errorMessage}
              </p>
            )}
            <div className="flex flex-row items-center self-center flex-shrink-0 mt-6 justify-center">
              <div className="flex flex-col">
                <div className="flex flex-row">
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="flex flex-wrap -mx-3 mb-10">
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            value={formValues?.firstName}
                            placeholder="Enter your first name"
                            name="firstName"
                            label="First Name *"
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.firstName} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            value={formValues?.lastName}
                            placeholder="Enter your last name"
                            name="lastName"
                            label="Last Name *"
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.lastName} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            placeholder="Enter your Official Email ID"
                            name="email"
                            value={formValues?.email}
                            label="Email Address *"
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.email} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            placeholder="Enter your Phone Number"
                            name="phoneNumber"
                            value={formValues?.phoneNumber}
                            label="Phone Number *"
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.phoneNumber} />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6">
                          <Input
                            type="text"
                            value={formValues?.organization}
                            placeholder="Enter your name of the organization"
                            name="organization"
                            label="Organization"
                            onChange={handleValidation}
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <Select
                            label="Whom would you like to connect with? *"
                            options={options}
                            name="department"
                            value={formValues?.department}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.department} />
                        </div>
                        <div className="w-full px-3">
                          <TextArea
                            name="message"
                            rows={4}
                            cols={40}
                            label="How Can We Help You? *"
                            placeholder="Let us know how we can help you in 500 words max."
                            value={formValues?.message}
                            onChange={handleValidation}
                          />
                          <ErrorMessage message={formerror?.message} />
                        </div>
                      </div>
                      <div className="text-center">
                        <button
                          className="rounded-full text-white border-[#74CEF2] border-2 bg-gradient-to-r from-[#08B1F6] to-[#2F4BDF] mx-auto px-20 py-2 hover:to-white hover:from-white hover:text-[#2F4BDF] transition-colors duration-300 ease-in-out"
                          type="submit"
                        >
                          {btnSubmit?.text}
                        </button>
                      </div>
                    </form>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white">
        <div className="max-w-[1271px] mx-auto py-10 md:py-20 px-6 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:w-3/4 mx-auto">
            <div>
              {media?.file?.data && (
                <Image
                  src={getStrapiMedia(media?.file?.data?.attributes?.url)}
                  alt={media?.file?.data?.attributes?.alternativeText}
                  width={media?.file?.data?.attributes?.width}
                  height={media?.file?.data?.attributes?.height}
                  className="mb-6 max-w-48 md:max-w-80"
                />
              )}

              {ContactDetails?.map((item) => {
                return (
                  <div className="pb-6 rounded-xl" key={item?.id}>
                    <div className="flex space-x-4">
                      {item?.media?.data && (
                        <Image
                          src={getStrapiMedia(
                            item?.media?.data?.attributes?.url
                          )}
                          alt={item?.media?.data?.attributes?.alternativeText}
                          width={item?.media?.data?.attributes?.width}
                          height={item?.media?.data?.attributes?.height}
                        />
                      )}

                      <div>
                        <p>{item?.title}</p>
                        <p className="font-bold">{item?.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.8259013417655!2d46.67145927480811!3d24.801414377967923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03ace8b1b705%3A0xf65649e83d48895f!2sAbi%20Bakr%20As%20Siddiq%20Rd%2C%20Alyasmin%2C%20Riyadh%2013316%2C%20Saudi%20Arabia!5e0!3m2!1sen!2suk!4v1713610385688!5m2!1sen!2suk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
