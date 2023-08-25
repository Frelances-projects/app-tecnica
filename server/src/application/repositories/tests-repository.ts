import { Test } from "../entities/tests";

export abstract class TestRepository {
  abstract create(test: Test): Promise<void>;
  abstract findById(testId: string): Promise<Test | null>;
  abstract findMany(): Promise<Test[]>
  abstract save(test: Test): Promise<void>
}
