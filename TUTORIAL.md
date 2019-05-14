


## Introduction

### Why do we need your help

evictions.swipesforscience is a web-app, designed to speed up creating
training data for certain machine learning problems by the UW [evictions
research group](https://evictions.study).  The main focus of the
current version of the app is to code _addresses of premises_ in
eviction documents.  We have developed a machine learning algorithm
that extracts the relevant addresses from court records.  However,
there are a number of problems:

* Some documents do not contain addresses, or do not contain these in
  places/form that the algorithm can understand.
* We are currently unable to read handwritten addresses, and several
  forms are hand-filled.
* As the documents are essentially photocopies, low image quality may
  render address unrecognizeable.  OCR software sometimes also lumps
  unrelated text inside of addresses.
* Sometimes the algorithm picks a wrong address, for instance the
  attorney's address instead of that of the premises.

In order to address these problems, we need a certain amount of
"ground truth", a few thousand addresses that are known to be
correct.  The only way to get this information is manually, by
carefully considering each lawsuit documents and writing down the
address therein.


### What is this app about

But wading through a lot of paperwork, and noting not just the address
but also the cryptic case number is a slow and laborious process.  In
order to speed it up as much as possible we have developed this app.
The app helps you work faster and be more precise:

* it pre-loads the new document each time you submit the previous
  one.  It also displays the one that is most likely to contain the
  address (the summons).
* it also offers you pre-filled form next to the page image where you
  can mark your corrections, or write a completely new address if the
  automatically extracted one is wrong (or missing altoghether).
* it automatically records all the necessary meta-information,
  including county, year, and case number.  So there is no need to
  record that hard-to-memorize number!


### How to use the app

(some commented screenshots.  may use the Antonius and Kleopatra
example).


#### Address components

We have split address into a number standardized components and would
like to learn all components separately.  For instance, the address
_1600 Pennsylvania Avenue NW, Washington, DC 20500_ contains the
following parts: _1600_ is **house number**, _Pennsylvania_ is
**street name**, _Avenue_ is **street type**, _NW_ is **Post
Direction**, _Washington_ is **city**, _DC_ is **state** and _20500_
is **zip**.
