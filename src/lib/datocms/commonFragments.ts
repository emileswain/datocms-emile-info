import { graphql } from '$lib/datocms/graphql';

/*
 * This file lists a series of fragments not related to any specific
 * component, but necessary in various parts of the code.
 */

export const TagFragment = graphql(/* GraphQL */ `
  fragment TagFragment on Tag @_unmask {
    tag
    attributes
    content
  }
`);
