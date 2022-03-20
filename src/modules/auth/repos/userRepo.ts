import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Role } from "src/modules/common/enums/role.enum";
import { EmailLoginDto } from "../dto/email-login.dto";
import * as bcrypt from "bcryptjs"

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({ email });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.findOne({ username });
    }

    async validateUserPassword(emailLoginDto: EmailLoginDto): Promise<{ email: string, user: User }> {
        const { email, password } = emailLoginDto
        const user = await this.findByEmail(email)
        if (!user) throw new NotFoundException("User is not exist")

        if ((await user.validatePassword(password))) return { email, user }
        else throw new BadRequestException("Password is incorrect")
    }

    async validateAdminPassword(emailLoginDto: EmailLoginDto) {
        const { email, password } = emailLoginDto
        const user = await this.findByEmail(email)
        if (!user) throw new NotFoundException("User is not exist")

        const isAdmin = user.roles.some((role) => role === Role.ADMIN)

        if (!isAdmin) throw new ForbiddenException("You are not allowed to make this action/access this department")

        if (user && (await user.validatePassword(password))) return { email, user }
        else throw new BadRequestException("Password is incorrect")
    }

    async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt)
    }




}