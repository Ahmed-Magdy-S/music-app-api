import { BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { Role } from "src/modules/common/enums/role.enum";
import { EmailLoginDto } from "../dto/emai-login.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findByEmail(email: string): Promise<User> {
        return await this.findOne({ email });
    }

    async findByUsername(username: string): Promise<User> {
        return await this.findOne({ username });
    }

    async validateUserPassword(emailLoginDto: EmailLoginDto) {
        const { email, password } = emailLoginDto
        const user = await this.findByEmail(email)
        if (!user) throw new NotFoundException("User is not exist")

        if (user && (await user.validatePassword(password))) return { email, user }
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






}