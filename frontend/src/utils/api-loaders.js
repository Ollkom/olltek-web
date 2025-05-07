"use server";
import { fetchAPI } from "@/utils/fetch-api";
import { DEFAULT_COLLECTION_LIMIT } from "@/utils/constants";
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
      "contactBackground"
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
        populate: true,
      },
      category: true,
      cover: true,
      description: true,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const response = await fetchAPI(path, urlParamsObject, options);
  return response;
}

export async function getPageArticles(
  path,
  category = null,
  start = 0,
  limit = DEFAULT_COLLECTION_LIMIT,
  filterType = "latest",
  postId = null
) {

  const urlParamsObject = {
    sort: { createdAt: "desc" },
    populate: {
      cover: { fields: ["url", "alternativeText", "width", "height"] },
      category: { populate: "*" },
      authorsBio: { populate: "*" },
      blocks: {
        populate: "*"
      },
      seo: { populate: "*" }
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  if (filterType === "featured") {
    urlParamsObject.filters = {
      featured: {
        $eq: true,
      },
    };
  }
  if (category) {
    urlParamsObject.filters = {
      category: {
        slug: {
          $eq: category,
        },
      },
      ...(postId && {
        id: {
          $notIn: postId,
        },
      }),
    };
  }

  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "article";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}

export async function getCategories(path, start = 0, limit = 100) {
  const urlParamsObject = {
    populate: {
      name: true,
      slug: true,
      description: true,
    },
    filters: {
      articles: {
        id: {
          $notNull: true,
        },
      },
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "category";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}

export async function getLocations(path, start = 0, limit = 100) {
  const urlParamsObject = {
    populate: {
      name: true,
      description: true,
      icon: true,
      image: true,
      geolocation: true,
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "location";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}

export async function getBrands(path, start = 0, limit = 100) {
  const urlParamsObject = {
    populate: {
      title: true,
      description: true,
      media: true,
      locations: true,
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "brand";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}

export async function getIndustries(path, start = 0, limit = 100) {
  const urlParamsObject = {
    populate: {
      title: true,
      slug: true,
      description: true,
      media: true,
      brands: {
        populate: {
          title: true,
          slug: true,
          description: true,
          media: true,
          locations: true,
        }
      },
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "industry";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}

export async function getSolutions(path, start = 0, limit = 100) {
  const urlParamsObject = {
    populate: {
      title: true,
      slug: true,
      description: true,
      media: true,
      partners: {
        populate: {
          title: true,
          slug: true,
          description: true,
          media: true,
          locations: true,
        }
      },
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "solution";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}

export async function getCareers(path, role, location, team, start = 0, limit = 10) {
  const urlParamsObject = {
    populate: {
      role: true,
      type: true,
      location: true,
      team: true,
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };

  // Add filters if provided
  if (role || location || team) {
    urlParamsObject.filters = {};

    if (role) {
      urlParamsObject.filters.role = {
        title: {
          $eq: role,
        },
      };
    }

    if (location) {
      urlParamsObject.filters.location = {
        title: {
          $eq: location,
        },
      };
    }

    if (team) {
      urlParamsObject.filters.team = {
        title: {
          $eq: team,
        },
      };
    }
  }

  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "career";
  const response = await fetchAPI(path, urlParamsObject, options, tag);

  return response;
}

export async function getCareerFields(path, start = 0, limit = 100) {
  const urlParamsObject = {
    populate: {
      title: true,
    },
    pagination: {
      start: start,
      limit: limit,
    },
  };
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const tag = "career-field";
  const response = await fetchAPI(path, urlParamsObject, options, tag);
  return response;
}