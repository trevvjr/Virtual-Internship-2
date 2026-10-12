type Book = {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;

};

async function getBooks(url: string, signal?: AbortSignal): Promise<Book[]> {
  const response = await fetch(url, { cache: 'no-store', signal });
  if (!response.ok) {
    throw new Error('Failed to load selected books');
  }
  return response.json();
}
export async function getBook(id: string): Promise<Book> {
    const response = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${encodeURIComponent(id)}`,
        { cache: 'no-store'}
    );
    if (!response.ok) { throw new Error('Failed to load book'); }
    return response.json();
}

export { getBooks };
export type { Book };
