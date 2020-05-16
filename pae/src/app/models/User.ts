export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    direccion: string;
    city: string;
    country: string;
    date: Date;
    token: string;
    pregunta1: string;
    respuesta1: string;
    pregunta2: string;
    respuesta2: string;
    imageUrl: string;

    constructor(id: number,
                name: string,
                email: string,
                password: string,
                direccion: string,
                city: string,
                country: string,
                date: Date,
                token: string,
                pregunta1: string,
                respuesta1: string,
                pregunta2: string,
                respuesta2: string,
                imageUrl: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.direccion = direccion;
    this.city = city;
    this.country = country;
    this.date = date;
    this.token = token;
    this.pregunta1 = pregunta1;
    this.respuesta1 = respuesta1;
    this.pregunta2 = pregunta2;
    this.respuesta2 = respuesta2;
    this.imageUrl = imageUrl;
    }
}
