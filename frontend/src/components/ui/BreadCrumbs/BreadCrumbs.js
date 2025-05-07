"use client";
import React from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";

const BreadCrumbs = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  const listClasses = "uppercase text-blue-500";
  const activeClasses = "uppercase text-white pointer-events-none";
  const separator = "text-blue-500 font-bold";
  return (
    <div className="z-30 relative mb-2">
      <ul className="flex items-center space-x-3">
        <li className="uppercase text-blue-500">
          <Link href={"/"}>Home</Link>
        </li>
        {pathNames.length > 0 && <li className={separator}>{">"}</li>}
        {pathNames.map((link, index) => {
          let href = `/${pathNames.slice(0, index + 1).join("/")}`;
          let itemClasses =
            paths === href ? `${listClasses} ${activeClasses}` : listClasses;
          return (
            <React.Fragment key={index}>
              <li className="last:truncate">
                <Link href={href} className={itemClasses}>
                  {link}
                </Link>
              </li>
              {pathNames.length !== index + 1 && (
                <li className={separator}>{">"}</li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default BreadCrumbs;
