import { randomUUID } from "crypto";

import { Replace } from "../../helpers/Replace";

interface SchoolProps {
  name: string;
  createdAt?: Date | null;
}

export class School {
  private _id: string;
  private props: SchoolProps;

  constructor(props: Replace<SchoolProps, { createdAt?: Date }>, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }
}
