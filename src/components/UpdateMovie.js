import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HookService from '../service/HookService';

///

const UpdateMovie = () => {
    // state
        const params = useParams();
        const [movie, setMovie] = useState({id: 0, Name: '', Director: '',Price: ''});
        const [message, setMessage] = useState({value: '', type: ''});
        const history = useNavigate();
        const [reload, setReload] = useState(false);
    
    
        useEffect(()=> {
            const hookService = new HookService();
            hookService.getMovieById(params.id).then(res => {
                //update state
                console.log("Movie:" , res);
                if(res.status === 200){
                    setMovie(res.data);
                }else {
                    // update error state
                    setMessage({value: 'API err: '+ res.status, type: 'danger'})
                }
            });
         },[] );
    
        const Form = () => {
    
            const {register, handleSubmit, reset, formState: {errors} } = useForm();
    
            const saveMovie = (data) => {
                data.id = movie.id;
                // call  API
                const hookService = new HookService();
                hookService.updateMovie(data).then(res => {
                    if(res.status === 204){
                        // show message
                        setMessage({value: 'Done for movie Id:' + res.data.id , type: 'success'});
                         // update the state = reload the useEffect
                        setReload(!reload);
                    }else {
                        // show error message
                        setMessage({value: 'Error:'+ res.status, type: 'danger'});
                    }
                });
    
                
                    history(`/details/${data.id}`);
                history(`/crud/`);
                
            }
    
            return(
                
                <> 
                    <h2>Update movie</h2> 
                    { movie.Name}  { movie.Director}  { movie.Price}  
                    <form className="form-control m-2 p-3 bg-dark" onSubmit={handleSubmit(saveMovie)}>
                        <div className="row mb-3">
                            <div className="col-6">
                                <input type="text" className="form-control" {...register("Name", {required: true})} placeholder="Movie name" />
                                {errors.Name && <span className="text-danger">Movie Name is Required!</span>}
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" {...register("Director", {required: true})}placeholder="Director" />
                                {errors.Director && <span className="text-danger">Director is Required!</span>}
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col">
                                <input type="text" className="form-control" {...register("Price", {required: true})}placeholder="Price" />
                                
                            </div>
                        </div>
                        
                        <button type="submit" className="btn btn-dark">Update</button>
    
                        <button type="button" className="btn btn-dark m-2" onClick={()=> reset() }>Reset</button>
                    </form>
                </>
            );
        };
    
        return (
            <div>
            <Form/> 
            </div>
        );
    };
    export default UpdateMovie;  