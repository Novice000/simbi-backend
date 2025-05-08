import prisma from "../database/db";
import { User } from "../prisma/generated/prisma";
import { CreateUserInput, UpdateUserInput } from "../interfaces/user.interfaces";

export async function getAllUsers(): Promise<User[]> {
	return await prisma.user.findMany();
}

export async function getUserById(id: string): Promise<User | null> {
	return await prisma.user.findUnique({
		where: {
			id: id,
		},
	});
}

export async function getUserByEmail(email: string): Promise<User| null> {
	return await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
}

export async function createUser(inputData: CreateUserInput): Promise<Omit<User, "passwordHash">> {
	return await prisma.user.create({
		data: { ...inputData },
		omit: {
			passwordHash: true,
		}
	});
}

export async function updateUser(id: string, inputData: UpdateUserInput): Promise<Omit<User, "passwordHash"> | null> {
	return await prisma.user.update({
		where: {
			id: id,
		},
		data: { ...inputData },
		omit: {
			passwordHash: true,
		}
	});
}

export async function deleteUser(id: string): Promise<Omit<User, "passwordHash"> | null> {
	return await prisma.user.delete({
		where: {
			id: id,
		},
		omit: {
			passwordHash: true,
		}
	});
}
