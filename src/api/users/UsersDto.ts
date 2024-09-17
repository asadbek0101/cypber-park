export interface UserProps {
  readonly Email: string;
}

export interface GetAllUsersProps {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly status?: string;
  readonly searchValue?: string;
}

export interface CreateUserProps {
  readonly email: string;
  readonly userName: string;
  readonly roleName: string;
  readonly password: string;
}

export interface UserInitialProps {
  readonly id: number | string;
  readonly name_of_compony: string;
  readonly email: string;
  readonly username: string;
  readonly password: string;
}
