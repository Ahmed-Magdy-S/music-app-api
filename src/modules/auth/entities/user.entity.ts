import { Auth } from 'src/modules/common/classes/auth';
import { Role } from 'src/modules/common/enums/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from "bcryptjs"

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    name: string;

    @Column('text')
    email: string;

    @Column('text')
    username: string;

    @Column('text')
    password: string;

    @Column()
    salt: string;

    @Column({
        type: "enum",
        enum: Role,
        array: true
    })
    roles: Role[];

    @Column("simple-json")
    auth: Auth;

    async validatePassword(enteredPassword: string): Promise<boolean> {
        const hash = await bcrypt.hash(enteredPassword, this.salt)
        return this.password === hash;
    }

}