import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
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
              // Captains list
              S.listItem()
                .title('Captains Page')
                .schemaType('captain')
                .child(S.documentTypeList('captain').title('Captains Page')),
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

      // The Tours Page
      S.listItem()
        .title('Tours')
        .id('toursPage')
        .child(
          S.document()
            .schemaType('toursPage')
            .documentId('toursPage')
            .title('Tours')
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

      // A visual divider
      S.divider(),

      // All other document types, filtering out the ones we manually grouped above
      ...S.documentTypeListItems().filter(
        (listItem) => !['aboutPage', 'historyPage', 'officersPage', 'officer', 'honoursPage', 'captain', 'timEdwardsTrophy', 'goldenPedro', 'fixturesPage', 'season', 'fixture', 'toursPage', 'galleryPage', 'contactPage'].includes(listItem.getId() as string)
      ),
    ])
