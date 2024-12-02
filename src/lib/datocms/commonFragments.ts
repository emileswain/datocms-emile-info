import {graphql} from '$lib/datocms/graphql';
import {InlineItemFragment} from "../components/InlineItem/fragments";
import {ItemLinkFragment} from "../components/ItemLink/fragments";
import {BlockFragment} from "../components/Block/fragments";

/*
 * This file lists a series of fragments not related to any specific
 * component, but necessary in various parts of the code.
 */

export const TagFragment = graphql(`
  fragment TagFragment on Tag @_unmask {
    tag
    attributes
    content
  }
`);

export const ContentBlocFragment = graphql(`
  fragment ContentBlocFragment on ContentBlocRecord {
    header
    content {
      value
      links {
        ... on RecordInterface {
          id
          __typename
        }
      }
      
    }
  }
  `, [BlockFragment, ItemLinkFragment, InlineItemFragment]);

// blocks {
// ... on RecordInterface {
//     id
//     __typename
//   }
// ...BlockFragment
// }
// links {
// ... on RecordInterface {
//     id
//     __typename
//   }
// ...ItemLinkFragment
// ...InlineItemFragment
// }