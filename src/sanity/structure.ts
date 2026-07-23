import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // The Home Page
      S.listItem()
        .title('Home Page')
        .id('homePage')
        .child(
          S.document()
            .schemaType('homePage')
            .documentId('homePage')
            .title('Home Page')
        ),

      // A folder for all "About" related content
      S.listItem()
        .title('About')
        .child(
          S.list()
            .title('About Section')
            .items([
              // The main About Page
              S.listItem()
                .title('About Page')
                .id('aboutPage')
                .child(
                  S.document()
                    .schemaType('aboutPage')
                    .documentId('aboutPage')
                    .title('About Page')
                ),
                
              // Articles
              S.listItem()
                .title('Articles')
                .schemaType('article')
                .child(S.documentTypeList('article').title('Articles')),
              // The History Page
              S.listItem()
                .title('History Page')
                .id('historyPage')
                .child(
                  S.document()
                    .schemaType('historyPage')
                    .documentId('historyPage')
                    .title('History Page')
                ),
              // The Officers Page
              S.listItem()
                .title('Officers Page')
                .id('officersPage')
                .child(
                  S.document()
                    .schemaType('officersPage')
                    .documentId('officersPage')
                    .title('Officers Page')
                ),

              // The Officers list
              S.listItem()
                .title('Officers List')
                .schemaType('officer')
                .child(S.documentTypeList('officer').title('Officers List')),
            ])
        ),

      // A folder for all "Honours" related content
      S.listItem()
        .title('Honours Board')
        .child(
          S.list()
            .title('Honours Section')
            .items([
              // The main Honours Page
              S.listItem()
                .title('Honours Page')
                .id('honoursPage')
                .child(
                  S.document()
                    .schemaType('honoursPage')
                    .documentId('honoursPage')
                    .title('Honours Page')
                ),
              // Tim Edwards Trophy list
              S.listItem()
                .title('Tim Edwards Trophy Page')
                .schemaType('timEdwardsTrophy')
                .child(S.documentTypeList('timEdwardsTrophy').title('Tim Edwards Trophy Page')),
              // Golden Pedro list
              S.listItem()
                .title('Order of the Golden Pedro Page')
                .schemaType('goldenPedro')
                .child(S.documentTypeList('goldenPedro').title('Order of the Golden Pedro Page')),
              // Captains list
              S.listItem()
                .title('Captains Page')
                .schemaType('captain')
                .child(S.documentTypeList('captain').title('Captains Page')),
              // Surrey Vice Presidents Page
              S.listItem()
                .title('Surrey Vice Presidents Page')
                .id('surreyVicePresidentsPage')
                .child(
                  S.document()
                    .schemaType('surreyVicePresidentsPage')
                    .documentId('surreyVicePresidentsPage')
                    .title('Surrey Vice Presidents Page')
                ),
              // Surrey Vice Presidents List
              S.listItem()
                .title('Surrey Vice Presidents List')
                .schemaType('surreyVicePresident')
                .child(S.documentTypeList('surreyVicePresident').title('Surrey Vice Presidents List')),
            ])
        ),

      // A folder for all "Fixtures & Results" related content
      S.listItem()
        .title('Fixtures & Results')
        .child(
          S.list()
            .title('Fixtures Section')
            .items([
              // The main Fixtures Page
              S.listItem()
                .title('Fixtures Page')
                .id('fixturesPage')
                .child(
                  S.document()
                    .schemaType('fixturesPage')
                    .documentId('fixturesPage')
                    .title('Fixtures Page')
                ),
              // Seasons list
              S.listItem()
                .title('Seasons List')
                .schemaType('season')
                .child(S.documentTypeList('season').title('Seasons List')),
              // All Fixtures list
              S.listItem()
                .title('Fixtures')
                .schemaType('fixture')
                .child(S.documentTypeList('fixture').title('Fixtures')),
            ])
        ),

      // Festival of Sport Section
      S.listItem()
        .title('Festival of Sport')
        .child(
          S.list()
            .title('Festival of Sport')
            .items([
              // FOS Landing Page
              S.listItem()
                .title('FOS Page')
                .id('fosPage')
                .child(
                  S.document()
                    .schemaType('fosPage')
                    .documentId('fosPage')
                    .title('FOS Page')
                ),
              // Get Involved Page
              S.listItem()
                .title('Get Involved')
                .id('getInvolvedPage')
                .child(
                  S.document()
                    .schemaType('getInvolvedPage')
                    .documentId('getInvolvedPage')
                    .title('Get Involved')
                ),
              // FOS Gallery
              S.listItem()
                .title('Gallery')
                .id('fosGalleryPage')
                .child(
                  S.document()
                    .schemaType('fosGalleryPage')
                    .documentId('fosGalleryPage')
                    .title('Gallery')
                ),
              // Roundup Page
              S.listItem()
                .title('Roundup')
                .id('fosRoundupPage')
                .child(
                  S.document()
                    .schemaType('fosRoundupPage')
                    .documentId('fosRoundupPage')
                    .title('Roundup')
                ),
              // Partners / Sponsors List
              S.listItem()
                .title('Partners')
                .schemaType('partner')
                .child(S.documentTypeList('partner').title('Partners')),
              // Previous Winners List
              S.listItem()
                .title('Previous Winners')
                .schemaType('fosWinner')
                .child(S.documentTypeList('fosWinner').title('Previous Winners')),
            ])
        ),

      // The Tours Section
      S.listItem()
        .title('Tours')
        .child(
          S.list()
            .title('Tours Section')
            .items([
              // The main Tours Page
              S.listItem()
                .title('Tours Page')
                .id('toursPage')
                .child(
                  S.document()
                    .schemaType('toursPage')
                    .documentId('toursPage')
                    .title('Tours Page')
                ),
              // Historical Tours List
              S.listItem()
                .title('Historical Tours')
                .schemaType('tour')
                .child(S.documentTypeList('tour').title('Historical Tours')),
            ])
        ),

      // The Gallery Page
      S.listItem()
        .title('Gallery')
        .id('galleryPage')
        .child(
          S.document()
            .schemaType('galleryPage')
            .documentId('galleryPage')
            .title('Gallery')
        ),

      // The Contact Page
      S.listItem()
        .title('Contact')
        .id('contactPage')
        .child(
          S.document()
            .schemaType('contactPage')
            .documentId('contactPage')
            .title('Contact')
        ),

      // A folder for all "Footer & Legal" related content
      S.listItem()
        .title('Footer & Legal')
        .child(
          S.list()
            .title('Footer & Legal')
            .items([
              S.listItem()
                .title('Opening Hours')
                .id('openingHoursPage')
                .child(
                  S.document()
                    .schemaType('openingHoursPage')
                    .documentId('openingHoursPage')
                    .title('Opening Hours')
                ),
              S.listItem()
                .title('Social Links')
                .id('socialLinksPage')
                .child(
                  S.document()
                    .schemaType('socialLinksPage')
                    .documentId('socialLinksPage')
                    .title('Social Links')
                ),
              S.listItem()
                .title('Sitemap')
                .id('sitemapPage')
                .child(
                  S.document()
                    .schemaType('sitemapPage')
                    .documentId('sitemapPage')
                    .title('Sitemap')
                ),
              S.listItem()
                .title('Privacy Policy')
                .id('privacyPolicyPage')
                .child(
                  S.document()
                    .schemaType('privacyPolicyPage')
                    .documentId('privacyPolicyPage')
                    .title('Privacy Policy')
                ),
              S.listItem()
                .title('Cookie Policy')
                .id('cookiePolicyPage')
                .child(
                  S.document()
                    .schemaType('cookiePolicyPage')
                    .documentId('cookiePolicyPage')
                    .title('Cookie Policy')
                ),
              S.listItem()
                .title('Terms of Service')
                .id('termsOfServicePage')
                .child(
                  S.document()
                    .schemaType('termsOfServicePage')
                    .documentId('termsOfServicePage')
                    .title('Terms of Service')
                ),
            ])
        ),

      // A visual divider
      S.divider(),

      // All other document types, filtering out the ones we manually grouped above
      ...S.documentTypeListItems().filter(
        (listItem) => !['homePage', 'article', 'aboutPage', 'historyPage', 'officersPage', 'officer', 'honoursPage', 'captain', 'timEdwardsTrophy', 'goldenPedro', 'fixturesPage', 'season', 'fixture', 'toursPage', 'galleryPage', 'contactPage', 'fosPage', 'fosGalleryPage', 'partner', 'fosWinner', 'galleryImage', 'getInvolvedPage', 'fosRoundupPage', 'openingHoursPage', 'socialLinksPage', 'sitemapPage', 'privacyPolicyPage', 'cookiePolicyPage', 'termsOfServicePage', 'surreyVicePresident', 'surreyVicePresidentsPage', 'tour'].includes(listItem.getId() as string)
      ),
    ])
