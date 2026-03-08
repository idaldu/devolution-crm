import { Injectable } from '@nestjs/common';
import type { User } from '@devolution/database';

@Injectable()
export class UsersService {
  private readonly mockUsers: User[] = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@devolution.io',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
    },
    {
      id: 2,
      name: 'Bob Smith',
      email: 'bob@devolution.io',
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02'),
    },
    {
      id: 3,
      name: 'Carol White',
      email: 'carol@devolution.io',
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03'),
    },
  ];

  findAll(): User[] {
    return this.mockUsers;
  }

  findOne(id: number): User | undefined {
    return this.mockUsers.find((u) => u.id === id);
  }
}
