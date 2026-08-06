import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    // retrive all the users
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({where: {id}})
    if (user) {
      return {
        name: user.name,
        email: user.email
      };
    }
    return {
      message: `user with id of ${id} not found`
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
