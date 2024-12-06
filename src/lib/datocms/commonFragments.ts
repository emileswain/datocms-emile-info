import {graphql} from '$lib/datocms/graphql';
// import {InlineItemFragment} from "../components/InlineItem/fragments";
// import {ItemLinkFragment} from "../components/ItemLink/fragments";
// import {BlockFragment} from "../components/Block/fragments";

/*
 * This file lists a series of fragments not related to any specific
 * component, but necessary in various parts of the code.
 */

export const TagFragment = graphql(  /* GraphQL */`
  fragment TagFragment on Tag @_unmask {
    tag
    attributes
    content
  }
`);
