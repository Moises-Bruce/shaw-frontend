import { useEffect, useState } from "react"
import { useParams } from "react-router"

export function Details() {
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);

    const { username }= useParams();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/users/${username}/details`)
        .then(response => response.json())
        .then(response => {
            setUser(response.user)
        })

        fetch(`${import.meta.env.VITE_API_URL}/users/${username}/repos`)
        .then(response => response.json())
        .then(response => {
            setRepos(response.repos)
        })
    }, [username])

    return (
        <div>
            <img src={user.avatar_url} className="w-32 h-32 mt-3 ml-3 border-2 border-orange-600" />

            <div className="flex">
                <h1 className="font-bold ml-2">{user.name}</h1> 
            </div>
            <p>{user.login}</p>
            <p>{user.bio}</p>
            <small>{user.location}</small>

            <div className="mt-12">
                <ul>
                    { repos.map(repo => (
                        <li key={repo.id}>
                            <a href={repo.html_url} target="_blank">
                                {repo.name}
                            </a>
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    )
}