"use strict";

/**
 * `page-populate-middleware` middleware
 */

const populate = {
  contentSections: {
    populate: {
      picture: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      pictureMobile: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      icon: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      video: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      poster: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      signature: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      buttons: {
        populate: true,
      },
      video: {
        populate: {
          video: {
            fields: ["url"],
          },
        },
      },
      RichText: {
        populate: true,
      },
      media: {
        populate: {
          file: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      feature: {
        populate: {
          fields: ["title", "description", "showLink", "newTab", "url", "text"],
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
          MediaHover: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      Client: {
        populate: {
          fields: ["title", "description", "showLink", "newTab", "url", "text"],
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      testimonials: {
        populate: {
          picture: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      service: {
        populate: {
          feature: {
            populate: {
              icon: true,
            },
          },
          picture: true,
        },
      },
      submitButton: {
        populate: true,
      },
      // Platform Data
      Button: {
        populate: {
          icon: true,
        },
      },
      Heading: true,
      PlatformList: {
        fields: ["title"],
        populate: {
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      // Platform End Data
      // Company Section
      Company: {
        populate: {
          media: {
            fields: ["url", "alternativeText", "caption", "width", "height"],
          },
        },
      },
      Bullets: true,
      // End Company Section
      // About us Section
      aboutUs: {
        populate: {
          video: {
            fields: ["title", "video", "description"],
          },
        },
      },
      // End About us Section
      // Partners Section
      partners: {
        fields: ["title", "description"],
        populate: {
          FeaturedImage: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
        },
      },
      // End Partners Section
      // Contact
      ContactDetails: {
        fields: ["title", "description"],
        populate: {
          media: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      // End Contact
      // Logistics and Products
      logistics: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
          product_collections: {
            populate: {
              media: {
                populate: {
                  file: {
                    fields: ["url", "alternativeText", "width", "height"],
                  },
                },
              },
            },
          },
        },
      },
      // Retail and Products
      retail: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
          product_collections: {
            populate: {
              media: {
                populate: {
                  file: {
                    fields: ["url", "alternativeText", "width", "height"],
                  },
                },
              },
            },
          },
        },
      },
      // Marketing and Products
      marketing: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
          product_collections: {
            populate: {
              media: {
                populate: {
                  file: {
                    fields: ["url", "alternativeText", "width", "height"],
                  },
                },
              },
            },
          },
        },
      },

      product_collections: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
        },
      },
      Features: {
        populate: {
          feature: true,
        },
      },
      TechTabs: {
        populate: {
          feature: {
            populate: {
              media: {
                populate: {
                  file: {
                    fields: ["url", "alternativeText", "width", "height"],
                  },
                },
              },
            },
          },
        },
      },
      facts: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
        },
      },
      clients: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
        },
      },
      industries: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
        },
      },
      // Multiple Banner image component
      Slides: {
        populate: {
          files: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      // FAQ
      FaqOption: true,
      // Packages
      PackageOption: {
        populate: {
          PackageRow: true,
          Button: true,
        },
      },
      FeaturedProducts: {
        populate: {
          ProductItem: {
            populate: {
              media: {
                populate: {
                  file: {
                    fields: ["url", "alternativeText", "width", "height"],
                  },
                },
              },
            },
          },
        },
      },
      ProductItem: {
        populate: {
          media: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
        },
      },
      BrandsCategory: {
        populate: {
          Brand: {
            populate: {
              media: {
                populate: {
                  file: {
                    fields: ["url", "alternativeText", "width", "height"],
                  },
                },
              },
              locations: {
                populate: true,
              },
            },
          },
        },
      },
      ReelItem: {
        populate: {
          desktopMedia: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
          mobileMedia: {
            populate: {
              file: {
                fields: ["url", "alternativeText", "width", "height"],
              },
            },
          },
          Button: true,
        },
      },
      logo: {
        populate: {
          file: {
            fields: ["url", "alternativeText", "width", "height"],
          },
        },
      },
      Tabs: {
        populate: true,
      },
    },
  },

  articles: {
    populate: {
      cover: {
        fields: ["url", "alternativeText", "caption", "width", "height"],
      },
      category: {
        fields: ["name", "slug"],
      },
      blocks: true,
    },
  },
  seo: {
    fields: ["metaTitle", "metaDescription"],
    populate: { shareImage: true },
  },
};

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    ctx.query = {
      populate,
      filters: { slug: ctx.query.filters.slug },
      locale: ctx.query.locale,
    };

    // console.log("page-populate-middleware.js: ctx.query = ", ctx.query);

    await next();
  };
};
