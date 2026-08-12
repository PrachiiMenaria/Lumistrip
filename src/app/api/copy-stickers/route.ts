import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const destDir = path.join(process.cwd(), 'public', 'stickers');
    const results = [];
    
    if (fs.existsSync(destDir)) {
      const files = fs.readdirSync(destDir);
      for (const file of files) {
        if (file.endsWith('.jpg') || file.endsWith('.png')) {
          fs.unlinkSync(path.join(destDir, file));
          results.push(`Deleted ${file}`);
        }
      }
    }
    
    // Self-destruct this API route after running
    try {
      fs.unlinkSync(__filename);
    } catch(e) {
      // Ignore errors deleting self
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
