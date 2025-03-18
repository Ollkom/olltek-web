"use client";
import Image from "next/image";
import Link from "next/link";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { Typography } from "@/components/ui";
import { IconBulletList } from "@/assets/images";

export default function BlockRendererClient({ content }) {
  if (!content) return null;
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => (
          <Typography variant="paragraph">
            <p className="pb-3">{children}</p>
          </Typography>
        ),
        heading: ({ children, level }) => {
          switch (level) {
            case 1:
              return (
                <Typography variant="heading1">
                  <h1>{children}</h1>
                </Typography>
              );
            case 2:
              return (
                <Typography variant="heading2" className="mb-3">
                  {children}
                </Typography>
              );
            case 3:
              return (
                <Typography variant="heading3">
                  <h3 className="pb-3">{children}</h3>
                </Typography>
              );
            case 6:
              return <Typography variant="gradient">{children}</Typography>;
            default:
              return <Typography variant="h1">{children}</Typography>;
          }
        },
        image: ({ image }) => {
          return (
            <Image
              src={image.url}
              width={image.width}
              height={image.height}
              alt={image.alternativeText || ""}
              className="mx-auto"
            />
          );
        },
        link: ({ children, url }) => (
          <Link
            href={url}
            className="text-blue-500 hover:text-blue-400 hover:underline"
          >
            {children}
          </Link>
        ),
        list: ({ children, format }) => {
          if (format === "unordered") {
            return (
              <ul className="list-disc pl-5 [&>li::marker]:text-lightGrayText">
                {children.map((element, index) => (
                  <li key={index} className="pb-3">
                    <Typography variant="paragraph">{element?.props?.content?.children[0]?.text}</Typography>
                  </li>
                ))}
              </ul>
            );
          } else if (format === "ordered") {
            return <ol className="list-decimal list-inside">{children}</ol>;
          }
        },
      }}
    />
  );
}
