import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { User } from './entities/user.entity';
import * as bcrypt from "bcryptjs"
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repos/userRepo';
import { Profile } from '../profile/entities/profile.entity';
import { Favorite } from '../favorite/favorite.entity';
import { Role } from '../common/enums/role.enum';
import { Auth } from '../common/classes/auth';
import { EmailVerification } from './entities/email-verification.entity';
import { MailerService } from '@nestjs-modules/mailer';
import config from 'src/config/config';
import { EmailLoginDto } from './dto/email-login.dto';
import { JWTPayload } from '../common/interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepo: UserRepository, private readonly mailerService: MailerService, private jwtService: JwtService) { }

    async register(authCredentialsDto: AuthCredentialsDto, createProfileDto: CreateProfileDto): Promise<void> {
        const { username, password, email } = authCredentialsDto

        //check if user/email exists
        const query = this.userRepo.createQueryBuilder("user")
        const isValidUserName = query.select("username").where("user.username LIKE :username", { username })
        const isEmailExist = query.select("email").where("user.email LIKE :email", { email })
        if (await isValidUserName.getCount()) throw new ConflictException(`The username ${username} is already exist`)
        if (await isEmailExist.getCount()) throw new ConflictException(`The username ${email} is already exist`)

        //creating a new user
        const user = new User()

        user.email = email
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.userRepo.hashPassword(password, user.salt)
        user.roles = [Role.USER]
        user.profile = await this.createProfile(user, createProfileDto)
        user.playlists = []
        user.auth = new Auth()
        user.auth.facebookId = null
        user.auth.gmailId = null
        user.auth.validEmail = false

        //sending email verification
        await this.createEmailToken(email)
        await this.sendEmailVerification(email)

        const savedUser = await user.save()
        console.log("savedUser", savedUser)
    }

    async createProfile(user: User, createProfileDto: CreateProfileDto): Promise<Profile> {
        const { firstName, lastName, age, phone, gender, country, city, address } = createProfileDto

        const profile = new Profile()
        profile.firstName = firstName
        profile.lastName = lastName
        profile.age = age
        profile.age = age
        profile.phone = phone
        profile.gender = gender
        profile.country = country
        profile.city = city
        profile.address = address
        profile.user = user
        profile.favorite = await this.createFavoritList(profile)

        return await profile.save()

    }

    async createFavoritList(profile: Profile): Promise<Favorite> {
        const favorite = new Favorite()
        favorite.profile = profile
        favorite.tracks = []

        return await favorite.save()
    }

    async createEmailToken(email: string) {
        const verifiedEmail = await EmailVerification.findOne({ email });
        if (verifiedEmail && ((new Date().getTime() - verifiedEmail.timestamp.getTime()) / 60000) < 15) {
            throw new HttpException('EMAIL_VERIFICATION_SENT_RECENTLY', HttpStatus.BAD_REQUEST);
        } else {
            const newEmailVerification = new EmailVerification()
            newEmailVerification.email = email
            newEmailVerification.emailToken = (Math.floor(Math.random() * (900000)) + 100000).toString();
            newEmailVerification.timestamp = new Date()
            const savedEmailVerificationToken = await newEmailVerification.save()
            console.log("savedEmailVerificationToken", savedEmailVerificationToken)
            return true
        }
    }

    async sendEmailVerification(email: string) {
        const verifiedEmail = await EmailVerification.findOne({ email });

        if (verifiedEmail && verifiedEmail.emailToken) {
            const url = `<a style='text-decoration:none;' href="http://${config.frontEndKeys.url}/${config.frontEndKeys.endpoints[1]}"></a>`
            this.mailerService.sendMail({
                from: `AZ Company, <ahmed.magdy@nabdacare.com>`,
                to: email,
                subject: "Verify email",
                text: "Verify your email man",
                html: `Click here to verify: ${url}`
            }).then((info) => {
                console.log("Message sent successfully to the email", info.messageID)
            }).catch((e) => {
                console.log("faild to send meesage", e)
                throw new ForbiddenException("RegisterUser not Registered")
            })
        }

    }

    async verifyEmail(token: string): Promise<{ isFullyVerified: boolean, user: User }> {
        const verifiedEmail = await EmailVerification.findOne({ emailToken: token })
        if (verifiedEmail && verifiedEmail.email) {
            const user = await this.userRepo.findOne({ email: verifiedEmail.email })
            if (user) {
                user.auth.validEmail = true
                const updatedUser = await user.save()
                await verifiedEmail.remove()
                return { isFullyVerified: true, user: updatedUser }
            }
        }
        throw new ForbiddenException("login email code not valid")
    }

    async login(emailLoginDto: EmailLoginDto): Promise<{ accessToken: string, user: User }> {
        if (!(await this.isValidEmail(emailLoginDto.email))) throw new BadRequestException("Invalid email signature")

        const { email, user } = await this.userRepo.validateUserPassword(emailLoginDto)

        const payload: JWTPayload = { email }

        const accessToken = this.jwtService.sign(payload)

        return { accessToken, user }
    }


    async isValidEmail(email: string): Promise<string> | undefined {

        return
    }

}
