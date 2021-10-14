# Styling

## Font-sizes

Font sizes range from xs, s, sm. md. lg and xl and have a corresponding line-height. Use the font-size mixin to add font-sizes to styles.

i.e. `@include font-size("xs")` will add the below styles when included in a selector

`{ font-size: 0.875rem line-height: 1.5rem }`

## Margins and Paddings

To add margins and paddings to component-specific styles, use the `space(n)` function in selectors to keep spacings as multiples of 0.5rem.

Margins and Paddings can also be added to elements via utility classes i.e. `.mt-3` to add

`{ margin-top: 0.5rem * 3 }` Note that the utility classes are not responsive.

## Media queries

Media queries are created using the [include-media](https://eduardoboucas.github.io/include-media/#features) sass library. Add more breakpoints to `scss/abstracts/_breakpoints.scss partial` if needed.
To use a media query, use the `media()` mixin.
` @include media("retina2x", ">desktop") { width: 100%; }`
