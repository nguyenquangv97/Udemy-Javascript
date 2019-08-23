
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
const getIDs = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([523, 883, 432, 974]);
    }, 1500);
});

const getRecipe = recID => {
    return new Promise((resolve, reject) => {
        setTimeout(ID => {
            const recipe = {title: 'Fresh tomato pasta', publisher: 'Jonas'};
            resolve(`${ID}: ${recipe.title}`);
        }, 1500, recID);
    });
};

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        const recipe = {title: 'Italian Pizza', publisher: 'Jonas'};
        setTimeout((pub) => {
            resolve(`${pub}: ${recipe.title}`);
        }, 1500, publisher);
    });
};


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

async function getRecipesAW(){
    const IDs = await getIDs;
    console.log(IDs);
    const recipe = await getRecipe(IDs[2]);
    console.log(recipe);
    const related = await getRelated('Quang Nguyen');
    console.log(related);

    return recipe;
    // the promise automatically resolve the recipe as the returned value
}

getRecipesAW().then(result => {
    console.log(`${result} is great!`);
});

