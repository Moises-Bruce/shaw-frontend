import { useEffect, useState } from 'react'

export function List() {
    const [users, setUsers] = useState([])
    const [nextPage, setNextPage] = useState(`${import.meta.env.VITE_API_URL}/users`)

    async function fetchUsers() {
        const response = await fetch(nextPage)
        const data = await response.json()

        return data
    }

    async function handleMoreFetchUsers() {
        const response = await fetchUsers();

        const newUsers = [
            ...users,
            ...response.users
        ];

        setUsers(newUsers);
        setNextPage(response.nextPage);
    }

    useEffect(() => {
        fetchUsers()
        .then(response => {
            setNextPage(response.nextPage);
            setUsers(response.users);
        })
    }, [])

    return (
        <div>
            <h1 className="text-3xl font-bold flex justify-center mt-5">
                List Github Users
            </h1>

            <hr className='mt-5'/>

            <div className='mt-4 grid grid-cols-6 gap-4'>
                {users.map(user => (
                    <a key={user.id} href={`users/${user.login}`} className='flex flex-col items-center border-2 border-orange-900 rounded-lg p-2 bg-orange-300'>
                        <div className='mb-1'>
                            <img className='w-12 h-12 rounded' src={user.avatar_url} />
                        </div>

                        <p className='text-lg text-zinc-800'>{user.login}</p>
                        <span className='text-sm text-zinc-500'>{user.node_id}</span>
                    </a>
                ))}
            </div>

            <div className='flex justify-center items-end'>
                <button className='px-12 py-2 mt-5 rounded bg-orange-700 text-white flex justify-center' onClick={() => handleMoreFetchUsers()}>
                    MAIS
                </button>
            </div>
        </div>
    );
}
