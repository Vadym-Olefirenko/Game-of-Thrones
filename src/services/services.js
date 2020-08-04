
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

     async getPersons() {
          let res = await this.getRes('characters?page=6&pageSize=10');
              
          return res.map(this._transformChar);

      }

     async getChar(id) {
        let character = await this.getRes(`characters/${id}`);

        return this._transformChar(character);
      }

      getAllBooks() {
          let res = this.getRes('books');
          return res.map(this._transformBook);
      }

      getBook(id) {
        let res =  this.getRes(`books/${id}`);
        return this._transformBook(res);
      }

      getAllHouses() {
        let res = this.getRes('houses');
        return res.map(this._transformHouse)
      }

      getHouse(id) {
        let house = this.getRes(`houses/${id}`);
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
           if (char[k] === "") {
             char[k] = "it's unknown :("
           }
         }

         return char;
      }

      _transformBook (book) {
        return {
          name: book.name,
          numberOfPages: book.numberOfPages,
          publiser: book.publiser,
          released: book.released
        }
      }

      _transformHouse (house) {
        return {
          name: house.name,
          region: house.region,
          words: house.words,
          titles: house.titles,
          overlord: house.overlord,
          ancestraWeapons: house.ancestraWeapons
        }
      }
}

    
