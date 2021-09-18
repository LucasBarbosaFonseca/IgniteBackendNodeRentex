import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe("List cars", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(inMemoryCarsRepository);
  });

  it("should be able to list all available cars", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 500.0,
      license_plate: "DEF-1111",
      fine_amount: 700,
      brand: "Car_brand",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("shoud be able to list all available cars by brand", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 500,
      license_plate: "DEF-2222",
      fine_amount: 700,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("shoud be able to list all available cars by name", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 500,
      license_plate: "DEF-3333",
      fine_amount: 700,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });

  it("shoud be able to list all available cars by category", async () => {
    const car = await inMemoryCarsRepository.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 500,
      license_plate: "DEF-4444",
      fine_amount: 700,
      brand: "Car_brand_test",
      category_id: "1234",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "1234",
    });

    expect(cars).toEqual([car]);
  });
});