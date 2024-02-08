import HomeScreen from "./HomeScreen";
import DisplayScreen from "./DisplayScreen";
import PostWorkoutScreen from './PostWorkoutScreen';
import ChangeUnitsScreen from './ChangeUnitsScreen';

export const screens = [ 
    {
        name: "Home",
        component: HomeScreen
    },
    {
        name: "Display", 
        component: DisplayScreen
    },
    {
        name: "Post-Workout", 
        component: PostWorkoutScreen
    },
    {
        name: "Change-Units", 
        component: ChangeUnitsScreen
    }
]
