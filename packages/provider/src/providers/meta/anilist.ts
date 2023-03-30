import { Provider } from '../provider';

export class Anilist extends Provider {
  protected BASE_URLS = [new URL('https://graphql.anilist.co')];
  protected PROVIDER_NAME = 'MyAnimeList';
  protected headers = [
    {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  ];

  async apiPage(page = 1, idBlacklist: Array<number> = []) {
    let canNext = false;
    const query = `
query ($perPage: Int, $page: Int) {
    popular: Page(perPage: $perPage, page: $page) {
        pageInfo {
            hasNextPage
            lastPage
            hasNextPage
            total
        }
        media(sort: POPULARITY_DESC, format_in: [TV, TV_SHORT, MOVIE, OVA], id_not_in: [${idBlacklist.join(
          ','
        )}]) {
            id
            idMal
            title {
                english
                romaji
                native
            }
            description
            coverImage {
                extraLarge
                large
                medium
            }
            bannerImage
            status
            duration
            episodes
            startDate {
                day
                month
                year
            }
            format
            isAdult
            meanScore
            averageScore
            popularity
            season
            seasonYear
            genres
            synonyms
            trailer {
                id
                site
                thumbnail
            }
            type
            startDate {
                day
                month
                year
            }
            status
            characters {
                nodes {
                    id
                    name {
                        first
                        middle
                        last
                    }
                    description
                }
            }
            airingSchedule {
                nodes {
                    id
                    episode
                    timeUntilAiring
                    mediaId
                }
            }
            nextAiringEpisode {
                id
                airingAt
                timeUntilAiring
                episode
                mediaId
            }
            externalLinks {
                id
                color
                icon
                language
                site
                siteId
                url
                type
            }
        }
    }
}`,
      url = 'https://graphql.anilist.co';

    do {
      const variables = {
          page: page,
          perPage: 100
        },
        options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({
            query: query,
            variables: variables
          })
        };

      console.log(`Fetching page ${page}...`);

      const response = await fetch(url, options);
      const data = await response.json();

      canNext = data.data.popular.pageInfo.hasNextPage;
      page++;

      console.log(data.data.popular.media);
      return 0;
      await new Promise(resolve => setTimeout(resolve, 750));
    } while (canNext);
  }
}

// let page = 1;
// let canNext = false;
// const query = `
// query ($perPage: Int, $page: Int) {
//     popular: Page(perPage: $perPage, page: $page) {
//         pageInfo {
//             hasNextPage
//         }
//         media(sort: POPULARITY_DESC, format_in: [TV, TV_SHORT, MOVIE, OVA]) {
//             id
//             title {
//                 english
//                 romaji
//                 native
//             }
//         }
//     }
// }`,
//   url = 'https://graphql.anilist.co';

// do {
//   const variables = {
//       page: page,
//       perPage: 100
//     },
//     options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       },
//       body: JSON.stringify({
//         query: query,
//         variables: variables
//       })
//     };

//   console.log(`Fetching page ${page}...`);

//   const response = await fetch(url, options);
//   const data = await response.json();

//   canNext = data.data.popular.pageInfo.hasNextPage;
//   page++;

//   for (const media of data.data.popular.media) {
//     console.log(
//       `Saving ${media.title.english ?? media.title.romaji} {${media.id}}...`
//     );
//     try {
//       await pb.collection('anilist_index').create({
//         anilistId: media.id,
//         romaji: media.title.romaji,
//         english: media.title.english
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   }

//   // Thread sleep so that we don't get rate limited, but don't really need it since we're calling the database which takes a while to resolve
//   await new Promise(resolve => setTimeout(resolve, 750));
// } while (canNext);
