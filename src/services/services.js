
 export default class GameService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/';
    }
   async getRes(url) {
        const res = await fetch(`${this._apiBase}${url}`);
            if (!res.ok) {
              throw new Error ('Error from serv');
            } 
        
          return await res.json();
      }

     getPersons =  async () => {
          let res = await this.getRes('characters?page=4&pageSize=10');
          return res.map(this._transformChar);

      }

     getChar =  async (id) => {
        let character = await this.getRes(`characters/${id}`);

        return this._transformChar(character);
      }

      getAllBooks =  async () => {
          let res = await this.getRes('books');
          return res.map(this._transformBook);
      }

      getBook =  async (id) => {
        let res = await this.getRes(`books/${id}`);
        return this._transformBook(res);
      }

      getAllHouses =  async () => {
        let res = await this.getRes('houses');
        return res.map(this._transformHouse);
      }

      getHouse =  async (id) => {
        let house = await this.getRes(`houses/${id}`);
        return this._transformHouse(house);
      }

      _transformChar (char) {
        char = {
          name: char.name,
          gender: char.gender,
          born: char.born,
          died: char.died,
          culture: char.culture,
          url: char.url
         }
 
         for(let k in char) {
          if(Array.isArray(char[k])) {
            let a = char[k].join(', ')
            char[k] = a;
           }
           if (char[k] === "") {
             char[k] = "It's unknown"
           }

         }
 
         return char;
      }

      _transformBook (book) {
        book = {
          name: book.name,
          numberOfPages: book.numberOfPages,
          publisher: book.publisher,
          released: book.released,
          url: book.url
        }

        for(let k in book) {
          if(Array.isArray(book[k])) {
            let a = book[k].join(', ')
            book[k] = a;
           }
          if (book[k] === "") {
            book[k] = "it's unknown :("
          }
        }

        return book;
      }

      _transformHouse (house) {
        house = {
          name: house.name,
          region: house.region,
          words: house.words,
          titles: house.titles,
          overlord: house.overlord,
          ancestralWeapons: house.ancestralWeapons,
          url: house.url
        }

        for(let k in house) {

          if(Array.isArray(house[k])) {
           let a = house[k].join(', ')
           house[k] = a;
          }
            
          if (house[k] === "") {
            house[k] = "it's unknown :("
          }
        }

        return house;
      }
}

    
