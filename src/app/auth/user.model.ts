export class User {
  constructor(private readonly _token: string,
              public expirationDate: Date,
              public email: string,
              public username: string,
              public userId: string,
              public statisticsId: string) {
  }

  get token(): string | null {
    if (!this.expirationDate || new Date() > this.expirationDate){
      return null;
    }
    return this._token;
  }
}
