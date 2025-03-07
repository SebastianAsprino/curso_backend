import { Elysia, t } from 'elysia';

// interfaz de la ruta post
const UserBody = t.Object({
	name: t.String(),
	email: t.String()
})

// interfaz de la ruta put
const UserBodyPut = t.Object({
	name: t.Optional(t.String()),
	email: t.Optional(t.String())
});

// Base de datos en memoria para almacenar usuarios
let users: { id: number; name: string; email: string }[] = [
	{ id: 1, name: 'John Doe', email: 'john@example.com' },
	{ id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// Inicializar la aplicación Elysia
export const app = new Elysia()

	// Obtener todos los usuarios (GET)
	.get('/users', () =>
	{
		return users;
	})

	// Obtener un usuario por ID (GET)
	.get('/users/:id', ({ params }) =>
	{
		const user = users.find(u => u.id === parseInt(params.id));
		if (!user)
		{
			return { error: 'Usuario no encontrado' };
		}
		return user;
	})

	// Crear un nuevo usuario (POST)
	.post('/users', ({ body }) =>
	{
		const newUser = {
			id: users.length + 1,
			name: body.name,
			email: body.email
		};
		users.push(newUser);
		return newUser;
	},{body:UserBody}
	)

	// Actualizar un usuario existente (PUT)
	.put('/users/:id', ({ params, body }) =>
	{
		const userIndex = users.findIndex(u => u.id === parseInt(params.id));
		if (userIndex === -1)
		{
			return { error: 'Usuario no encontrado' };
		}
		users[userIndex] = { ...users[userIndex], ...body };
		return users[userIndex];
	},{body:UserBodyPut}
	)

	// Eliminar un usuario (DELETE)
	.delete('/users/:id', ({ params }) =>
	{
		const userIndex = users.findIndex(u => u.id === parseInt(params.id));
		if (userIndex === -1)
		{
			return { error: 'Usuario no encontrado' };
		}
		const deletedUser = users.splice(userIndex, 1);
		return deletedUser;
	});

app.listen(3000)
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
