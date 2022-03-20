import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayload } from "src/modules/common/interfaces/jwt-payload.interface";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repos/userRepo"
 
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private userRepo: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "secret key",
        });
    }

    async validate(payload: JWTPayload): Promise<User> {
        const { email } = payload
        const user = await this.userRepo.findByEmail(email)
        if (!user) throw new UnauthorizedException("User not Exist or unauthorized to access to this route")
        return user
    }
}