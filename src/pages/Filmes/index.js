import { useEffect, useState} from "react"
import {useParams, useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import api from "../../services/api"
import "./filme.css"

function Filmes(){
    const {id} = useParams()
    const navigation = useNavigate()
    const [filme, setFilme] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: 'd56495d53211e7a06da01032716281e8',
                    language:  'pt-BR'
                }
            })
            .then((response)=>{
                setFilme(response.data)
                setLoading(false)
            })
            .catch(() => {
                navigation("/", {replace: true})
                return
            })
        }

        loadFilme()

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigation, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeflix")

        let filmesSalvos = JSON.parse(minhaLista)  || []

        const hasFilmes = filmesSalvos.some((filmesSalvos) => filmesSalvos.id === filme.id) //função some(), ira fazer uma comparação e retorna se true ou false.

        if(hasFilmes){
            toast.warn("Filme já se encontra na sua lista de Favoritos.")
            return
        }

        filmesSalvos.push(filme)
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos))
        toast.success("Filme Salvo com sucesso!!")
    }

    if(loading){
        return(
            <div className="filme-info">
                <h2>Carregando Detalhes...</h2>
            </div>
        )
    }
    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average.toFixed(1)} / 10</strong>

            <div className="area-bnt">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title} trailer`} target="blank" rel="external">
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    )
}

export default Filmes;