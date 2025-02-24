// http://localhost:3000/api/revalidate?path=/&secret=cacheRevalidateTest

import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(req) {
  try {
    // Parsing JSON body
    const { model, entry } = await req.json();
    const { slug } = entry || {};
    const secret = req.nextUrl.searchParams.get("secret");

    if (secret !== process.env.MY_SECRET_TOKEN) {
      console.log("Invalid Token");
      return new Response(
        JSON.stringify({
          revalidated: false,
          message: "Invalid Token",
        })
      );
    }

    let pathToRevalidate = "";

    switch (model) {
      case "page":
        pathToRevalidate = slug === "home" ? "/" : `/${slug}`;
        break;
      case "global":
        pathToRevalidate = "global";
        break;
      case "main-menu":
        pathToRevalidate = "menu";
        break;
      default:
        return new Response(
          JSON.stringify({ revalidated: false, message: "Unknown model type" }),
          { status: 400 }
        );
    }
    // Perform revalidation
    if (pathToRevalidate === "global" || pathToRevalidate === "menu") {
      revalidateTag(pathToRevalidate);
      console.log(`Revalidated tag: ${pathToRevalidate}`);
    } else {
      revalidatePath(pathToRevalidate);
      console.log(`Revalidated path: ${pathToRevalidate}`);
    }
    return new Response(
      JSON.stringify({ revalidated: true, path: pathToRevalidate }),
      { status: 200 }
    );
  } catch {
    console.error("Error in revalidation:", error);
    return new Response(
      JSON.stringify({
        revalidated: false,
        message: "Revalidation failed",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
