# Library Catalog Service

Mongoose models and repeatable seed data for a library book catalog.

## Setup and seeding

1. Install Node.js 18 or newer.
2. Install dependencies with `npm install`.
3. Copy `.env.example` to `.env` and set `MONGODB_URI` to your MongoDB connection string.
4. Run `npm run seed`.

**Warning:** The seed command deletes all documents in the `books` and `genres`
collections in the database named by `MONGODB_URI` before inserting the sample
catalog. Use a development database, not a database with data you need to keep.

## Schema Design

### Genre

Genres are separate documents so multiple books can share one canonical genre
name and slug. The unique `name` and `slug` fields prevent duplicate categories;
the lowercase slug is suitable for stable URLs.

### Book

- **`title` and `author`** are required strings embedded directly in each book.
  They are book-specific and are commonly displayed with the book; separate
  author documents would add joins and are not needed for this catalog's scope.
  Repeating an author name across books is a small trade-off for simpler reads.
- **`isbn`** is a required, unique ISBN-13 string with a checksum validator. It
  identifies a particular catalog title/edition without another lookup; the
  uniqueness constraint prevents duplicate editions from being seeded.
- **`description`** is a required embedded string because it describes this
  catalog entry and is read alongside its title. Keeping it on the book avoids
  a separate request or collection for book details.
- **`coverImage`** is a required URL string embedded on the book because the
  image belongs to that catalog entry and is typically rendered with it. A
  separate image collection would add complexity without meaningful reuse here.
- **`totalCopies` and `availableCopies`** are required non-negative integers
  stored on the book for quick inventory display. `availableCopies` cannot
  exceed `totalCopies`. This duplicates a derived count (available could be
  calculated from loan records), but a loan model is outside this assignment;
  storing both counts avoids introducing that collection and its query cost.
  Any future checkout/return workflow must update these values consistently.
- **`genre`** is a required `ObjectId` reference to a `Genre` document rather
  than an embedded name. Referencing avoids repeating genre names in every
  book and lets a genre rename stay consistent. It requires a populate or an
  additional lookup when a view needs genre details, trading some read
  simplicity for consistency.
- **`createdAt` and `updatedAt`** are added by Mongoose timestamps, so basic
  catalog maintenance metadata does not need to be manually duplicated.

## Seed data

`seed.js` inserts four genres and sixteen books with checksum-valid ISBN-13
numbers. It is safe to rerun against a disposable catalog database because it
clears the existing book and genre documents before inserting them.

The book seed data uses genre slugs only as lookup keys. `buildBooks` resolves
each key to the inserted genre document's `ObjectId` before inserting books;
an unknown slug stops the seed with an error instead of storing a string in
the `genre` reference.
