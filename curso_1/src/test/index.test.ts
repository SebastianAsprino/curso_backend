import { describe, it, expect, beforeEach } from 'bun:test';
import { app } from '../index';

describe('API de usuarios', () => {
	it('debería obtener todos los usuarios', async () => {
		const response = await app.handle(new Request('http://localhost/users'));
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual([
			{ id: 1, name: 'John Doe', email: 'john@example.com' },
			{ id: 2, name: 'Jane Doe', email: 'jane@example.com' }
		]);
	});

	it('debería obtener un usuario por ID', async () => {
		const response = await app.handle(new Request('http://localhost/users/1'));
		expect(response.status).toBe(200);
		expect(await response.json()).toEqual({
			id: 1,
			name: 'John Doe',
			email: 'john@example.com'
		});
	});

	it('debería crear un nuevo usuario', async () => {
		const newUser = { name: 'Alice', email: 'alice@example.com' };
		const response = await app.handle(
			new Request('http://localhost/users', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newUser)
			})
		);
		expect(response.status).toBe(200);
		const createdUser = await response.json();
		expect(createdUser).toMatchObject({ id: 3, ...newUser });
	});

	it('debería actualizar un usuario existente', async () => {
		const updatedData = { name: 'John Smith' };
		const response = await app.handle(
			new Request('http://localhost/users/1', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedData)
			})
		);
		expect(response.status).toBe(200);
		const updatedUser = await response.json();
		expect(updatedUser).toMatchObject({
			id: 1,
			name: 'John Smith',
			email: 'john@example.com'
		});
	});

	it('debería eliminar un usuario', async () => {
		const response = await app.handle(
			new Request('http://localhost/users/1', {
				method: 'DELETE'
			})
		);
		expect(response.status).toBe(200);
		const deletedUser = await response.json();
		expect(deletedUser).toEqual([{ id: 1, name: 'John Smith', email: 'john@example.com' }]);
	});
});