import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const stickersDir = path.join(process.cwd(), 'public', 'stickers');
    const files = fs.readdirSync(stickersDir);
    
    // Filter for valid image formats
    const validExtensions = ['.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp'];
    const stickers = files
      .filter(file => validExtensions.some(ext => file.toLowerCase().endsWith(ext)))
      .map(file => `/stickers/${file}`);

    return NextResponse.json({ stickers });
  } catch (error) {
    console.error("Failed to read stickers directory:", error);
    return NextResponse.json({ stickers: [] });
  }
}
