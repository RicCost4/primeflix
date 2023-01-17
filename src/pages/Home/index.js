import { useEffect , useState} from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import "./home.css";

function Home(){
    const [filmes, setFilmes] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilmes(){
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: 'd56495d53211e7a06da01032716281e8',
                    language:  'pt-BR',
                    pagge: 1
                }
            })

            // console.log(response.data.results.slice(0, 10))
            setFilmes(response.data.results.slice(0, 10))
            setLoading(false)
        }

        loadFilmes()
    }, [])

    if(loading){
        return(
            <div className="loading">
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }
    return(
        <div className="container">
            <div className="lista-filmes">
                {filmes.map((e) => {
                    return (
                    <article key={e.id}>
                        <strong>{e.title}</strong>
                        <img src={`https://image.tmdb.org/t/p/original/${e.poster_path}`} alt={e.title}/>
                        <Link to={`/filmes/${e.id}`} >Acessar</Link>
                    </article>
                    )
                })}
            </div>
        </div>
    )
}

export default Home;

// movie/now_playing?api_key=d56495d53211e7a06da01032716281e8&language=pt-BR