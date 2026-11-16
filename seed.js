require('dotenv').config();

const mongoose = require('mongoose');
const Book = require('./models/Book');
const Genre = require('./models/Genre');

const genres = [
  { name: 'Science Fiction', slug: 'science-fiction' },
  { name: 'Fantasy', slug: 'fantasy' },
  { name: 'Mystery', slug: 'mystery' },
  { name: 'Literary Fiction', slug: 'literary-fiction' },
];

const books = [
  {
    title: 'The Cartographer of Europa',
    author: 'Mara Venn',
    isbn: '9781555550011',
    description: 'A young surveyor discovers a signal beneath Europa’s frozen ocean.',
    coverImage: 'https://images.unsplash.com/photo-1519682337058-a94d519337bc',
    totalCopies: 6,
    availableCopies: 4,
    genre: 'science-fiction',
  },
  {
    title: 'Orbit of Ash',
    author: 'Jonas Vale',
    isbn: '9781555550028',
    description: 'A salvage crew races to uncover the truth behind a silent orbital station.',
    coverImage: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa',
    totalCopies: 5,
    availableCopies: 5,
    genre: 'science-fiction',
  },
  {
    title: 'The Last Green Comet',
    author: 'Inez Calder',
    isbn: '9781555550035',
    description: 'An astronomer follows a strange comet carrying the memory of a lost world.',
    coverImage: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564',
    totalCopies: 4,
    availableCopies: 2,
    genre: 'science-fiction',
  },
  {
    title: 'A Machine for Quiet Days',
    author: 'Theo R. Bell',
    isbn: '9781555550042',
    description: 'In a city that outsources its dreams, one engineer chooses to stay awake.',
    coverImage: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455',
    totalCopies: 7,
    availableCopies: 6,
    genre: 'science-fiction',
  },
  {
    title: 'The Emberwood Pact',
    author: 'Liora Fen',
    isbn: '9781555550059',
    description: 'A reluctant ranger bargains with an ancient forest to save her village.',
    coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b',
    totalCopies: 8,
    availableCopies: 5,
    genre: 'fantasy',
  },
  {
    title: 'The Glass Orchard',
    author: 'P. A. Rowan',
    isbn: '9781555550066',
    description: 'Three siblings inherit an orchard where every fruit holds a forgotten spell.',
    coverImage: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8',
    totalCopies: 5,
    availableCopies: 3,
    genre: 'fantasy',
  },
  {
    title: 'A Crown of Cinders',
    author: 'Nadia Wren',
    isbn: '9781555550073',
    description: 'A palace apprentice discovers that the kingdom’s royal fire is fading.',
    coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23',
    totalCopies: 6,
    availableCopies: 6,
    genre: 'fantasy',
  },
  {
    title: 'The River That Remembers',
    author: 'Elias Moor',
    isbn: '9781555550080',
    description: 'A ferryman and a mapmaker travel a river that changes with every telling.',
    coverImage: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2',
    totalCopies: 4,
    availableCopies: 1,
    genre: 'fantasy',
  },
  {
    title: 'The Bellwether House',
    author: 'Clara D. Finch',
    isbn: '9781555550097',
    description: 'A new caretaker investigates why every clock in a country house stopped at once.',
    coverImage: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2',
    totalCopies: 5,
    availableCopies: 4,
    genre: 'mystery',
  },
  {
    title: 'A Map of Missing Hours',
    author: 'Dev Shah',
    isbn: '9781555550103',
    description: 'A records clerk finds a pattern in the unexplained absences of a seaside town.',
    coverImage: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    totalCopies: 6,
    availableCopies: 2,
    genre: 'mystery',
  },
  {
    title: 'The Marigold Cipher',
    author: 'Beatrice Holt',
    isbn: '9781555550110',
    description: 'A florist decodes a message hidden in a series of bouquets left at a museum.',
    coverImage: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946',
    totalCopies: 3,
    availableCopies: 3,
    genre: 'mystery',
  },
  {
    title: 'Last Train to Alder Bay',
    author: 'Martin Quill',
    isbn: '9781555550127',
    description: 'Passengers on a night train compare stories after a valuable painting vanishes.',
    coverImage: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3',
    totalCopies: 7,
    availableCopies: 5,
    genre: 'mystery',
  },
  {
    title: 'Small Weather',
    author: 'June Ellery',
    isbn: '9781555550134',
    description: 'A family gathers in their childhood home to decide what to keep and what to leave.',
    coverImage: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e',
    totalCopies: 5,
    availableCopies: 4,
    genre: 'literary-fiction',
  },
  {
    title: 'The Shape of Ordinary Light',
    author: 'Amir Sayegh',
    isbn: '9781555550141',
    description: 'Two neighbors build an unexpected friendship over a long summer in the city.',
    coverImage: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8',
    totalCopies: 4,
    availableCopies: 2,
    genre: 'literary-fiction',
  },
  {
    title: 'Postcards from Bell Street',
    author: 'Ruth A. Mercer',
    isbn: '9781555550158',
    description: 'A retired teacher reconnects with former students through unsent letters.',
    coverImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    totalCopies: 6,
    availableCopies: 5,
    genre: 'literary-fiction',
  },
  {
    title: 'An Inventory of Rain',
    author: 'Samuel North',
    isbn: '9781555550165',
    description: 'A daughter returns to her coastal hometown to settle her mother’s bookstore.',
    coverImage: 'https://images.unsplash.com/photo-1501691223387-dd0500403074',
    totalCopies: 5,
    availableCopies: 3,
    genre: 'literary-fiction',
  },
];

async function seed() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not set. Add it to your .env file.');
  }

  await mongoose.connect(process.env.MONGODB_URI);

  try {
    await Book.deleteMany({});
    await Genre.deleteMany({});

    const insertedGenres = await Genre.insertMany(genres);
    const genreIds = new Map(
      insertedGenres.map((genre) => [genre.slug, genre._id])
    );
    const booksWithGenreIds = books.map(({ genre, ...book }) => ({
      ...book,
      genre: genreIds.get(genre),
    }));

    await Book.insertMany(booksWithGenreIds);
    console.log(`Seeded ${insertedGenres.length} genres and ${books.length} books.`);
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error) => {
  console.error('Failed to seed the catalog:', error);
  process.exitCode = 1;
});
