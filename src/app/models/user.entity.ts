export class User {

    id: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    email: string;

    constructor(
        id: string,
        firstname: string,
        lastname: string,
        username: string,
        password: string,
        email: string) {
            this.id = id;
            this.firstname = firstname;
            this.lastname = lastname;
            this.username = username;
            this.password = password;
            this.email = email;
    }

}