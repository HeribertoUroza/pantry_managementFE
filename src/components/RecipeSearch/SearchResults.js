import React from 'react';
import { Media, Image, Content } from 'reactbulma';

const SearchResults = (props) => {

    const { queryResults } = props;

    return queryResults.map((recipe, i) => {
        return <div className="row my-1">
            <Media>
                <Media.Left>
                    {
                        !recipe.recipe_image_url ? <Image is='64x64' src='https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Vegetarian_diet.jpg/250px-Vegetarian_diet.jpg' /> : <Image is='64x64' src={recipe.recipe_image_url} />
                    }
                </Media.Left>
                <Media.Content>
                    <Content >
                        <p>
                            <strong>{recipe.recipe_name}</strong>
                            <br />
                            {recipe.recipe_notes}
                            {
                                recipe.health_tags === "None" ? null :
                                    recipe.health_tags.map((e, i) => {
                                        return <span className="chip">
                                            {e}
                                        </span>
                                    })
                            }
                        </p>
                    </Content>
                </Media.Content>
            </Media>
        </div>
    })

}

export { SearchResults };