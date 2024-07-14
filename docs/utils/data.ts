import type { Ref } from '@vue/reactivity'

export interface NuxtSeoModule {
  id: string
  slug: string
  label: string
  fullLabel?: string
  icon: string
  description: string
  to: string
  repo: string
  npm: string
  downloads?: string
  stars?: string | number
  tag?: {
    new?: boolean
    label: string
    to: string
    date?: Date
  }
  unlisted?: boolean
  routeRules?: Record<string, any>
}

export const NuxtSeo: NuxtSeoModule = {
  unlisted: true,
  id: 'seo-kit',
  slug: 'nuxt-seo',
  label: 'Nuxt SEO',
  icon: 'i-carbon-settings-check',
  description: 'All the boring SEO work for Nuxt done.',
  to: '/nuxt-seo/getting-started/installation',
  repo: 'harlan-zw/nuxt-seo',
  npm: '@nuxtjs/seo',
  tag: {
    new: true,
    label: 'RC v2.0',
    to: '/nuxt-seo/releases/2.0',
  },
}
export const SiteConfigModule: NuxtSeoModule = {
  unlisted: true,
  id: 'site-config',
  slug: 'site-config',
  tag: {
    label: 'Released',
    to: '/site-config/getting-started/installation',
  },
  label: 'Site Config',
  icon: 'i-carbon-settings-check',
  description: 'Powerful build and runtime shared site configuration for Nuxt modules.',
  to: '/site-config/getting-started/installation',
  repo: 'harlan-zw/nuxt-site-config',
  routeRules: {
    site: { name: 'Nuxt Site Config', description: 'Shared site configuration for Nuxt modules.' },
    ogImage: { icon: 'i-carbon-settings-check' },
  },
} as const

export const RobotsModule = {
  id: 'simple-robots',
  slug: 'robots',
  label: 'Robots',
  fullLabel: 'Nuxt Simple Robots',
  icon: 'i-carbon-bot',
  description: 'Tame the robots crawling and indexing your site with ease.',
  tag: {
    new: true,
    label: 'RC v4.0',
    to: '/robots/releases/v4',
    date: new Date('2023-12-14'),
  },
  to: '/robots/getting-started/installation',
  repo: 'harlan-zw/nuxt-simple-robots',
  routeRules: {
    site: { name: 'Nuxt Simple Robots', description: 'Tame the robots crawling and indexing your site with ease.' },
    ogImage: { icon: 'i-carbon-bot' },
  },
} as const

export const SitemapModule = {
  id: 'sitemap',
  slug: 'sitemap',
  label: 'Sitemap',
  tag: {
    new: true,
    label: 'v5',
    to: '/sitemap/releases/v5',
    date: new Date('2024-01-06'),
  },
  fullLabel: 'Nuxt Sitemap',
  to: '/sitemap/getting-started/installation',
  icon: 'i-carbon-load-balancer-application',
  description: 'Powerfully flexible XML Sitemaps that integrate seamlessly.',
  repo: 'nuxt-modules/sitemap',
  npm: '@nuxtjs/seo',
  routeRules: {
    ogImage: { icon: 'i-carbon-load-balancer-application' },
  },
} as const

export const OgImageModule = {
  id: 'og-image',
  slug: 'og-image',
  label: 'OG Image',
  icon: 'i-carbon-image-search',
  description: 'Generate OG Images with Vue templates in Nuxt.',
  tag: {
    new: true,
    label: 'RC v3',
    to: '/og-image/releases/v3',
    date: new Date('2023-12-10'),
  },
  to: '/og-image/getting-started/installation',
  repo: 'nuxt-modules/og-image',
  routeRules: {
    ogImage: { icon: 'i-carbon-image-search' },
  },
} as const

export const LinkCheckerModule = {
  id: 'link-checker',
  slug: 'link-checker',
  label: 'Link Checker',
  tag: {
    new: true,
    label: 'RC v3',
    to: '/link-checker/releases/v2',
    date: new Date('2024-01-05'),
  },
  to: '/link-checker/getting-started/installation',
  icon: 'i-carbon-cloud-satellite-link',
  description: 'Find and magically fix links that may be negatively effecting your SEO.',
  repo: 'harlan-zw/nuxt-link-checker',
  routeRules: {
    ogImage: { icon: 'i-carbon-cloud-satellite-link' },
  },
} as const

export const SeoExperimentsModule = {
  id: 'seo-experiments',
  label: 'Experiments',
  fullLabel: 'Nuxt SEO Experiments',
  slug: 'experiments',
  icon: 'i-carbon-chemistry',
  tag: {
    label: 'v3',
    to: '/experiments/releases/v3',
  },
  description: 'Powerful SEO DX improvements that may or may not land in the Nuxt core.',
  to: '/experiments/getting-started/installation',
  repo: 'harlan-zw/nuxt-seo-experiments',
  routeRules: {
    ogImage: { icon: 'i-carbon-chemistry' },
  },
} as const

export const SchemaOrgModule = {
  id: 'schema-org',
  slug: 'schema-org',
  label: 'Schema.org',
  icon: 'i-carbon-chart-relationship',
  tag: {
    label: 'v3',
    to: '/schema-org/getting-started/installation',
  },
  to: '/schema-org/getting-started/installation',
  description: 'The quickest and easiest way to build Schema.org graphs.',
  repo: 'harlan-zw/nuxt-schema-org',
  routeRules: {
    ogImage: { icon: 'i-carbon-chart-relationship' },
  },
} as const

export const SeoModules: NuxtSeoModule[] = [
  NuxtSeo,
  RobotsModule,
  SitemapModule,
  OgImageModule,
  SchemaOrgModule,
  LinkCheckerModule,
  SeoExperimentsModule,
  SiteConfigModule,
]

export function useModuleList(): NuxtSeoModule[]
export function useModuleList(module?: Ref<string>) {
  const publicRuntimeConfig = useRuntimeConfig().public
  const modules = SeoModules.map((m) => {
    const stats = (publicRuntimeConfig.moduleStats as any[] || []).find(m2 => m2.id === m?.id)?.stats || {}
    if (stats?.downloads) {
      // will look like 395493, we need to make it human readible using native APIs
      // we want to display it like 395k
      m.downloads = Number(stats.downloads).toLocaleString('en-US', { notation: 'compact', compactDisplay: 'short' })
    }
    if (stats?.stars)
      m.stars = Number(stats.stars)
    const key = m.repo.replace('harlan-zw/', '')
    if (key in publicRuntimeConfig.moduleDeps) {
      const version = publicRuntimeConfig.moduleDeps[m.repo.replace('harlan-zw/', '')].replace('^', '')
      m.tag = m.tag || {}
      // version is like 3.10.30, we want to just get the first two, like 3.10
      if (!m.tag.label && version)
        m.tag.label = `v${version.split('.').slice(0, 2).join('.')}`
    }
    return m
  })
  if (module?.value)
    return computed(() => modules.find(m => m.id === module.value))
  return modules
}
