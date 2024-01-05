// Import the 'create' function from Zustand
import { create } from "zustand";

// *** If we want to work in the localhost:
// const api = "http://localhost:3001";

const api = "https://ai-recipes-collin-dieden.onrender.com"

// Define the recipeStore using Zustand's 'create' function
export const recipeStore = create((set) => ({
  // Initialize the state with an empty array of recipes
  recipes: [],
  // Function to set the recipes in the state
  setRecipes: (recipes) => set({ recipes }),
  // Initialize the newRecipe state with null
  newRecipe: false,
  //Generating state for the post request to openAI. False as default.
  isGenerating: false,
  // Function to set the new recipe in the state
  setNewRecipe: (newRecipe) => set({ newRecipe }),
  inputRecipe: "",
  setInputRecipe: (inputRecipe) => set({ inputRecipe }),
  // Function to add a new recipe to the state
  addNewRecipe: (newRecipe) => {
    // Update the state by creating a new array with existing recipes and new recipe
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    }));
  },

  fetchNewRecipe: async () => {
    try {
      const response = await fetch(`${api}/recipes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        // Handle non-successful response (e.g., 404 Not Found, 500 Internal Server Error)
        throw new Error(`Failed to fetch recipes. Status: ${response.status}`);
      }
      const data = await response.json();
      const recipes = data.recipes;
      const newRecipeVar = recipes[recipes.length - 1];

      //Update the newRecipe state with the fetched newRecipe:
      set(() => ({ newRecipe: newRecipeVar }));
    } catch (error) {
      console.error("Error fetching new recipe:", error);
    }
  },

  fetchCollectionRecipes: async () => {
    try {
      // Make a GET request to the API endpoint
      const response = await fetch(`${api}/recipes`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      // Check if the response is not okay 
      if (!response.ok) {
        throw new Error(`Failed to fetch collection of recipes! ${response.status}`);
      }
      // Parse the JSON response and set the recipes in the state
      const data = await response.json();
      const recipes = data.recipes
      const reversedRecipes = recipes.reverse()
      
      //Update the Recipes state with the fetched recipes
      set(() => ({ recipes: reversedRecipes }));
      // Update the newRecipe state to null initially
      set(() => ({ newRecipe: null }));
      
    } catch (error) {
      console.error("Error fetching collection of recipes:", error);
    }
  },

  // From PromptForm.jsx
  generateRecipe: async (ingredients) => {

    try {
      console.log("Sending post request!")
      console.log(ingredients)
  
      //Setting the isGenerating state to true so that loading message can be rendered in Home.jsx
      set(() => ({isGenerating: true}))

      const response = await fetch(`${api}/openai/generateText`, {
        method: 'POST',
        body: JSON.stringify({ prompt: ingredients }),
        headers: { 'Content-Type': 'application/json' },
      })

      // Check if the response is not okay
      if (!response.ok) {
        throw new Error(`Error generating OpenAI completion. Status: ${response.status}`);
      }
      const data = await response.json()

      console.log(data.recipe)
    

    } catch (error) {
      console.error("Error generating OpenAI completion:", error);
    } finally {
      // Set isGenerating back to false once the operation is completed (either success or error)
      set(() => ({ isGenerating: false }));
    }
  },


}));
