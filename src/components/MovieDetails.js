
import React, { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HookService from '../service/HookService';

///

const MovieDetails = () => {
    const params = useParams();
    const [movie, setMovie] = useState({id: 0, Name: '', Genre: '', DirectorName: '', DirectorId: '', CountryName: '', CountryId: '', Price: ''});
    const [setMessage] = useState({value: '', type: ''});
    const history = useNavigate();
    

    useEffect(()=> {
        const hookService = new HookService();
        hookService.getMovieById(params.id).then(res => {
            //update state
            if(res.status === 200){
                console.log(res.data);
                setMovie(res.data);
            }else {
                // update error state
                setMessage({value: 'API Err: '+ res.status, type: 'danger'})
            }
        });
    },[]);
    
    return (
        <React.Fragment>
        <div className="container">
            <div className="card border-light"style={{width: '400px' }}>
                <div className="card-header bg-dark text-white">
                     Movie Details
                </div>
                <div className="card-bodys">
                    <h5 className="card-title bg-dark">Director's Name : { movie.DirectorName}</h5>
                    <p className="card text bg-dark "> Movie ID :  { movie.id}</p>
                    <p className="card text bg-dark ">Movie Name :  { movie.Name}</p>
                    <p className="card text bg-dark "> Genre :  { movie.Genre}</p>
                    <p className="card text bg-dark "> Country :  { movie.CountryName}</p>
                    <p className="card text bg-dark "> Price :  { movie.Price}</p>
                    
                </div>
                <div className="card-footer">
                    <button className="btn btn-dark" onClick={()=> history('/crud')}>Back</button>
                </div>
            </div>
        </div>
        </React.Fragment>
    );
};

export default MovieDetails;