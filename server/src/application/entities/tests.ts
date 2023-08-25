import { randomUUID } from "crypto";

import { Replace } from "src/helpers/Replace";

interface TestProps {
  testDate: string;
  testHour: string;
  status: "APPROVED" | "DISAPPROVED" | "MARKED";
  category: "THEORETICAL" | "PRACTICAL";
  createdAt?: Date | null;
}

export class Test {
  private _id: string;
  private props: TestProps;

  constructor(props: Replace<TestProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set testDate(testDate: string) {
    this.props.testDate = testDate;
  }

  public get testDate(): string {
    return this.props.testDate;
  }

  public set testHour(testHour: string) {
    this.props.testHour = testHour;
  }

  public get testHour(): string {
    return this.props.testHour;
  }

  public set status(status: "APPROVED" | "DISAPPROVED" | "MARKED") {
    this.props.status = status;
  }

  public get status(): "APPROVED" | "DISAPPROVED" | "MARKED" {
    return this.props.status;
  }

  public set category(category: "THEORETICAL" | "PRACTICAL") {
    this.props.category = category;
  }

  public get category(): "THEORETICAL" | "PRACTICAL" {
    return this.props.category;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
