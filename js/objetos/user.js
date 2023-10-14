let generateId= 0;

class User{
    constructor(name, mail, age){
        this.id = genUserId++;
        this.nombre = name;
        this.email = mail;
        this.edad = age;
    }
}