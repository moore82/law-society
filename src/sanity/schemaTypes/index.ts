import { type SchemaTypeDefinition } from 'sanity'
import { officerType } from './officer'
import { fixtureType } from './fixture'
import { galleryImageType } from './galleryImage'
import { aboutPageType } from './aboutPage'
import { historyPageType } from './historyPage'
import { officersPageType } from './officersPage'
import { honoursPageType } from './honoursPage'
import { captainType } from './captain'
import { timEdwardsTrophyType } from './timEdwardsTrophy'
import { goldenPedroType } from './goldenPedro'
import { fixturesPageType } from './fixturesPage'
import { seasonType } from './season'
import { toursPageType } from './toursPage'
import { galleryPageType } from './galleryPage'
import { contactPageType } from './contactPage'
import { fosPageType } from './fosPage'
import { fosGalleryPageType } from './fosGalleryPage'
import { partnerType } from './partner'
import { fosWinnerType } from './fosWinner'
import { getInvolvedPageType } from './getInvolvedPage'
import { fosRoundupPageType } from './fosRoundupPage'
import { homePageType } from './homePage'
import { articleType } from './article'
import { surreyVicePresidentType } from './surreyVicePresident'
import { surreyVicePresidentsPageType } from './surreyVicePresidentsPage'
import { tourType } from './tour'

import openingHoursPageType from './openingHoursPage'
import socialLinksPageType from './socialLinksPage'
import sitemapPageType from './sitemapPage'
import privacyPolicyPageType from './privacyPolicyPage'
import cookiePolicyPageType from './cookiePolicyPage'
import termsOfServicePageType from './termsOfServicePage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homePageType, articleType, officerType, fixtureType, galleryImageType, 
    aboutPageType, historyPageType, officersPageType, honoursPageType, 
    captainType, timEdwardsTrophyType, goldenPedroType, fixturesPageType, 
    seasonType, toursPageType, galleryPageType, contactPageType, 
    fosPageType, fosGalleryPageType, partnerType, fosWinnerType, 
    getInvolvedPageType, fosRoundupPageType,
    surreyVicePresidentType, surreyVicePresidentsPageType, tourType,
    openingHoursPageType, socialLinksPageType, sitemapPageType,
    privacyPolicyPageType, cookiePolicyPageType, termsOfServicePageType
  ],
}
