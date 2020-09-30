import axios from 'axios';
import cheerio from 'cheerio';

export interface Brewery {
  brewery: string;
  item: string;
  status: string;
  price: number;
}


export async function treeHouseGet(): Promise<Brewery[]> {
  let beerList: Brewery[];
  const response = await axios.get('https://www.treehouseonthefly.com/shop');
  const $ = cheerio.load(response.data);
  beerList = $('.grid-meta-wrapper').toArray().map(
    (x) => {
      return {
        brewery: 'Tree House',
        item: $(x).find('.grid-title').text(),
        status: $(x).find('.grid-meta-status').text().replace(/\r?\n|\r/g, '').trim() || 'N/A',
        price: Number($(x).find('.product-price').text().replace(/\r?\n|\r/g, ''))
      }
    }
  );
  return beerList
}
