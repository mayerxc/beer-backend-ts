import express, {Application, Request, Response} from 'express';
import { treeHouseGet, Brewery } from './scrape';
const app: Application = express();
const port: number = Number(process.env.PORT) || 3000;


app.get('/', (req: Request, res: Response) => {
    res.send(`Please visit "/beer" to get the JSON`);
});

app.get('/beer', (req: Request, resp: Response) => {
  (async () => {
    try {
      const beerList: Brewery[] = await treeHouseGet();
      console.log(beerList)
      resp.json(beerList);
    } catch (error) {
      resp.json({'status': error});
    }
  })();
});

app.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    return console.log(`server is listening on ${port}`);
});