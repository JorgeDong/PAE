export class TokenInfo {
    token: string;
    email: string;

    constructor(email: string,
                token: string) {
    this.email = email;
    this.token = token;
    }
}
