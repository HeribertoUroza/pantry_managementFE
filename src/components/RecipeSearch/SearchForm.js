import React from 'react';

const SearchForm = (props) => {

    return <>
        <form>
            <div class="row">
                <div className="input-field col s12">
                    <textarea id="search" className="materialize-textarea" onChange={e => {props.onChange(e)}}></textarea>
                    <label htmlFor="search">Search Your Recipes</label>
                    <i className="material-icons prefix">search</i>
                </div>
            </div>
        </form>
    </>
}

export { SearchForm };