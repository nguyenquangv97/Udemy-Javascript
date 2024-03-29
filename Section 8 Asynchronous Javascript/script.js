
// const second = () => {
//     setTimeout(()=>{
//         console.log('Async hey there');
//     }, 2000);
// };

// const first = () => {
//     console.log('Hey there');
//     second();
//     console.log('The end');
// };
// first();

//------------------------------ callback hell ------------------------------//

// function getRecipe(){
//     setTimeout(() => {
//         const recipeID = [523, 883, 432, 974];
//         console.log(recipeID);

//         setTimeout(id => {
//             const recipe = {title: 'Fresh tomato pasta', publisher: 'Jonas'};
//             console.log(`${id}: ${recipe.title}`);

//             setTimeout(id => {
//                 const recipie = {title: 'Italian Pizza', publisher: 'Jonas'};
//                 console.log(recipe);
//             }, 1500, recipe.publisher);
//         }, 1000, recipeID[2]);
//     }, 1500);
// }
// getRecipe();

//------------------------------ Promises ------------------------------//
// const getIDs = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve([523, 883, 432, 974]);
//     }, 1500);
// });

// const getRecipe = recID => {
//     return new Promise((resolve, reject) => {
//         setTimeout(ID => {
//             const recipe = {title: 'Fresh tomato pasta', publisher: 'Jonas'};
//             resolve(`${ID}: ${recipe.title}`);
//         }, 1500, recID);
//     });
// };

// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         const recipe = {title: 'Italian Pizza', publisher: 'Jonas'};
//         setTimeout((pub) => {
//             resolve(`${pub}: ${recipe.title}`);
//         }, 1500, publisher);
//     });
// };


// getIDs.then(IDs => {
//     console.log(IDs);
//     return getRecipe(IDs[2]);
// })
// .then((recipe)=> {
//     console.log(recipe);
//     return getRelated('Jonas');
// })
// .then(recipe => {
//     console.log(recipe);
// })
// .catch(error => {
//     console.log(error);
// });

// async function getRecipesAW(){
//     const IDs = await getIDs;
//     console.log(IDs);
//     const recipe = await getRecipe(IDs[2]);
//     console.log(recipe);
//     const related = await getRelated('Quang Nguyen');
//     console.log(related);

//     return recipe;
//     // the promise automatically resolve the recipe as the returned value
// }

// getRecipesAW().then(result => {
//     console.log(`${result} is great!`);
// });

const cors_api_host = 'cors-anywhere.herokuapp.com';
const cors_api_url = `https://${cors_api_host}/`;

function getWeather(woeid){
    fetch(`${cors_api_url}https://www.metaweather.com/api/location/${woeid}/`)
    .then(result => {
        return result.json();
    })
    .then(data => {
        //console.log(data);
        const today = data.consolidated_weather[0];
        console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`);
    })
    .catch(error => console.log(error));
}
getWeather(2487956);
getWeather(44418);

async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`${cors_api_url}https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        //console.log(data);
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);
        return data;
    } catch(error) {
        console.log(error);
    }
}

getWeatherAW(2487956);
let dataLondon;
getWeatherAW(44418).then(data => {
    dataLondon = data;
    console.log(dataLondon);
});
