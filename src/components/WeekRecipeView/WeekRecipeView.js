import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


//ASSETS
import logoDot from '../../assets/Branding/PossiblePantryLogoGreenDott.png';
import logoName from '../../assets/Branding/PossiblePantryLogoGreenName.png';


const recipes = {
    "q" : "chicken",
    "from" : 0,
    "to" : 3,
    "params" : {
      "sane" : [ ],
      "q" : [ "chicken" ],
      "app_key" : [ "8fc52304d875dcc621a0a97c675ace9c" ],
      "health" : [ "vegan" ],
      "from" : [ "0" ],
      "to" : [ "3" ],
      "calories" : [ "591-722" ],
      "app_id" : [ "127a0eab" ]
    },
    "more" : true,
    "count" : 12,
    "hits" : [ {
      "recipe" : {
        "uri" : "http://www.edamam.com/ontologies/edamam.owl#recipe_7453281a33e86d2e7b1cb99b447e63b7",
        "label" : "Chicken, Mango, and Rice Salad",
        "image" : "https://www.edamam.com/web-img/bfe/bfebc27537c375f97daec611ba79d587.jpg",
        "source" : "Delish",
        "url" : "http://www.delish.com/cooking/recipe-ideas/recipes/a3535/chicken-mango-rice-salad-recipe-8045/",
        "shareAs" : "http://www.edamam.com/recipe/chicken-mango-and-rice-salad-7453281a33e86d2e7b1cb99b447e63b7/chicken/vegan/591-722-cal",
        "yield" : 4.0,
        "dietLabels" : [ ],
        "healthLabels" : [ "Vegan", "Vegetarian", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free" ],
        "cautions" : [ "Sulfites" ],
        "ingredientLines" : [ "1½ c. RICE", "1⅓ lb. boneless", "⅓ c. plus 1 tablespoon cooking oil", "1¼ tsp. salt", "¾ tsp. fresh-ground black pepper", "¾ c. Chopped red onion", "1 mango", "1 avocado", "3½ tbsp. lime juice (from about 2 limes)", "¾ c. Chopped cilantro" ],
        "ingredients" : [ {
          "text" : "1½ c. RICE",
          "weight" : 292.5
        }, {
          "text" : "⅓ c. plus 1 tablespoon cooking oil",
          "weight" : 72.66666666666666
        }, {
          "text" : "⅓ c. plus 1 tablespoon cooking oil",
          "weight" : 14.0
        }, {
          "text" : "1¼ tsp. salt",
          "weight" : 7.5
        }, {
          "text" : "¾ tsp. fresh-ground black pepper",
          "weight" : 2.175
        }, {
          "text" : "¾ c. Chopped red onion",
          "weight" : 120.0
        }, {
          "text" : "1 mango",
          "weight" : 336.0
        }, {
          "text" : "1 avocado",
          "weight" : 201.0
        }, {
          "text" : "3½ tbsp. lime juice (from about 2 limes)",
          "weight" : 53.89999999908871
        }, {
          "text" : "¾ c. Chopped cilantro",
          "weight" : 12.0
        } ],
        "calories" : 2412.0275833331057,
        "totalWeight" : 1110.7840680048284,
        "totalTime" : 0.0,
        "totalNutrients" : {
          "ENERC_KCAL" : {
            "label" : "Energy",
            "quantity" : 2412.0275833331057,
            "unit" : "kcal"
          },
          "FAT" : {
            "label" : "Fat",
            "quantity" : 119.397601666666,
            "unit" : "g"
          },
          "FASAT" : {
            "label" : "Saturated",
            "quantity" : 11.51419799999993,
            "unit" : "g"
          },
          "FATRN" : {
            "label" : "Trans",
            "quantity" : 0.3423333333333333,
            "unit" : "g"
          },
          "FAMS" : {
            "label" : "Monounsaturated",
            "quantity" : 75.60400024999993,
            "unit" : "g"
          },
          "FAPU" : {
            "label" : "Polyunsaturated",
            "quantity" : 28.79113183333312,
            "unit" : "g"
          },
          "CHOCDF" : {
            "label" : "Carbs",
            "quantity" : 317.1252924999234,
            "unit" : "g"
          },
          "FIBTG" : {
            "label" : "Fiber",
            "quantity" : 21.984874999996354,
            "unit" : "g"
          },
          "SUGAR" : {
            "label" : "Sugars",
            "quantity" : 53.34142999998459,
            "unit" : "g"
          },
          "PROCNT" : {
            "label" : "Protein",
            "quantity" : 28.137412499996177,
            "unit" : "g"
          },
          "NA" : {
            "label" : "Sodium",
            "quantity" : 2567.8919109978815,
            "unit" : "mg"
          },
          "CA" : {
            "label" : "Calcium",
            "quantity" : 141.79642632124992,
            "unit" : "mg"
          },
          "MG" : {
            "label" : "Magnesium",
            "quantity" : 217.48167401331787,
            "unit" : "mg"
          },
          "K" : {
            "label" : "Potassium",
            "quantity" : 2121.09214210606,
            "unit" : "mg"
          },
          "FE" : {
            "label" : "Iron",
            "quantity" : 4.72879242441812,
            "unit" : "mg"
          },
          "ZN" : {
            "label" : "Zinc",
            "quantity" : 5.321344901338344,
            "unit" : "mg"
          },
          "P" : {
            "label" : "Phosphorus",
            "quantity" : 519.0024999998725,
            "unit" : "mg"
          },
          "VITA_RAE" : {
            "label" : "Vitamin A",
            "quantity" : 237.61524999998178,
            "unit" : "µg"
          },
          "VITC" : {
            "label" : "Vitamin C",
            "quantity" : 170.6939999997266,
            "unit" : "mg"
          },
          "THIA" : {
            "label" : "Thiamin (B1)",
            "quantity" : 0.5125639999997723,
            "unit" : "mg"
          },
          "RIBF" : {
            "label" : "Riboflavin (B2)",
            "quantity" : 0.5932199999998634,
            "unit" : "mg"
          },
          "NIA" : {
            "label" : "Niacin (B3)",
            "quantity" : 10.795498249998706,
            "unit" : "mg"
          },
          "VITB6A" : {
            "label" : "Vitamin B6",
            "quantity" : 1.5292262499996536,
            "unit" : "mg"
          },
          "FOLDFE" : {
            "label" : "Folate equivalent (total)",
            "quantity" : 369.6147499999089,
            "unit" : "µg"
          },
          "FOLFD" : {
            "label" : "Folate (food)",
            "quantity" : 369.6147499999089,
            "unit" : "µg"
          },
          "TOCPHA" : {
            "label" : "Vitamin E",
            "quantity" : 22.781899999997997,
            "unit" : "mg"
          },
          "VITK1" : {
            "label" : "Vitamin K",
            "quantity" : 159.67920833332786,
            "unit" : "µg"
          }
        },
        "totalDaily" : {
          "ENERC_KCAL" : {
            "label" : "Energy",
            "quantity" : 120.60137916665529,
            "unit" : "%"
          },
          "FAT" : {
            "label" : "Fat",
            "quantity" : 183.68861794871694,
            "unit" : "%"
          },
          "FASAT" : {
            "label" : "Saturated",
            "quantity" : 57.57098999999964,
            "unit" : "%"
          },
          "CHOCDF" : {
            "label" : "Carbs",
            "quantity" : 105.70843083330779,
            "unit" : "%"
          },
          "FIBTG" : {
            "label" : "Fiber",
            "quantity" : 87.93949999998542,
            "unit" : "%"
          },
          "PROCNT" : {
            "label" : "Protein",
            "quantity" : 56.274824999992354,
            "unit" : "%"
          },
          "NA" : {
            "label" : "Sodium",
            "quantity" : 106.99549629157839,
            "unit" : "%"
          },
          "CA" : {
            "label" : "Calcium",
            "quantity" : 14.179642632124994,
            "unit" : "%"
          },
          "MG" : {
            "label" : "Magnesium",
            "quantity" : 51.78135095555187,
            "unit" : "%"
          },
          "K" : {
            "label" : "Potassium",
            "quantity" : 45.12962004480978,
            "unit" : "%"
          },
          "FE" : {
            "label" : "Iron",
            "quantity" : 26.27106902454511,
            "unit" : "%"
          },
          "ZN" : {
            "label" : "Zinc",
            "quantity" : 48.3758627394395,
            "unit" : "%"
          },
          "P" : {
            "label" : "Phosphorus",
            "quantity" : 74.14321428569608,
            "unit" : "%"
          },
          "VITA_RAE" : {
            "label" : "Vitamin A",
            "quantity" : 26.40169444444242,
            "unit" : "%"
          },
          "VITC" : {
            "label" : "Vitamin C",
            "quantity" : 189.6599999996962,
            "unit" : "%"
          },
          "THIA" : {
            "label" : "Thiamin (B1)",
            "quantity" : 42.7136666666477,
            "unit" : "%"
          },
          "RIBF" : {
            "label" : "Riboflavin (B2)",
            "quantity" : 45.63230769229718,
            "unit" : "%"
          },
          "NIA" : {
            "label" : "Niacin (B3)",
            "quantity" : 67.47186406249192,
            "unit" : "%"
          },
          "VITB6A" : {
            "label" : "Vitamin B6",
            "quantity" : 117.63278846151181,
            "unit" : "%"
          },
          "FOLDFE" : {
            "label" : "Folate equivalent (total)",
            "quantity" : 92.40368749997722,
            "unit" : "%"
          },
          "TOCPHA" : {
            "label" : "Vitamin E",
            "quantity" : 151.87933333331998,
            "unit" : "%"
          },
          "VITK1" : {
            "label" : "Vitamin K",
            "quantity" : 133.0660069444399,
            "unit" : "%"
          }
        },
        "digest" : [ {
          "label" : "Fat",
          "tag" : "FAT",
          "schemaOrgTag" : "fatContent",
          "total" : 119.397601666666,
          "hasRDI" : true,
          "daily" : 183.68861794871694,
          "unit" : "g",
          "sub" : [ {
            "label" : "Saturated",
            "tag" : "FASAT",
            "schemaOrgTag" : "saturatedFatContent",
            "total" : 11.51419799999993,
            "hasRDI" : true,
            "daily" : 57.57098999999964,
            "unit" : "g"
          }, {
            "label" : "Trans",
            "tag" : "FATRN",
            "schemaOrgTag" : "transFatContent",
            "total" : 0.3423333333333333,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Monounsaturated",
            "tag" : "FAMS",
            "schemaOrgTag" : null,
            "total" : 75.60400024999993,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Polyunsaturated",
            "tag" : "FAPU",
            "schemaOrgTag" : null,
            "total" : 28.79113183333312,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          } ]
        }, {
          "label" : "Carbs",
          "tag" : "CHOCDF",
          "schemaOrgTag" : "carbohydrateContent",
          "total" : 317.1252924999234,
          "hasRDI" : true,
          "daily" : 105.70843083330779,
          "unit" : "g",
          "sub" : [ {
            "label" : "Carbs (net)",
            "tag" : "CHOCDF.net",
            "schemaOrgTag" : null,
            "total" : 295.140417499927,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Fiber",
            "tag" : "FIBTG",
            "schemaOrgTag" : "fiberContent",
            "total" : 21.984874999996354,
            "hasRDI" : true,
            "daily" : 87.93949999998542,
            "unit" : "g"
          }, {
            "label" : "Sugars",
            "tag" : "SUGAR",
            "schemaOrgTag" : "sugarContent",
            "total" : 53.34142999998459,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Sugars, added",
            "tag" : "SUGAR.added",
            "schemaOrgTag" : null,
            "total" : 0.0,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          } ]
        }, {
          "label" : "Protein",
          "tag" : "PROCNT",
          "schemaOrgTag" : "proteinContent",
          "total" : 28.137412499996177,
          "hasRDI" : true,
          "daily" : 56.274824999992354,
          "unit" : "g"
        }, {
          "label" : "Cholesterol",
          "tag" : "CHOLE",
          "schemaOrgTag" : "cholesterolContent",
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "mg"
        }, {
          "label" : "Sodium",
          "tag" : "NA",
          "schemaOrgTag" : "sodiumContent",
          "total" : 2567.8919109978815,
          "hasRDI" : true,
          "daily" : 106.99549629157839,
          "unit" : "mg"
        }, {
          "label" : "Calcium",
          "tag" : "CA",
          "schemaOrgTag" : null,
          "total" : 141.79642632124992,
          "hasRDI" : true,
          "daily" : 14.179642632124994,
          "unit" : "mg"
        }, {
          "label" : "Magnesium",
          "tag" : "MG",
          "schemaOrgTag" : null,
          "total" : 217.48167401331787,
          "hasRDI" : true,
          "daily" : 51.78135095555187,
          "unit" : "mg"
        }, {
          "label" : "Potassium",
          "tag" : "K",
          "schemaOrgTag" : null,
          "total" : 2121.09214210606,
          "hasRDI" : true,
          "daily" : 45.12962004480978,
          "unit" : "mg"
        }, {
          "label" : "Iron",
          "tag" : "FE",
          "schemaOrgTag" : null,
          "total" : 4.72879242441812,
          "hasRDI" : true,
          "daily" : 26.27106902454511,
          "unit" : "mg"
        }, {
          "label" : "Zinc",
          "tag" : "ZN",
          "schemaOrgTag" : null,
          "total" : 5.321344901338344,
          "hasRDI" : true,
          "daily" : 48.3758627394395,
          "unit" : "mg"
        }, {
          "label" : "Phosphorus",
          "tag" : "P",
          "schemaOrgTag" : null,
          "total" : 519.0024999998725,
          "hasRDI" : true,
          "daily" : 74.14321428569608,
          "unit" : "mg"
        }, {
          "label" : "Vitamin A",
          "tag" : "VITA_RAE",
          "schemaOrgTag" : null,
          "total" : 237.61524999998178,
          "hasRDI" : true,
          "daily" : 26.40169444444242,
          "unit" : "µg"
        }, {
          "label" : "Vitamin C",
          "tag" : "VITC",
          "schemaOrgTag" : null,
          "total" : 170.6939999997266,
          "hasRDI" : true,
          "daily" : 189.6599999996962,
          "unit" : "mg"
        }, {
          "label" : "Thiamin (B1)",
          "tag" : "THIA",
          "schemaOrgTag" : null,
          "total" : 0.5125639999997723,
          "hasRDI" : true,
          "daily" : 42.7136666666477,
          "unit" : "mg"
        }, {
          "label" : "Riboflavin (B2)",
          "tag" : "RIBF",
          "schemaOrgTag" : null,
          "total" : 0.5932199999998634,
          "hasRDI" : true,
          "daily" : 45.63230769229718,
          "unit" : "mg"
        }, {
          "label" : "Niacin (B3)",
          "tag" : "NIA",
          "schemaOrgTag" : null,
          "total" : 10.795498249998706,
          "hasRDI" : true,
          "daily" : 67.47186406249192,
          "unit" : "mg"
        }, {
          "label" : "Vitamin B6",
          "tag" : "VITB6A",
          "schemaOrgTag" : null,
          "total" : 1.5292262499996536,
          "hasRDI" : true,
          "daily" : 117.63278846151181,
          "unit" : "mg"
        }, {
          "label" : "Folate equivalent (total)",
          "tag" : "FOLDFE",
          "schemaOrgTag" : null,
          "total" : 369.6147499999089,
          "hasRDI" : true,
          "daily" : 92.40368749997722,
          "unit" : "µg"
        }, {
          "label" : "Folate (food)",
          "tag" : "FOLFD",
          "schemaOrgTag" : null,
          "total" : 369.6147499999089,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Folic acid",
          "tag" : "FOLAC",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin B12",
          "tag" : "VITB12",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin D",
          "tag" : "VITD",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin E",
          "tag" : "TOCPHA",
          "schemaOrgTag" : null,
          "total" : 22.781899999997997,
          "hasRDI" : true,
          "daily" : 151.87933333331998,
          "unit" : "mg"
        }, {
          "label" : "Vitamin K",
          "tag" : "VITK1",
          "schemaOrgTag" : null,
          "total" : 159.67920833332786,
          "hasRDI" : true,
          "daily" : 133.0660069444399,
          "unit" : "µg"
        } ]
      },
      "bookmarked" : false,
      "bought" : false
    }, {
      "recipe" : {
        "uri" : "http://www.edamam.com/ontologies/edamam.owl#recipe_f7755dda4719035bff3222704e69ed9a",
        "label" : "Avocado Dressing for BLT Salad",
        "image" : "https://www.edamam.com/web-img/427/427c9cd3a881808b53bbf9cdfe8ec7c2.jpg",
        "source" : "Martha Stewart",
        "url" : "https://www.marthastewart.com/340325/avocado-dressing",
        "shareAs" : "http://www.edamam.com/recipe/avocado-dressing-for-blt-salad-f7755dda4719035bff3222704e69ed9a/chicken/vegan/591-722-cal",
        "yield" : 2.0,
        "dietLabels" : [ "Low-Carb" ],
        "healthLabels" : [ "Sugar-Conscious", "Vegan", "Vegetarian", "Peanut-Free", "Tree-Nut-Free", "Alcohol-Free" ],
        "cautions" : [ "Sulfites" ],
        "ingredientLines" : [ "1 ripe avocado", "1/4 cup loosely packed fresh basil leaves", "1 small clove garlic, peeled", "Juice of 2 limes", "3 tablespoons red-wine vinegar", "1/2 cup olive oil", "Salt and freshly ground black pepper" ],
        "ingredients" : [ {
          "text" : "1 ripe avocado",
          "weight" : 201.0
        }, {
          "text" : "1/4 cup loosely packed fresh basil leaves",
          "weight" : 6.0
        }, {
          "text" : "1 small clove garlic, peeled",
          "weight" : 2.25
        }, {
          "text" : "Juice of 2 limes",
          "weight" : 134.0
        }, {
          "text" : "3 tablespoons red-wine vinegar",
          "weight" : 44.7
        }, {
          "text" : "1/2 cup olive oil",
          "weight" : 108.0
        }, {
          "text" : "Salt and freshly ground black pepper",
          "weight" : 2.9757
        }, {
          "text" : "Salt and freshly ground black pepper",
          "weight" : 1.48785
        } ],
        "calories" : 1333.4800035,
        "totalWeight" : 500.36208680638316,
        "totalTime" : 0.0,
        "totalNutrients" : {
          "ENERC_KCAL" : {
            "label" : "Energy",
            "quantity" : 1333.4800035,
            "unit" : "kcal"
          },
          "FAT" : {
            "label" : "Fat",
            "quantity" : 137.83275391,
            "unit" : "g"
          },
          "FASAT" : {
            "label" : "Saturated",
            "quantity" : 19.240553372,
            "unit" : "g"
          },
          "FAMS" : {
            "label" : "Monounsaturated",
            "quantity" : 98.53585271150001,
            "unit" : "g"
          },
          "FAPU" : {
            "label" : "Polyunsaturated",
            "quantity" : 15.132491243000002,
            "unit" : "g"
          },
          "CHOCDF" : {
            "label" : "Carbs",
            "quantity" : 33.243920075000005,
            "unit" : "g"
          },
          "FIBTG" : {
            "label" : "Fiber",
            "quantity" : 17.738676050000002,
            "unit" : "g"
          },
          "SUGAR" : {
            "label" : "Sugars",
            "quantity" : 3.6412222400000003,
            "unit" : "g"
          },
          "PROCNT" : {
            "label" : "Protein",
            "quantity" : 5.462567614999999,
            "unit" : "g"
          },
          "NA" : {
            "label" : "Sodium",
            "quantity" : 1156.781771418,
            "unit" : "mg"
          },
          "CA" : {
            "label" : "Calcium",
            "quantity" : 94.08749233353197,
            "unit" : "mg"
          },
          "MG" : {
            "label" : "Magnesium",
            "quantity" : 75.09396586806385,
            "unit" : "mg"
          },
          "K" : {
            "label" : "Potassium",
            "quantity" : 1176.7729654445106,
            "unit" : "mg"
          },
          "FE" : {
            "label" : "Iron",
            "quantity" : 3.0980202164610646,
            "unit" : "mg"
          },
          "ZN" : {
            "label" : "Zinc",
            "quantity" : 1.5425396518063832,
            "unit" : "mg"
          },
          "P" : {
            "label" : "Phosphorus",
            "quantity" : 141.369303,
            "unit" : "mg"
          },
          "VITA_RAE" : {
            "label" : "Vitamin A",
            "quantity" : 32.9917195,
            "unit" : "µg"
          },
          "VITC" : {
            "label" : "Vitamin C",
            "quantity" : 61.099500000000006,
            "unit" : "mg"
          },
          "THIA" : {
            "label" : "Thiamin (B1)",
            "quantity" : 0.18301687800000002,
            "unit" : "mg"
          },
          "RIBF" : {
            "label" : "Riboflavin (B2)",
            "quantity" : 0.29781313000000004,
            "unit" : "mg"
          },
          "NIA" : {
            "label" : "Niacin (B3)",
            "quantity" : 3.8482561255000007,
            "unit" : "mg"
          },
          "VITB6A" : {
            "label" : "Vitamin B6",
            "quantity" : 0.6156071435,
            "unit" : "mg"
          },
          "FOLDFE" : {
            "label" : "Folate equivalent (total)",
            "quantity" : 177.93043450000005,
            "unit" : "µg"
          },
          "FOLFD" : {
            "label" : "Folate (food)",
            "quantity" : 177.93043450000005,
            "unit" : "µg"
          },
          "TOCPHA" : {
            "label" : "Vitamin E",
            "quantity" : 20.018773640000003,
            "unit" : "mg"
          },
          "VITK1" : {
            "label" : "Vitamin K",
            "quantity" : 135.39186045000002,
            "unit" : "µg"
          }
        },
        "totalDaily" : {
          "ENERC_KCAL" : {
            "label" : "Energy",
            "quantity" : 66.674000175,
            "unit" : "%"
          },
          "FAT" : {
            "label" : "Fat",
            "quantity" : 212.05039063076924,
            "unit" : "%"
          },
          "FASAT" : {
            "label" : "Saturated",
            "quantity" : 96.20276686000001,
            "unit" : "%"
          },
          "CHOCDF" : {
            "label" : "Carbs",
            "quantity" : 11.081306691666668,
            "unit" : "%"
          },
          "FIBTG" : {
            "label" : "Fiber",
            "quantity" : 70.95470420000001,
            "unit" : "%"
          },
          "PROCNT" : {
            "label" : "Protein",
            "quantity" : 10.925135229999999,
            "unit" : "%"
          },
          "NA" : {
            "label" : "Sodium",
            "quantity" : 48.19924047575,
            "unit" : "%"
          },
          "CA" : {
            "label" : "Calcium",
            "quantity" : 9.408749233353197,
            "unit" : "%"
          },
          "MG" : {
            "label" : "Magnesium",
            "quantity" : 17.879515682872345,
            "unit" : "%"
          },
          "K" : {
            "label" : "Potassium",
            "quantity" : 25.037722669032142,
            "unit" : "%"
          },
          "FE" : {
            "label" : "Iron",
            "quantity" : 17.211223424783693,
            "unit" : "%"
          },
          "ZN" : {
            "label" : "Zinc",
            "quantity" : 14.023087743694392,
            "unit" : "%"
          },
          "P" : {
            "label" : "Phosphorus",
            "quantity" : 20.195614714285714,
            "unit" : "%"
          },
          "VITA_RAE" : {
            "label" : "Vitamin A",
            "quantity" : 3.6657466111111114,
            "unit" : "%"
          },
          "VITC" : {
            "label" : "Vitamin C",
            "quantity" : 67.88833333333334,
            "unit" : "%"
          },
          "THIA" : {
            "label" : "Thiamin (B1)",
            "quantity" : 15.251406500000003,
            "unit" : "%"
          },
          "RIBF" : {
            "label" : "Riboflavin (B2)",
            "quantity" : 22.90870230769231,
            "unit" : "%"
          },
          "NIA" : {
            "label" : "Niacin (B3)",
            "quantity" : 24.051600784375005,
            "unit" : "%"
          },
          "VITB6A" : {
            "label" : "Vitamin B6",
            "quantity" : 47.35439565384615,
            "unit" : "%"
          },
          "FOLDFE" : {
            "label" : "Folate equivalent (total)",
            "quantity" : 44.48260862500001,
            "unit" : "%"
          },
          "TOCPHA" : {
            "label" : "Vitamin E",
            "quantity" : 133.45849093333334,
            "unit" : "%"
          },
          "VITK1" : {
            "label" : "Vitamin K",
            "quantity" : 112.82655037500002,
            "unit" : "%"
          }
        },
        "digest" : [ {
          "label" : "Fat",
          "tag" : "FAT",
          "schemaOrgTag" : "fatContent",
          "total" : 137.83275391,
          "hasRDI" : true,
          "daily" : 212.05039063076924,
          "unit" : "g",
          "sub" : [ {
            "label" : "Saturated",
            "tag" : "FASAT",
            "schemaOrgTag" : "saturatedFatContent",
            "total" : 19.240553372,
            "hasRDI" : true,
            "daily" : 96.20276686000001,
            "unit" : "g"
          }, {
            "label" : "Trans",
            "tag" : "FATRN",
            "schemaOrgTag" : "transFatContent",
            "total" : 0.0,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Monounsaturated",
            "tag" : "FAMS",
            "schemaOrgTag" : null,
            "total" : 98.53585271150001,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Polyunsaturated",
            "tag" : "FAPU",
            "schemaOrgTag" : null,
            "total" : 15.132491243000002,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          } ]
        }, {
          "label" : "Carbs",
          "tag" : "CHOCDF",
          "schemaOrgTag" : "carbohydrateContent",
          "total" : 33.243920075000005,
          "hasRDI" : true,
          "daily" : 11.081306691666668,
          "unit" : "g",
          "sub" : [ {
            "label" : "Carbs (net)",
            "tag" : "CHOCDF.net",
            "schemaOrgTag" : null,
            "total" : 15.505244025000003,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Fiber",
            "tag" : "FIBTG",
            "schemaOrgTag" : "fiberContent",
            "total" : 17.738676050000002,
            "hasRDI" : true,
            "daily" : 70.95470420000001,
            "unit" : "g"
          }, {
            "label" : "Sugars",
            "tag" : "SUGAR",
            "schemaOrgTag" : "sugarContent",
            "total" : 3.6412222400000003,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Sugars, added",
            "tag" : "SUGAR.added",
            "schemaOrgTag" : null,
            "total" : 0.0,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          } ]
        }, {
          "label" : "Protein",
          "tag" : "PROCNT",
          "schemaOrgTag" : "proteinContent",
          "total" : 5.462567614999999,
          "hasRDI" : true,
          "daily" : 10.925135229999999,
          "unit" : "g"
        }, {
          "label" : "Cholesterol",
          "tag" : "CHOLE",
          "schemaOrgTag" : "cholesterolContent",
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "mg"
        }, {
          "label" : "Sodium",
          "tag" : "NA",
          "schemaOrgTag" : "sodiumContent",
          "total" : 1156.781771418,
          "hasRDI" : true,
          "daily" : 48.19924047575,
          "unit" : "mg"
        }, {
          "label" : "Calcium",
          "tag" : "CA",
          "schemaOrgTag" : null,
          "total" : 94.08749233353197,
          "hasRDI" : true,
          "daily" : 9.408749233353197,
          "unit" : "mg"
        }, {
          "label" : "Magnesium",
          "tag" : "MG",
          "schemaOrgTag" : null,
          "total" : 75.09396586806385,
          "hasRDI" : true,
          "daily" : 17.879515682872345,
          "unit" : "mg"
        }, {
          "label" : "Potassium",
          "tag" : "K",
          "schemaOrgTag" : null,
          "total" : 1176.7729654445106,
          "hasRDI" : true,
          "daily" : 25.037722669032142,
          "unit" : "mg"
        }, {
          "label" : "Iron",
          "tag" : "FE",
          "schemaOrgTag" : null,
          "total" : 3.0980202164610646,
          "hasRDI" : true,
          "daily" : 17.211223424783693,
          "unit" : "mg"
        }, {
          "label" : "Zinc",
          "tag" : "ZN",
          "schemaOrgTag" : null,
          "total" : 1.5425396518063832,
          "hasRDI" : true,
          "daily" : 14.023087743694392,
          "unit" : "mg"
        }, {
          "label" : "Phosphorus",
          "tag" : "P",
          "schemaOrgTag" : null,
          "total" : 141.369303,
          "hasRDI" : true,
          "daily" : 20.195614714285714,
          "unit" : "mg"
        }, {
          "label" : "Vitamin A",
          "tag" : "VITA_RAE",
          "schemaOrgTag" : null,
          "total" : 32.9917195,
          "hasRDI" : true,
          "daily" : 3.6657466111111114,
          "unit" : "µg"
        }, {
          "label" : "Vitamin C",
          "tag" : "VITC",
          "schemaOrgTag" : null,
          "total" : 61.099500000000006,
          "hasRDI" : true,
          "daily" : 67.88833333333334,
          "unit" : "mg"
        }, {
          "label" : "Thiamin (B1)",
          "tag" : "THIA",
          "schemaOrgTag" : null,
          "total" : 0.18301687800000002,
          "hasRDI" : true,
          "daily" : 15.251406500000003,
          "unit" : "mg"
        }, {
          "label" : "Riboflavin (B2)",
          "tag" : "RIBF",
          "schemaOrgTag" : null,
          "total" : 0.29781313000000004,
          "hasRDI" : true,
          "daily" : 22.90870230769231,
          "unit" : "mg"
        }, {
          "label" : "Niacin (B3)",
          "tag" : "NIA",
          "schemaOrgTag" : null,
          "total" : 3.8482561255000007,
          "hasRDI" : true,
          "daily" : 24.051600784375005,
          "unit" : "mg"
        }, {
          "label" : "Vitamin B6",
          "tag" : "VITB6A",
          "schemaOrgTag" : null,
          "total" : 0.6156071435,
          "hasRDI" : true,
          "daily" : 47.35439565384615,
          "unit" : "mg"
        }, {
          "label" : "Folate equivalent (total)",
          "tag" : "FOLDFE",
          "schemaOrgTag" : null,
          "total" : 177.93043450000005,
          "hasRDI" : true,
          "daily" : 44.48260862500001,
          "unit" : "µg"
        }, {
          "label" : "Folate (food)",
          "tag" : "FOLFD",
          "schemaOrgTag" : null,
          "total" : 177.93043450000005,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Folic acid",
          "tag" : "FOLAC",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin B12",
          "tag" : "VITB12",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin D",
          "tag" : "VITD",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin E",
          "tag" : "TOCPHA",
          "schemaOrgTag" : null,
          "total" : 20.018773640000003,
          "hasRDI" : true,
          "daily" : 133.45849093333334,
          "unit" : "mg"
        }, {
          "label" : "Vitamin K",
          "tag" : "VITK1",
          "schemaOrgTag" : null,
          "total" : 135.39186045000002,
          "hasRDI" : true,
          "daily" : 112.82655037500002,
          "unit" : "µg"
        } ]
      },
      "bookmarked" : false,
      "bought" : false
    }, {
      "recipe" : {
        "uri" : "http://www.edamam.com/ontologies/edamam.owl#recipe_3691776b510e98de32a6b0ba6d820f80",
        "label" : "Campfire Couscous with Zucchini and Pine Nuts Recipe",
        "image" : "https://www.edamam.com/web-img/ce2/ce246ce8907cd43ce18bc8f7a6c3f34c.jpg",
        "source" : "Chowhound",
        "url" : "http://www.chowhound.com/recipes/campfire-couscous-with-zucchini-and-pine-nuts-10943",
        "shareAs" : "http://www.edamam.com/recipe/campfire-couscous-with-zucchini-and-pine-nuts-recipe-3691776b510e98de32a6b0ba6d820f80/chicken/vegan/591-722-cal",
        "yield" : 4.0,
        "dietLabels" : [ "Balanced" ],
        "healthLabels" : [ "Vegan", "Vegetarian", "Peanut-Free", "Alcohol-Free" ],
        "cautions" : [ "Sulfites" ],
        "ingredientLines" : [ "4 tablespoons vegetable oil", "1 medium garlic clove, thinly sliced", "Chef’s salt and pepper mix", "3 cups dry israeli couscous", "4 1/2 cups water", "1 fresh thyme sprig", "2 medium zucchini, seeded and cut into small dice (about 1/2 cup)", "1/4 cup toasted pine nuts", "3 tablespoons zante currants" ],
        "ingredients" : [ {
          "text" : "4 tablespoons vegetable oil",
          "weight" : 56.0
        }, {
          "text" : "1 medium garlic clove, thinly sliced",
          "weight" : 3.0
        }, {
          "text" : "Chef’s salt and pepper mix",
          "weight" : 12.60149999999726
        }, {
          "text" : "Chef’s salt and pepper mix",
          "weight" : 6.30074999999863
        }, {
          "text" : "3 cups dry israeli couscous",
          "weight" : 519.0
        }, {
          "text" : "4 1/2 cups water",
          "weight" : 1066.5
        }, {
          "text" : "1 fresh thyme sprig",
          "weight" : 3.0
        }, {
          "text" : "2 medium zucchini, seeded and cut into small dice (about 1/2 cup)",
          "weight" : 392.0
        }, {
          "text" : "1/4 cup toasted pine nuts",
          "weight" : 33.75
        }, {
          "text" : "3 tablespoons zante currants",
          "weight" : 26.999999999543512
        } ],
        "calories" : 2839.9823824987047,
        "totalWeight" : 2118.852588299013,
        "totalTime" : 189.0,
        "totalNutrients" : {
          "ENERC_KCAL" : {
            "label" : "Energy",
            "quantity" : 2839.9823824987047,
            "unit" : "kcal"
          },
          "FAT" : {
            "label" : "Fat",
            "quantity" : 83.99457944999874,
            "unit" : "g"
          },
          "FASAT" : {
            "label" : "Saturated",
            "quantity" : 6.348028939999853,
            "unit" : "g"
          },
          "FATRN" : {
            "label" : "Trans",
            "quantity" : 0.42952000000000007,
            "unit" : "g"
          },
          "FAMS" : {
            "label" : "Monounsaturated",
            "quantity" : 47.214852542499784,
            "unit" : "g"
          },
          "FAPU" : {
            "label" : "Polyunsaturated",
            "quantity" : 22.873353984999166,
            "unit" : "g"
          },
          "CHOCDF" : {
            "label" : "Carbs",
            "quantity" : 444.22362962466093,
            "unit" : "g"
          },
          "FIBTG" : {
            "label" : "Fiber",
            "quantity" : 35.03183974996862,
            "unit" : "g"
          },
          "SUGAR" : {
            "label" : "Sugars",
            "quantity" : 29.24754979969287,
            "unit" : "g"
          },
          "PROCNT" : {
            "label" : "Protein",
            "quantity" : 77.70182292498123,
            "unit" : "g"
          },
          "NA" : {
            "label" : "Sodium",
            "quantity" : 4898.741638108934,
            "unit" : "mg"
          },
          "CA" : {
            "label" : "Calcium",
            "quantity" : 296.3397636914744,
            "unit" : "mg"
          },
          "MG" : {
            "label" : "Magnesium",
            "quantity" : 421.8148008828053,
            "unit" : "mg"
          },
          "K" : {
            "label" : "Potassium",
            "quantity" : 2442.008614559868,
            "unit" : "mg"
          },
          "FE" : {
            "label" : "Iron",
            "quantity" : 11.02907389137324,
            "unit" : "mg"
          },
          "ZN" : {
            "label" : "Zinc",
            "quantity" : 8.200205763296443,
            "unit" : "mg"
          },
          "P" : {
            "label" : "Phosphorus",
            "quantity" : 1276.797684999427,
            "unit" : "mg"
          },
          "VITA_RAE" : {
            "label" : "Vitamin A",
            "quantity" : 49.45870249998137,
            "unit" : "µg"
          },
          "VITC" : {
            "label" : "Vitamin C",
            "quantity" : 77.44599999997854,
            "unit" : "mg"
          },
          "THIA" : {
            "label" : "Thiamin (B1)",
            "quantity" : 1.2026648099992683,
            "unit" : "mg"
          },
          "RIBF" : {
            "label" : "Riboflavin (B2)",
            "quantity" : 0.9170238499993493,
            "unit" : "mg"
          },
          "NIA" : {
            "label" : "Niacin (B3)",
            "quantity" : 21.945420072492613,
            "unit" : "mg"
          },
          "VITB6A" : {
            "label" : "Vitamin B6",
            "quantity" : 1.387330182498645,
            "unit" : "mg"
          },
          "FOLDFE" : {
            "label" : "Folate equivalent (total)",
            "quantity" : 214.5661274999541,
            "unit" : "µg"
          },
          "FOLFD" : {
            "label" : "Folate (food)",
            "quantity" : 214.5661274999541,
            "unit" : "µg"
          },
          "TOCPHA" : {
            "label" : "Vitamin E",
            "quantity" : 15.924902799999485,
            "unit" : "mg"
          },
          "VITK1" : {
            "label" : "Vitamin K",
            "quantity" : 46.303577749982686,
            "unit" : "µg"
          }
        },
        "totalDaily" : {
          "ENERC_KCAL" : {
            "label" : "Energy",
            "quantity" : 141.99911912493525,
            "unit" : "%"
          },
          "FAT" : {
            "label" : "Fat",
            "quantity" : 129.222429923075,
            "unit" : "%"
          },
          "FASAT" : {
            "label" : "Saturated",
            "quantity" : 31.74014469999927,
            "unit" : "%"
          },
          "CHOCDF" : {
            "label" : "Carbs",
            "quantity" : 148.0745432082203,
            "unit" : "%"
          },
          "FIBTG" : {
            "label" : "Fiber",
            "quantity" : 140.12735899987447,
            "unit" : "%"
          },
          "PROCNT" : {
            "label" : "Protein",
            "quantity" : 155.40364584996246,
            "unit" : "%"
          },
          "NA" : {
            "label" : "Sodium",
            "quantity" : 204.1142349212056,
            "unit" : "%"
          },
          "CA" : {
            "label" : "Calcium",
            "quantity" : 29.63397636914744,
            "unit" : "%"
          },
          "MG" : {
            "label" : "Magnesium",
            "quantity" : 100.43209544828697,
            "unit" : "%"
          },
          "K" : {
            "label" : "Potassium",
            "quantity" : 51.957630097018466,
            "unit" : "%"
          },
          "FE" : {
            "label" : "Iron",
            "quantity" : 61.27263272985134,
            "unit" : "%"
          },
          "ZN" : {
            "label" : "Zinc",
            "quantity" : 74.54732512087675,
            "unit" : "%"
          },
          "P" : {
            "label" : "Phosphorus",
            "quantity" : 182.39966928563243,
            "unit" : "%"
          },
          "VITA_RAE" : {
            "label" : "Vitamin A",
            "quantity" : 5.4954113888868195,
            "unit" : "%"
          },
          "VITC" : {
            "label" : "Vitamin C",
            "quantity" : 86.05111111108727,
            "unit" : "%"
          },
          "THIA" : {
            "label" : "Thiamin (B1)",
            "quantity" : 100.22206749993903,
            "unit" : "%"
          },
          "RIBF" : {
            "label" : "Riboflavin (B2)",
            "quantity" : 70.54029615379609,
            "unit" : "%"
          },
          "NIA" : {
            "label" : "Niacin (B3)",
            "quantity" : 137.15887545307882,
            "unit" : "%"
          },
          "VITB6A" : {
            "label" : "Vitamin B6",
            "quantity" : 106.71770634604961,
            "unit" : "%"
          },
          "FOLDFE" : {
            "label" : "Folate equivalent (total)",
            "quantity" : 53.64153187498852,
            "unit" : "%"
          },
          "TOCPHA" : {
            "label" : "Vitamin E",
            "quantity" : 106.16601866666322,
            "unit" : "%"
          },
          "VITK1" : {
            "label" : "Vitamin K",
            "quantity" : 38.58631479165224,
            "unit" : "%"
          }
        },
        "digest" : [ {
          "label" : "Fat",
          "tag" : "FAT",
          "schemaOrgTag" : "fatContent",
          "total" : 83.99457944999874,
          "hasRDI" : true,
          "daily" : 129.222429923075,
          "unit" : "g",
          "sub" : [ {
            "label" : "Saturated",
            "tag" : "FASAT",
            "schemaOrgTag" : "saturatedFatContent",
            "total" : 6.348028939999853,
            "hasRDI" : true,
            "daily" : 31.74014469999927,
            "unit" : "g"
          }, {
            "label" : "Trans",
            "tag" : "FATRN",
            "schemaOrgTag" : "transFatContent",
            "total" : 0.42952000000000007,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Monounsaturated",
            "tag" : "FAMS",
            "schemaOrgTag" : null,
            "total" : 47.214852542499784,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Polyunsaturated",
            "tag" : "FAPU",
            "schemaOrgTag" : null,
            "total" : 22.873353984999166,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          } ]
        }, {
          "label" : "Carbs",
          "tag" : "CHOCDF",
          "schemaOrgTag" : "carbohydrateContent",
          "total" : 444.22362962466093,
          "hasRDI" : true,
          "daily" : 148.0745432082203,
          "unit" : "g",
          "sub" : [ {
            "label" : "Carbs (net)",
            "tag" : "CHOCDF.net",
            "schemaOrgTag" : null,
            "total" : 409.1917898746923,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Fiber",
            "tag" : "FIBTG",
            "schemaOrgTag" : "fiberContent",
            "total" : 35.03183974996862,
            "hasRDI" : true,
            "daily" : 140.12735899987447,
            "unit" : "g"
          }, {
            "label" : "Sugars",
            "tag" : "SUGAR",
            "schemaOrgTag" : "sugarContent",
            "total" : 29.24754979969287,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          }, {
            "label" : "Sugars, added",
            "tag" : "SUGAR.added",
            "schemaOrgTag" : null,
            "total" : 0.0,
            "hasRDI" : false,
            "daily" : 0.0,
            "unit" : "g"
          } ]
        }, {
          "label" : "Protein",
          "tag" : "PROCNT",
          "schemaOrgTag" : "proteinContent",
          "total" : 77.70182292498123,
          "hasRDI" : true,
          "daily" : 155.40364584996246,
          "unit" : "g"
        }, {
          "label" : "Cholesterol",
          "tag" : "CHOLE",
          "schemaOrgTag" : "cholesterolContent",
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "mg"
        }, {
          "label" : "Sodium",
          "tag" : "NA",
          "schemaOrgTag" : "sodiumContent",
          "total" : 4898.741638108934,
          "hasRDI" : true,
          "daily" : 204.1142349212056,
          "unit" : "mg"
        }, {
          "label" : "Calcium",
          "tag" : "CA",
          "schemaOrgTag" : null,
          "total" : 296.3397636914744,
          "hasRDI" : true,
          "daily" : 29.63397636914744,
          "unit" : "mg"
        }, {
          "label" : "Magnesium",
          "tag" : "MG",
          "schemaOrgTag" : null,
          "total" : 421.8148008828053,
          "hasRDI" : true,
          "daily" : 100.43209544828697,
          "unit" : "mg"
        }, {
          "label" : "Potassium",
          "tag" : "K",
          "schemaOrgTag" : null,
          "total" : 2442.008614559868,
          "hasRDI" : true,
          "daily" : 51.957630097018466,
          "unit" : "mg"
        }, {
          "label" : "Iron",
          "tag" : "FE",
          "schemaOrgTag" : null,
          "total" : 11.02907389137324,
          "hasRDI" : true,
          "daily" : 61.27263272985134,
          "unit" : "mg"
        }, {
          "label" : "Zinc",
          "tag" : "ZN",
          "schemaOrgTag" : null,
          "total" : 8.200205763296443,
          "hasRDI" : true,
          "daily" : 74.54732512087675,
          "unit" : "mg"
        }, {
          "label" : "Phosphorus",
          "tag" : "P",
          "schemaOrgTag" : null,
          "total" : 1276.797684999427,
          "hasRDI" : true,
          "daily" : 182.39966928563243,
          "unit" : "mg"
        }, {
          "label" : "Vitamin A",
          "tag" : "VITA_RAE",
          "schemaOrgTag" : null,
          "total" : 49.45870249998137,
          "hasRDI" : true,
          "daily" : 5.4954113888868195,
          "unit" : "µg"
        }, {
          "label" : "Vitamin C",
          "tag" : "VITC",
          "schemaOrgTag" : null,
          "total" : 77.44599999997854,
          "hasRDI" : true,
          "daily" : 86.05111111108727,
          "unit" : "mg"
        }, {
          "label" : "Thiamin (B1)",
          "tag" : "THIA",
          "schemaOrgTag" : null,
          "total" : 1.2026648099992683,
          "hasRDI" : true,
          "daily" : 100.22206749993903,
          "unit" : "mg"
        }, {
          "label" : "Riboflavin (B2)",
          "tag" : "RIBF",
          "schemaOrgTag" : null,
          "total" : 0.9170238499993493,
          "hasRDI" : true,
          "daily" : 70.54029615379609,
          "unit" : "mg"
        }, {
          "label" : "Niacin (B3)",
          "tag" : "NIA",
          "schemaOrgTag" : null,
          "total" : 21.945420072492613,
          "hasRDI" : true,
          "daily" : 137.15887545307882,
          "unit" : "mg"
        }, {
          "label" : "Vitamin B6",
          "tag" : "VITB6A",
          "schemaOrgTag" : null,
          "total" : 1.387330182498645,
          "hasRDI" : true,
          "daily" : 106.71770634604961,
          "unit" : "mg"
        }, {
          "label" : "Folate equivalent (total)",
          "tag" : "FOLDFE",
          "schemaOrgTag" : null,
          "total" : 214.5661274999541,
          "hasRDI" : true,
          "daily" : 53.64153187498852,
          "unit" : "µg"
        }, {
          "label" : "Folate (food)",
          "tag" : "FOLFD",
          "schemaOrgTag" : null,
          "total" : 214.5661274999541,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Folic acid",
          "tag" : "FOLAC",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin B12",
          "tag" : "VITB12",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin D",
          "tag" : "VITD",
          "schemaOrgTag" : null,
          "total" : 0.0,
          "hasRDI" : false,
          "daily" : 0.0,
          "unit" : "µg"
        }, {
          "label" : "Vitamin E",
          "tag" : "TOCPHA",
          "schemaOrgTag" : null,
          "total" : 15.924902799999485,
          "hasRDI" : true,
          "daily" : 106.16601866666322,
          "unit" : "mg"
        }, {
          "label" : "Vitamin K",
          "tag" : "VITK1",
          "schemaOrgTag" : null,
          "total" : 46.303577749982686,
          "hasRDI" : true,
          "daily" : 38.58631479165224,
          "unit" : "µg"
        } ]
      },
      "bookmarked" : false,
      "bought" : false
    } ]
  }

 /* const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));*/

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging ? '#2e6e51' : 'white',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'white' : 'white',
  display: 'flex',
  padding: grid,
  overflow: 'auto',
});



class WeekRecipeView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: recipes.hits,
            date: new Date(),
            //items: getItems(6),

        }
    }

    onDragEnd = (result) => {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          this.state.recipe,
          result.source.index,
          result.destination.index
        );
    
        this.setState({
          items,
        });
      }
   

    componentDidMount() {
        this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            /*readUserRecipes(user.email)
                .then((response) => {
                    const rootObj = response.data.data
                    this.setState({
                        id: rootObj.id,
                        email: rootObj.email,
                        firebaseUID: rootObj.firebaseuid,
                        name: rootObj.nameofuser,
                        username: rootObj.username,
                    })
                })*/
        })
    }

    render() {
        return (<>
 <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div 
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {this.state.recipe.map((item, index) => (
                <Draggable key={index} draggableId={`${item.recipe.label}-${index}`} index={index}>
                  {(provided, snapshot) => (
                      <>
      <div class="card" ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      >
        <div class="card-image">
          <img src={item.recipe.image} className="materialboxed" style={{backgroundColor: "black", height: "200px"}}/>
          <a class="btn-floating halfway-fab waves-effect waves-light orange"><i class="material-icons">add</i></a>
        </div>
        <div class="card-content">
        <h5 class="card-title" style={{color: "black"}}>{item.recipe.label}</h5>
        <h6 className="pt-1">Ingredients</h6>
        <ul>
          {
              item.recipe.ingredientLines.slice(0,4).map((ele,i)=>{
                 return <li style={{fontSize: '.9rem'}} key={i}>{ele}</li>
              })
          }
          </ul>
        </div>
      </div>
                      </>

                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
        </>
        )
    }
}

export default withRouter(WeekRecipeView)