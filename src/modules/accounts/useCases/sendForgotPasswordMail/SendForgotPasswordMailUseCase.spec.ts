import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryUsersTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersTokensRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { InMemoryMailProvider } from "@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let dayjsDateProvider: DayjsDateProvider;
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
let inMemoryMailProvider: InMemoryMailProvider

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    dayjsDateProvider = new DayjsDateProvider();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    inMemoryMailProvider = new InMemoryMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dayjsDateProvider,
      inMemoryMailProvider,
    );
  });

  it("shoud be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(inMemoryMailProvider, "sendMail");

    await inMemoryUsersRepository.create({
      driver_license: "666777",
      email: "usertest@email.com",
      name: "John User Test",
      password: "passwordtest",
    });

    await sendForgotPasswordMailUseCase.execute("usertest@email.com");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does exist", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("kj@ur.gr")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("shoud be able to create an users token", async () => {
    const generateTokenMail = spyOn(inMemoryUsersTokensRepository, "create");

    await inMemoryUsersRepository.create({
      driver_license: "666999",
      email: "usertest2@email.com",
      name: "Paul User Test",
      password: "passwordtest2",
    });

    await sendForgotPasswordMailUseCase.execute("usertest2@email.com");

    expect(generateTokenMail).toBeCalled();
  });
});