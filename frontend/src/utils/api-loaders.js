import { fetchAPI } from "@/utils/fetch-api";

const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

export async function getGlobal() {
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/global`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "global";

  const urlParamsObject = {
    populate: [
      "metadata.shareImage",
      "favicon",
      "navbar.links",
      "navbar.button",
      "navbar.navbarLogo.logoImg",
      "navbar.navbarLogoMobile.logoImg",
      "footer.socialLinks",
      "footer.socialLinks.icon",
      "footer.footerLogo.logoImg",
      "footer.button",
      "footer.menuLinks",
      "leadForm",
      "leadForm.submitButton",
      "footer.FooterMenu.FooterLinks",
      "testimonials",
      "testimonials.Testimonial",
      "testimonials.Testimonial.picture",
      "countries",
      "countries.country.media.file",
      "Advertisements.Advert.media",
      "Advertisements.Advert.MediaHover",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options, tag);
}

export async function getMainMenu() {
  if (!token)
    throw new Error("The Strapi API Token environment variable is not set.");

  const path = `/main-menu`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "menu";

  const urlParamsObject = {
    populate: [
      "MainMenuItems",
      "MainMenuItems.Button",
      "MainMenuItems.media.file",
      "MainMenuItems.navigations",
      "MainMenuItems.navigations.links",
      "MainMenuItems.navigations.Button",
      "MainMenuItems.navigations.media.file",
    ],
  };
  return await fetchAPI(path, urlParamsObject, options, tag);
}

export async function getPageBySlug(slug) {
  const path = `/pages`;
  const urlParamsObject = { filters: { slug } };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  return await fetchAPI(path, urlParamsObject, options);
}

export async function getPostBySlug(slug, collections) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/${collections}`;
  const urlParamsObject = {
    filters: { slug },
    populate: {
      blocks: {
        populate: {
          __component: "*",
          feature: {
            populate: {
              media: {
                fields: [
                  "url",
                  "alternativeText",
                  "caption",
                  "width",
                  "height",
                ],
              },
            },
          },
          Bullets: "*",
          buttons: "*",
          media: {
            populate: {
              file: "*",
            },
          },
        },
      },
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}
