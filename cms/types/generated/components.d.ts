import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCityItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_city_item';
  info: {
    description: 'A city with name and image';
    displayName: 'City Item';
    icon: 'mapPin';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    slug: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedCityRegion extends Struct.ComponentSchema {
  collectionName: 'components_shared_city_region';
  info: {
    description: 'A region containing multiple cities';
    displayName: 'City Region';
    icon: 'globe';
  };
  attributes: {
    cities: Schema.Attribute.Component<'shared.city-item', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedFaqCategory extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_category';
  info: {
    description: 'A category of FAQ questions';
    displayName: 'FAQ Category';
    icon: 'question';
  };
  attributes: {
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    questions: Schema.Attribute.Component<'shared.faq-item', true>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_item';
  info: {
    description: 'A single FAQ question and answer';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    question: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    description: 'A simple text feature item';
    displayName: 'Feature';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_item';
  info: {
    description: 'A feature or benefit with title and description';
    displayName: 'Feature Item';
    icon: 'check';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedImpactStat extends Struct.ComponentSchema {
  collectionName: 'components_shared_impact_stat';
  info: {
    description: 'A single impact statistic with value and label';
    displayName: 'Impact Stat';
    icon: 'chartLine';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    value: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedLegalSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_legal_section';
  info: {
    description: 'A section of a legal page with title and content';
    displayName: 'Legal Section';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    description: 'A reusable link component with label and href';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    external: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavChild extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_children';
  info: {
    description: 'A child navigation item';
    displayName: 'Navigation Child';
    icon: 'arrowRight';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOfficeLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_office_location';
  info: {
    description: 'An office location with address details';
    displayName: 'Office Location';
    icon: 'mapPin';
  };
  attributes: {
    address: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    type: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedPackageTier extends Struct.ComponentSchema {
  collectionName: 'components_shared_package_tier';
  info: {
    description: 'A pricing/service tier with name and features';
    displayName: 'Package Tier';
    icon: 'layer';
  };
  attributes: {
    features: Schema.Attribute.JSON &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_shared_process_step';
  info: {
    description: 'A step in a process with title and description';
    displayName: 'Process Step';
    icon: 'arrowRight';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    description: 'SEO metadata for pages';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    canonical: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    keywords: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 160;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }> &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    noFollow: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    ogImage: Schema.Attribute.Media<'images'>;
    twitterImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedServiceCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_service_card';
  info: {
    description: 'A service or offering with title, description, and features';
    displayName: 'Service Card';
    icon: 'briefcase';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    features: Schema.Attribute.JSON &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.city-item': SharedCityItem;
      'shared.city-region': SharedCityRegion;
      'shared.faq-category': SharedFaqCategory;
      'shared.faq-item': SharedFaqItem;
      'shared.feature': SharedFeature;
      'shared.feature-item': SharedFeatureItem;
      'shared.impact-stat': SharedImpactStat;
      'shared.legal-section': SharedLegalSection;
      'shared.link': SharedLink;
      'shared.nav-child': SharedNavChild;
      'shared.office-location': SharedOfficeLocation;
      'shared.package-tier': SharedPackageTier;
      'shared.process-step': SharedProcessStep;
      'shared.seo': SharedSeo;
      'shared.service-card': SharedServiceCard;
    }
  }
}
