import React, { useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import HookService from '../service/HookService';


const CrudDemo = () => {
    const [movies,setMovies] = useState([]);
    const [message, setMessage] = useState({value: '', type: ''});
    const [reload, setReload] = useState(false);
    //const [id,useId]= setState(0);

    // useEffect 
    useEffect(()=>{
        // Send get request to API
        const hookService = new HookService();
        hookService.findAll().then((res)=>{
            if(res.status === 200){
                setMovies(res.data);
                setMessage({value: 'Operation find all.. Done!', type: 'success'});
            } else {
                // display error message
                setMessage({value: 'Operation is Failed!', type: 'danger'});
            }
        });

        // update the state
    },[reload]);

    const Table = () => {

        const TableHeader = ()=> {
            return (
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Genre</th>
                        <th>Director</th>
                        <th>Price</th>
                    </tr>
                </thead>
                ) 
        };

        const TableAction = (props)=> {
            
            const history = useNavigate()

            const showData = () => {
            history(`/details/${props.id}`);
            }

            const deleteById = () => {
                // step 1 = define service class
                const hookService = new HookService();
                hookService.deleteMovieById(props.id).then(res => {
                    if(res.status === 202 ){
                        setMessage({value: 'Delete is Done! (id:' + props.id + ')', type: 'success'});
                        // reload fetch all person
                        setReload(!reload);
                    }else {
                        setMessage({value: 'API Error: '+ res.status, type: 'danger'})
                    }
                });

            }

            const update = () => {
                history(`/updates/${props.id}`);
            }

            return (
            <div>
                <button type="button" className="btn btn-dark" onClick={showData} >Details</button>
                <button type="button" className="btn btn-dark m-2" onClick={deleteById}>Delete</button>
                <button type="button" className="btn btn-dark" onClick={update}>Edit</button>
            </div>)
        };

        const TableRow = ()=> {
            return (
                <tbody>
                {
                    movies.map( (movie)=> (
                        <tr key={movie.id}>
                            <td>{movie.id}</td>
                            <td>{movie.Name} </td>
                            <td>{movie.Genre}</td>
                            <td>{movie.Director}</td>
                            <td>{movie.Price}</td>
                        </tr>
                    ))   
                }                     
                </tbody>
            )
        };

        return(
            <div className="container">
                <table className="table table-striped table-dark">
                    <TableHeader/>
                    <TableRow />
                </table>
            </div>
            );
    };

    const Form = () => {

        const {register, handleSubmit, reset, formState: {errors} } = useForm();

        const saveMovie = (data) => {
            console.log(data);
            // call  API
            const hookService = new HookService();
            hookService.saveMovie(data).then(res => {
                if(res.status === 201){
                    // Display message
                    setMessage({value: 'Done for Movie Id:' + res.data.id , type: 'success'});
                     // update the state = reload the useEffect
                    setReload(!reload);
                }else {
                    // displays an error message
                    setMessage({value: 'Error:'+ res.status, type: 'danger'});
                }
            });
        }


        return(
            <>
                <form className="form-control m-2 p-3 bg-dark" onSubmit={handleSubmit(saveMovie)}>
                    <div className="row mb-3">
                        <div className="col-6">
                            <input type="text" className="form-control" {...register("Name", {required: true})} placeholder="Enter Movie Name" />
                            {errors.Name && <span className="text-danger">Movie Name is Required!</span>}
                        </div>
                        
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" {...register("Genre", {required: true})} placeholder="Enter Genre" />
                            {errors.Genre && <span className="text-danger">Genre is Required!</span>}
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" {...register("Director")} placeholder="Enter Director" />
                        </div>
                    </div>  
                    <div className="row mb-3">
                        <div className="col">
                            <input type="text" className="form-control" {...register("Price")} placeholder="Enter Price" />
                        </div>
                    </div>  
                    <button type="submit" className="btn btn-dark" onClick={()=> saveMovie() }>Add</button>
                    
                    <button type="button" className="btn btn-dark m-2" onClick={()=> reset() }>Reset</button>
                </form>
            </>
        );
    };

    return (
        <div className="container">
            {message && <h6 className={'alert alert-secondary' + message.type}>{message.value}</h6> }
            <h4>Add your Movie</h4>
            <Form />
            <h4>Movie list</h4>
            <Table />
        </div>
    );
};

export default CrudDemo;