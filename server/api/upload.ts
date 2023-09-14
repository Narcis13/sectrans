import formidable from 'formidable';
import fs from 'fs';

export default defineEventHandler(async (event) => {
  const form = formidable({ uploadDir: './public/' });

  const [fields, files] = await form.parse(event.node.req);
  if (Array.isArray(files.file)) {
    files.file.forEach((file) => {
      const fileName = `./public/${file.originalFilename}`;
      fs.rename(file.filepath, fileName, (err) => console.log(err));
    });
  }
  return {
    message: 'success',
  };
});