import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public/uploads');

  const form = new IncomingForm({
    uploadDir,
    keepExtensions: true,
  });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Upload failed' });
    }

    const file = files.file[0]; // array in v3+
    const fileName = path.basename(file.filepath);
    const url = `/uploads/${fileName}`;

    return res.status(200).json({ success: true, url });
  });
}
