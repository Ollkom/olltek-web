import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsBrand extends Schema.Component {
  collectionName: 'components_elements_brands';
  info: {
    displayName: 'Brand';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    media: Attribute.Component<'shared.media'>;
    locations: Attribute.Relation<
      'elements.brand',
      'oneToMany',
      'api::location.location'
    >;
  };
}

export interface ElementsBrandsCategory extends Schema.Component {
  collectionName: 'components_elements_brands_categories';
  info: {
    displayName: 'BrandsCategory';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    Brand: Attribute.Component<'elements.brand', true>;
  };
}

export interface ElementsCompanyBullets extends Schema.Component {
  collectionName: 'components_elements_company_bullets';
  info: {
    displayName: 'Bullets';
    description: '';
  };
  attributes: {
    Bullet: Attribute.Text;
  };
}

export interface ElementsFeatureColumn extends Schema.Component {
  collectionName: 'components_slices_feature_columns';
  info: {
    name: 'FeatureColumn';
    displayName: 'Feature column';
    icon: 'align-center';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    icon: Attribute.Media;
  };
}

export interface ElementsFeatureRow extends Schema.Component {
  collectionName: 'components_slices_feature_rows';
  info: {
    name: 'FeatureRow';
    displayName: 'Feature row';
    icon: 'arrows-alt-h';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    media: Attribute.Media & Attribute.Required;
    link: Attribute.Component<'links.link'>;
  };
}

export interface ElementsFeature extends Schema.Component {
  collectionName: 'components_elements_features';
  info: {
    displayName: 'Feature';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Media;
    showLink: Attribute.Boolean & Attribute.DefaultTo<false>;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    url: Attribute.String;
    text: Attribute.String;
    MediaHover: Attribute.Media;
    type: Attribute.Enumeration<['image', 'icon']>;
  };
}

export interface ElementsFooterSection extends Schema.Component {
  collectionName: 'components_links_footer_sections';
  info: {
    name: 'FooterSection';
    displayName: 'Footer section';
    icon: 'chevron-circle-down';
  };
  attributes: {
    title: Attribute.String;
    links: Attribute.Component<'links.link', true>;
  };
}

export interface ElementsLogos extends Schema.Component {
  collectionName: 'components_elements_logos';
  info: {
    name: 'logos';
    displayName: 'Logos';
    icon: 'apple-alt';
  };
  attributes: {
    title: Attribute.String;
    logo: Attribute.Media;
  };
}

export interface ElementsNotificationBanner extends Schema.Component {
  collectionName: 'components_elements_notification_banners';
  info: {
    name: 'NotificationBanner';
    displayName: 'Notification banner';
    icon: 'exclamation';
    description: '';
  };
  attributes: {
    type: Attribute.Enumeration<['alert', 'info', 'warning']> &
      Attribute.Required;
    heading: Attribute.String & Attribute.Required;
    text: Attribute.Text & Attribute.Required;
    show: Attribute.Boolean & Attribute.DefaultTo<false>;
    link: Attribute.Component<'links.link'>;
  };
}

export interface ElementsReelItem extends Schema.Component {
  collectionName: 'components_elements_reel_items';
  info: {
    displayName: 'ReelItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    desktopMedia: Attribute.Component<'shared.media'>;
    mobileMedia: Attribute.Component<'shared.media'>;
    Button: Attribute.Component<'links.button-link'>;
  };
}

export interface ElementsService extends Schema.Component {
  collectionName: 'components_elements_plans';
  info: {
    name: 'service';
    displayName: 'Services plan';
    icon: 'search-dollar';
    description: '';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature-column', true>;
    picture: Attribute.Media;
    type: Attribute.Enumeration<['bullet', 'icon']> &
      Attribute.DefaultTo<'icon'>;
  };
}

export interface ElementsTechTabs extends Schema.Component {
  collectionName: 'components_elements_tech_tabs';
  info: {
    displayName: 'TechTabs';
  };
  attributes: {
    title: Attribute.String;
    feature: Attribute.Component<'elements.feature', true>;
  };
}

export interface ElementsTestimonial extends Schema.Component {
  collectionName: 'components_slices_clients';
  info: {
    name: 'Client';
    displayName: 'Testimonials';
    icon: 'user-check';
    description: '';
  };
  attributes: {
    picture: Attribute.Media & Attribute.Required;
    text: Attribute.Text;
    authorName: Attribute.String;
    authorTitle: Attribute.Text;
  };
}

export interface LayoutFooterMenu extends Schema.Component {
  collectionName: 'components_layout_footer_menus';
  info: {
    displayName: 'FooterMenu';
    description: '';
  };
  attributes: {
    Heading: Attribute.String;
    FooterLinks: Attribute.Component<'links.link', true>;
    slug: Attribute.String;
  };
}

export interface LayoutFooter extends Schema.Component {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'Footer';
    description: '';
  };
  attributes: {
    copyright: Attribute.Text;
    footerLogo: Attribute.Component<'layout.logo'>;
    menuLinks: Attribute.Component<'links.link', true>;
    legalLinks: Attribute.Component<'links.link', true>;
    socialLinks: Attribute.Component<'links.social-link', true>;
    categories: Attribute.Relation<
      'layout.footer',
      'oneToMany',
      'api::category.category'
    >;
    FooterMenu: Attribute.Component<'layout.footer-menu', true>;
    button: Attribute.Component<'links.button-link'>;
  };
}

export interface LayoutLogo extends Schema.Component {
  collectionName: 'components_layout_logos';
  info: {
    displayName: 'Logo';
    description: '';
  };
  attributes: {
    logoImg: Attribute.Media & Attribute.Required;
    logoText: Attribute.Text;
  };
}

export interface LayoutNavbar extends Schema.Component {
  collectionName: 'components_layout_navbars';
  info: {
    name: 'Navbar';
    displayName: 'Navbar';
    icon: 'map-signs';
    description: '';
  };
  attributes: {
    links: Attribute.Component<'links.link', true>;
    button: Attribute.Component<'links.button-link'>;
    navbarLogo: Attribute.Component<'layout.logo'>;
    navbarLogoMobile: Attribute.Component<'layout.logo'>;
  };
}

export interface LayoutPageHeader extends Schema.Component {
  collectionName: 'components_layout_page_headers';
  info: {
    displayName: 'PageHeader';
    icon: 'apps';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.Text;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    logo: Attribute.Component<'shared.media'>;
    FeaturedProducts: Attribute.Component<'sections.featured-products'>;
  };
}

export interface LinksButtonLink extends Schema.Component {
  collectionName: 'components_links_buttons';
  info: {
    name: 'Button-link';
    displayName: 'Button link';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    url: Attribute.String;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String;
    type: Attribute.Enumeration<
      ['primary', 'secondary', 'subsecondary', 'gradient']
    >;
  };
}

export interface LinksButton extends Schema.Component {
  collectionName: 'components_links_simple_buttons';
  info: {
    name: 'Button';
    displayName: 'Button';
    icon: 'fingerprint';
    description: '';
  };
  attributes: {
    text: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    name: 'Link';
    displayName: 'Link';
    icon: 'link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    text: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean;
  };
}

export interface LinksSocialLink extends Schema.Component {
  collectionName: 'components_links_social_links';
  info: {
    displayName: 'Social Link';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
    newTab: Attribute.Boolean & Attribute.DefaultTo<false>;
    text: Attribute.String & Attribute.Required;
    social: Attribute.Enumeration<
      ['YOUTUBE', 'INSTAGRAM', 'FACEBOOK', 'LINKEDIN']
    >;
    icon: Attribute.Media;
  };
}

export interface MenuDropdown extends Schema.Component {
  collectionName: 'components_menu_dropdowns';
  info: {
    displayName: 'dropdown';
    icon: 'arrowDown';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    navigations: Attribute.Relation<
      'menu.dropdown',
      'oneToMany',
      'api::navigation.navigation'
    >;
    description: Attribute.Text;
    Button: Attribute.Component<'links.button-link'>;
    media: Attribute.Component<'shared.media'>;
    subtitle: Attribute.String;
    footNote: Attribute.Text;
  };
}

export interface MenuLink extends Schema.Component {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
    description: Attribute.Text;
    icon: Attribute.Media;
  };
}

export interface MenuMenuButton extends Schema.Component {
  collectionName: 'components_menu_menu_buttons';
  info: {
    displayName: 'MenuButton';
    icon: 'cursor';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
    type: Attribute.Enumeration<['primary', 'secondary']>;
  };
}

export interface MenuMenuLink extends Schema.Component {
  collectionName: 'components_menu_menu_links';
  info: {
    displayName: 'MenuLink';
    icon: 'link';
  };
  attributes: {
    title: Attribute.String;
    url: Attribute.String;
  };
}

export interface MetaMetadata extends Schema.Component {
  collectionName: 'components_meta_metadata';
  info: {
    name: 'Metadata';
    displayName: 'Metadata';
    icon: 'robot';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
  };
}

export interface SectionsAboutUs extends Schema.Component {
  collectionName: 'components_sections_aboutuses';
  info: {
    displayName: 'AboutUs';
    icon: 'chartCircle';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
    video: Attribute.Component<'sections.large-video'>;
  };
}

export interface SectionsAdvertisements extends Schema.Component {
  collectionName: 'components_sections_advertisements';
  info: {
    displayName: 'Advertisements';
    description: '';
  };
  attributes: {
    Advert: Attribute.Component<'elements.feature', true> & Attribute.Required;
  };
}

export interface SectionsBannerSlider extends Schema.Component {
  collectionName: 'components_sections_banner_sliders';
  info: {
    displayName: 'BannerSlider';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Slides: Attribute.Component<'shared.slider'>;
  };
}

export interface SectionsBlogPosts extends Schema.Component {
  collectionName: 'components_sections_blog_posts';
  info: {
    displayName: 'BlogPosts';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    type: Attribute.Enumeration<['latest', 'featured']> &
      Attribute.Required &
      Attribute.DefaultTo<'latest'>;
  };
}

export interface SectionsBottomActions extends Schema.Component {
  collectionName: 'components_slices_bottom_actions';
  info: {
    name: 'BottomActions';
    displayName: 'Bottom actions';
    icon: 'angle-double-right';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    buttons: Attribute.Component<'links.button-link', true>;
    description: Attribute.Text;
  };
}

export interface SectionsCareerForm extends Schema.Component {
  collectionName: 'components_sections_career_forms';
  info: {
    displayName: 'Career Form';
    icon: 'crown';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Button: Attribute.Component<'links.button-link'>;
    CareersEmail: Attribute.String;
  };
}

export interface SectionsCeoMessage extends Schema.Component {
  collectionName: 'components_sections_ceo_messages';
  info: {
    displayName: 'CEO Message';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    paragraph1: Attribute.Text;
    paragraph2: Attribute.Text;
    name: Attribute.String;
    designation: Attribute.String;
    signature: Attribute.Media;
  };
}

export interface SectionsClients extends Schema.Component {
  collectionName: 'components_sections_clients';
  info: {
    displayName: 'Clients';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    Client: Attribute.Component<'elements.feature', true>;
    subtitle: Attribute.String;
    Button: Attribute.Component<'links.button-link'>;
    enable: Attribute.Boolean;
  };
}

export interface SectionsCompany extends Schema.Component {
  collectionName: 'components_sections_companies';
  info: {
    displayName: 'Company';
    icon: 'cube';
    description: '';
  };
  attributes: {
    description: Attribute.Text;
    Bullets: Attribute.Component<'elements.company-bullets', true>;
    title: Attribute.String;
    media: Attribute.Component<'shared.media'>;
    enable: Attribute.Boolean;
  };
}

export interface SectionsContactForm extends Schema.Component {
  collectionName: 'components_sections_contact_forms';
  info: {
    displayName: 'Contact Form';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    title: Attribute.String;
    ContactDetails: Attribute.Component<'elements.feature', true>;
    Button: Attribute.Component<'links.button'>;
    media: Attribute.Component<'shared.media'>;
    marketingEmail: Attribute.String;
    logisticsEmail: Attribute.String;
    retailEmail: Attribute.String;
    enable: Attribute.Boolean;
  };
}

export interface SectionsCountries extends Schema.Component {
  collectionName: 'components_sections_countries';
  info: {
    displayName: 'Countries';
  };
  attributes: {
    country: Attribute.Component<'elements.brand', true>;
  };
}

export interface SectionsFaq extends Schema.Component {
  collectionName: 'components_sections_faqs';
  info: {
    displayName: 'FAQ';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    FaqOption: Attribute.Component<'shared.faq-option', true>;
  };
}

export interface SectionsFeaturedProducts extends Schema.Component {
  collectionName: 'components_sections_featured_products';
  info: {
    displayName: 'Featured Products';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Button: Attribute.Component<'links.social-link'>;
    ProductItem: Attribute.Component<'shared.product-item', true>;
  };
}

export interface SectionsFeatures extends Schema.Component {
  collectionName: 'components_layout_features';
  info: {
    displayName: 'Features';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature', true>;
    title: Attribute.Text;
    variant: Attribute.Enumeration<
      ['primary', 'secondary', 'subSecondary', 'card', 'defaultCard']
    >;
    bgVariant: Attribute.Enumeration<['primary', 'secondary']>;
    columns: Attribute.Enumeration<
      ['threeColumn', 'fourColumn', 'fiveColumn', 'sixColumn']
    >;
    bgColor: Attribute.String;
    Button: Attribute.Component<'links.social-link'>;
    showFilter: Attribute.Boolean & Attribute.DefaultTo<false>;
    enable: Attribute.Boolean;
    ctaTitle: Attribute.Text;
  };
}

export interface SectionsHeading extends Schema.Component {
  collectionName: 'components_sections_headings';
  info: {
    displayName: 'Heading';
  };
  attributes: {
    heading: Attribute.String & Attribute.Required;
    description: Attribute.String;
  };
}

export interface SectionsHero extends Schema.Component {
  collectionName: 'components_slices_heroes';
  info: {
    name: 'Hero';
    displayName: 'Hero';
    icon: 'heading';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    picture: Attribute.Media & Attribute.Required;
    buttons: Attribute.Component<'links.button-link', true>;
    pictureMobile: Attribute.Media;
  };
}

export interface SectionsHomepageStatistics extends Schema.Component {
  collectionName: 'components_sections_homepage_statistics';
  info: {
    displayName: 'HomepageStatistics';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    clients: Attribute.Component<'elements.feature', true>;
    facts: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsIndustries extends Schema.Component {
  collectionName: 'components_sections_industries';
  info: {
    displayName: 'Industries';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    industries: Attribute.Relation<
      'sections.industries',
      'oneToMany',
      'api::industry.industry'
    >;
  };
}

export interface SectionsInnovations extends Schema.Component {
  collectionName: 'components_sections_innovations';
  info: {
    displayName: 'Innovations';
    description: '';
  };
  attributes: {
    feature: Attribute.Component<'elements.feature', true>;
    title: Attribute.String;
    description: Attribute.Text;
    picture: Attribute.Media;
  };
}

export interface SectionsInternalContactForm extends Schema.Component {
  collectionName: 'components_sections_internal_contact_forms';
  info: {
    displayName: 'Internal Contact Form';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    ContactDetails: Attribute.Component<'elements.feature', true>;
    picture: Attribute.Media;
    description: Attribute.Text;
  };
}

export interface SectionsLargeVideo extends Schema.Component {
  collectionName: 'components_slices_large_videos';
  info: {
    name: 'LargeVideo';
    displayName: 'Large video';
    icon: 'play-circle';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
    video: Attribute.Media & Attribute.Required;
    poster: Attribute.Media;
  };
}

export interface SectionsLeadForm extends Schema.Component {
  collectionName: 'components_sections_lead_forms';
  info: {
    name: 'Lead form';
    displayName: 'Lead form';
    icon: 'at';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    emailPlaceholder: Attribute.String;
    submitButton: Attribute.Component<'links.button'>;
    location: Attribute.String;
    description: Attribute.Text;
    background: Attribute.Media;
  };
}

export interface SectionsLogisticsPageForms extends Schema.Component {
  collectionName: 'components_sections_logistics_page_forms';
  info: {
    displayName: 'LogisticsPageForms';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    enable: Attribute.Boolean;
  };
}

export interface SectionsLogistics extends Schema.Component {
  collectionName: 'components_sections_logistics';
  info: {
    displayName: 'Logistics';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    product_collections: Attribute.Relation<
      'sections.logistics',
      'oneToMany',
      'api::logistic.logistic'
    >;
    description: Attribute.Text;
    bgColor: Attribute.String;
    media: Attribute.Component<'shared.media'>;
    subtitle: Attribute.Text;
  };
}

export interface SectionsMarketing extends Schema.Component {
  collectionName: 'components_sections_marketings';
  info: {
    displayName: 'Marketing';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    product_collections: Attribute.Relation<
      'sections.marketing',
      'oneToMany',
      'api::marketing.marketing'
    >;
    bgColor: Attribute.String;
    subtitle: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
  };
}

export interface SectionsOurBrands extends Schema.Component {
  collectionName: 'components_sections_our_brands';
  info: {
    displayName: 'OurBrands';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    BrandsCategory: Attribute.Component<'elements.brands-category', true>;
    Button: Attribute.Component<'links.button-link'>;
  };
}

export interface SectionsOurTeam extends Schema.Component {
  collectionName: 'components_sections_our_teams';
  info: {
    displayName: 'Our Team';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    feature: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsPackage extends Schema.Component {
  collectionName: 'components_sections_packages';
  info: {
    displayName: 'Package';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    bgColor: Attribute.String;
    enable: Attribute.Boolean;
    PackageOption: Attribute.Component<'shared.package-option', true>;
  };
}

export interface SectionsPartners extends Schema.Component {
  collectionName: 'components_sections_partners';
  info: {
    displayName: 'Partners';
    icon: 'command';
    description: '';
  };
  attributes: {
    heading: Attribute.String;
    title: Attribute.String;
    description: Attribute.Text;
    buttons: Attribute.Component<'links.button-link', true>;
  };
}

export interface SectionsPlatform extends Schema.Component {
  collectionName: 'components_sections_platforms';
  info: {
    displayName: 'Platform';
    description: '';
  };
  attributes: {
    Heading: Attribute.Component<'sections.heading'>;
    Button: Attribute.Component<'links.button-link', true>;
    PlatformList: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsRetailApplicationForm extends Schema.Component {
  collectionName: 'components_sections_retail_application_forms';
  info: {
    displayName: 'RetailApplicationForm';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.String;
  };
}

export interface SectionsRetail extends Schema.Component {
  collectionName: 'components_sections_retails';
  info: {
    displayName: 'Retail';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    product_collections: Attribute.Relation<
      'sections.retail',
      'oneToMany',
      'api::retail.retail'
    >;
    bgColor: Attribute.String;
    subtitle: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: 'components_sections_rich_texts';
  info: {
    name: 'RichText';
    displayName: 'Rich text';
    icon: 'text-height';
  };
  attributes: {
    content: Attribute.RichText;
  };
}

export interface SectionsServices extends Schema.Component {
  collectionName: 'components_sections_pricings';
  info: {
    name: 'Services';
    displayName: 'Featured Services';
    icon: 'dollar-sign';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    service: Attribute.Component<'elements.service', true>;
    heading: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SectionsShowReel extends Schema.Component {
  collectionName: 'components_sections_show_reels';
  info: {
    displayName: 'ShowReel';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    ReelItem: Attribute.Component<'elements.reel-item', true>;
  };
}

export interface SectionsSingleFeature extends Schema.Component {
  collectionName: 'components_sections_single_features';
  info: {
    displayName: 'SingleFeature';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    service: Attribute.Component<'elements.service'>;
  };
}

export interface SectionsTabSections extends Schema.Component {
  collectionName: 'components_sections_tab_sections';
  info: {
    displayName: 'TabSections';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    Tabs: Attribute.Component<'sections.tab', true>;
  };
}

export interface SectionsTab extends Schema.Component {
  collectionName: 'components_sections_tabs';
  info: {
    displayName: 'Tab';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    blocks: Attribute.Blocks;
    block2: Attribute.Blocks;
    features: Attribute.Component<'elements.feature', true>;
  };
}

export interface SectionsTechExpertise extends Schema.Component {
  collectionName: 'components_sections_tech_expertises';
  info: {
    displayName: 'TechExpertise';
    description: '';
  };
  attributes: {
    description: Attribute.Text;
    title: Attribute.String;
    TechTabs: Attribute.Component<'elements.tech-tabs', true>;
  };
}

export interface SectionsTechProducts extends Schema.Component {
  collectionName: 'components_sections_tech_products';
  info: {
    displayName: 'TechProducts';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Button: Attribute.Component<'links.button-link'>;
    Features: Attribute.Component<'sections.features', true>;
  };
}

export interface SectionsTestimonialsGroup extends Schema.Component {
  collectionName: 'components_slices_testimonials_groups';
  info: {
    name: 'TestimonialsGroup';
    displayName: 'Testimonials group';
    icon: 'user-friends';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    Testimonial: Attribute.Component<'elements.testimonial', true>;
  };
}

export interface SharedFaqOption extends Schema.Component {
  collectionName: 'components_shared_faq_options';
  info: {
    displayName: 'faqOption';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
  };
}

export interface SharedMedia extends Schema.Component {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
    description: '';
  };
  attributes: {
    file: Attribute.Media;
  };
}

export interface SharedPackageOption extends Schema.Component {
  collectionName: 'components_shared_package_options';
  info: {
    displayName: 'PackageOption';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    PackageRow: Attribute.Component<'shared.package-row', true>;
    Button: Attribute.Component<'links.button-link'>;
  };
}

export interface SharedPackageRow extends Schema.Component {
  collectionName: 'components_shared_package_rows';
  info: {
    displayName: 'PackageRow';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

export interface SharedProductItem extends Schema.Component {
  collectionName: 'components_shared_product_items';
  info: {
    displayName: 'ProductItem';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    media: Attribute.Component<'shared.media'>;
    url: Attribute.String;
  };
}

export interface SharedQuote extends Schema.Component {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    body: Attribute.Text & Attribute.Required;
    author: Attribute.String;
  };
}

export interface SharedRichText extends Schema.Component {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'Rich text';
    icon: 'align-justify';
    description: '';
  };
  attributes: {
    content: Attribute.Blocks;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    name: 'Seo';
    icon: 'allergies';
    displayName: 'Seo';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media;
  };
}

export interface SharedSlider extends Schema.Component {
  collectionName: 'components_shared_sliders';
  info: {
    displayName: 'Slider';
    icon: 'address-book';
    description: '';
  };
  attributes: {
    files: Attribute.Media;
  };
}

export interface SharedVideoEmbed extends Schema.Component {
  collectionName: 'components_sections_video_embeds';
  info: {
    displayName: 'Video Embed';
    description: '';
  };
  attributes: {
    url: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.brand': ElementsBrand;
      'elements.brands-category': ElementsBrandsCategory;
      'elements.company-bullets': ElementsCompanyBullets;
      'elements.feature-column': ElementsFeatureColumn;
      'elements.feature-row': ElementsFeatureRow;
      'elements.feature': ElementsFeature;
      'elements.footer-section': ElementsFooterSection;
      'elements.logos': ElementsLogos;
      'elements.notification-banner': ElementsNotificationBanner;
      'elements.reel-item': ElementsReelItem;
      'elements.service': ElementsService;
      'elements.tech-tabs': ElementsTechTabs;
      'elements.testimonial': ElementsTestimonial;
      'layout.footer-menu': LayoutFooterMenu;
      'layout.footer': LayoutFooter;
      'layout.logo': LayoutLogo;
      'layout.navbar': LayoutNavbar;
      'layout.page-header': LayoutPageHeader;
      'links.button-link': LinksButtonLink;
      'links.button': LinksButton;
      'links.link': LinksLink;
      'links.social-link': LinksSocialLink;
      'menu.dropdown': MenuDropdown;
      'menu.link': MenuLink;
      'menu.menu-button': MenuMenuButton;
      'menu.menu-link': MenuMenuLink;
      'meta.metadata': MetaMetadata;
      'sections.about-us': SectionsAboutUs;
      'sections.advertisements': SectionsAdvertisements;
      'sections.banner-slider': SectionsBannerSlider;
      'sections.blog-posts': SectionsBlogPosts;
      'sections.bottom-actions': SectionsBottomActions;
      'sections.career-form': SectionsCareerForm;
      'sections.ceo-message': SectionsCeoMessage;
      'sections.clients': SectionsClients;
      'sections.company': SectionsCompany;
      'sections.contact-form': SectionsContactForm;
      'sections.countries': SectionsCountries;
      'sections.faq': SectionsFaq;
      'sections.featured-products': SectionsFeaturedProducts;
      'sections.features': SectionsFeatures;
      'sections.heading': SectionsHeading;
      'sections.hero': SectionsHero;
      'sections.homepage-statistics': SectionsHomepageStatistics;
      'sections.industries': SectionsIndustries;
      'sections.innovations': SectionsInnovations;
      'sections.internal-contact-form': SectionsInternalContactForm;
      'sections.large-video': SectionsLargeVideo;
      'sections.lead-form': SectionsLeadForm;
      'sections.logistics-page-forms': SectionsLogisticsPageForms;
      'sections.logistics': SectionsLogistics;
      'sections.marketing': SectionsMarketing;
      'sections.our-brands': SectionsOurBrands;
      'sections.our-team': SectionsOurTeam;
      'sections.package': SectionsPackage;
      'sections.partners': SectionsPartners;
      'sections.platform': SectionsPlatform;
      'sections.retail-application-form': SectionsRetailApplicationForm;
      'sections.retail': SectionsRetail;
      'sections.rich-text': SectionsRichText;
      'sections.services': SectionsServices;
      'sections.show-reel': SectionsShowReel;
      'sections.single-feature': SectionsSingleFeature;
      'sections.tab-sections': SectionsTabSections;
      'sections.tab': SectionsTab;
      'sections.tech-expertise': SectionsTechExpertise;
      'sections.tech-products': SectionsTechProducts;
      'sections.testimonials-group': SectionsTestimonialsGroup;
      'shared.faq-option': SharedFaqOption;
      'shared.media': SharedMedia;
      'shared.package-option': SharedPackageOption;
      'shared.package-row': SharedPackageRow;
      'shared.product-item': SharedProductItem;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'shared.video-embed': SharedVideoEmbed;
    }
  }
}
