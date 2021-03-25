import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const checkUserExists = this.usersRepository.findById(user_id);

    if (!checkUserExists) {
      throw new Error("User does not exist.");
    }

    if (!checkUserExists.admin) {
      throw new Error("Admin privileges required");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
