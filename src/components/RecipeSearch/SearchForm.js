import React from 'react';

const SearchForm = (props) => {

    return <>
        <form>
            <div className="row justify-content-md-center">
                <div className="input-field" style={{width:"70%"}}>
                    <textarea id="search" value={props.inputValue} className="materialize-textarea" onChange={e => {props.onChange(e)}}></textarea>
                    <label htmlFor="search">Search Your Recipes</label>
                    <i className="material-icons prefix">search</i>
                </div>
            </div>
        </form>
    </>
}

export { SearchForm };