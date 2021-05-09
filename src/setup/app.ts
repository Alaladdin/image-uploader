import fs from 'fs/promises';
import path from 'path';
import express, { Request } from 'express';
import multer, {
  FileFilterCallback,
} from 'multer';
import { MulterFile } from '../types/MulterFile';

const app = express();
const root = path.join(__dirname, '../../');
const uploadsDir = path.join(root, 'public', 'uploads');
const fileFilter = (_req: Request, file: MulterFile, cb: FileFilterCallback): void => {
  cb(null, !!file.mimetype.match(/^image\//));
};

const upload = multer({
  dest: uploadsDir,
  // @ts-ignore
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2mb
  },
});

app.set('view engine', 'njk');
app.set('views', path.join(root, 'src', 'views/'));

app.use('/public', express.static(path.join(root, 'public')));
app.use(express.json());

app.get('/', async (_req, res): Promise<void> => {
  const files = (await fs.readdir(uploadsDir)).sort().reverse();
  res.render('index', { files });
});

app.post('/upload', upload.single('image'), async (_req, res): Promise<void> => {
  res.redirect('/');
});

export default app;
