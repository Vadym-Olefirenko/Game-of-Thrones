
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

      getPersons() {
          return this.getRes('characters?page=5&pageSize=10');
      }

      getChar(id) {
        return this.getRes(`characters/${id}`);
      }

      getAllBooks() {
          return this.getRes('books')
      }

      getBook(id) {
        return this.getRes(`books/${id}`)
      }

      getAllHouses() {
        return this.getRes('houses')
      }

      getHouse(id) {
        return this.getRes(`houses/${id}`)
      }
}

    
