export class User {
    id: number;
    name: string;
    email: string;
    password: string;
    date: Date;
    token: string;

    constructor(id: number,
                name: string,
                email: string,
                password: string,
                date: Date,
                token: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.date = date;
    this.token = token;
    }
}
