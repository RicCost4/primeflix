import { Link } from "react-router-dom"
import "./erro.css"

function Erro(){

    return(
        <div className="not-found">
            <h1>Que Pena, pagina não encontrado.</h1>
            <p>Verifique sua URL ou tente novamente mais tarde.</p>
            <Link to="/">Veja nossos filmes</Link>
        </div>
    )
}

export default Erro