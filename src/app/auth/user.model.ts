export class User {
  constructor(private readonly _token: string, public expirationDate: Date,
              public email: string, public username: string, public userId: string) {
    this._token = _token;
    this.expirationDate = expirationDate;
    this.email = email;
    this.username = username;
    this.userId = userId;
  }

  get token(): string | null {
    if (!this.expirationDate || new Date() > this.expirationDate){
      return null;
    }
    return this._token;
  }
}
