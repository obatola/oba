const BASE_PATH = "/be-planner";
const BASE_API_PATH = "http://localhost:3001";

export const PATHS = {
    base: BASE_PATH,
    signup: `${BASE_PATH}/signup`,
    login: `${BASE_PATH}/login`,
};

export const API_PATHS = {
    signup: `${BASE_API_PATH}/signup`,
    login: `${BASE_API_PATH}/login`,
    getDays: `${BASE_API_PATH}/days`,
};
