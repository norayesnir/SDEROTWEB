export async function fetchIds(collection: string): Promise<string[]> {
const url = `http://localhost:3001/_payload/${collection}`;
  try {
    const response = await fetch(url, { headers: { 'Content-Type': 'application/json' } });
    if (!response.ok) throw new Error(`Status ${response.status}`);
    const data = await response.json();
    return data.docs.map((doc: { id: number | string }) => String(doc.id)).filter(Boolean);
  } catch (error) {
    console.error(`[Build] Failed to fetch IDs for ${collection}: ${error.message}`);
    return [];
  }
}
