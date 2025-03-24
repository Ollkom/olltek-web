// http://localhost:3000/api/revalidate?path=/&secret=cacheRevalidateTest

import { revalidatePath, revalidateTag } from "next/cache";

// TODO: Below commented get request needs to be removed once I have solution for getting dynamic page url

export async function POST(req) {
  try {
    const body = await req.json();
    const { model, entry } = body;
    const { slug } = entry || {};

    // Validate secret token
    const secret = req.nextUrl.searchParams.get("secret");
    if (secret !== process.env.MY_SECRET_TOKEN) {
      console.log("Invalid Token");
      return new Response(
        JSON.stringify({
          revalidated: false,
          message: "Invalid Token",
        }),
        { status: 401 }
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
      case "article":
        pathToRevalidate = "article";
        break;
      case "brand":
        pathToRevalidate = "brand";
        break;
      case "category":
        pathToRevalidate = "category";
        break;
      case "store":
        pathToRevalidate = "store";
        break;
      case "solution":
        pathToRevalidate = "solution";
        break;
      case "industry":
        pathToRevalidate = "industry";
        break;
      case "location":
        pathToRevalidate = "location";
        break;
      case "navigation":
        pathToRevalidate = "navigation";
        break;
      case "partner":
        pathToRevalidate = "partner";
        break;
      default:
        return new Response(
          JSON.stringify({ revalidated: false, message: "Unknown model type" }),
          { status: 400 }
        );
    }

    // Perform revalidation
    if (model !== "page") {
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
  } catch (error) {
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