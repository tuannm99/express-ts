export class UserService {
  private readonly users: Array<any> = []

  public getAllUsers(): Array<any> {
    return this.users
  }

  public getUserById(id: number): any {
    return this.users.find((user) => user.id === id)
  }

  public createUser(user: any): void {
    this.users.push(user)
  }
}
