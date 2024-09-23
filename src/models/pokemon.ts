export default class Pokemon {
    //Pokemon characters
    id: number;
    hp: number;
    cp: number;
    name: string;
    picture: string;
    types: Array<string>;
    created?: Date;

  //Constructor
  constructor(
    id: number,
    hp: number = 100,
    cp: number = 10,
    name: string = "...",
    picture: string = "./src/assets/pictures/XXX.jpg",
    types: string[] = ["Normal"],
    created: Date = new Date()
  ) {
    this.id = id;
    this.hp = hp;
    this.cp = cp;
    this.name = name;
    this.picture = picture;
    this.types = types;
    this.created = created;
  }
}
